/**
 * Call analytics for the self-care overview, computed from the user's own
 * call history (`/my/call_history`).
 *
 * Everything here is derived client-side from the call records the API
 * returns — there is no analytics endpoint behind it. Pure functions, so the
 * numbers on the screen can be unit-tested.
 */

export type RangeKey = 'today' | '7d' | '30d' | '90d';
export type BucketSize = 'hour' | 'day' | 'week';

export interface Range {
  key: RangeKey;
  start: Date;
  end: Date;
  /**
   * The comparison period: the same span shifted back by the range's length
   * in days, so "today so far" compares with "yesterday up to this time".
   */
  previousStart: Date;
  previousEnd: Date;
  bucket: BucketSize;
}

export interface CallRecord {
  startTime: string;
  duration: number;
  direction?: 'inbound' | 'outbound' | null;
  disposition?: 'answered' | 'missed' | 'busy' | 'error' | null;
  caller?: string | null;
  callee?: string | null;
  numRecordings?: number;
}

const HOUR = 3600 * 1000;

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

/** Calendar ranges ending now, in the viewer's local time. */
export function rangeFor(key: RangeKey, now: Date = new Date()): Range {
  const today = startOfDay(now);
  const days = { today: 1, '7d': 7, '30d': 30, '90d': 90 }[key];
  const start = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - (days - 1)
  );
  const shift = (date: Date): Date =>
    new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() - days,
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
      date.getMilliseconds()
    );

  return {
    key,
    start,
    end: now,
    previousStart: shift(start),
    previousEnd: shift(now),
    bucket: key === 'today' ? 'hour' : key === '90d' ? 'week' : 'day',
  };
}

export function inRange(call: CallRecord, from: Date, to: Date): boolean {
  const time = new Date(call.startTime).getTime();
  return time >= from.getTime() && time < to.getTime();
}

export interface Summary {
  total: number;
  inbound: number;
  outbound: number;
  answered: number;
  missed: number;
  busy: number;
  failed: number;
  /** Sum of reported durations, in seconds. */
  seconds: number;
  /** Mean duration of answered calls, in seconds; null with none. */
  averageSeconds: number | null;
  /** answered / total, 0..1; null with no calls. */
  answerRate: number | null;
  recorded: number;
}

export function summarize(calls: CallRecord[]): Summary {
  let inbound = 0;
  let answered = 0;
  let missed = 0;
  let busy = 0;
  let failed = 0;
  let seconds = 0;
  let answeredSeconds = 0;
  let recorded = 0;

  for (const call of calls) {
    if (call.direction === 'inbound') inbound++;
    const duration = Number(call.duration) || 0;
    seconds += duration;
    if (call.disposition === 'answered') {
      answered++;
      answeredSeconds += duration;
    } else if (call.disposition === 'missed') missed++;
    else if (call.disposition === 'busy') busy++;
    else if (call.disposition === 'error') failed++;
    if ((call.numRecordings ?? 0) > 0) recorded++;
  }

  const total = calls.length;
  return {
    total,
    inbound,
    outbound: calls.filter((call) => call.direction === 'outbound').length,
    answered,
    missed,
    busy,
    failed,
    seconds,
    averageSeconds: answered ? answeredSeconds / answered : null,
    answerRate: total ? answered / total : null,
    recorded,
  };
}

/**
 * Relative change from `previous` to `current`. Null when there is nothing to
 * compare against — a rise from zero has no meaningful percentage.
 */
export function change(current: number, previous: number): number | null {
  if (previous === 0) return current === 0 ? 0 : null;
  return (current - previous) / previous;
}

export type TrendMetric =
  'total' | 'inbound' | 'outbound' | 'missed' | 'minutes';

export interface Bucket {
  start: Date;
  value: number;
}

function bucketStart(date: Date, size: BucketSize): Date {
  if (size === 'hour') {
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours()
    );
  }
  const day = startOfDay(date);
  if (size === 'day') return day;
  // Weeks start on Monday.
  const offset = (day.getDay() + 6) % 7;
  return new Date(day.getFullYear(), day.getMonth(), day.getDate() - offset);
}

function nextBucket(date: Date, size: BucketSize): Date {
  if (size === 'hour') return new Date(date.getTime() + HOUR);
  const days = size === 'day' ? 1 : 7;
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
}

function metricValue(call: CallRecord, metric: TrendMetric): number {
  switch (metric) {
    case 'total':
      return 1;
    case 'inbound':
      return call.direction === 'inbound' ? 1 : 0;
    case 'outbound':
      return call.direction === 'outbound' ? 1 : 0;
    case 'missed':
      return call.disposition === 'missed' ? 1 : 0;
    case 'minutes':
      return (Number(call.duration) || 0) / 60;
  }
}

/** One value per hour, day or week across the range — empty buckets included. */
export function buckets(
  calls: CallRecord[],
  range: Range,
  metric: TrendMetric
): Bucket[] {
  const result: Bucket[] = [];
  const index = new Map<number, number>();

  // Up to now only: future hours of today are not zero calls, they are unknown.
  const last = range.end;

  for (
    let cursor = bucketStart(range.start, range.bucket);
    cursor.getTime() <= last.getTime();
    cursor = nextBucket(cursor, range.bucket)
  ) {
    index.set(cursor.getTime(), result.length);
    result.push({ start: cursor, value: 0 });
  }

  for (const call of calls) {
    if (!inRange(call, range.start, range.end)) continue;
    const key = bucketStart(new Date(call.startTime), range.bucket).getTime();
    const position = index.get(key);
    if (position !== undefined)
      result[position]!.value += metricValue(call, metric);
  }

  if (metric === 'minutes') {
    for (const bucket of result)
      bucket.value = Math.round(bucket.value * 10) / 10;
  }
  return result;
}

/** Calls per hour of the day (local time), 0..23. */
export function hourProfile(calls: CallRecord[]): number[] {
  const hours = Array.from({ length: 24 }, () => 0);
  for (const call of calls) hours[new Date(call.startTime).getHours()]! += 1;
  return hours;
}

/** The number on the other end of the call. */
export function counterpart(call: CallRecord): string | null {
  return (call.direction === 'inbound' ? call.caller : call.callee) ?? null;
}

export interface Contact {
  number: string;
  calls: number;
  share: number;
}

export function topContacts(calls: CallRecord[], limit = 5): Contact[] {
  const counts = new Map<string, number>();
  for (const call of calls) {
    const number = counterpart(call);
    if (number) counts.set(number, (counts.get(number) ?? 0) + 1);
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, limit)
    .map(([number, count]) => ({
      number,
      calls: count,
      share: calls.length ? count / calls.length : 0,
    }));
}

export interface UnreturnedMiss {
  number: string;
  missed: number;
  lastMissedAt: string;
}

/**
 * Missed inbound calls with no later contact: no outbound call to that number
 * and no answered call from it afterwards. A heuristic from call records — it
 * cannot see a callback made from another phone.
 */
export function unreturnedMisses(calls: CallRecord[]): UnreturnedMiss[] {
  const byNumber = new Map<string, CallRecord[]>();
  for (const call of calls) {
    const number = counterpart(call);
    if (!number) continue;
    const list = byNumber.get(number) ?? [];
    list.push(call);
    byNumber.set(number, list);
  }

  const result: UnreturnedMiss[] = [];
  for (const [number, list] of byNumber) {
    const sorted = [...list].sort((a, b) =>
      a.startTime.localeCompare(b.startTime)
    );
    let lastContact = -1;
    sorted.forEach((call, position) => {
      if (call.direction === 'outbound' || call.disposition === 'answered') {
        lastContact = position;
      }
    });
    const pending = sorted
      .slice(lastContact + 1)
      .filter(
        (call) => call.direction === 'inbound' && call.disposition === 'missed'
      );
    if (pending.length > 0) {
      result.push({
        number,
        missed: pending.length,
        lastMissedAt: pending[pending.length - 1]!.startTime,
      });
    }
  }

  return result.sort((a, b) => b.lastMissedAt.localeCompare(a.lastMissedAt));
}

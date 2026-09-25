import { describe, expect, it } from 'vitest';

import {
  buckets,
  type CallRecord,
  change,
  hourProfile,
  rangeFor,
  summarize,
  topContacts,
  unreturnedMisses,
} from './analytics';

const at = (y: number, m: number, d: number, h = 10, min = 0): string =>
  new Date(y, m - 1, d, h, min).toISOString();

const call = (overrides: Partial<CallRecord>): CallRecord => ({
  startTime: at(2026, 9, 25),
  duration: 60,
  direction: 'inbound',
  disposition: 'answered',
  caller: '+34600000001',
  callee: '201',
  numRecordings: 0,
  ...overrides,
});

describe('rangeFor', () => {
  const now = new Date(2026, 8, 25, 14, 30);

  it('starts 7-day ranges at local midnight six days back', () => {
    const range = rangeFor('7d', now);
    expect(range.start).toEqual(new Date(2026, 8, 19));
    expect(range.bucket).toBe('day');
  });

  it('compares today with yesterday up to the same time', () => {
    const range = rangeFor('today', now);
    expect(range.previousStart).toEqual(new Date(2026, 8, 24));
    expect(range.previousEnd).toEqual(new Date(2026, 8, 24, 14, 30));
    expect(range.bucket).toBe('hour');
  });

  it('buckets 90 days by week', () => {
    expect(rangeFor('90d', now).bucket).toBe('week');
  });
});

describe('summarize', () => {
  it('counts directions, outcomes, recordings and answered-only averages', () => {
    const summary = summarize([
      call({ duration: 100, numRecordings: 1 }),
      call({ duration: 300, direction: 'outbound' }),
      call({ duration: 0, disposition: 'missed' }),
      call({ duration: 0, disposition: 'busy', direction: 'outbound' }),
      call({ duration: 0, disposition: 'error' }),
    ]);

    expect(summary).toMatchObject({
      total: 5,
      inbound: 3,
      outbound: 2,
      answered: 2,
      missed: 1,
      busy: 1,
      failed: 1,
      seconds: 400,
      averageSeconds: 200,
      answerRate: 0.4,
      recorded: 1,
    });
  });

  it('has no average or rate without calls', () => {
    expect(summarize([])).toMatchObject({
      averageSeconds: null,
      answerRate: null,
    });
  });
});

describe('change', () => {
  it('is relative to the previous value', () => {
    expect(change(12, 8)).toBe(0.5);
    expect(change(2, 8)).toBe(-0.75);
  });

  it('has no percentage for a rise from zero', () => {
    expect(change(5, 0)).toBeNull();
    expect(change(0, 0)).toBe(0);
  });
});

describe('buckets', () => {
  it('fills every day in range, including empty ones', () => {
    const range = rangeFor('7d', new Date(2026, 8, 25, 14, 30));
    const result = buckets(
      [
        call({ startTime: at(2026, 9, 19) }),
        call({ startTime: at(2026, 9, 25) }),
        call({ startTime: at(2026, 9, 25), direction: 'outbound' }),
        call({ startTime: at(2026, 9, 18) }), // before the range
      ],
      range,
      'total'
    );

    expect(result).toHaveLength(7);
    expect(result.map((bucket) => bucket.value)).toEqual([1, 0, 0, 0, 0, 0, 2]);
  });

  it('sums minutes rather than counting calls', () => {
    const range = rangeFor('today', new Date(2026, 8, 25, 14, 30));
    const result = buckets(
      [
        call({ startTime: at(2026, 9, 25, 9), duration: 90 }),
        call({ startTime: at(2026, 9, 25, 9, 30), duration: 30 }),
      ],
      range,
      'minutes'
    );

    // 00:00 to 14:00 — nothing after the current hour.
    expect(result).toHaveLength(15);
    expect(result[9]!.value).toBe(2);
  });
});

describe('hourProfile', () => {
  it('counts calls per local hour', () => {
    const hours = hourProfile([
      call({ startTime: at(2026, 9, 25, 9) }),
      call({ startTime: at(2026, 9, 24, 9) }),
    ]);
    expect(hours[9]).toBe(2);
    expect(hours.reduce((a, b) => a + b, 0)).toBe(2);
  });
});

describe('topContacts', () => {
  it('ranks the other party, whichever direction', () => {
    const top = topContacts([
      call({ caller: '+1' }),
      call({ caller: '+1' }),
      call({ direction: 'outbound', caller: '201', callee: '+1' }),
      call({ caller: '+2' }),
    ]);
    expect(top[0]).toEqual({ number: '+1', calls: 3, share: 0.75 });
    expect(top[1]?.number).toBe('+2');
  });
});

describe('unreturnedMisses', () => {
  it('drops a miss once the number was called back', () => {
    const result = unreturnedMisses([
      call({ caller: '+1', disposition: 'missed', startTime: at(2026, 9, 24) }),
      call({
        direction: 'outbound',
        caller: '201',
        callee: '+1',
        startTime: at(2026, 9, 24, 12),
      }),
      call({
        caller: '+2',
        disposition: 'missed',
        startTime: at(2026, 9, 25, 9),
      }),
      call({
        caller: '+2',
        disposition: 'missed',
        startTime: at(2026, 9, 25, 11),
      }),
    ]);

    expect(result).toEqual([
      { number: '+2', missed: 2, lastMissedAt: at(2026, 9, 25, 11) },
    ]);
  });

  it('keeps a miss that came after the last contact', () => {
    const result = unreturnedMisses([
      call({ caller: '+1', startTime: at(2026, 9, 20) }),
      call({ caller: '+1', disposition: 'missed', startTime: at(2026, 9, 22) }),
    ]);
    expect(result).toHaveLength(1);
  });
});

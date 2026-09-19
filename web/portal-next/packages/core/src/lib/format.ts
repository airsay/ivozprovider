/**
 * Value formatting shared by list cells, detail views and bespoke screens.
 *
 * Telephony data has a few recurring shapes — call durations in seconds, byte
 * sizes for recordings and faxes, ISO timestamps — and they should read the same
 * everywhere rather than being re-formatted ad hoc per screen.
 */

/** Seconds -> `4:07`, or `1:02:30` once it passes an hour. */
export function formatDuration(
  seconds: number | string | null | undefined
): string {
  const value = typeof seconds === 'string' ? Number(seconds) : seconds;
  if (
    value === null ||
    value === undefined ||
    !Number.isFinite(value) ||
    value <= 0
  ) {
    return '0:00';
  }

  const total = Math.round(value);
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const secs = total % 60;

  return hours > 0
    ? `${hours}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
    : `${minutes}:${String(secs).padStart(2, '0')}`;
}

/** An ISO timestamp in the viewer's locale, or the raw value if unparseable. */
export function formatDateTime(
  value: string | null | undefined,
  style: 'date' | 'datetime' = 'datetime'
): string {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return style === 'date'
    ? date.toLocaleDateString()
    : date.toLocaleString(undefined, {
        dateStyle: 'short',
        timeStyle: 'short',
      });
}

export function formatBytes(bytes: number | null | undefined): string {
  if (bytes === null || bytes === undefined || !Number.isFinite(bytes))
    return '—';
  if (bytes < 1024) return `${bytes} B`;

  const units = ['kB', 'MB', 'GB'];
  let value = bytes / 1024;
  let unit = 0;
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024;
    unit += 1;
  }
  return `${value.toFixed(value < 10 ? 1 : 0)} ${units[unit]}`;
}

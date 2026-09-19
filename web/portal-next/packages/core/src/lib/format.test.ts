import { describe, expect, it } from 'vitest';

import { formatBytes, formatDateTime, formatDuration } from './format';

describe('formatDuration', () => {
  it('formats under an hour as m:ss', () => {
    expect(formatDuration(0)).toBe('0:00');
    expect(formatDuration(7)).toBe('0:07');
    expect(formatDuration(247)).toBe('4:07');
  });

  it('adds hours once the call is long enough', () => {
    expect(formatDuration(3750)).toBe('1:02:30');
  });

  it('accepts the string the API sometimes sends for a decimal duration', () => {
    expect(formatDuration('90.4')).toBe('1:30');
  });

  it('treats missing or negative values as zero', () => {
    expect(formatDuration(null)).toBe('0:00');
    expect(formatDuration(undefined)).toBe('0:00');
    expect(formatDuration(-5)).toBe('0:00');
  });
});

describe('formatDateTime', () => {
  it('returns a dash for a missing value', () => {
    expect(formatDateTime(null)).toBe('—');
  });

  it('passes an unparseable value through rather than showing "Invalid Date"', () => {
    expect(formatDateTime('not a date')).toBe('not a date');
  });

  it('formats a real timestamp', () => {
    expect(formatDateTime('2026-09-18T10:30:00Z')).not.toBe('—');
  });
});

describe('formatBytes', () => {
  it('scales through the units', () => {
    expect(formatBytes(512)).toBe('512 B');
    expect(formatBytes(2048)).toBe('2.0 kB');
    expect(formatBytes(5 * 1024 * 1024)).toBe('5.0 MB');
  });

  it('handles a missing size', () => {
    expect(formatBytes(null)).toBe('—');
  });
});

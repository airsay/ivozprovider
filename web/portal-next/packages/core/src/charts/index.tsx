import {
  type CSSProperties,
  type ReactNode,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';

import { cn } from '../lib/cn';

/**
 * Small, dependency-free chart primitives.
 *
 * Built to the dataviz rules this project follows: 2px lines, rounded data
 * ends anchored to the baseline, 2px surface gaps between fills, recessive grid,
 * a crosshair tooltip on the trend and a per-mark tooltip on bars, legends with
 * the numbers beside every colour so identity never rests on colour alone, and
 * a visually hidden table on every chart for screen readers.
 */

// ------------------------------------------------------------------ helpers

function useWidth<T extends HTMLElement>(): [
  React.RefObject<T | null>,
  number,
] {
  const ref = useRef<T | null>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const update = (): void => setWidth(node.clientWidth);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return [ref, width];
}

/** A round upper bound and tick step for a 0-based axis. */
function niceScale(max: number, ticks = 4): { top: number; step: number } {
  if (max <= 0) return { top: ticks, step: 1 };
  const rough = max / ticks;
  const magnitude = 10 ** Math.floor(Math.log10(rough));
  const residual = rough / magnitude;
  const nice = residual > 5 ? 10 : residual > 2 ? 5 : residual > 1 ? 2 : 1;
  const step = Math.max(nice * magnitude, max < ticks ? 1 : 0);
  return { top: Math.ceil(max / step) * step, step };
}

function Tooltip({
  x,
  y,
  width,
  children,
}: {
  x: number;
  y: number;
  width: number;
  children: ReactNode;
}): React.JSX.Element {
  // Keep the box inside the chart: flip to the left of the point past midway.
  const flip = x > width / 2;
  const style: CSSProperties = flip
    ? { right: width - x + 12, top: y }
    : { left: x + 12, top: y };

  return (
    <div
      role='status'
      className='pointer-events-none absolute z-10 min-w-32 -translate-y-1/2 rounded-(--radius-control) border border-border-subtle bg-surface-raised px-3 py-2 text-xs shadow-(--shadow-raised)'
      style={style}
    >
      {children}
    </div>
  );
}

// -------------------------------------------------------------- AreaTrend

export interface TrendPoint {
  /** Short axis label, e.g. "Sep 19" or "14:00". */
  label: string;
  /** Longer label for the tooltip, e.g. "Thu, Sep 19". */
  title: string;
  value: number;
}

export interface AreaTrendProps {
  data: TrendPoint[];
  /** What the value is, for the tooltip and the hidden table. */
  seriesLabel: string;
  formatValue?: (value: number) => string;
  height?: number;
  className?: string;
}

const PAD = { top: 12, right: 12, bottom: 28, left: 36 };

export function AreaTrend({
  data,
  seriesLabel,
  formatValue = (value) => value.toLocaleString(),
  height = 260,
  className,
}: AreaTrendProps): React.JSX.Element {
  const [ref, width] = useWidth<HTMLDivElement>();
  const [hover, setHover] = useState<number | null>(null);
  const gradientId = useId();

  const geometry = useMemo(() => {
    const innerWidth = Math.max(width - PAD.left - PAD.right, 10);
    const innerHeight = height - PAD.top - PAD.bottom;
    const max = Math.max(0, ...data.map((point) => point.value));
    const { top, step } = niceScale(max);
    const x = (index: number): number =>
      PAD.left +
      (data.length <= 1
        ? innerWidth / 2
        : (index / (data.length - 1)) * innerWidth);
    const y = (value: number): number =>
      PAD.top + innerHeight - (value / top) * innerHeight;

    const ticks: number[] = [];
    for (let value = 0; value <= top + 1e-9; value += step) ticks.push(value);

    const line = data
      .map(
        (point, index) => `${index ? 'L' : 'M'}${x(index)},${y(point.value)}`
      )
      .join(' ');
    const area =
      data.length > 0
        ? `${line} L${x(data.length - 1)},${y(0)} L${x(0)},${y(0)} Z`
        : '';

    // Label at most ~7 positions so the axis never collides.
    const every = Math.max(
      1,
      Math.ceil(data.length / Math.max(2, Math.floor(innerWidth / 90)))
    );

    return { innerWidth, innerHeight, x, y, ticks, line, area, every };
  }, [data, width, height]);

  const hovered = hover === null ? undefined : data[hover];
  const showDots = data.length <= 32;

  const onPointer = (event: React.PointerEvent<SVGRectElement>): void => {
    if (data.length === 0) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const relative = (event.clientX - rect.left) / rect.width;
    setHover(
      Math.min(
        data.length - 1,
        Math.max(0, Math.round(relative * (data.length - 1)))
      )
    );
  };

  return (
    <div ref={ref} className={cn('relative w-full', className)}>
      {width > 0 ? (
        <svg
          width={width}
          height={height}
          role='img'
          aria-label={seriesLabel}
          className='block overflow-visible'
        >
          <defs>
            <linearGradient id={gradientId} x1='0' x2='0' y1='0' y2='1'>
              <stop
                offset='0%'
                stopColor='var(--chart-line)'
                stopOpacity={0.35}
              />
              <stop
                offset='100%'
                stopColor='var(--chart-line)'
                stopOpacity={0}
              />
            </linearGradient>
          </defs>

          {geometry.ticks.map((tick) => (
            <g key={tick}>
              <line
                x1={PAD.left}
                x2={width - PAD.right}
                y1={geometry.y(tick)}
                y2={geometry.y(tick)}
                stroke='var(--chart-grid)'
                strokeWidth={1}
              />
              <text
                x={PAD.left - 10}
                y={geometry.y(tick)}
                textAnchor='end'
                dominantBaseline='middle'
                className='fill-fg-subtle text-[11px] tabular-nums'
              >
                {formatValue(tick)}
              </text>
            </g>
          ))}

          {data.map((point, index) =>
            index % geometry.every === 0 || index === data.length - 1 ? (
              <text
                key={index}
                x={geometry.x(index)}
                y={height - 8}
                textAnchor={
                  index === 0
                    ? 'start'
                    : index === data.length - 1
                      ? 'end'
                      : 'middle'
                }
                className='fill-fg-subtle text-[11px]'
              >
                {index % geometry.every === 0 ||
                data.length - 1 - index >= geometry.every / 2
                  ? point.label
                  : ''}
              </text>
            ) : null
          )}

          <path d={geometry.area} fill={`url(#${gradientId})`} />
          <path
            d={geometry.line}
            fill='none'
            stroke='var(--chart-line)'
            strokeWidth={2}
            strokeLinejoin='round'
            strokeLinecap='round'
          />

          {showDots
            ? data.map((point, index) => (
                <circle
                  key={index}
                  cx={geometry.x(index)}
                  cy={geometry.y(point.value)}
                  r={3}
                  fill='var(--chart-line)'
                  stroke='var(--surface)'
                  strokeWidth={2}
                />
              ))
            : null}

          {hovered && hover !== null ? (
            <g pointerEvents='none'>
              <line
                x1={geometry.x(hover)}
                x2={geometry.x(hover)}
                y1={PAD.top}
                y2={PAD.top + geometry.innerHeight}
                stroke='var(--border-strong)'
                strokeWidth={1}
              />
              <circle
                cx={geometry.x(hover)}
                cy={geometry.y(hovered.value)}
                r={5}
                fill='var(--chart-line)'
                stroke='var(--surface)'
                strokeWidth={2}
              />
            </g>
          ) : null}

          <rect
            x={PAD.left}
            y={PAD.top}
            width={geometry.innerWidth}
            height={geometry.innerHeight}
            fill='transparent'
            onPointerMove={onPointer}
            onPointerLeave={() => setHover(null)}
          />
        </svg>
      ) : (
        <div style={{ height }} />
      )}

      {hovered && hover !== null ? (
        <Tooltip
          x={geometry.x(hover)}
          y={geometry.y(hovered.value)}
          width={width}
        >
          <p className='text-sm font-semibold tabular-nums text-fg'>
            {formatValue(hovered.value)}
          </p>
          <p className='mt-0.5 flex items-center gap-1.5 text-fg-muted'>
            <span
              aria-hidden
              className='h-0.5 w-3 rounded-full bg-(--chart-line)'
            />
            {seriesLabel}
          </p>
          <p className='mt-0.5 text-fg-subtle'>{hovered.title}</p>
        </Tooltip>
      ) : null}

      <table className='sr-only'>
        <caption>{seriesLabel}</caption>
        <tbody>
          {data.map((point, index) => (
            <tr key={index}>
              <th scope='row'>{point.title}</th>
              <td>{formatValue(point.value)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ------------------------------------------------------------------ Donut

export interface DonutSegment {
  key: string;
  label: string;
  value: number;
  /** A CSS colour, normally one of the `--series-N` tokens. */
  color: string;
}

export interface DonutProps {
  segments: DonutSegment[];
  centerValue: ReactNode;
  centerLabel: ReactNode;
  size?: number;
  className?: string;
}

/**
 * Part-to-whole at a glance, for a handful of segments. The legend carries
 * every count and share, so the ring is never the only way to read a value.
 */
export function Donut({
  segments,
  centerValue,
  centerLabel,
  size = 148,
  className,
}: DonutProps): React.JSX.Element {
  const [hover, setHover] = useState<string | null>(null);
  const total = segments.reduce((sum, segment) => sum + segment.value, 0);
  const stroke = 16;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const visible = segments.filter((segment) => segment.value > 0);
  // A 2px surface gap between neighbouring segments.
  const gap = visible.length > 1 ? 2 : 0;

  let offset = 0;
  const arcs = visible.map((segment) => {
    const length = (segment.value / (total || 1)) * circumference;
    const arc = {
      segment,
      dash: Math.max(length - gap, 0.5),
      offset,
    };
    offset += length;
    return arc;
  });

  return (
    <div
      className={cn(
        'flex flex-col items-center gap-5 sm:flex-row sm:items-center',
        className
      )}
    >
      <div className='relative shrink-0' style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className='-rotate-90'
          aria-hidden
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill='none'
            stroke='var(--chart-grid)'
            strokeWidth={stroke}
          />
          {arcs.map(({ segment, dash, offset: start }) => (
            <circle
              key={segment.key}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill='none'
              stroke={segment.color}
              strokeWidth={hover === segment.key ? stroke + 3 : stroke}
              strokeDasharray={`${dash} ${circumference - dash}`}
              strokeDashoffset={-start}
              opacity={hover && hover !== segment.key ? 0.45 : 1}
              className='transition-[opacity,stroke-width]'
              onPointerEnter={() => setHover(segment.key)}
              onPointerLeave={() => setHover(null)}
            />
          ))}
        </svg>
        <div className='pointer-events-none absolute inset-0 grid place-items-center text-center'>
          <div>
            <div className='text-2xl font-semibold tracking-tight tabular-nums text-fg'>
              {centerValue}
            </div>
            <div className='text-[11px] text-fg-subtle'>{centerLabel}</div>
          </div>
        </div>
      </div>

      <ul className='w-full min-w-0 flex-1 space-y-2.5'>
        {segments.map((segment) => {
          const share = total ? Math.round((segment.value / total) * 100) : 0;
          return (
            <li
              key={segment.key}
              onPointerEnter={() => setHover(segment.key)}
              onPointerLeave={() => setHover(null)}
              className={cn(
                'flex items-center gap-2.5 text-sm transition-opacity',
                hover && hover !== segment.key && 'opacity-50'
              )}
            >
              <span
                aria-hidden
                className='size-2.5 shrink-0 rounded-[3px]'
                style={{ background: segment.color }}
              />
              <span className='min-w-0 flex-1 truncate text-fg-muted'>
                {segment.label}
              </span>
              <span className='font-medium tabular-nums text-fg'>
                {segment.value.toLocaleString()}
              </span>
              <span className='w-10 text-right text-xs tabular-nums text-fg-subtle'>
                {share}%
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// -------------------------------------------------------------- BarList

export interface BarListItem {
  key: string;
  label: ReactNode;
  value: number;
  /** Shown right of the value, e.g. a share. */
  detail?: ReactNode;
}

/** Ranked horizontal bars with the value beside each — the "top N" shape. */
export function BarList({
  items,
  formatValue = (value) => value.toLocaleString(),
  className,
}: {
  items: BarListItem[];
  formatValue?: (value: number) => string;
  className?: string;
}): React.JSX.Element {
  const max = Math.max(1, ...items.map((item) => item.value));

  return (
    <ul className={cn('space-y-3', className)}>
      {items.map((item) => (
        <li key={item.key} className='text-sm'>
          <div className='flex items-baseline justify-between gap-3'>
            <span className='min-w-0 truncate font-medium text-fg'>
              {item.label}
            </span>
            <span className='shrink-0 tabular-nums text-fg'>
              {formatValue(item.value)}
              {item.detail ? (
                <span className='ml-2 text-xs text-fg-subtle'>
                  {item.detail}
                </span>
              ) : null}
            </span>
          </div>
          <div className='mt-1.5 h-1.5 overflow-hidden rounded-full bg-chart-grid'>
            <div
              className='h-full rounded-full bg-(--chart-line)'
              style={{ width: `${(item.value / max) * 100}%` }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

// ------------------------------------------------------------ ColumnChart

export interface Column {
  label: string;
  title: string;
  value: number;
}

/** Vertical bars on a shared baseline, each its own hover target. */
export function ColumnChart({
  data,
  seriesLabel,
  labelEvery = 1,
  height = 150,
  className,
}: {
  data: Column[];
  seriesLabel: string;
  /** Print every Nth axis label. */
  labelEvery?: number;
  height?: number;
  className?: string;
}): React.JSX.Element {
  const [ref, width] = useWidth<HTMLDivElement>();
  const [hover, setHover] = useState<number | null>(null);
  const max = Math.max(1, ...data.map((column) => column.value));
  const axis = 20;
  const plot = height - axis;
  const slot = data.length ? width / data.length : 0;
  const barWidth = Math.max(slot - 2, 1);

  return (
    <div ref={ref} className={cn('relative w-full', className)}>
      {width > 0 ? (
        <svg width={width} height={height} role='img' aria-label={seriesLabel}>
          <line
            x1={0}
            x2={width}
            y1={plot + 0.5}
            y2={plot + 0.5}
            stroke='var(--chart-grid)'
          />
          {data.map((column, index) => {
            const barHeight = (column.value / max) * (plot - 6);
            const x = index * slot + 1;
            const radius = Math.min(4, barWidth / 2, barHeight);
            const top = plot - barHeight;
            // Rounded top corners only: the bar stands on the baseline.
            const path =
              barHeight <= 0
                ? ''
                : `M${x},${plot} V${top + radius} Q${x},${top} ${x + radius},${top} ` +
                  `H${x + barWidth - radius} Q${x + barWidth},${top} ${x + barWidth},${top + radius} V${plot} Z`;
            return (
              <g key={index}>
                {path ? (
                  <path
                    d={path}
                    fill='var(--chart-line)'
                    opacity={hover === null || hover === index ? 1 : 0.45}
                  />
                ) : null}
                <rect
                  x={index * slot}
                  y={0}
                  width={slot}
                  height={plot}
                  fill='transparent'
                  onPointerEnter={() => setHover(index)}
                  onPointerLeave={() => setHover(null)}
                />
                {index % labelEvery === 0 ? (
                  <text
                    x={x + barWidth / 2}
                    y={height - 4}
                    textAnchor='middle'
                    className='fill-fg-subtle text-[10px]'
                  >
                    {column.label}
                  </text>
                ) : null}
              </g>
            );
          })}
        </svg>
      ) : (
        <div style={{ height }} />
      )}
      {hover !== null && data[hover] ? (
        <Tooltip
          x={hover * slot + slot / 2}
          y={plot - (data[hover]!.value / max) * (plot - 6)}
          width={width}
        >
          <p className='text-sm font-semibold tabular-nums text-fg'>
            {data[hover]!.value.toLocaleString()}
          </p>
          <p className='mt-0.5 text-fg-subtle'>{data[hover]!.title}</p>
        </Tooltip>
      ) : null}
      <table className='sr-only'>
        <caption>{seriesLabel}</caption>
        <tbody>
          {data.map((column, index) => (
            <tr key={index}>
              <th scope='row'>{column.title}</th>
              <td>{column.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

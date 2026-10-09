import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

/**
 * Building blocks for the redesigned dashboards (shared by the four
 * portals). They only lay out what each portal's dashboard already fetched;
 * they never invent figures.
 */

export type Tone = 'emerald' | 'violet' | 'amber' | 'sky' | 'rose' | 'grey';

const hrefOf = (path: string): string =>
  `${process.env.BASE_URL}${path}`.replace('//', '/');

export function DashboardGrid(props: {
  children: ReactNode;
  className?: string;
}): JSX.Element {
  return (
    <section className={`rd-dash ${props.className ?? ''}`}>
      {props.children}
    </section>
  );
}

export interface HeroAction {
  label: ReactNode;
  path: string;
  icon?: ReactNode;
  ghost?: boolean;
}

export interface HeroChip {
  value: ReactNode;
  label: ReactNode;
  live?: boolean;
  icon?: ReactNode;
}

export function Hero(props: {
  greeting?: ReactNode;
  title: ReactNode;
  lead: ReactNode;
  actions?: HeroAction[];
  chips?: HeroChip[];
}): JSX.Element {
  const { greeting, title, lead, actions = [], chips = [] } = props;

  return (
    <div className='rd-hero'>
      <div className='rd-hero-copy'>
        {greeting && <div className='rd-hero-hi'>{greeting}</div>}
        <h2>{title}</h2>
        <p>{lead}</p>
        {actions.length > 0 && (
          <div className='rd-hero-actions'>
            {actions.map((action, idx) => (
              <Link
                key={idx}
                to={hrefOf(action.path)}
                className={`rd-hero-btn${action.ghost ? ' ghost' : ''}`}
              >
                {action.icon}
                {action.label}
              </Link>
            ))}
          </div>
        )}
      </div>
      {chips.length > 0 && (
        <div className='rd-hero-chips'>
          {chips.map((chip, idx) => (
            <div className='rd-hero-chip' key={idx}>
              {chip.live ? (
                <i className='rd-live-dot' />
              ) : (
                <span className='rd-hero-chip-icon'>{chip.icon}</span>
              )}
              <div>
                <b>{chip.value}</b>
                <span>{chip.label}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export interface InfoRow {
  label: ReactNode;
  value: ReactNode;
  mono?: boolean;
}

export function InfoCard(props: {
  title: ReactNode;
  subtitle?: ReactNode;
  rows: InfoRow[];
}): JSX.Element {
  const rows = props.rows.filter(
    (row) => row.value !== undefined && row.value !== null && row.value !== ''
  );

  return (
    <div className='rd-card rd-info'>
      <h3>{props.title}</h3>
      {props.subtitle && <div className='rd-sub'>{props.subtitle}</div>}
      <dl>
        {rows.map((row, idx) => (
          <div key={idx}>
            <dt>{row.label}</dt>
            <dd className={row.mono ? 'mono' : undefined}>{row.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export interface Stat {
  label: ReactNode;
  value?: number | string | null;
  icon: ReactNode;
  tone: Tone;
  path?: string;
  linkLabel?: ReactNode;
  note?: ReactNode;
}

export function StatGrid(props: { stats: Stat[] }): JSX.Element {
  return (
    <div className={`rd-stats count-${props.stats.length}`}>
      {props.stats.map((stat, idx) => (
        <div className='rd-card rd-stat' key={idx}>
          <div className='rd-stat-head'>
            <span className={`rd-tile t-${stat.tone}`}>{stat.icon}</span>
            <span className='rd-stat-label'>{stat.label}</span>
            {stat.path && (
              <Link to={hrefOf(stat.path)} className='rd-stat-more'>
                {stat.linkLabel ?? 'View'} →
              </Link>
            )}
          </div>
          <div className='rd-stat-value'>
            {stat.value ?? '—'}
            {stat.note && <span className='rd-stat-note'>{stat.note}</span>}
          </div>
        </div>
      ))}
    </div>
  );
}

export interface DonutPart {
  label: ReactNode;
  value: number;
  tone: Tone;
}

/** Ring chart of a total split in parts, with the legend beside it. */
export function Donut(props: {
  title: ReactNode;
  subtitle?: ReactNode;
  total: number;
  totalLabel: ReactNode;
  parts: DonutPart[];
  extra?: { label: ReactNode; value: ReactNode };
}): JSX.Element {
  const { title, subtitle, total, totalLabel, parts, extra } = props;
  const r = 15.9;
  const circumference = 2 * Math.PI * r;
  const sum = parts.reduce((acc, part) => acc + Math.max(part.value, 0), 0);
  let offset = 0;
  const gap = sum > 0 && parts.filter((p) => p.value > 0).length > 1 ? 1.2 : 0;

  return (
    <div className='rd-card rd-donut'>
      <h3>{title}</h3>
      {subtitle && <div className='rd-sub'>{subtitle}</div>}
      <div className='rd-donut-body'>
        <svg viewBox='0 0 42 42' className='rd-donut-svg' role='img'>
          <circle className='rd-donut-track' cx='21' cy='21' r={r} />
          {sum > 0 &&
            parts.map((part, idx) => {
              if (part.value <= 0) {
                return null;
              }
              const length = (part.value / sum) * circumference;
              const dash = Math.max(length - gap, 0.01);
              const node = (
                <circle
                  key={idx}
                  className={`rd-donut-part t-${part.tone}`}
                  cx='21'
                  cy='21'
                  r={r}
                  strokeDasharray={`${dash} ${circumference - dash}`}
                  strokeDashoffset={-offset}
                  transform='rotate(-90 21 21)'
                />
              );
              offset += length;

              return node;
            })}
          <text x='21' y='22' className='rd-donut-total'>
            {total}
          </text>
          <text x='21' y='27.5' className='rd-donut-caption'>
            {totalLabel}
          </text>
        </svg>
        <div className='rd-legend'>
          {parts.map((part, idx) => (
            <div key={idx}>
              <i className={`t-${part.tone}`} />
              <span>{part.label}</span>
              <b>{part.value}</b>
            </div>
          ))}
          {extra && (
            <div>
              <i className='t-grey' />
              <span>{extra.label}</span>
              <b>{extra.value}</b>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const AVATAR_TONES: Tone[] = ['emerald', 'violet', 'amber', 'sky', 'rose'];

export function Avatar(props: { name: string }): JSX.Element {
  const name = props.name || '?';
  const words = name.split(/\s+/).filter(Boolean);
  const text =
    words.length > 1
      ? (words[0][0] + words[1][0]).toUpperCase()
      : name.slice(0, 2).toUpperCase();
  let hash = 0;
  for (const ch of name) {
    hash = (hash * 31 + ch.charCodeAt(0)) | 0;
  }
  const tone = AVATAR_TONES[Math.abs(hash) % AVATAR_TONES.length];

  return <span className={`rd-avatar g-${tone}`}>{text}</span>;
}

export function Pill(props: { tone: Tone; children: ReactNode }): JSX.Element {
  return (
    <span className={`rd-pill t-${props.tone}`}>
      <i />
      {props.children}
    </span>
  );
}

export function Who(props: {
  name: string;
  detail?: ReactNode;
  mono?: boolean;
}): JSX.Element {
  return (
    <div className='rd-who'>
      <Avatar name={props.name} />
      <div>
        <b>{props.name}</b>
        {props.detail && (
          <span className={props.mono ? 'mono' : undefined}>
            {props.detail}
          </span>
        )}
      </div>
    </div>
  );
}

export interface Column<T> {
  label: ReactNode;
  render: (row: T) => ReactNode;
  align?: 'start' | 'end';
}

export function RecentTable<T>(props: {
  title: ReactNode;
  subtitle?: ReactNode;
  rows: T[];
  columns: Column<T>[];
  seeAll?: { label: ReactNode; path: string };
  empty: ReactNode;
  action?: ReactNode;
}): JSX.Element {
  const { title, subtitle, rows, columns, seeAll, empty, action } = props;

  return (
    <div className='rd-card rd-recent'>
      <div className='rd-recent-head'>
        <div>
          <h3>{title}</h3>
          {subtitle && <div className='rd-sub'>{subtitle}</div>}
        </div>
        <div className='rd-recent-actions'>
          {action}
          {seeAll && (
            <Link to={hrefOf(seeAll.path)} className='rd-btn'>
              {seeAll.label}
            </Link>
          )}
        </div>
      </div>
      <div className='rd-table-wrap'>
        <table className='rd-table'>
          <thead>
            <tr>
              {columns.map((column, idx) => (
                <th
                  key={idx}
                  className={column.align === 'end' ? 'end' : undefined}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr key={idx}>
                {columns.map((column, cidx) => (
                  <td
                    key={cidx}
                    className={column.align === 'end' ? 'end' : undefined}
                  >
                    {column.render(row)}
                  </td>
                ))}
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={columns.length} className='rd-empty'>
                  {empty}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

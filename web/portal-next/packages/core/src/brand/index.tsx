import type { SVGProps } from 'react';

import { cn } from '../lib/cn';
import gatewayUrl from './gateway-a.svg';
import lockupDark from './tervian-one-dark.svg?raw';
import lockupLight from './tervian-one-light.svg?raw';

/**
 * Tervian One brand assets, from the Tervian One Brand Kit v1.0.
 *
 * The lockups are the kit's own SVG artwork, inlined unchanged except that the
 * dark variant's Ink backing rectangle is removed so it sits on any dark
 * surface. The Tervian wordmark is custom vector artwork and must never be
 * re-typeset — always use these components, never text styled to look like it.
 */

export const TERVIAN_ONE = 'Tervian One';

/** The "Tervian ONE" lockup. `onDark` for Ink or other dark backgrounds. */
export function TervianOneLockup({
  onDark = false,
  className,
}: {
  onDark?: boolean;
  className?: string;
}): React.JSX.Element {
  return (
    <span
      role='img'
      aria-label={TERVIAN_ONE}
      className={cn(
        'inline-block shrink-0 [&>svg]:h-full [&>svg]:w-auto',
        className
      )}
      dangerouslySetInnerHTML={{ __html: onDark ? lockupDark : lockupLight }}
    />
  );
}

/** Gateway A, the master symbol, in the Emerald -> Signal gradient. */
export function GatewayMark({
  className,
}: {
  className?: string;
}): React.JSX.Element {
  return (
    <img
      src={gatewayUrl}
      alt=''
      aria-hidden
      className={cn('shrink-0', className)}
    />
  );
}

/**
 * Tervian functional product icons (24px grid, 1.8 stroke). They are UI and
 * navigation assets for the product areas, not alternate logos.
 */
function productIcon(paths: React.ReactNode, name: string) {
  function Icon(props: SVGProps<SVGSVGElement>): React.JSX.Element {
    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth={1.8}
        strokeLinecap='round'
        strokeLinejoin='round'
        aria-hidden
        {...props}
      >
        {paths}
      </svg>
    );
  }
  Icon.displayName = name;
  return Icon;
}

export const TervianVoiceIcon = productIcon(
  <path d='M3 12h3l2-5 3 10 3-8 2 5h5' />,
  'TervianVoiceIcon'
);
export const TervianConnectIcon = productIcon(
  <>
    <rect x='3' y='9' width='4' height='6' rx='0.8' />
    <rect x='17' y='9' width='4' height='6' rx='0.8' />
    <path d='M7 12h10' />
    <path d='M10 8l2-2 2 2' />
    <path d='M10 16l2 2 2-2' />
  </>,
  'TervianConnectIcon'
);
export const TervianContactIcon = productIcon(
  <>
    <circle cx='9' cy='8' r='3' />
    <path d='M4 18c.8-3.2 2.5-5 5-5s4.2 1.8 5 5' />
    <path d='M15 8h3l2 2v4l-2 2h-3' />
  </>,
  'TervianContactIcon'
);
export const TervianMessagingIcon = productIcon(
  <>
    <path d='M4 5h16v11H9l-5 3v-3H4z' />
    <path d='M8 9h8' />
    <path d='M8 12h6' />
  </>,
  'TervianMessagingIcon'
);
export const TervianAiIcon = productIcon(
  <>
    <path d='M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z' />
    <path d='M18 15l.8 2.2L21 18l-2.2.8L18 21l-.8-2.2L15 18l2.2-.8z' />
    <circle cx='5' cy='17' r='1' />
  </>,
  'TervianAiIcon'
);
export const TervianBillingIcon = productIcon(
  <>
    <path d='M6 3h12v18l-2-1.5L14 21l-2-1.5L10 21l-2-1.5L6 21z' />
    <path d='M9 8h6' />
    <path d='M9 12h6' />
    <path d='M9 16h4' />
  </>,
  'TervianBillingIcon'
);
export const TervianEdgeIcon = productIcon(
  <>
    <path d='M6 4v16' />
    <path d='M18 4v16' />
    <path d='M3 9h11' />
    <path d='M11 6l3 3-3 3' />
    <path d='M21 15H10' />
    <path d='M13 12l-3 3 3 3' />
  </>,
  'TervianEdgeIcon'
);
export const TervianApiIcon = productIcon(
  <>
    <path d='M8 5L3 12l5 7' />
    <path d='M16 5l5 7-5 7' />
    <circle cx='12' cy='8' r='1' />
    <circle cx='12' cy='12' r='1' />
    <circle cx='12' cy='16' r='1' />
  </>,
  'TervianApiIcon'
);
export const TervianConsoleIcon = productIcon(
  <>
    <rect x='3' y='4' width='18' height='16' rx='1' />
    <path d='M3 9h18' />
    <path d='M8 9v11' />
    <path d='M11 13h7' />
    <path d='M11 16h5' />
  </>,
  'TervianConsoleIcon'
);

/** Product accent colours, for orientation only — labels carry the meaning. */
export const TERVIAN_PRODUCT_COLORS = {
  voice: '#0B7E66',
  connect: '#2B6DE0',
  contact: '#D95D4F',
  messaging: '#7453C6',
  ai: '#84A52D',
  billing: '#C9811A',
  edge: '#0097A7',
  api: '#C1467C',
  console: '#59636F',
} as const;

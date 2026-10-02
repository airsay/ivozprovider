import { Box } from '@mui/material';

import TervianOneLogo from '../TervianOneLogo';
import { TERVIAN_ONE, useBranding } from './Branding';

type CreditsMode = 'tervian' | 'tervian-unless-white-label' | 'reseller';

/**
 * Which credits each portal's About dialog shows:
 *  - brand (reseller) portal: always the Tervian One credit;
 *  - client and user portals: the reseller's product name only;
 *  - platform portal: the Tervian One credit unless white-labelled.
 */
const MODES: Record<string, CreditsMode> = {
  '/platform/': 'tervian-unless-white-label',
  '/brand/': 'tervian',
  '/client/': 'reseller',
  '/user/': 'reseller',
};

export default function AboutCredits(): JSX.Element | null {
  const { whiteLabel, productName } = useBranding();
  const mode =
    MODES[process.env.BASE_URL ?? '/'] ?? 'tervian-unless-white-label';
  const year = new Date().getFullYear();

  if (mode === 'reseller') {
    return (
      <p>
        ©{year} {productName} | All rights reserved
      </p>
    );
  }

  if (mode === 'tervian-unless-white-label' && whiteLabel) {
    return null;
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1,
        }}
        className='logo'
      >
        Powered by <TervianOneLogo height={18} />
      </Box>
      <p>
        ©{year} {TERVIAN_ONE} | All rights reserved
      </p>
    </>
  );
}

import { Box } from '@mui/material';

import TervianOneLogo from '../TervianOneLogo';
import { useBranding } from './Branding';

/**
 * The Tervian One credit in the About dialog. Hidden when a reseller or
 * the platform admin has white-labelled the portal.
 */
export default function AboutCredits(): JSX.Element | null {
  const { whiteLabel } = useBranding();

  if (whiteLabel) {
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
      <p>©{new Date().getFullYear()} Tervian One | All rights reserved</p>
    </>
  );
}

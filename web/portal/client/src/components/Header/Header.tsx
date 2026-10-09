import Avatar from '@irontec/ivoz-ui/components/layout/Header/Avatar';
import Breadcrumbs from '@irontec/ivoz-ui/components/layout/Header/Breadcrumbs';
import {
  LightButton,
  SolidButton,
} from '@irontec/ivoz-ui/components/shared/Button/Button.styles';
import { RouteMap } from '@irontec/ivoz-ui/router/routeMapParser';
import _ from '@irontec/ivoz-ui/services/translations/translate';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import MenuIcon from '@mui/icons-material/Menu';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  MenuItem,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useState } from 'react';
import { useStoreActions, useStoreState } from 'store';

import i18n from '../../i18n';
import { AboutCredits } from '../Branding';
import { JumpTo, LanguageSwitcher, ThemeToggle, UserChip } from '../Redesign';

export interface HeaderProps {
  routeMap: RouteMap;
  className?: string;
}

/**
 * The ivoz-ui header with a Tervian One About dialog in place of the
 * ivoz-ui one.
 */
export default function Header(props: HeaderProps): JSX.Element {
  const { routeMap, className } = props;
  const [open, setOpen] = useState(false);
  const resetAuth = useStoreActions((actions) => actions.auth.resetAll);
  const toggleVisibility = useStoreActions(
    (actions) => actions.menu.toggleVisibility
  );
  const logo = useStoreState((state) => state.theme.logo);
  const version = useStoreState((state) => state.aboutInfo.version);
  const lastUpdated = useStoreState((state) => state.aboutInfo.lastUpdated);
  const commit = useStoreState((state) => state.aboutInfo.commit);

  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Box className={className}>
      <Box className='start' data-empty-title={i18n.t('Dashboard')}>
        <Breadcrumbs desktop={desktop} routeMap={routeMap} />
      </Box>

      <Box className='end'>
        {desktop && (
          <>
            <JumpTo routeMap={routeMap} />
            <ThemeToggle />
            <LanguageSwitcher />
            <UserChip role={_('Client admin')}>
              <Avatar>
                <MenuItem key='about' onClick={() => setOpen(true)}>
                  <Typography textAlign='center'>{_('About')}</Typography>
                </MenuItem>
                <MenuItem key='logout' onClick={() => resetAuth()}>
                  <Typography textAlign='center'>{_('Logout')}</Typography>
                </MenuItem>
              </Avatar>
            </UserChip>
          </>
        )}

        {!desktop && (
          <>
            <LanguageSwitcher />
            <ThemeToggle />
            <LightButton onClick={() => toggleVisibility()}>
              <MenuIcon />
            </LightButton>
          </>
        )}

        {open && (
          <Dialog
            open={open}
            onClose={() => setOpen(false)}
            keepMounted
            aria-labelledby='dialog-about'
            aria-describedby='dialog-about'
          >
            <CloseRoundedIcon
              className='close-icon'
              onClick={() => setOpen(false)}
            />
            <DialogContent className='dialog-about'>
              <img src={logo || './logo.svg'} className='logo' />
              <p>
                {_('Version')}: {version} ({commit}) <br />
                {_('Last update')}: {lastUpdated}
              </p>
              <AboutCredits />
            </DialogContent>
            <DialogActions>
              <SolidButton
                onClick={() => setOpen(false)}
                sx={{ width: '100%' }}
              >
                {_('ACCEPT')}
              </SolidButton>
            </DialogActions>
          </Dialog>
        )}
      </Box>
    </Box>
  );
}

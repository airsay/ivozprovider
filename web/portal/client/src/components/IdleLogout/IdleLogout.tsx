import _ from '@irontec/ivoz-ui/services/translations/translate';
import { Alert, Snackbar } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useStoreActions, useStoreState } from 'store';

import {
  clearLastActivity,
  idleMinutes,
  isIdle,
  readLastActivity,
  sessionEndedElsewhere,
  writeLastActivity,
} from './idleLogout';

const ACTIVITY_EVENTS = [
  'mousedown',
  'mousemove',
  'keydown',
  'scroll',
  'touchstart',
  'wheel',
];
/** How often the idle check runs, and the most often activity is stored. */
const CHECK_MS = 15_000;
const WRITE_THROTTLE_MS = 5_000;

interface IdleLogoutProps {
  /** The portal's localStorage prefix, e.g. "IP-brand-". */
  storagePrefix: string;
}

/**
 * Signs the user out after a period without activity. Mounted once in App.
 *
 * This is the portal side only: it clears the tokens from this browser. The
 * API still accepts them until they expire, so pair it with a short refresh
 * token lifetime on the server (see UPGRADING-TERVIAN.md, "Session length").
 */
export default function IdleLogout(props: IdleLogoutProps): JSX.Element {
  const { storagePrefix } = props;
  const loggedIn = useStoreState((state) => state.auth.loggedIn);
  const resetAuth = useStoreActions((actions) => actions.auth.resetAll);
  const [signedOut, setSignedOut] = useState(false);
  const lastWrite = useRef(0);
  const wasLoggedIn = useRef(false);

  // The portals have no Vite client typings, hence the cast.
  const env = (import.meta as unknown as { env?: Record<string, unknown> }).env;
  const minutes = idleMinutes(env?.VITE_IDLE_TIMEOUT_MINUTES);
  const timeoutMs = minutes * 60_000;

  useEffect(() => {
    if (!loggedIn || timeoutMs <= 0) {
      if (wasLoggedIn.current && !loggedIn) {
        clearLastActivity(localStorage, storagePrefix);
      }
      wasLoggedIn.current = loggedIn;

      return;
    }

    const signOut = (): void => {
      clearLastActivity(localStorage, storagePrefix);
      setSignedOut(true);
      resetAuth();
    };

    const check = (): boolean => {
      // Signed out in another tab (idle or by hand): follow it, quietly.
      if (sessionEndedElsewhere(localStorage, storagePrefix)) {
        resetAuth();

        return true;
      }
      const last = readLastActivity(localStorage, storagePrefix);
      if (isIdle(last, Date.now(), timeoutMs)) {
        signOut();

        return true;
      }

      return false;
    };

    // A stored time from before this page load decides first: a session
    // left idle (browser closed, laptop asleep) ends when the user returns.
    // No stored time means a fresh login, so the clock starts now.
    if (!wasLoggedIn.current) {
      wasLoggedIn.current = true;
      if (check()) {
        return;
      }
      if (readLastActivity(localStorage, storagePrefix) === null) {
        writeLastActivity(localStorage, storagePrefix, Date.now());
      }
    }

    const onActivity = (): void => {
      const now = Date.now();
      if (now - lastWrite.current < WRITE_THROTTLE_MS) {
        return;
      }
      // Activity after the timeout has already passed must not revive the
      // session (e.g. the first mouse move after waking the computer).
      if (check()) {
        return;
      }
      lastWrite.current = now;
      writeLastActivity(localStorage, storagePrefix, now);
    };
    const onVisible = (): void => {
      if (document.visibilityState === 'visible') {
        check();
      }
    };

    const timer = window.setInterval(check, CHECK_MS);
    ACTIVITY_EVENTS.forEach((name) =>
      window.addEventListener(name, onActivity, { passive: true })
    );
    document.addEventListener('visibilitychange', onVisible);

    return () => {
      window.clearInterval(timer);
      ACTIVITY_EVENTS.forEach((name) =>
        window.removeEventListener(name, onActivity)
      );
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, [loggedIn, timeoutMs, storagePrefix, resetAuth]);

  return (
    <Snackbar
      open={signedOut && !loggedIn}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      onClose={(_event, reason) => {
        if (reason !== 'clickaway') {
          setSignedOut(false);
        }
      }}
    >
      <Alert severity='info' onClose={() => setSignedOut(false)}>
        {_('You were signed out after {{minutes}} minutes without activity.', {
          minutes,
        })}
      </Alert>
    </Snackbar>
  );
}

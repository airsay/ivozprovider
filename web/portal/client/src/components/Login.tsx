import { Login as DefaultLogin } from '@irontec/ivoz-ui/components';
import { EntityValidator } from '@irontec/ivoz-ui/entities/EntityInterface';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useStoreActions, useStoreState } from 'store';

import { AuthLayout } from './Redesign';

interface LoginProps {
  validator?: EntityValidator;
  target?: string;
  username?: string;
  token?: string;
}

export default function Login(props: LoginProps): JSX.Element | null {
  const { validator, target, username, token } = props;

  const location = useLocation();
  const navigate = useNavigate();

  const loggedIn = useStoreState((state) => state.auth.loggedIn);
  const aboutMe = useStoreState((state) => state.clientSession.aboutMe.profile);

  const exchangeToken = useStoreActions(
    (actions) => actions.auth.exchangeToken
  );

  const loadProfile = useStoreActions(
    (actions) => actions.clientSession.aboutMe.load
  );

  useEffect(() => {
    if ((target || username) && token) {
      const payload: Record<string, string> = { token };

      if (target) {
        payload.clientId = target;
      }

      if (username) {
        payload.username = username;
      }

      exchangeToken(payload)
        .then((success: boolean) => {
          if (!success) {
            // eslint-disable-next-line no-console
            console.error('Unable to echange token');

            return;
          }

          navigate(`${location.pathname}`, {
            replace: true,
            preventScrollReset: true,
          });
        })
        .catch((err: string) => {
          // eslint-disable-next-line no-console
          console.error(err);
        });

      return;
    }
  }, [target, username, token, exchangeToken, navigate, location.pathname]);

  useEffect(() => {
    if (target && token) {
      return;
    }

    if (loggedIn && !aboutMe) {
      loadProfile();
    }
  }, [target, token, loggedIn, aboutMe, loadProfile]);

  if (loggedIn || (target && token)) {
    return null;
  }

  return (
    <AuthLayout
      portal='client portal'
      headline='Your phone system, in one place.'
      lead='Users, extensions, numbers and call routing for your company.'
      highlights={[
        { title: 'Users', detail: 'and their terminals' },
        { title: 'Numbers', detail: 'DDIs and extensions' },
        { title: 'Routing', detail: 'IVRs, queues, hunt groups' },
      ]}
    >
      <DefaultLogin validator={validator} />
    </AuthLayout>
  );
}

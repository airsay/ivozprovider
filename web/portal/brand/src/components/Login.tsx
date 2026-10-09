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
        payload.brandId = target;
      }

      if (username) {
        payload.username = username;
      }

      exchangeToken(payload)
        .then((success: boolean) => {
          if (!success) {
            console.error('Unable to exchange token');

            return;
          }

          navigate(`${location.pathname}`, {
            replace: true,
            preventScrollReset: true,
          });
        })
        .catch((err: string) => {
          console.error(err);
        });

      return;
    }
  }, [target, token, exchangeToken, navigate, location.pathname]);

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
      portal='brand portal'
      headline='Run your voice network from one calm place.'
      lead='Clients, carriers, numbers and live calls across your brand.'
      highlights={[
        { title: 'Clients', detail: 'vPBX, retail, residential' },
        { title: 'Carriers', detail: '& DDI providers' },
        { title: 'Live calls', detail: 'in real time' },
      ]}
    >
      <DefaultLogin validator={validator} />
    </AuthLayout>
  );
}

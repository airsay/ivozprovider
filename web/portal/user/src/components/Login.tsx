import { Login as DefaultLogin } from '@irontec/ivoz-ui/components';
import { EntityValidator } from '@irontec/ivoz-ui/entities/EntityInterface';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useStoreActions, useStoreState } from 'store';

import { AuthLayout } from './Redesign';

interface LoginProps {
  validator?: EntityValidator;
  email?: string;
  token?: string;
}

export default function Login(props: LoginProps): JSX.Element | null {
  const { validator, email, token } = props;
  const location = useLocation();
  const navigate = useNavigate();
  const loggedIn = useStoreState((state) => state.auth.loggedIn);
  const exchangeToken = useStoreActions(
    (actions) => actions.auth.exchangeToken
  );

  useEffect(() => {
    if (email && token) {
      exchangeToken({
        username: email,
        token: token ?? '',
      })
        .then((success: boolean) => {
          if (!success) {
            console.error('Unable to echange token');

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
  }, [email, token, exchangeToken, navigate, location.pathname]);

  if (loggedIn || (email && token)) {
    return null;
  }

  const marshaller = (values: { username: string; password: string }) => {
    return {
      email: values.username,
      password: values.password,
    };
  };

  return (
    <AuthLayout
      portal='user portal'
      headline='Your calls, your way.'
      lead='Call forwarding, voicemail and your call history.'
      highlights={[
        { title: 'Forwarding', detail: 'busy, no answer, always' },
        { title: 'Voicemail', detail: 'and faxes' },
        { title: 'Calls', detail: 'your recent history' },
      ]}
    >
      <DefaultLogin validator={validator} marshaller={marshaller} />
    </AuthLayout>
  );
}

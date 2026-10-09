import { Login as DefaultLogin } from '@irontec/ivoz-ui/components';
import { EntityValidator } from '@irontec/ivoz-ui/entities/EntityInterface';
import { useEffect } from 'react';
import { useStoreActions, useStoreState } from 'store';

import { AuthLayout } from './Redesign';

interface LoginProps {
  validator?: EntityValidator;
}

export default function Login(props: LoginProps): JSX.Element | null {
  const { validator } = props;

  const loggedIn = useStoreState((state) => state.auth.loggedIn);
  const aboutMe = useStoreState((state) => state.clientSession.aboutMe.profile);

  const loadProfile = useStoreActions(
    (actions) => actions.clientSession.aboutMe.load
  );

  useEffect(() => {
    if (loggedIn && !aboutMe) {
      loadProfile();
    }
  }, [loggedIn, aboutMe, loadProfile]);

  if (loggedIn) {
    return null;
  }

  return (
    <AuthLayout
      portal='platform portal'
      headline='Every brand on the platform, from one place.'
      lead='Brands, operators, infrastructure and live calls.'
      highlights={[
        { title: 'Brands', detail: 'and their operators' },
        { title: 'Infrastructure', detail: 'proxies, media, servers' },
        { title: 'Live calls', detail: 'in real time' },
      ]}
    >
      <DefaultLogin validator={validator} />
    </AuthLayout>
  );
}

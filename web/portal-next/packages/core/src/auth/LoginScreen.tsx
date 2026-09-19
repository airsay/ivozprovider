import { useMutation } from '@tanstack/react-query';
import { LogIn } from 'lucide-react';
import { type FormEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ApiError } from '../api/errors';
import { usePortal } from '../runtime/PortalProvider';
import { Alert, Button, Card, Field, Input } from '../ui';

/**
 * The sign-in screen.
 *
 * It is already branded: `/my/theme` is anonymous and resolved by Host, so the
 * tenant's colour and product name are applied before anyone authenticates.
 */
export function LoginScreen(): React.JSX.Element {
  const { api, config, theme } = usePortal();
  const { t } = useTranslation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = useMutation({
    mutationFn: () => api.login({ username, password }),
  });

  const isEmail = config.usernameField === 'email';
  const productName = theme?.productName ?? config.fallbackProductName;

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();
    login.mutate();
  };

  return (
    <main className='flex min-h-dvh items-center justify-center bg-bg px-4 py-10'>
      <div className='w-full max-w-sm'>
        <div className='mb-6 flex flex-col items-center gap-3 text-center'>
          {theme?.logo ? (
            <img
              src={`${config.apiBaseUrl}${theme.logo}`}
              alt=''
              className='h-12 w-auto object-contain'
            />
          ) : (
            <div className='rounded-[--radius-surface] bg-brand p-3'>
              <LogIn className='size-6 text-brand-contrast' aria-hidden />
            </div>
          )}
          <div>
            <h1 className='text-lg font-semibold text-fg'>{productName}</h1>
            <p className='text-sm text-fg-muted'>{t('Sign in to continue')}</p>
          </div>
        </div>

        <Card className='p-6'>
          <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <Field
              id='login-username'
              label={isEmail ? t('Email') : t('Username')}
              required
            >
              <Input
                id='login-username'
                name={isEmail ? 'email' : 'username'}
                type={isEmail ? 'email' : 'text'}
                autoComplete='username'
                autoFocus
                required
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </Field>

            <Field id='login-password' label={t('Password')} required>
              <Input
                id='login-password'
                name='password'
                type='password'
                autoComplete='current-password'
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </Field>

            {login.isError ? (
              <Alert tone='danger' title={t('Could not sign in')}>
                {login.error instanceof ApiError
                  ? login.error.message
                  : t('Something went wrong. Try again.')}
              </Alert>
            ) : null}

            <Button
              type='submit'
              variant='primary'
              size='lg'
              loading={login.isPending}
            >
              {t('Sign in')}
            </Button>
          </form>
        </Card>
      </div>
    </main>
  );
}

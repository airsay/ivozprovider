import { useMutation } from '@tanstack/react-query';
import { type FormEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ApiError } from '../api/errors';
import { GatewayMark, TERVIAN_ONE, TervianOneLockup } from '../brand';
import { tenantBrand } from '../lib/theme';
import { usePortal } from '../runtime/PortalProvider';
import { Alert, Button, Field, Input } from '../ui';

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
  // Tervian One artwork unless a tenant brand (uploaded logo or own name) is set.
  const {
    custom: customBrand,
    productName,
    logoUrl,
  } = tenantBrand(theme, {
    defaultProductName: TERVIAN_ONE,
    fallbackProductName: config.fallbackProductName,
    apiBaseUrl: config.apiBaseUrl,
  });

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();
    login.mutate();
  };

  return (
    <main className='grid min-h-dvh bg-bg lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]'>
      <section className='bg-brand-panel relative hidden overflow-hidden lg:flex lg:flex-col lg:justify-between lg:p-12'>
        <div className='bg-grid-faint pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top_left,black_20%,transparent_75%)]' />
        <div className='relative flex items-center gap-3 text-white'>
          {!customBrand ? (
            <TervianOneLockup onDark className='h-10' />
          ) : logoUrl ? (
            <img
              src={logoUrl}
              alt=''
              className='h-10 w-auto rounded-(--radius-control) bg-white/95 p-1.5 object-contain'
            />
          ) : (
            <span className='grid size-10 place-items-center rounded-(--radius-control) bg-white/15 text-lg font-semibold ring-1 ring-inset ring-white/25 backdrop-blur'>
              {productName.slice(0, 1).toUpperCase()}
            </span>
          )}
          {customBrand ? (
            <span className='text-lg font-semibold tracking-tight'>
              {productName}
            </span>
          ) : null}
        </div>

        <div className='relative max-w-md text-white'>
          <h2 className='text-4xl font-semibold leading-tight tracking-tight'>
            {t(config.loginTagline?.title ?? 'Welcome to {{product}}', {
              product: productName,
            })}
          </h2>
          {config.loginTagline?.body ? (
            <p className='mt-4 text-base text-white/80'>
              {t(config.loginTagline.body)}
            </p>
          ) : null}
        </div>

        <p className='relative text-sm text-white/55'>
          {customBrand
            ? productName
            : t('Your brand. Your customers. Your platform.')}
        </p>
      </section>

      <section className='flex items-center justify-center px-6 py-12 sm:px-12'>
        <div className='w-full max-w-sm'>
          <div className='mb-8 flex items-center gap-3 lg:hidden'>
            {!customBrand ? (
              <GatewayMark className='h-10 w-auto' />
            ) : logoUrl ? (
              <img
                src={logoUrl}
                alt=''
                className='h-10 w-auto object-contain'
              />
            ) : (
              <span className='bg-brand-gradient grid size-10 place-items-center rounded-(--radius-control) text-lg font-semibold text-white shadow-(--shadow-button)'>
                {productName.slice(0, 1).toUpperCase()}
              </span>
            )}
            {customBrand ? (
              <span className='text-lg font-semibold tracking-tight text-fg'>
                {productName}
              </span>
            ) : null}
          </div>

          <h1 className='text-2xl font-semibold tracking-tight text-fg'>
            {t('Welcome back')}
          </h1>
          <p className='mt-1.5 text-sm text-fg-muted'>
            {t('Sign in to continue')}
          </p>

          <form onSubmit={handleSubmit} className='mt-8 flex flex-col gap-5'>
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
                className='h-10'
                placeholder={isEmail ? 'name@company.com' : undefined}
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
                className='h-10'
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
              className='mt-1 h-10 text-sm'
              loading={login.isPending}
            >
              {t('Sign in')}
            </Button>
          </form>
        </div>
      </section>
    </main>
  );
}

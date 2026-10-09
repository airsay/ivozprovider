import _ from '@irontec/ivoz-ui/services/translations/translate';

import { useBranding } from '../Branding';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';

export interface AuthHighlight {
  title: string;
  detail: string;
}

interface AuthLayoutProps {
  portal: string;
  headline: string;
  lead: string;
  highlights: AuthHighlight[];
  children: JSX.Element;
}

/**
 * Sign-in page frame: a brand-coloured panel on the left, the ivoz-ui login
 * form on the right. The panel follows the portal colour and product name,
 * so white-labelled portals show their own name.
 */
export default function AuthLayout(props: AuthLayoutProps): JSX.Element {
  const { portal, headline, lead, highlights, children } = props;
  const branding = useBranding();

  return (
    <div className='rd-auth'>
      <aside className='rd-auth-hero'>
        <div className='product'>{branding.productName}</div>
        <div className='copy'>
          <h1>{_(headline)}</h1>
          <p>{_(lead)}</p>
          <div className='highlights'>
            {highlights.map((item) => (
              <div className='highlight' key={item.title}>
                <strong>{_(item.title)}</strong>
                <span>{_(item.detail)}</span>
              </div>
            ))}
          </div>
        </div>
      </aside>
      <div className='rd-auth-main'>
        <div className='rd-auth-toggle'>
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
        {children}
        <div className='rd-auth-caption'>
          {branding.productName} · {_(portal)}
        </div>
      </div>
    </div>
  );
}

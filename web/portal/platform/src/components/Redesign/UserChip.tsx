import { MouseEvent } from 'react';
import { useStoreState } from 'store';

function usernameFromToken(token: string | null | undefined): string {
  try {
    const payload = token?.split('.')[1];
    if (!payload) {
      return '';
    }
    const json = window.atob(payload.replace(/-/g, '+').replace(/_/g, '/'));

    return (JSON.parse(json) as { username?: string }).username ?? '';
  } catch {
    return '';
  }
}

/** Username of the signed-in account, from the session token. */
export function useUsername(): string {
  const token = useStoreState((state) => state.auth.token);

  return usernameFromToken(token);
}

interface UserChipProps {
  role: JSX.Element | string;
  children: JSX.Element;
}

/**
 * The ivoz-ui avatar (with its account menu) plus the signed-in username
 * and the portal role. Clicking the name opens the same menu.
 */
export default function UserChip(props: UserChipProps): JSX.Element {
  const { role, children } = props;
  const username = useUsername();

  const openMenu = (event: MouseEvent<HTMLElement>) => {
    event.currentTarget.parentElement
      ?.querySelector<HTMLElement>('.account')
      ?.click();
  };

  return (
    <div className='rd-user-chip'>
      {children}
      <button type='button' className='rd-user-text' onClick={openMenu}>
        <span className='name'>{username}</span>
        <span className='role'>{role}</span>
      </button>
    </div>
  );
}

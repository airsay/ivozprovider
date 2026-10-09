import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';
import { Menu, MenuItem, Tooltip } from '@mui/material';
import { MouseEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useStoreState } from 'store';

/**
 * Language picker for the top bar and the sign-in page. It lists the
 * portal's languages (translations/languages.ts) and, like the ivoz-ui
 * settings menu it replaces, reloads the page after switching so every
 * entity label is rebuilt in the new language. i18next remembers the
 * choice in this browser.
 */
export default function LanguageSwitcher(): JSX.Element | null {
  const { i18n } = useTranslation();
  const languages = useStoreState((state) => state.i18n.languages);
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);

  if (!languages?.length) {
    return null;
  }

  const current = (i18n.language || 'en').substring(0, 2).toLowerCase();
  const isCurrent = (locale: string) =>
    locale.substring(0, 2).toLowerCase() === current;
  const currentName =
    languages.find((lang) => isCurrent(lang.locale))?.name ?? current;

  const choose = (locale: string) => {
    setAnchor(null);
    if (isCurrent(locale)) {
      return;
    }
    i18n.changeLanguage(locale).finally(() => window.location.reload());
  };

  return (
    <>
      <Tooltip title={currentName}>
        <button
          type='button'
          className='rd-lang-trigger'
          aria-haspopup='menu'
          aria-expanded={Boolean(anchor)}
          aria-label={`Language: ${currentName}`}
          onClick={(event: MouseEvent<HTMLElement>) =>
            setAnchor(event.currentTarget)
          }
        >
          <LanguageRoundedIcon />
          <span>{current.toUpperCase()}</span>
        </button>
      </Tooltip>
      <Menu
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={() => setAnchor(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        className='rd-lang-menu'
      >
        {languages.map((lang) => (
          <MenuItem
            key={lang.locale}
            selected={isCurrent(lang.locale)}
            onClick={() => choose(lang.locale)}
          >
            <span className='code'>
              {lang.locale.substring(0, 2).toUpperCase()}
            </span>
            <span className='name'>{lang.name}</span>
            {isCurrent(lang.locale) && <CheckRoundedIcon className='check' />}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

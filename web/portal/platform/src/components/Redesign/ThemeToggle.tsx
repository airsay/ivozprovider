import _ from '@irontec/ivoz-ui/services/translations/translate';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import { Tooltip } from '@mui/material';

import { ColorMode, setColorMode, useColorMode } from './colorMode';

const OPTIONS: Array<{ mode: ColorMode; icon: JSX.Element; label: string }> = [
  { mode: 'light', icon: <LightModeOutlinedIcon />, label: 'Light mode' },
  { mode: 'dark', icon: <DarkModeOutlinedIcon />, label: 'Dark mode' },
];

/** The sun / moon switch in the top bar. */
export default function ThemeToggle(): JSX.Element {
  const mode = useColorMode();

  return (
    <div className='rd-theme-toggle' role='group' aria-label='Colour mode'>
      {OPTIONS.map((option) => (
        <Tooltip key={option.mode} title={_(option.label)}>
          <button
            type='button'
            aria-pressed={mode === option.mode}
            aria-label={option.label}
            className={mode === option.mode ? 'active' : ''}
            onClick={() => setColorMode(option.mode)}
          >
            {option.icon}
          </button>
        </Tooltip>
      ))}
    </div>
  );
}

import './redesign.css';

import { initColorMode } from './colorMode';
import { tagSolidButtons } from './solidButtons';

export { default as AuthLayout } from './AuthLayout';
export * from './colorMode';
export * from './DashboardKit';
export { default as JumpTo } from './JumpTo';
export { default as LanguageSwitcher } from './LanguageSwitcher';
export type { ActiveCallsSummary } from './LiveCallsCard';
export { default as LiveCallsCard } from './LiveCallsCard';
export type { SidebarOrg, SidebarSection } from './Sidebar';
export { default as Sidebar } from './Sidebar';
export { default as ThemeToggle } from './ThemeToggle';
export { default as useMyResource } from './useMyResource';
export { default as UserChip, useUsername } from './UserChip';

/**
 * Turns the redesign on (html.rd) and applies the saved light / dark mode.
 * Called from index.tsx before the first render.
 */
export function initRedesign(): void {
  document.documentElement.classList.add('rd');
  initColorMode();
  tagSolidButtons();
}

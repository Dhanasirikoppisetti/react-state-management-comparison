import { useUI } from '../store/storeHooks';

export default function ThemeSwitcher() {
  const { theme, setTheme } = useUI();
  const isDark = theme === 'dark';

  return (
    <button
      className="theme-switcher"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={isDark ? 'Switch to Light Mode ☀️' : 'Switch to Dark Mode 🌙'}
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  );
}

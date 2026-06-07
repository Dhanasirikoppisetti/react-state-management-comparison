import useAppStore from '../store/useAppStore';

// Selector: only re-renders when theme changes
export default function ThemeSwitcher() {
  const theme = useAppStore(state => state.ui.theme);
  const setTheme = useAppStore(state => state.setTheme);
  const isDark = theme === 'dark';

  return (
    <button
      className="theme-switcher"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  );
}

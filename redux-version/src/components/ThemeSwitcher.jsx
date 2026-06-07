import { useSelector, useDispatch } from 'react-redux';
import { selectTheme, setTheme } from '../store/uiSlice';

export default function ThemeSwitcher() {
  const theme = useSelector(selectTheme);
  const dispatch = useDispatch();
  const isDark = theme === 'dark';

  return (
    <button
      className="theme-switcher"
      onClick={() => dispatch(setTheme(isDark ? 'light' : 'dark'))}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  );
}

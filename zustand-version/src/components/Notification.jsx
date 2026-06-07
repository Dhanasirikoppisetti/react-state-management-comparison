import { useEffect } from 'react';
import useAppStore from '../store/useAppStore';

export default function Notification() {
  const notification = useAppStore(state => state.ui.notification);
  const clearNotification = useAppStore(state => state.clearNotification);

  useEffect(() => {
    if (!notification) return;
    const timer = setTimeout(clearNotification, 2800);
    return () => clearTimeout(timer);
  }, [notification, clearNotification]);

  if (!notification) return null;

  return (
    <div
      className={`notification-toast ${notification.type || 'success'}`}
      role="status"
      aria-live="polite"
    >
      {notification.type === 'success' && '✓ '}
      {notification.type === 'error' && '✕ '}
      {notification.type === 'info' && 'ℹ '}
      {notification.message}
    </div>
  );
}

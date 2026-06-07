import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectNotification, clearNotification } from '../store/uiSlice';

export default function Notification() {
  const notification = useSelector(selectNotification);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!notification) return;
    const timer = setTimeout(() => dispatch(clearNotification()), 2800);
    return () => clearTimeout(timer);
  }, [notification, dispatch]);

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

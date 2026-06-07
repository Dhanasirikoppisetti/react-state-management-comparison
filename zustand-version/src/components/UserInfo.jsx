import useAppStore from '../store/useAppStore';

// Selector: only re-renders when user slice changes, not cart or ui
export default function UserInfo() {
  const name = useAppStore(state => state.user.name);
  const isLoggedIn = useAppStore(state => state.user.isLoggedIn);
  const toggleLogin = useAppStore(state => state.toggleLogin);

  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();

  if (!isLoggedIn) {
    return (
      <button className="btn-login" onClick={toggleLogin}>
        🐰 Sign In
      </button>
    );
  }

  return (
    <div className="user-info">
      <div className="user-avatar" title={name}>{initials}</div>
      <span className="user-name">{name}</span>
      <button className="btn-login" onClick={toggleLogin} style={{ marginLeft: 4 }}>
        Sign Out
      </button>
    </div>
  );
}

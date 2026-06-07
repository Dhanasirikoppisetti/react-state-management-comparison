import { useUser } from '../store/storeHooks';

export default function UserInfo() {
  const { name, isLoggedIn, toggleLogin } = useUser();

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

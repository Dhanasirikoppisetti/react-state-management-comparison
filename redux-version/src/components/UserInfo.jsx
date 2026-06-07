import { useSelector, useDispatch } from 'react-redux';
import { selectUserName, selectIsLoggedIn, toggleLogin } from '../store/userSlice';

export default function UserInfo() {
  const name = useSelector(selectUserName);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();

  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();

  if (!isLoggedIn) {
    return (
      <button className="btn-login" onClick={() => dispatch(toggleLogin())}>
        🐰 Sign In
      </button>
    );
  }

  return (
    <div className="user-info">
      <div className="user-avatar" title={name}>{initials}</div>
      <span className="user-name">{name}</span>
      <button className="btn-login" onClick={() => dispatch(toggleLogin())} style={{ marginLeft: 4 }}>
        Sign Out
      </button>
    </div>
  );
}

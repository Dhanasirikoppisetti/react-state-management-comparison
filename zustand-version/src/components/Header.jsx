import { useRef } from 'react';
import CartItemCount from './CartItemCount';
import UserInfo from './UserInfo';
import ThemeSwitcher from './ThemeSwitcher';

export default function Header() {
  const renderCount = useRef(0);
  renderCount.current += 1;

  return (
    <header className="header">
      <div className="header-inner">
        {/* Brand */}
        <div className="header-logo">
          <img src="/images/logo.png" alt="The Bunny Treats Logo" className="header-logo-img" />
          <div>
            <div className="header-logo-text">The Bunny Treats</div>
            <div className="header-tagline">Freshly Baked Happiness 🍰</div>
          </div>
          {import.meta.env.DEV && (
            <small
              className="header-render-count"
              data-testid="render-count"
              title="Header renders (Zustand)"
            >
              #{renderCount.current}
            </small>
          )}
        </div>

        {/* Actions */}
        <div className="header-actions">
          <UserInfo />
          <ThemeSwitcher />
          <CartItemCount />
        </div>
      </div>
    </header>
  );
}

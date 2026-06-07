import { useRef } from 'react';
import useAppStore from '../store/useAppStore';
import CartItem from './CartItem';
import CartSummary from './CartSummary';

export default function CartSidebar() {
  const renderCount = useRef(0);
  renderCount.current += 1;

  // Precise selectors — re-renders only when these specific values change
  const items = useAppStore(state => state.cart.items);
  const isOpen = useAppStore(state => state.cart.isOpen);
  const toggleCart = useAppStore(state => state.toggleCart);

  if (!isOpen) return null;

  return (
    <>
      <div className="cart-overlay" onClick={toggleCart} aria-hidden="true" />
      <aside className="cart-sidebar" aria-label="Bunny Basket" style={{ position: 'relative' }}>
        {import.meta.env.DEV && (
          <small
            className="render-count-badge"
            data-testid="render-count"
            title="CartSidebar renders (Zustand)"
            style={{ top: 6, right: 70 }}
          >
            #{renderCount.current}
          </small>
        )}

        <div className="cart-header">
          <div className="cart-title">
            🧺 Bunny Basket
            {items.length > 0 && (
              <span className="cart-count-pill">
                {items.length} treat{items.length !== 1 ? 's' : ''}
              </span>
            )}
          </div>
          <button className="cart-close-btn" onClick={toggleCart} aria-label="Close basket">
            ✕
          </button>
        </div>

        {items.length === 0 ? (
          <div className="cart-empty">
            <div className="cart-empty-icon">🧺</div>
            <div className="cart-empty-text">Your basket is empty!</div>
            <div className="cart-empty-sub">Pick some freshly baked treats 🍰</div>
          </div>
        ) : (
          <>
            <div className="cart-items-list">
              {items.map(item => (
                <CartItem key={item.productId} item={item} />
              ))}
            </div>
            <CartSummary />
          </>
        )}
      </aside>
    </>
  );
}

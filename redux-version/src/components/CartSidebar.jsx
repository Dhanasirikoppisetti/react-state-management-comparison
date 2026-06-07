import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems, selectCartIsOpen, toggleCart } from '../store/cartSlice';
import CartItem from './CartItem';
import CartSummary from './CartSummary';

export default function CartSidebar() {
  const renderCount = useRef(0);
  renderCount.current += 1;

  const items = useSelector(selectCartItems);
  const isOpen = useSelector(selectCartIsOpen);
  const dispatch = useDispatch();

  if (!isOpen) return null;

  return (
    <>
      <div className="cart-overlay" onClick={() => dispatch(toggleCart())} aria-hidden="true" />
      <aside className="cart-sidebar" aria-label="Bunny Basket" style={{ position: 'relative' }}>
        {import.meta.env.DEV && (
          <small
            className="render-count-badge"
            data-testid="render-count"
            title="CartSidebar renders (Redux Toolkit)"
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
          <button className="cart-close-btn" onClick={() => dispatch(toggleCart())} aria-label="Close basket">
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

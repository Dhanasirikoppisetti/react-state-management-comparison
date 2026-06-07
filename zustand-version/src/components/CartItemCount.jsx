import { useRef } from 'react';
import useAppStore from '../store/useAppStore';

export default function CartItemCount() {
  const renderCount = useRef(0);
  renderCount.current += 1;

  // Selector: only re-renders when total quantity changes
  const totalQty = useAppStore(state =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );
  const isOpen = useAppStore(state => state.cart.isOpen);
  const toggleCart = useAppStore(state => state.toggleCart);

  return (
    <div style={{ position: 'relative' }}>
      <button
        className="cart-btn"
        onClick={toggleCart}
        aria-label="Toggle bunny basket"
        aria-expanded={isOpen}
        title="My Bunny Basket"
      >
        🧺
        {totalQty > 0 && (
          <span className="cart-badge" key={totalQty}>
            {totalQty}
          </span>
        )}
      </button>
      {import.meta.env.DEV && (
        <small
          className="render-count-badge"
          data-testid="render-count"
          title="CartItemCount renders (Zustand)"
          style={{ bottom: '-20px', top: 'auto', right: 0 }}
        >
          #{renderCount.current}
        </small>
      )}
    </div>
  );
}

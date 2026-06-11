import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../store/storeHooks';
import { CONTEXT_MODE } from '../store/config';

export default function CartItemCount() {
  const renderCount = useRef(0);
  renderCount.current += 1;

  const { items } = useCart();
  const totalQty = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div style={{ position: 'relative' }}>
      <Link
        to="/cart"
        className="cart-btn"
        aria-label="View bunny basket"
        title="My Bunny Basket"
        style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
      >
        🧺
        {totalQty > 0 && (
          <span className="cart-badge" key={totalQty}>
            {totalQty}
          </span>
        )}
      </Link>
      {import.meta.env.DEV && (
        <small
          className="render-count-badge"
          data-testid="render-count"
          title={`CartItemCount renders (${CONTEXT_MODE} mode)`}
          style={{ bottom: '-20px', top: 'auto', right: 0 }}
        >
          #{renderCount.current}
        </small>
      )}
    </div>
  );
}

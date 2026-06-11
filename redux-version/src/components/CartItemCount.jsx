import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCartItemCount } from '../store/cartSlice';

// useSelector with a precise selector — only re-renders when item count changes
export default function CartItemCount() {
  const renderCount = useRef(0);
  renderCount.current += 1;

  const totalQty = useSelector(selectCartItemCount);

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
          title="CartItemCount renders (Redux Toolkit)"
          style={{ bottom: '-20px', top: 'auto', right: 0 }}
        >
          #{renderCount.current}
        </small>
      )}
    </div>
  );
}

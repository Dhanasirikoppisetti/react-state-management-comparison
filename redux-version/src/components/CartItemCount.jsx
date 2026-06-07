import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItemCount, selectCartIsOpen, toggleCart } from '../store/cartSlice';

// useSelector with a precise selector — only re-renders when item count changes
export default function CartItemCount() {
  const renderCount = useRef(0);
  renderCount.current += 1;

  const totalQty = useSelector(selectCartItemCount);
  const isOpen = useSelector(selectCartIsOpen);
  const dispatch = useDispatch();

  return (
    <div style={{ position: 'relative' }}>
      <button
        className="cart-btn"
        onClick={() => dispatch(toggleCart())}
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
          title="CartItemCount renders (Redux Toolkit)"
          style={{ bottom: '-20px', top: 'auto', right: 0 }}
        >
          #{renderCount.current}
        </small>
      )}
    </div>
  );
}

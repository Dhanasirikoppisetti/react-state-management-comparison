import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../store/cartSlice';

export default function CartItem({ item }) {
  const renderCount = useRef(0);
  renderCount.current += 1;

  const dispatch = useDispatch();

  return (
    <div className="cart-item" style={{ position: 'relative' }}>
      {import.meta.env.DEV && (
        <small
          className="render-count-badge"
          data-testid="render-count"
          title={`CartItem (${item.productId}) renders (Redux Toolkit)`}
          style={{ top: 4, right: 4, fontSize: '9px' }}
        >
          #{renderCount.current}
        </small>
      )}

      <div className="cart-item-emoji">
        {item.image ? (
          <img src={item.image} alt={item.name} className="cart-item-img" />
        ) : (
          item.emoji || '🍰'
        )}
      </div>

      <div className="cart-item-info">
        <div className="cart-item-name" title={item.name}>{item.name}</div>
        <div className="cart-item-price">
          ₹{item.price.toFixed(2)} each · ₹{(item.price * item.quantity).toFixed(2)} total
        </div>
      </div>

      <div className="cart-item-controls">
        <button
          className="qty-btn"
          onClick={() => dispatch(updateQuantity({ productId: item.productId, quantity: item.quantity - 1 }))}
          aria-label="Decrease quantity"
        >
          −
        </button>
        <span className="qty-display">{item.quantity}</span>
        <button
          className="qty-btn"
          onClick={() => dispatch(updateQuantity({ productId: item.productId, quantity: item.quantity + 1 }))}
          aria-label="Increase quantity"
        >
          +
        </button>
        <button
          className="cart-item-remove"
          onClick={() => dispatch(removeFromCart(item.productId))}
          aria-label={`Remove ${item.name}`}
          title="Remove treat"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

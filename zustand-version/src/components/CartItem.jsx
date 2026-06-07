import { useRef } from 'react';
import useAppStore from '../store/useAppStore';

export default function CartItem({ item }) {
  const renderCount = useRef(0);
  renderCount.current += 1;

  // Stable action refs — don't trigger re-renders
  const removeFromCart = useAppStore(state => state.removeFromCart);
  const updateQuantity = useAppStore(state => state.updateQuantity);

  return (
    <div className="cart-item" style={{ position: 'relative' }}>
      {import.meta.env.DEV && (
        <small
          className="render-count-badge"
          data-testid="render-count"
          title={`CartItem (${item.productId}) renders (Zustand)`}
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
          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
          aria-label="Decrease quantity"
        >
          −
        </button>
        <span className="qty-display">{item.quantity}</span>
        <button
          className="qty-btn"
          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
          aria-label="Increase quantity"
        >
          +
        </button>
        <button
          className="cart-item-remove"
          onClick={() => removeFromCart(item.productId)}
          aria-label={`Remove ${item.name}`}
          title="Remove treat"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

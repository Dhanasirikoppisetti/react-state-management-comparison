import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems, updateQuantity, removeFromCart } from '../store/cartSlice';

export default function CartPage() {
  const renderCount = useRef(0);
  renderCount.current += 1;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = subtotal >= 1000 ? 0 : 50;
  const tax = subtotal * 0.05; // 5% Tax
  const grandTotal = subtotal + deliveryFee + tax;

  if (items.length === 0) {
    return (
      <div className="empty-cart-container" style={{ position: 'relative' }}>
        {import.meta.env.DEV && (
          <small
            className="render-count-badge"
            data-testid="render-count"
            title="CartPage renders (Redux Toolkit)"
          >
            #{renderCount.current}
          </small>
        )}
        <div className="empty-cart-icon">🐰🛒</div>
        <h2 className="empty-cart-text">Your cart is empty</h2>
        <p style={{ color: 'var(--clr-text-muted)', marginBottom: 'var(--space-2)' }}>
          Fill your basket with our delicious freshly baked bunny treats!
        </p>
        <Link to="/" className="btn-continue-shopping" style={{ textDecoration: 'none' }}>
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page" style={{ position: 'relative' }}>
      {import.meta.env.DEV && (
        <small
          className="render-count-badge"
          data-testid="render-count"
          title="CartPage renders (Redux Toolkit)"
          style={{ top: '-10px', right: '0' }}
        >
          #{renderCount.current}
        </small>
      )}

      <h1 className="page-title-cursive">My Bunny Basket 🧺</h1>

      <div className="cart-layout">
        {/* Items List */}
        <div className="cart-items-list">
          {items.map((item) => (
            <div className="cart-page-item" key={item.productId}>
              {/* Product Image */}
              <div className="cart-page-item-image">
                {item.image ? (
                  <img src={item.image} alt={item.name} className="cart-page-item-img" />
                ) : (
                  <span style={{ fontSize: '32px' }}>{item.emoji || '🍰'}</span>
                )}
              </div>

              {/* Product Name & Price */}
              <div className="cart-page-item-info">
                <h3 className="cart-page-item-name">{item.name}</h3>
                <div className="cart-page-item-price">₹{item.price.toFixed(2)} each</div>
              </div>

              {/* Quantity Adjustments */}
              <div className="cart-page-item-controls">
                <button
                  className="qty-btn"
                  onClick={() => dispatch(updateQuantity({ productId: item.productId, quantity: item.quantity - 1 }))}
                  disabled={item.quantity <= 1}
                  aria-label="Decrease quantity"
                  style={{ opacity: item.quantity <= 1 ? 0.5 : 1, cursor: item.quantity <= 1 ? 'not-allowed' : 'pointer' }}
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
              </div>

              {/* Item Subtotal */}
              <div className="cart-page-item-subtotal">
                ₹{(item.price * item.quantity).toFixed(2)}
              </div>

              {/* Remove Button */}
              <button
                className="cart-item-remove"
                onClick={() => dispatch(removeFromCart(item.productId))}
                aria-label={`Remove ${item.name}`}
                title="Remove treat"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* Summary Card */}
        <div className="checkout-form-container" style={{ padding: 'var(--space-5)' }}>
          <h2 className="cart-page-item-name" style={{ fontSize: '1.4rem', borderBottom: '2px solid var(--clr-border)', paddingBottom: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
            Order Summary
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <div className="checkout-item-row">
              <span>Subtotal:</span>
              <span style={{ fontWeight: '600', color: 'var(--clr-heading)' }}>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="checkout-item-row">
              <span>Delivery Charges:</span>
              <span style={{ fontWeight: '600', color: 'var(--clr-heading)' }}>
                {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee.toFixed(2)}`}
              </span>
            </div>
            <div className="checkout-item-row" style={{ borderBottom: '1px solid var(--clr-border)', paddingBottom: 'var(--space-3)', marginBottom: 'var(--space-2)' }}>
              <span>GST (5%):</span>
              <span style={{ fontWeight: '600', color: 'var(--clr-heading)' }}>₹{tax.toFixed(2)}</span>
            </div>
            <div className="checkout-item-row" style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--clr-heading)', marginTop: 'var(--space-2)' }}>
              <span>Grand Total:</span>
              <span style={{ color: 'var(--clr-rose-hover)' }}>₹{grandTotal.toFixed(2)}</span>
            </div>
          </div>

          <button
            className="btn-checkout"
            onClick={() => navigate('/checkout')}
            style={{ width: '100%', marginTop: 'var(--space-5)' }}
          >
            Proceed to Checkout ✨
          </button>

          <Link to="/" style={{ display: 'block', textAlign: 'center', marginTop: 'var(--space-3)', color: 'var(--clr-text-muted)', fontSize: '14px', textDecoration: 'none', fontWeight: '500' }}>
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

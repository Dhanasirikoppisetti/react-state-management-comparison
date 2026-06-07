import { useSelector } from 'react-redux';
import { selectCartItems, selectCartTotal } from '../store/cartSlice';

export default function CartSummary() {
  const items = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartTotal);

  const shipping = subtotal > 0 ? (subtotal > 1000 ? 0 : 99) : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;
  const totalQty = items.reduce((s, i) => s + i.quantity, 0);

  return (
    <div className="cart-summary">
      <div className="summary-label">🧾 Order Summary</div>

      <div className="summary-row">
        <span>Subtotal ({totalQty} treats)</span>
        <span>₹{subtotal.toFixed(2)}</span>
      </div>
      <div className="summary-row">
        <span>🚚 Delivery</span>
        <span>{shipping === 0 ? '🎉 Free!' : `₹${shipping.toFixed(2)}`}</span>
      </div>
      <div className="summary-row">
        <span>Tax (8%)</span>
        <span>₹{tax.toFixed(2)}</span>
      </div>
      <div className="summary-row total">
        <span>Total</span>
        <span className="summary-value">₹{total.toFixed(2)}</span>
      </div>

      {subtotal < 1000 && subtotal > 0 && (
        <p style={{ fontSize: 11, color: 'var(--clr-text-muted)', marginTop: 8, textAlign: 'center', fontWeight: 500 }}>
          🎀 Add ₹{(1000 - subtotal).toFixed(2)} more for free delivery!
        </p>
      )}

      <button className="btn-checkout" onClick={() => alert('Order placed! Your treats are on their way 🐰🍰')}>
        🐰 Place My Order
      </button>
    </div>
  );
}

import { useCart } from '../store/storeHooks';

export default function CartSummary() {
  const { items } = useCart();

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? (subtotal > 500 ? 0 : 49) : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="cart-summary">
      <div className="summary-label">🧾 Order Summary</div>

      <div className="summary-row">
        <span>Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} treats)</span>
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

      {subtotal < 500 && subtotal > 0 && (
        <p style={{ fontSize: 11, color: 'var(--clr-text-muted)', marginTop: 8, textAlign: 'center', fontWeight: 500 }}>
          🎀 Add ₹{(500 - subtotal).toFixed(2)} more for free delivery!
        </p>
      )}

      <button className="btn-checkout" onClick={() => alert('Order placed! Your treats are on their way 🐰🍰')}>
        🐰 Place My Order
      </button>
    </div>
  );
}

import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAppStore from '../store/useAppStore';

export default function CheckoutPage() {
  const renderCount = useRef(0);
  renderCount.current += 1;

  const navigate = useNavigate();
  const items = useAppStore(state => state.cart.items);
  const clearCart = useAppStore(state => state.clearCart);
  const setNotification = useAppStore(state => state.setNotification);

  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = subtotal >= 1000 ? 0 : 50;
  const tax = subtotal * 0.05;
  const grandTotal = subtotal + deliveryFee + tax;

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.fullName || !form.phone || !form.email || !form.address || !form.city || !form.state || !form.pincode) {
      setNotification('⚠️ Please fill out all fields.', 'error');
      return;
    }

    // Process order
    setNotification('🎉 Order placed successfully! Thank you for ordering from The Bunny Treats! 🐰🍰', 'success');
    clearCart();
    navigate('/');
  }

  if (items.length === 0) {
    return (
      <div className="empty-cart-container" style={{ position: 'relative' }}>
        {import.meta.env.DEV && (
          <small
            className="render-count-badge"
            data-testid="render-count"
            title="CheckoutPage renders (Zustand)"
          >
            #{renderCount.current}
          </small>
        )}
        <div className="empty-cart-icon">🐰🧁</div>
        <h2 className="empty-cart-text">No items in your basket to checkout</h2>
        <Link to="/" className="btn-continue-shopping" style={{ textDecoration: 'none' }}>
          Go to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="checkout-page" style={{ position: 'relative' }}>
      {import.meta.env.DEV && (
        <small
          className="render-count-badge"
          data-testid="render-count"
          title="CheckoutPage renders (Zustand)"
          style={{ top: '-10px', right: '0' }}
        >
          #{renderCount.current}
        </small>
      )}

      <h1 className="page-title-cursive">Secure Checkout 🔒</h1>

      <div className="checkout-layout">
        {/* Form Container */}
        <div className="checkout-form-container">
          <h2 className="cart-page-item-name" style={{ fontSize: '1.3rem', borderBottom: '2px solid var(--clr-border)', paddingBottom: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
            Delivery Details
          </h2>

          <form onSubmit={handleSubmit} className="checkout-form">
            <div className="form-group form-group-full">
              <label htmlFor="fullName" className="form-label">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                className="form-input"
                placeholder="Dhana siri Koppisetti"
                value={form.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone" className="form-label">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="form-input"
                placeholder="9876543210"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-input"
                placeholder="dhana@example.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group form-group-full">
              <label htmlFor="address" className="form-label">Delivery Address</label>
              <input
                type="text"
                id="address"
                name="address"
                className="form-input"
                placeholder="Flat, House No, Street name"
                value={form.address}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="city" className="form-label">City</label>
              <input
                type="text"
                id="city"
                name="city"
                className="form-input"
                placeholder="Hyderabad"
                value={form.city}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="state" className="form-label">State</label>
              <input
                type="text"
                id="state"
                name="state"
                className="form-input"
                placeholder="Telangana"
                value={form.state}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group form-group-full">
              <label htmlFor="pincode" className="form-label">Pincode</label>
              <input
                type="text"
                id="pincode"
                name="pincode"
                className="form-input"
                placeholder="500001"
                value={form.pincode}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group form-group-full" style={{ marginTop: 'var(--space-4)' }}>
              <button type="submit" className="btn-checkout">
                Place Order (₹{grandTotal.toFixed(2)}) 🐰🍰
              </button>
            </div>
          </form>
        </div>

        {/* Order Summary Summary */}
        <div className="checkout-form-container" style={{ padding: 'var(--space-5)' }}>
          <h2 className="cart-page-item-name" style={{ fontSize: '1.3rem', borderBottom: '2px solid var(--clr-border)', paddingBottom: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
            Order Summary
          </h2>

          <div className="checkout-items-summary">
            {items.map((item) => (
              <div className="checkout-item-row" key={item.productId} style={{ marginBottom: 'var(--space-2)' }}>
                <span>
                  {item.name} <strong style={{ color: 'var(--clr-rose)' }}>x{item.quantity}</strong>
                </span>
                <span style={{ fontWeight: '500' }}>₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div style={{ borderTop: '2px dashed var(--clr-border)', paddingTop: 'var(--space-4)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <div className="checkout-item-row">
              <span>Subtotal:</span>
              <span style={{ fontWeight: '600' }}>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="checkout-item-row">
              <span>Delivery Fee:</span>
              <span style={{ fontWeight: '600' }}>
                {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee.toFixed(2)}`}
              </span>
            </div>
            <div className="checkout-item-row" style={{ borderBottom: '1px solid var(--clr-border)', paddingBottom: 'var(--space-3)' }}>
              <span>GST (5%):</span>
              <span style={{ fontWeight: '600' }}>₹{tax.toFixed(2)}</span>
            </div>
            <div className="checkout-item-row" style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--clr-heading)', marginTop: 'var(--space-2)' }}>
              <span>Total Amount:</span>
              <span style={{ color: 'var(--clr-rose-hover)' }}>₹{grandTotal.toFixed(2)}</span>
            </div>
          </div>

          <Link to="/cart" style={{ display: 'block', textAlign: 'center', marginTop: 'var(--space-5)', color: 'var(--clr-rose-hover)', fontSize: '14px', textDecoration: 'none', fontWeight: '600' }}>
            ← Back to Basket
          </Link>
        </div>
      </div>
    </div>
  );
}

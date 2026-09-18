import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { placeOrder } from '../api/orders';
import './Checkout.css';

function Checkout() {
  const { user } = useAuth();
  const { cart, cartLoading } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    name: user?.name || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const subtotal = cart.items.reduce(
    (sum, item) => sum + item.food.price * item.quantity,
    0
  );
  const deliveryFee = 40;
  const total = subtotal + deliveryFee;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (cart.items.length === 0) {
      return setError('Your cart is empty');
    }

    setLoading(true);
    try {
      const order = await placeOrder(user.token, {
        name: form.name,
        phone: form.phone,
        address: form.address,
        city: form.city,
        state: form.state,
        pincode: form.pincode,
      });
      navigate(`/orders/${order._id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (cartLoading) {
    return <div className="loading-wrap"><div className="spinner"></div></div>;
  }

  if (cart.items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="page">
      <div className="container">
        <h1 className="page-title">Checkout</h1>
        <p className="page-subtitle">Enter your delivery details</p>

        {error && <div className="alert alert-error">{error}</div>}

        <div className="checkout-layout">
          {/* Delivery Form */}
          <form onSubmit={handleSubmit} className="checkout-form">
            <h2 className="form-section-title">Delivery Address</h2>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input id="name" name="name" type="text" value={form.name} onChange={handleChange} required placeholder="John Doe" />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} required placeholder="9876543210" />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input id="address" name="address" type="text" value={form.address} onChange={handleChange} required placeholder="House No., Street, Area" />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input id="city" name="city" type="text" value={form.city} onChange={handleChange} required placeholder="Mumbai" />
              </div>
              <div className="form-group">
                <label htmlFor="state">State</label>
                <input id="state" name="state" type="text" value={form.state} onChange={handleChange} required placeholder="Maharashtra" />
              </div>
              <div className="form-group">
                <label htmlFor="pincode">Pincode</label>
                <input id="pincode" name="pincode" type="text" value={form.pincode} onChange={handleChange} required placeholder="400001" maxLength={6} />
              </div>
            </div>

            <h2 className="form-section-title" style={{ marginTop: '8px' }}>Payment</h2>
            <div className="payment-option">
              <span className="payment-icon">💵</span>
              <div>
                <strong>Cash on Delivery</strong>
                <p>Pay when your order arrives</p>
              </div>
              <span className="payment-check">✓</span>
            </div>

            <button
              type="submit"
              className="btn btn-primary place-order-btn"
              disabled={loading}
            >
              {loading ? 'Placing Order...' : `Place Order – ₹${total}`}
            </button>
          </form>

          {/* Order Summary */}
          <div className="checkout-summary">
            <h2>Order Summary</h2>
            <div className="checkout-items">
              {cart.items.map((item) => (
                <div key={item.food._id} className="checkout-item">
                  <img src={item.food.image} alt={item.food.name} />
                  <div>
                    <p className="checkout-item-name">{item.food.name}</p>
                    <p className="checkout-item-qty">x{item.quantity}</p>
                  </div>
                  <span>₹{item.food.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="summary-row"><span>Subtotal</span><span>₹{subtotal}</span></div>
            <div className="summary-row"><span>Delivery</span><span>₹{deliveryFee}</span></div>
            <div className="summary-row summary-total"><span>Total</span><span>₹{total}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;

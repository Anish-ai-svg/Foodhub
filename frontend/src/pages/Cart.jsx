import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Cart.css';

function Cart() {
  const { cart, cartLoading, updateItem, removeItem } = useCart();
  const navigate = useNavigate();

  const subtotal = cart.items.reduce(
    (sum, item) => sum + item.food.price * item.quantity,
    0
  );
  const deliveryFee = cart.items.length > 0 ? 40 : 0;
  const total = subtotal + deliveryFee;

  if (cartLoading) {
    return <div className="loading-wrap"><div className="spinner"></div></div>;
  }

  return (
    <div className="page">
      <div className="container">
        <h1 className="page-title">Your Cart 🛒</h1>

        {cart.items.length === 0 ? (
          <div className="empty-state">
            <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🛒</div>
            <h3>Your cart is empty</h3>
            <p style={{ marginBottom: '20px' }}>Browse our menu and add some delicious food!</p>
            <Link to="/menu" className="btn btn-primary">Browse Menu</Link>
          </div>
        ) : (
          <div className="cart-layout">
            {/* Cart items */}
            <div className="cart-items">
              {cart.items.map((item) => (
                <div key={item.food._id} className="cart-item">
                  <img
                    src={item.food.image}
                    alt={item.food.name}
                    className="cart-item-img"
                  />
                  <div className="cart-item-info">
                    <h3 className="cart-item-name">{item.food.name}</h3>
                    <span className="cart-item-category">{item.food.category}</span>
                    <p className="cart-item-price">₹{item.food.price} each</p>
                  </div>
                  <div className="cart-item-actions">
                    <div className="qty-controls">
                      <button
                        className="qty-btn"
                        onClick={() => updateItem(item.food._id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >−</button>
                      <span className="qty-value">{item.quantity}</span>
                      <button
                        className="qty-btn"
                        onClick={() => updateItem(item.food._id, item.quantity + 1)}
                      >+</button>
                    </div>
                    <p className="cart-item-subtotal">₹{item.food.price * item.quantity}</p>
                    <button
                      className="remove-btn"
                      onClick={() => removeItem(item.food._id)}
                      title="Remove"
                    >
                      🗑
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order summary */}
            <div className="cart-summary">
              <h2>Order Summary</h2>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="summary-row">
                <span>Delivery Fee</span>
                <span>₹{deliveryFee}</span>
              </div>
              <div className="summary-row summary-total">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
              <button
                className="btn btn-primary"
                style={{ width: '100%', marginTop: '16px', padding: '12px' }}
                onClick={() => navigate('/checkout')}
              >
                Proceed to Checkout
              </button>
              <Link
                to="/menu"
                className="btn btn-outline"
                style={{ width: '100%', marginTop: '10px', padding: '12px' }}
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;

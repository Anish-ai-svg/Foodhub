import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getOrderById } from '../api/orders';
import './Orders.css';

function OrderDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getOrderById(user.token, id)
      .then(setOrder)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id, user]);

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  const STATUS_STEPS = ['pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered'];

  if (loading) return <div className="loading-wrap"><div className="spinner"></div></div>;
  if (error) return <div className="container"><div className="alert alert-error">{error}</div></div>;
  if (!order) return null;

  const stepIndex = STATUS_STEPS.indexOf(order.status);

  return (
    <div className="page">
      <div className="container">
        <Link to="/orders" className="back-link">← Back to Orders</Link>
        <h1 className="page-title" style={{ marginTop: '12px' }}>
          Order #{order._id.slice(-6).toUpperCase()}
        </h1>
        <div className="order-meta">
          <span>Placed on {formatDate(order.createdAt)}</span>
          <span className={`badge badge-${order.status}`}>
            {order.status.replace(/_/g, ' ')}
          </span>
        </div>

        {/* Status tracker */}
        {order.status !== 'cancelled' && (
          <div className="status-tracker">
            {STATUS_STEPS.map((step, i) => (
              <div key={step} className={`status-step ${i <= stepIndex ? 'done' : ''}`}>
                <div className="status-dot"></div>
                <span>{step.replace(/_/g, ' ')}</span>
                {i < STATUS_STEPS.length - 1 && (
                  <div className={`status-line ${i < stepIndex ? 'done' : ''}`}></div>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="order-detail-grid">
          {/* Items */}
          <div className="order-detail-card">
            <h2>Items Ordered</h2>
            <div className="order-detail-items">
              {order.items.map((item, i) => (
                <div key={i} className="order-detail-item">
                  <div>
                    <p className="item-name">{item.name}</p>
                    <p className="item-qty">Qty: {item.quantity}</p>
                  </div>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="order-price-row"><span>Subtotal</span><span>₹{order.subtotal}</span></div>
            <div className="order-price-row"><span>Delivery Fee</span><span>₹{order.deliveryFee}</span></div>
            <div className="order-price-row order-price-total"><span>Total</span><span>₹{order.total}</span></div>
          </div>

          {/* Delivery Address */}
          <div className="order-detail-card">
            <h2>Delivery Address</h2>
            <div className="delivery-info">
              <p><strong>{order.deliveryAddress.name}</strong></p>
              <p>📞 {order.deliveryAddress.phone}</p>
              <p>📍 {order.deliveryAddress.address}</p>
              <p>{order.deliveryAddress.city}, {order.deliveryAddress.state} – {order.deliveryAddress.pincode}</p>
            </div>
            <div style={{ marginTop: '16px' }}>
              <p><strong>Payment:</strong> Cash on Delivery</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetail;

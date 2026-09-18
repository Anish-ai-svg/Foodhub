import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getMyOrders } from '../api/orders';
import './Orders.css';

function Orders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getMyOrders(user.token)
      .then(setOrders)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [user]);

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

  if (loading) return <div className="loading-wrap"><div className="spinner"></div></div>;

  return (
    <div className="page">
      <div className="container">
        <h1 className="page-title">My Orders</h1>
        <p className="page-subtitle">Track and view your past orders.</p>

        {error && <div className="alert alert-error">{error}</div>}

        {orders.length === 0 ? (
          <div className="empty-state">
            <div style={{ fontSize: '4rem', marginBottom: '16px' }}>📦</div>
            <h3>No orders yet</h3>
            <p style={{ marginBottom: '20px' }}>Place your first order from our menu!</p>
            <Link to="/menu" className="btn btn-primary">Browse Menu</Link>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <Link to={`/orders/${order._id}`} key={order._id} className="order-card">
                <div className="order-card-left">
                  <p className="order-id">Order #{order._id.slice(-6).toUpperCase()}</p>
                  <p className="order-date">{formatDate(order.createdAt)}</p>
                  <p className="order-items">
                    {order.items.map((i) => i.name).join(', ')}
                  </p>
                </div>
                <div className="order-card-right">
                  <span className={`badge badge-${order.status}`}>
                    {order.status.replace(/_/g, ' ')}
                  </span>
                  <p className="order-total">₹{order.total}</p>
                  <span className="order-view-link">View Details →</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;

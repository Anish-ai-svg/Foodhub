import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getFoods, createFood, updateFood, deleteFood } from '../api/food';
import { getMyOrders, updateOrderStatus } from '../api/orders';
import './Admin.css';

const CATEGORIES = ['Pizza', 'Burger', 'Indian', 'Chinese', 'Biryani', 'Dessert', 'Beverages'];
const ORDER_STATUSES = ['pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'];

const EMPTY_FOOD = {
  name: '',
  description: '',
  category: 'Pizza',
  price: '',
  image: '',
  isAvailable: true,
};

function Admin() {
  const { user } = useAuth();

  // State
  const [activeTab, setActiveTab] = useState('dashboard');
  const [foods, setFoods] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Food form
  const [showFoodForm, setShowFoodForm] = useState(false);
  const [editingFood, setEditingFood] = useState(null);
  const [foodForm, setFoodForm] = useState(EMPTY_FOOD);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState('');

  // Fetch data
  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch(`/api/foods`, { headers: { Authorization: `Bearer ${user.token}` } }).then(r => r.json()),
      getMyOrders(user.token),
    ])
      .then(([foodData, orderData]) => {
        setFoods(foodData);
        setOrders(orderData);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [user]);

  // Stats
  const totalFoods = foods.length;
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status === 'pending').length;

  // Food form handlers
  const openAddForm = () => {
    setEditingFood(null);
    setFoodForm(EMPTY_FOOD);
    setFormError('');
    setShowFoodForm(true);
  };

  const openEditForm = (food) => {
    setEditingFood(food);
    setFoodForm({
      name: food.name,
      description: food.description,
      category: food.category,
      price: food.price,
      image: food.image,
      isAvailable: food.isAvailable,
    });
    setFormError('');
    setShowFoodForm(true);
  };

  const handleFoodFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFoodForm({ ...foodForm, [name]: type === 'checkbox' ? checked : value });
  };

  const handleFoodSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setFormLoading(true);
    try {
      const payload = { ...foodForm, price: Number(foodForm.price) };
      if (editingFood) {
        const updated = await updateFood(user.token, editingFood._id, payload);
        setFoods(foods.map((f) => (f._id === editingFood._id ? updated : f)));
      } else {
        const created = await createFood(user.token, payload);
        setFoods([created, ...foods]);
      }
      setShowFoodForm(false);
    } catch (err) {
      setFormError(err.message);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteFood = async (id) => {
    if (!window.confirm('Are you sure you want to delete this food item?')) return;
    try {
      await deleteFood(user.token, id);
      setFoods(foods.filter((f) => f._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const handleStatusChange = async (orderId, status) => {
    try {
      const updated = await updateOrderStatus(user.token, orderId, status);
      setOrders(orders.map((o) => (o._id === orderId ? updated : o)));
    } catch (err) {
      alert(err.message);
    }
  };

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  if (loading) return <div className="loading-wrap"><div className="spinner"></div></div>;

  return (
    <div className="page admin-page">
      <div className="container">
        <div className="admin-header">
          <h1 className="page-title">Admin Dashboard</h1>
          <p className="page-subtitle">Welcome back, {user.name}!</p>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        {/* Tabs */}
        <div className="admin-tabs">
          {['dashboard', 'foods', 'orders'].map((tab) => (
            <button
              key={tab}
              className={`admin-tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'dashboard' && '📊 Dashboard'}
              {tab === 'foods' && '🍕 Foods'}
              {tab === 'orders' && '📦 Orders'}
            </button>
          ))}
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="dashboard-stats">
            <div className="stat-card">
              <div className="stat-icon">🍕</div>
              <div>
                <p className="stat-label">Total Food Items</p>
                <p className="stat-value">{totalFoods}</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📦</div>
              <div>
                <p className="stat-label">Total Orders</p>
                <p className="stat-value">{totalOrders}</p>
              </div>
            </div>
            <div className="stat-card stat-warning">
              <div className="stat-icon">⏳</div>
              <div>
                <p className="stat-label">Pending Orders</p>
                <p className="stat-value">{pendingOrders}</p>
              </div>
            </div>
          </div>
        )}

        {/* Foods Tab */}
        {activeTab === 'foods' && (
          <div>
            <div className="tab-toolbar">
              <h2 className="tab-title">Food Items ({foods.length})</h2>
              <button className="btn btn-primary" onClick={openAddForm}>+ Add Food</button>
            </div>

            {/* Food Form Modal */}
            {showFoodForm && (
              <div className="modal-overlay" onClick={() => setShowFoodForm(false)}>
                <div className="modal" onClick={(e) => e.stopPropagation()}>
                  <div className="modal-header">
                    <h2>{editingFood ? 'Edit Food' : 'Add New Food'}</h2>
                    <button className="modal-close" onClick={() => setShowFoodForm(false)}>✕</button>
                  </div>

                  {formError && <div className="alert alert-error">{formError}</div>}

                  <form onSubmit={handleFoodSubmit}>
                    <div className="form-group">
                      <label>Name</label>
                      <input name="name" value={foodForm.name} onChange={handleFoodFormChange} required placeholder="Food name" />
                    </div>
                    <div className="form-group">
                      <label>Description</label>
                      <textarea name="description" value={foodForm.description} onChange={handleFoodFormChange} required placeholder="Description" rows={2} />
                    </div>
                    <div className="form-row-2">
                      <div className="form-group">
                        <label>Category</label>
                        <select name="category" value={foodForm.category} onChange={handleFoodFormChange}>
                          {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Price (₹)</label>
                        <input name="price" type="number" min="0" value={foodForm.price} onChange={handleFoodFormChange} required placeholder="199" />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Image URL</label>
                      <input name="image" value={foodForm.image} onChange={handleFoodFormChange} required placeholder="https://..." />
                    </div>
                    <div className="form-group form-checkbox">
                      <input type="checkbox" id="isAvailable" name="isAvailable" checked={foodForm.isAvailable} onChange={handleFoodFormChange} />
                      <label htmlFor="isAvailable">Available for order</label>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-outline" onClick={() => setShowFoodForm(false)}>Cancel</button>
                      <button type="submit" className="btn btn-primary" disabled={formLoading}>
                        {formLoading ? 'Saving...' : editingFood ? 'Update Food' : 'Add Food'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Foods Table */}
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Available</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {foods.map((food) => (
                    <tr key={food._id}>
                      <td>
                        <img src={food.image} alt={food.name} className="table-food-img" />
                      </td>
                      <td><strong>{food.name}</strong></td>
                      <td><span className="badge badge-confirmed">{food.category}</span></td>
                      <td>₹{food.price}</td>
                      <td>
                        <span className={`badge ${food.isAvailable ? 'badge-delivered' : 'badge-cancelled'}`}>
                          {food.isAvailable ? 'Yes' : 'No'}
                        </span>
                      </td>
                      <td>
                        <div className="action-btns">
                          <button className="btn btn-outline btn-sm" onClick={() => openEditForm(food)}>Edit</button>
                          <button className="btn btn-danger btn-sm" onClick={() => handleDeleteFood(food._id)}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div>
            <div className="tab-toolbar">
              <h2 className="tab-title">All Orders ({orders.length})</h2>
            </div>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Date</th>
                    <th>Items</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Change Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td><strong>#{order._id.slice(-6).toUpperCase()}</strong></td>
                      <td>{order.user?.name || 'N/A'}</td>
                      <td>{formatDate(order.createdAt)}</td>
                      <td>{order.items.length} item(s)</td>
                      <td>₹{order.total}</td>
                      <td>
                        <span className={`badge badge-${order.status}`}>
                          {order.status.replace(/_/g, ' ')}
                        </span>
                      </td>
                      <td>
                        <select
                          className="status-select"
                          value={order.status}
                          onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        >
                          {ORDER_STATUSES.map((s) => (
                            <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Admin;

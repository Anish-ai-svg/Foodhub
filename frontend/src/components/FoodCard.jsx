import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './FoodCard.css';

function FoodCard({ food }) {
  const { user } = useAuth();
  const { addItem } = useCart();
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAdd = async () => {
    if (!user) {
      window.location.href = '/login';
      return;
    }
    try {
      setAdding(true);
      await addItem(food._id);
      setAdded(true);
      setTimeout(() => setAdded(false), 1500);
    } catch (err) {
      alert(err.message);
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="food-card">
      <div className="food-card-img-wrap">
        <img src={food.image} alt={food.name} className="food-card-img" loading="lazy" />
        <span className="food-card-category">{food.category}</span>
      </div>
      <div className="food-card-body">
        <h3 className="food-card-name">{food.name}</h3>
        <p className="food-card-desc">{food.description}</p>
        <div className="food-card-footer">
          <span className="food-card-price">₹{food.price}</span>
          <button
            className={`btn btn-primary btn-sm ${added ? 'btn-added' : ''}`}
            onClick={handleAdd}
            disabled={adding}
          >
            {adding ? '...' : added ? '✓ Added' : '+ Add'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default FoodCard;

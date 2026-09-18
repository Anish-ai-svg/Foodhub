import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getFoods } from '../api/food';
import FoodCard from '../components/FoodCard';
import './Home.css';

const CATEGORIES = ['Pizza', 'Burger', 'Indian', 'Chinese', 'Biryani', 'Dessert', 'Beverages'];

const CATEGORY_ICONS = {
  Pizza: '🍕',
  Burger: '🍔',
  Indian: '🍛',
  Chinese: '🍜',
  Biryani: '🍚',
  Dessert: '🍰',
  Beverages: '🥤',
};

function Home() {
  const [featuredFoods, setFeaturedFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getFoods()
      .then((data) => setFeaturedFoods(data.slice(0, 4)))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/menu?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="home">
      {/* Hero */}
      <section className="hero">
        <div className="container hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Delicious Food,<br />
              <span className="hero-highlight">Delivered Fast 🚀</span>
            </h1>
            <p className="hero-subtitle">
              Order from your favourite restaurants and get fresh food at your doorstep.
            </p>
            <form className="hero-search" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search for food..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                id="hero-search-input"
              />
              <button type="submit" className="btn btn-primary">Search</button>
            </form>
          </div>
          <div className="hero-img">
            <div className="hero-img-circle">🍔</div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Browse by Category</h2>
          <div className="categories-grid">
            {CATEGORIES.map((cat) => (
              <Link
                to={`/menu?category=${cat}`}
                key={cat}
                className="category-card"
              >
                <span className="category-icon">{CATEGORY_ICONS[cat]}</span>
                <span className="category-name">{cat}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="section section-gray">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Featured Items</h2>
            <Link to="/menu" className="btn btn-outline btn-sm">View All →</Link>
          </div>
          {loading ? (
            <div className="loading-wrap"><div className="spinner"></div></div>
          ) : (
            <div className="food-grid">
              {featuredFoods.map((food) => (
                <FoodCard key={food._id} food={food} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* How it works */}
      <section className="section">
        <div className="container">
          <h2 className="section-title" style={{ textAlign: 'center' }}>How It Works</h2>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-icon">🔍</div>
              <h3>Browse Menu</h3>
              <p>Explore hundreds of dishes across different categories.</p>
            </div>
            <div className="step-card">
              <div className="step-icon">🛒</div>
              <h3>Add to Cart</h3>
              <p>Add your favourite items to cart and adjust quantities.</p>
            </div>
            <div className="step-card">
              <div className="step-icon">📦</div>
              <h3>Place Order</h3>
              <p>Enter your address and place a Cash on Delivery order.</p>
            </div>
            <div className="step-card">
              <div className="step-icon">🏠</div>
              <h3>Get Delivered</h3>
              <p>Your fresh food is delivered right to your doorstep.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;

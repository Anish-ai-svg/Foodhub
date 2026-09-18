import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getFoods } from '../api/food';
import FoodCard from '../components/FoodCard';
import './Menu.css';

const CATEGORIES = ['All', 'Pizza', 'Burger', 'Indian', 'Chinese', 'Biryani', 'Dessert', 'Beverages'];

function Menu() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const activeCategory = searchParams.get('category') || 'All';
  const searchQuery = searchParams.get('search') || '';

  // Sync search input with URL
  useEffect(() => {
    setSearchInput(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    setLoading(true);
    setError('');
    const params = {};
    if (activeCategory !== 'All') params.category = activeCategory;
    if (searchQuery) params.search = searchQuery;

    getFoods(params)
      .then(setFoods)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [activeCategory, searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    const newParams = {};
    if (activeCategory !== 'All') newParams.category = activeCategory;
    if (searchInput.trim()) newParams.search = searchInput.trim();
    setSearchParams(newParams);
  };

  const handleCategory = (cat) => {
    const newParams = {};
    if (cat !== 'All') newParams.category = cat;
    if (searchQuery) newParams.search = searchQuery;
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setSearchInput('');
    setSearchParams({});
  };

  return (
    <div className="page">
      <div className="container">
        <h1 className="page-title">Our Menu</h1>
        <p className="page-subtitle">Explore our wide variety of dishes.</p>

        {/* Search */}
        <form className="menu-search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search for food..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            id="menu-search-input"
          />
          <button type="submit" className="btn btn-primary">Search</button>
          {(searchQuery || activeCategory !== 'All') && (
            <button type="button" className="btn btn-outline" onClick={clearFilters}>
              Clear
            </button>
          )}
        </form>

        {/* Category filter */}
        <div className="category-filter">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => handleCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results info */}
        {(searchQuery || activeCategory !== 'All') && !loading && (
          <p className="results-info">
            {foods.length} result{foods.length !== 1 ? 's' : ''}
            {searchQuery && ` for "${searchQuery}"`}
            {activeCategory !== 'All' && ` in ${activeCategory}`}
          </p>
        )}

        {/* Food grid */}
        {loading ? (
          <div className="loading-wrap"><div className="spinner"></div></div>
        ) : error ? (
          <div className="alert alert-error">{error}</div>
        ) : foods.length === 0 ? (
          <div className="empty-state">
            <h3>No items found</h3>
            <p>Try a different search or category.</p>
          </div>
        ) : (
          <div className="food-grid">
            {foods.map((food) => (
              <FoodCard key={food._id} food={food} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Menu;

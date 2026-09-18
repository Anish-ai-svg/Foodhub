import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import * as cartApi from '../api/cart';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [cart, setCart] = useState({ items: [] });
  const [cartLoading, setCartLoading] = useState(false);

  // Fetch cart when user logs in
  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setCart({ items: [] });
    }
  }, [user]);

  const fetchCart = async () => {
    try {
      setCartLoading(true);
      const data = await cartApi.getCart(user.token);
      setCart(data);
    } catch (err) {
      console.error('Failed to fetch cart:', err);
    } finally {
      setCartLoading(false);
    }
  };

  const addItem = async (foodId, quantity = 1) => {
    const data = await cartApi.addItem(user.token, foodId, quantity);
    setCart(data);
  };

  const updateItem = async (foodId, quantity) => {
    const data = await cartApi.updateItem(user.token, foodId, quantity);
    setCart(data);
  };

  const removeItem = async (foodId) => {
    const data = await cartApi.removeItem(user.token, foodId);
    setCart(data);
  };

  const clearCart = async () => {
    await cartApi.clearCart(user.token);
    setCart({ items: [] });
  };

  const cartCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, cartLoading, fetchCart, addItem, updateItem, removeItem, clearCart, cartCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}

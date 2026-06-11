import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../Context/Authcontext';
import { API_URL } from '../Context/Apiurl';

const CartContext = createContext();

export default function CartProvider ({ children }){
  const { user } = useAuth();
  const [cart, setCart] = useState();
  const [loading, setLoading] = useState(true);

  // Fetch cart from backend
  const fetchCart = async () => {
    if (!user) return;
    try {
      const token = localStorage.getItem('jwt');
      const response = await axios.get(`${API_URL}/cart/get`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCart(response.data);
    } catch (err) {
      console.error("Error fetching cart in context:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  // Dynamic helper to calculate total items (sum of all quantities)
  const getCartCount = () => {
    if (!cart || !cart.items) return 0;
    return cart.items.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ cart, setCart, getCartCount, fetchCart, loading }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
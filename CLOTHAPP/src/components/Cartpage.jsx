import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/Authcontext';
import { API_URL } from '../Context/Apiurl';
import Cartsteps from './Cartsteps'
export default function Cartpage() {
  const { user } = useAuth();
  const USER_ID = user?.id || user?._id;
   
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const availableSizes = ["S", "M", "L", "XL"];

  useEffect(() => {
    // 1. SAFETY GUARD: If user doesn't exist yet (still loading auth context), STOP.
    if (!user || !USER_ID) return;

    const fetchCart = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('jwt'); // Get your JWT token
        
        // 2. Clear API layout matching your backend setup
        const response = await axios.get(`${API_URL}/cart/get`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCart(response.data);
      } catch (err) {
        console.error("Error fetching cart:", err);
        setError("Failed to load your shopping cart.");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [user, USER_ID]); // 3. DEPENDENCY WATCHER: Automatically fires the moment user data arrives!

  // Action 1: Modify Quantity (Increase / Decrease)
  const handleQuantityChange = async (productId, size, action) => {
    try {
      const token = localStorage.getItem('jwt');
      const response = await axios.put(`${API_URL}/cart/UpdateQuantity`, {
        productId,
        size,
        action 
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCart(response.data); 
    } catch (err) {
      console.error("Quantity update failed:", err);
    }
  };

  // Action 2: Edit Size Inline
  const handleSizeEdit = async (productId, oldSize, newSize) => {
    if (oldSize === newSize) return;
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`${API_URL}/cart/UpdateSize`, {
        productId,
        oldSize,
        newSize
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCart(response.data);
    } catch (err) {
      console.error("Size modification failed:", err);
    }
  };

  // Action 3: Purge Item Line Entirely
  const handleItemDelete = async (productId, size) => {
    try {
      const token = localStorage.getItem('jwt');
      const response = await axios.delete(`${API_URL}/cart/delete`, {
        headers: { Authorization: `Bearer ${token}` },
        data: { productId, size } // Delete body payloads payload goes inside data wrapper
      });
      setCart(response.data);
    } catch (err) {
      console.error("Item removal failed:", err);
    }
  };

  // Calculate Subtotal dynamically from frontend side
  const calculateTotal = () => {
    if (!cart || !cart.items) return 0;
    return cart.items.reduce((acc, item) => acc + (item.product.price * item.quantity), 0).toFixed(2);
  };

  // Render a friendly loader if the authentication context is still processing
  if (!user) return <div className="text-center py-20 text-xl font-semibold">Authenticating user profile...</div>;
  if (loading) return <div className="text-center py-20 text-xl font-semibold">Loading your cart...</div>;
  if (error) return <div className="text-center py-20 text-red-500 font-medium">{error}</div>;

  return (
    <div className="bg-gray-50 min-h-screen mt-20 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Cartsteps currentStep={1} />
        <h1 className="text-3xl font-bold text-gray-900 mb-8 border-b pb-4">Shopping Cart</h1>

        {!cart || cart.items.length === 0 ? (
          <div className="bg-white p-8 rounded-xl shadow-sm text-center border">
            <p className="text-gray-500 text-lg mb-4">Your shopping cart is empty.</p>
            <button onClick={() => navigate('/')} className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition">
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* List of Cart Cards */}
            <div className="lg:col-span-2 space-y-4">
              {cart.items.map((item) => (
                <div 
                  key={`${item.product._id}-${item.size}`} 
                  className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4 transition hover:shadow-md"
                >
                  {/* Product Image */}
                  <img 
                    src={item.product.image} 
                    alt={item.product.name} 
                    className="w-24 h-24 object-cover rounded-lg bg-gray-100 flex-shrink-0"
                  />

                  {/* Core Product Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-gray-900 truncate">
                      {item.product.name}
                    </h3>
                    <p className="text-sm font-medium text-gray-500 mt-1">
                      ₹{item.product.price.toFixed(2)}
                    </p>

                    {/* Inline Size Selector Drops Menu */}
                    <div className="flex items-center space-x-2 mt-2">
                      <span className="text-xs font-medium text-gray-400">Size:</span>
                      <select 
                        value={item.size}
                        onChange={(e) => handleSizeEdit(item.product._id, item.size, e.target.value)}
                        className="text-xs bg-gray-50 border border-gray-200 rounded px-2 py-1 font-semibold text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        {availableSizes.map((sz) => (
                          <option key={sz} value={sz}>{sz}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Quantity Adjuster Counter and Delete Section */}
                  <div className="flex flex-col items-end space-y-3">
                    {/* Trash Can Delete Button */}
                    <button 
                      onClick={() => handleItemDelete(item.product._id, item.size)}
                      className="text-gray-400 hover:text-red-500 p-1 rounded transition"
                      title="Remove item"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-16v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>

                    {/* Quantity Incrementor Controls */}
                    <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50">
                      <button 
                        onClick={() => handleQuantityChange(item.product._id, item.size, 'decrease')}
                        className="px-2 py-1 text-gray-500 hover:bg-gray-200 hover:text-gray-700 font-bold transition rounded-l-lg"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 text-sm font-semibold text-gray-800 bg-white border-x border-gray-200 min-w-[2rem] text-center">
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => handleQuantityChange(item.product._id, item.size, 'increase')}
                        className="px-2 py-1 text-gray-500 hover:bg-gray-200 hover:text-gray-700 font-bold transition rounded-r-lg"
                      >
                        +
                      </button>
                    </div>
                  </div>

                </div>
              ))}
            </div>

            {/* Order Summary Checkout Panel */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit space-y-4">
              <h2 className="text-xl font-bold text-gray-900 border-b pb-3">Order Summary</h2>
              <div className="flex justify-between items-center text-sm font-medium text-gray-600">
                <span>Items Subtotal</span>
                <span>₹{calculateTotal()}</span>
              </div>
              <div className="flex justify-between items-center text-sm font-medium text-gray-600">
                <span>Shipping</span>
                <span className="text-green-600 font-semibold">FREE</span>
              </div>
              <hr className="border-gray-100" />
              <div className="flex justify-between items-center text-lg font-bold text-gray-900">
                <span>Total Amount</span>
                <span>₹{calculateTotal()}</span>
              </div>
              <button onClick={()=> navigate('/checkout/address')} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl shadow transition mt-2">
                Proceed to Checkout
              </button>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
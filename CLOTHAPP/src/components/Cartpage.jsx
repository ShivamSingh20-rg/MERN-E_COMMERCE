 import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/Authcontext';
import { API_URL } from '../Context/Apiurl';
import Cartsteps from './Cartsteps';
import { Trash2, Plus, Minus } from 'lucide-react';

export default function Cartpage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('jwt');

  useEffect(() => {
    if (!user) return;

    const fetchCart = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await axios.get(`${API_URL}/cart/get`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCart(res.data);
      } catch (err) {
        console.error('Error fetching cart:', err);
        setError('Failed to load your shopping bag.');
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [user, token]);

  const updateQuantity = async (productId, size, action) => {
    try {
      const res = await axios.put(
        `${API_URL}/cart/UpdateQuantity`,
        { productId, size, action },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCart(res.data);
    } catch (err) {
      console.error('Quantity update failed:', err);
    }
  };

  const removeItem = async (productId, size) => {
    try {
      const res = await axios.delete(`${API_URL}/cart/delete`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { productId, size },
      });

      setCart(res.data);
    } catch (err) {
      console.error('Item removal failed:', err);
    }
  };

  const total = useMemo(() => {
    return cart?.items?.reduce((sum, item) => {
      return sum + item.product.price * item.quantity;
    }, 0) || 0;
  }, [cart]);

  if (!user) {
    return (
      <div className="text-center pt-32 text-lg font-medium">
        Loading profile...
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center pt-32">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-coral border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-32 text-center text-red-500 font-medium">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ivory px-4 pb-16 pt-28">
      <div className="mx-auto max-w-6xl">
        <Cartsteps currentStep={1} />

        <h1 className="mb-8 bg-gradient-to-r from-electric to-coral bg-clip-text text-3xl font-black text-transparent">
          Your Shopping Bag
        </h1>

        {!cart?.items?.length ? (
          <div className="rounded-2xl bg-white py-20 text-center shadow-sm">
            <p className="text-gray-500">Your bag feels light ✨</p>
            <button
              onClick={() => navigate('/shop')}
              className="mt-4 rounded-full bg-ebony px-6 py-2 text-white transition hover:bg-coral"
            >
              Shop now
            </button>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="space-y-4 lg:col-span-2">
              {cart.items.map((item) => (
                <div
                  key={`${item.product._id}-${item.size}`}
                  className="flex gap-4 rounded-2xl bg-white p-4 shadow-sm transition animate-fade-up"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="h-24 w-24 rounded-xl object-cover"
                  />

                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold">{item.product.name}</h3>
                    <p className="text-sm font-semibold text-electric">
                      Size: {item.size}
                    </p>

                    <div className="mt-2 flex items-center gap-4">
                      <div className="flex items-center rounded-full border">
                        <button
                          onClick={() => updateQuantity(item.product._id, item.size, 'decrease')}
                          className="px-2 py-1"
                        >
                          <Minus size={14} />
                        </button>

                        <span className="px-3">{item.quantity}</span>

                        <button
                          onClick={() => updateQuantity(item.product._id, item.size, 'increase')}
                          className="px-2 py-1"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.product._id, item.size)}
                        className="text-rose transition hover:opacity-80"
                        title="Remove item"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-lg font-black">
                      ₹{item.product.price * item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="sticky top-28 h-fit rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="text-xl font-black">Order Summary</h3>

              <div className="mt-4 flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold">₹{total}</span>
              </div>

              <div className="mt-2 flex justify-between text-green-600">
                <span>Shipping</span>
                <span>FREE</span>
              </div>

              <hr className="my-4" />

              <div className="flex justify-between text-xl font-black">
                <span>Total</span>
                <span className="text-coral">₹{total}</span>
              </div>

              <button
                onClick={() => navigate('/checkout/address')}
                className="mt-6 w-full rounded-full bg-ebony py-3 font-bold text-white transition hover:bg-coral"
              >
                Proceed to Checkout →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

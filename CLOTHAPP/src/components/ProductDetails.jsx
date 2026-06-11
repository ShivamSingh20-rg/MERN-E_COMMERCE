// src/pages/ProductDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
 
import { useAuth } from '../Context/Authcontext';
import { API_URL } from '../Context/Apiurl';

export default function ProductDetails() {
 
  const { id } = useParams(); // 🎯 Grabs product ID right from your active route path
  const navigate = useNavigate();
  const [isAdding, setIsAdding] = useState(false);
  const [message, setMessage] = useState({ text: "", isError: false });
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [loading, setLoading] = useState(true);
const [quantity, setQuantity] = useState(1);
const {user}= useAuth()
 const USER_ID = user?.id || user?._id;



  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${API_URL}/products/${id}`);
        setProduct(response.data);
        
        // Find the first size variant that actually has stock to select by default
        const firstAvailable = response.data.variants?.find(v => v.quantity > 0);
        if (firstAvailable) setSelectedSize(firstAvailable.size);
      } catch (err) {
        console.error("Error loading product information:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);


  const handleAddToCart = async () => {
    // 1. Force the user to choose a size configuration
    if (!selectedSize) {
      setMessage({ text: "Please select a size before adding to cart!", isError: true });
      return;
    }

    try {
      setIsAdding(true);
      setMessage({ text: "", isError: false });
const token = localStorage.getItem('jwt');
      const response = await axios.post( `${API_URL}/cart/add`,
        {
          productId: product._id,
          size: selectedSize,
          quantity: quantity
        } ,
        {
        headers: { Authorization: `Bearer ${token}` }
      }
      );

      // 3. Success Feedback
      setMessage({ text: `Successfully added ${quantity} item(s) (Size ${selectedSize}) to your cart!`, isError: false });

    } catch (err) {
      console.error("Add to cart frontend error:", err);
      setMessage({ 
        text: err.response?.data?.message || "Failed to add item to cart. Please log in.", 
        isError: true 
      });
    } finally {
      setIsAdding(false);
    }}

  if (loading) return <div className="text-center mt-32">Loading product data...</div>;
  if (!product) return <div className="text-center mt-32">Product not found.</div>;

  const activeVariant = product.variants?.find(v => v.size === selectedSize);
  const stockAvailable = activeVariant ? activeVariant.quantity : 0;

  return (
    <div className="max-w-5xl mx-auto px-4 pt-32 pb-12 grid grid-cols-1 md:grid-cols-2 gap-12">
      {/* 🎯 DISPLAY IMAGE LINK */}
      <div className="w-full aspect-[3/4] bg-gray-50 rounded-lg overflow-hidden">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
      </div>

      {/* 🎯 DISPLAY METADATA DETAILS */}
      <div className="space-y-6">
        <div>
          <span className="text-xs uppercase font-black tracking-widest text-gray-400">{product.gender} / {product.category}</span>
          <h1 className="text-3xl font-black uppercase tracking-wider text-black mt-1">{product.name}</h1>
          <p className="text-2xl font-extrabold text-gray-900 mt-2">₹{product.price}</p>
        </div>

        <p className="text-gray-600 leading-relaxed text-sm">{product.description}</p>

        {/* Dynamic Size Picker Matrix mapping */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Select Size Option</h3>
          <div className="flex gap-2">
            {product.variants?.map((v) => {
              const outOfStock = v.quantity === 0;
              return (
                <button
                  key={v.size}
                  disabled={outOfStock}
                  onClick={() => setSelectedSize(v.size)}
                  className={`px-4 py-2 text-xs font-bold border transition-all duration-200 
                    ${outOfStock ? 'bg-gray-50 text-gray-300 border-gray-100 cursor-not-allowed line-through' : ''}
                    ${selectedSize === v.size ? 'bg-black text-white border-black' : 'bg-white text-black border-gray-200 hover:border-black'}
                  `}
                >
                  {v.size}
                </button>
              );
            })}
          </div>
        </div>

        {/* Real-time Inventory Feedback */}
        <div className="text-xs">
          {stockAvailable > 0 ? (
            <p className="text-green-600 font-bold">✔️ In Stock ({stockAvailable} remaining)</p>
          ) : (
            <p className="text-red-500 font-bold">❌ Out of Stock for this size profile selection</p>
          )}
        </div>

        {/* Action Button */}
        <div>
{message.text && (
            <div className={`p-3 rounded-lg text-sm font-medium mb-4 ${
              message.isError ? "bg-red-50 text-red-600 border border-red-100" : "bg-green-50 text-green-700 border border-green-100"
            }`}>
              {message.text}
            </div>
          )}

        <button
          onClick={() => user ? handleAddToCart() : navigate('/login')}
          disabled={stockAvailable === 0}
          className={`w-full py-4 text-xs font-black tracking-widest uppercase transition-colors
            ${stockAvailable === 0 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-black text-white hover:bg-gray-900'}
          `}
        >
          {stockAvailable === 0 ? 'Sold Out' : 'Add to Shopping Bag'}
        </button>
        </div>
      </div>
    </div>
  );
}
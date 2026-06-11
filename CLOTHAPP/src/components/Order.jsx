import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from './CartContext';
import { API_URL } from '../Context/Apiurl';
import Cartsteps from './Cartsteps';





export default function Order() {
  const { cart, setCart } = useCart();
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const token = localStorage.getItem('jwt');
        const response = await axios.get(`${API_URL}/address/get`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log(response.data)
        setAddresses(response.data);
        // Automatically select the most recent one if available
        if (response.data.length > 0) setSelectedAddressId(response.data[0]._id);
      } catch (err) {
        console.error("Error loading addresses:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAddresses();
  }, []);

 

  const calculateTotal = () => {
    if (!cart || !cart.items) return 0;
    return cart.items.reduce((acc, item) => acc + (item.product.price * item.quantity), 0).toFixed(2);
  };

 
  const handleFinalCheckout = async () => {
    if (!selectedAddressId) {
       alert("Please select a delivery address to proceed!");
      return;   }

    
      const chosenAddress = addresses.find(addr => addr._id === selectedAddressId);
navigate('/payment', { state: { shippingAddress: chosenAddress } });
     
  };

  if (loading) return <div className="text-center py-32 text-sm font-bold uppercase tracking-widest text-gray-400">Loading Address Book...</div>;

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen pt-28 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Step Indicator (Kept on Step 2 as it is part of Address Confirmation) */}
        <div className="bg-white py-6 px-4 rounded-xl border border-gray-100 shadow-sm mb-8">
          <Cartsteps currentStep={3} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* LEFT SIDE: SAVED ADDRESS SELECTOR MATRIX */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex justify-between items-center mb-2">
              <div>
                <h2 className="text-xl font-black uppercase tracking-wider text-gray-900">Select Delivery Address</h2>
                <p className="text-xs text-gray-400 mt-0.5">Choose an address from your saved directory below.</p>
              </div>
              <button 
                onClick={() => navigate('/checkout/address')} 
                className="text-xs font-black uppercase tracking-widest border border-black px-4 py-2 hover:bg-black hover:text-white transition-all duration-200 rounded-md"
              >
                + Add New
              </button>
            </div>

            {addresses.length === 0 ? (
              <div className="bg-white p-8 border rounded-xl text-center text-gray-500 text-sm font-medium">
                No addresses saved on profile. Click "+ Add New" to save one.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {addresses.map((addr) => {
                  const isSelected = selectedAddressId === addr._id;
                  return (
                    <div 
                      key={addr._id}
                      onClick={() => setSelectedAddressId(addr._id)}
                      className={`p-5 rounded-xl border transition-all duration-200 cursor-pointer flex justify-between items-start ${
                        isSelected 
                          ? 'bg-white border-black ring-1 ring-black shadow-md' 
                          : 'bg-white border-gray-200 hover:border-gray-400 shadow-sm'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-sm text-gray-900 uppercase tracking-wide">{addr.fullName}</p>
                          {isSelected && <span className="bg-black text-white text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full">Selected</span>}
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed">{addr.street}, {addr.city}, {addr.state} - <span className="font-mono">{addr.pincode}</span></p>
                        <p className="text-xs text-gray-400 font-medium">Phone: <span className="font-mono text-gray-700">{addr.phone}</span></p>
                      </div>

                      {/* Custom Modern Radio Visual Node */}
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${isSelected ? 'border-black bg-black' : 'border-gray-300'}`}>
                        {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm space-y-5 sticky top-28">
            <h2 className="text-xs font-black uppercase tracking-widest text-gray-400 border-b border-gray-100 pb-3">Order Summary</h2>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-gray-500">
                <span>Items Subtotal</span>
                <span className="font-mono text-gray-900 font-black">₹{calculateTotal()}</span>
              </div>
              <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-gray-500">
                <span>Estimated Shipping</span>
                <span className="text-emerald-600 font-extrabold tracking-widest">FREE</span>
              </div>
            </div>
            
            <hr className="border-gray-100" />
            
            <div className="flex justify-between items-center text-gray-900">
              <span className="text-xs font-black uppercase tracking-widest">Total Amount</span>
              <span className="text-xl font-black font-mono">₹{calculateTotal()}</span>
            </div>

            <button 
              type="button"
              onClick={handleFinalCheckout}
              disabled={isSubmitting || addresses.length === 0}
              className="w-full bg-black text-white py-4 text-xs font-black tracking-widest uppercase rounded-lg shadow-md hover:bg-neutral-800 active:scale-[0.99] disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isSubmitting ? 'Placing Order...' : 'Confirm & Place Order'}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
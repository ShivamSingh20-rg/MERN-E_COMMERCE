// src/components/ProfileDrawer.js
import React, { useState } from 'react';
import { X, LogOut, Package, MapPin, Save } from 'lucide-react';

export default function ProfileDrawer({ isOpen, onClose, user, setUser, onLogout }) {
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [addressForm, setAddressForm] = useState({
    address: user?.address || '',
    city: user?.city || '',
    postalCode: user?.postalCode || ''
  });

  if (!isOpen || !user) return;

  const handleInputChange = (e) => {
    setAddressForm({ ...addressForm, [e.target.name]: e.target.value });
  };

  const handleSaveAddress = (e) => {
    e.preventDefault();
    setUser({
      ...user,
      address: addressForm.address,
      city: addressForm.city,
      postalCode: addressForm.postalCode
    });
    setIsEditingAddress(false);
    alert("Delivery parameters updated successfully!");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Background Dimmer Overlay */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        {/* Sliding Panel Window */}
        <div className="w-screen max-w-md bg-white border-l border-gray-200 shadow-2xl flex flex-col justify-between">
          
          {/* Main Body Section */}
          <div className="flex-1 py-6 overflow-y-auto px-6 sm:px-8">
            
            {/* Drawer Header Block */}
            <div className="flex items-center justify-between pb-6 border-b border-gray-100">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Customer Portal</p>
                <h2 className="text-xl font-black uppercase font-serif text-black mt-0.5">
                  Hello, {user.name}
                </h2>
              </div>
              <button onClick={onClose} className="text-gray-400 hover:text-black transition">
                <X size={20} />
              </button>
            </div>

            {/* Profile Contents Sections */}
            <div className="mt-8 space-y-8">
              
              {/* Part 1: Track Orders Panel */}
              <div>
                <h3 className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-black mb-3">
                  <Package size={14} />
                  <span>My Orders</span>
                </h3>
                <div className="bg-gray-50 border border-gray-100 p-4 rounded-none text-center">
                  <p className="text-xs text-gray-500">Order #19204 — Processing Delivery</p>
                  <span className="text-[10px] bg-black text-white px-2 py-0.5 uppercase tracking-wide font-bold mt-2 inline-block">
                    In Transit
                  </span>
                </div>
              </div>

              {/* Part 2: Saved Delivery Addresses Form Controller */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-black">
                    <MapPin size={14} />
                    <span>Delivery Details</span>
                  </h3>
                  {!isEditingAddress && (
                    <button 
                      onClick={() => setIsEditingAddress(true)}
                      className="text-[11px] font-bold text-gray-400 hover:text-black underline uppercase tracking-wider"
                    >
                      Edit Details
                    </button>
                  )}
                </div>

                {!isEditingAddress ? (
                  <div className="border border-gray-200 p-4 space-y-1 text-sm text-gray-700 bg-white">
                    <p className="font-semibold text-black">{user.name}</p>
                    <p>{user.address}</p>
                    <p>{user.city}, {user.postalCode}</p>
                  </div>
                ) : (
                  <form onSubmit={handleSaveAddress} className="space-y-3 bg-gray-50 p-4 border border-gray-200">
                    <div>
                      <label className="block text-[9px] font-bold uppercase text-gray-400 mb-1">Street Address</label>
                      <input 
                        type="text" name="address" value={addressForm.address} onChange={handleInputChange} required
                        className="w-full bg-white border border-gray-300 px-3 py-2 text-xs focus:outline-none focus:border-black"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[9px] font-bold uppercase text-gray-400 mb-1">City</label>
                        <input 
                          type="text" name="city" value={addressForm.city} onChange={handleInputChange} required
                          className="w-full bg-white border border-gray-300 px-3 py-2 text-xs focus:outline-none focus:border-black"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-bold uppercase text-gray-400 mb-1">Postal Code</label>
                        <input 
                          type="text" name="postalCode" value={addressForm.postalCode} onChange={handleInputChange} required
                          className="w-full bg-white border border-gray-300 px-3 py-2 text-xs focus:outline-none focus:border-black"
                        />
                      </div>
                    </div>
                    <div className="flex space-x-2 pt-2">
                      <button 
                        type="submit"
                        className="flex-1 bg-black text-white text-[10px] font-bold uppercase tracking-wider py-2 flex items-center justify-center space-x-1 hover:bg-gray-800 transition"
                      >
                        <Save size={12} />
                        <span>Save Address</span>
                      </button>
                      <button 
                        type="button" onClick={() => setIsEditingAddress(false)}
                        className="px-3 border border-gray-300 text-[10px] font-bold uppercase text-gray-500 hover:text-black transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>

            </div>
          </div>

          {/* Drawer Footer (System Log-out Actions Trigger) */}
          <div className="border-t border-gray-100 p-6 bg-gray-50 flex space-x-3">
            <button 
              onClick={onClose}
              className="flex-1 border border-black text-black py-3 text-xs font-bold uppercase tracking-widest text-center hover:bg-black hover:text-white transition duration-300"
            >
              Return To Shop
            </button>
            <button 
              onClick={onLogout}
              className="flex-1 bg-red-600 text-white py-3 text-xs font-bold uppercase tracking-widest flex items-center justify-center space-x-2 hover:bg-red-700 transition"
            >
              <LogOut size={14} />
              <span>Log Out</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
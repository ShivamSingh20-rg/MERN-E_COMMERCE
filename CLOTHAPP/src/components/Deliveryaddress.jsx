import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "./CartContext";
import { API_URL } from "../Context/Apiurl";
import Cartsteps from "./Cartsteps";

export default function Deliveryaddress() {
  const { cart, setCart } = useCart();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
  });

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const token = localStorage.getItem("jwt");

      await axios.post(`${API_URL}/address/add`, address, {
        headers: { Authorization: `Bearer ${token}` },
      });

      navigate("/checkout/orders");
    } catch (err) {
      console.error("Error saving address:", err);
      alert("Failed to save address. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculateTotal = () => {
    if (!cart || !cart.items) return 0;
    return cart.items
      .reduce((acc, item) => acc + item.product.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen pt-28 pb-16 px-4 sm:px-6 lg:px-8 animate-fadeIn">
      <div className="max-w-5xl mx-auto">
        {/* Progress Tracker Block */}
        <div className="bg-white py-6 px-4 rounded-xl border border-gray-100 shadow-sm mb-8">
          <Cartsteps currentStep={2} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* LEFT SIDE: PREMIUM ADDRESS FORM */}
          <div className="lg:col-span-2">
            <form
              onSubmit={handlePlaceOrder}
              className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm space-y-6"
            >
              <div>
                <h2 className="text-xl font-black uppercase tracking-wider text-gray-900">
                  Delivery Details
                </h2>
                <p className="text-xs text-gray-400 mt-1">
                  Please enter your accurate shipping address to avoid transit
                  delays.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="sm:col-span-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500 block mb-1.5">
                    Full Name
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. John Doe"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3.5 text-sm transition-all focus:bg-white focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                    value={address.fullName}
                    onChange={(e) =>
                      setAddress({ ...address, fullName: e.target.value })
                    }
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500 block mb-1.5">
                    Street Address
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Apartment, suite, unit, building, floor, etc."
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3.5 text-sm transition-all focus:bg-white focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                    value={address.street}
                    onChange={(e) =>
                      setAddress({ ...address, street: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500 block mb-1.5">
                    City
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Mumbai"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3.5 text-sm transition-all focus:bg-white focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                    value={address.city}
                    onChange={(e) =>
                      setAddress({ ...address, city: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500 block mb-1.5">
                    State
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Maharashtra"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3.5 text-sm transition-all focus:bg-white focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                    value={address.state}
                    onChange={(e) =>
                      setAddress({ ...address, state: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500 block mb-1.5">
                    Pincode
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="400001"
                    maxLength={6}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3.5 text-sm transition-all focus:bg-white focus:outline-none focus:border-black focus:ring-1 focus:ring-black font-mono tracking-widest"
                    value={address.pincode}
                    onChange={(e) =>
                      setAddress({ ...address, pincode: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500 block mb-1.5">
                    Phone Number
                  </label>
                  <input
                    required
                    type="tel"
                    placeholder="9876543210"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3.5 text-sm transition-all focus:bg-white focus:outline-none focus:border-black focus:ring-1 focus:ring-black font-mono"
                    value={address.phone}
                    onChange={(e) =>
                      setAddress({ ...address, phone: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Action Interactive Navigation Blocks */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => navigate("/cart")}
                  className="group flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-500 hover:text-black transition-colors duration-200 py-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 transform group-hover:-translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  Return To Bag
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto bg-black text-white px-10 py-4 text-xs font-black tracking-widest uppercase rounded-lg shadow-md hover:bg-neutral-800 active:scale-[0.99] disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200"
                >
                  {isSubmitting ? "Processing Order..." : "Confirm Address"}
                </button>
                         <button
              type="button"
            onClick={() => navigate('/checkout/orders')}
              className="w-full sm:w-auto bg-black text-white px-10 py-4 text-xs font-black uppercase rounded-lg  transition-all duration-200"
            >
              Already Added
            </button>
              </div>
            </form>
   
          </div>

          {/* RIGHT SIDE: MODERN SUMMARY PANEL */}
          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm space-y-5 sticky top-28">
            <h2 className="text-xs font-black uppercase tracking-widest text-gray-400 border-b border-gray-100 pb-3">
              Order Summary
            </h2>

            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-gray-500">
                <span>Items Subtotal</span>
                <span className="font-mono text-gray-900 font-black">
                  ₹{calculateTotal()}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-gray-500">
                <span>Estimated Shipping</span>
                <span className="text-emerald-600 font-extrabold tracking-widest">
                  FREE
                </span>
              </div>
            </div>

            <hr className="border-gray-100" />

            <div className="flex justify-between items-center text-gray-900">
              <span className="text-xs font-black uppercase tracking-widest">
                Total Amount
              </span>
              <span className="text-xl font-black font-mono">
                ₹{calculateTotal()}
              </span>
            </div>

            {/* Seamless Visual Trust Element Badge */}
            <div className="bg-neutral-50 rounded-lg p-4 border border-neutral-100 flex items-start gap-3 mt-2">
              <div className="p-2 bg-black text-white rounded-md mt-0.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900">
                  Payment Secured
                </h4>
                <p className="text-[11px] text-gray-400 mt-0.5 leading-relaxed">
                  This order qualifies for Cash on Delivery processing
                  automatically.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

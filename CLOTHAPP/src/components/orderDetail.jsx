import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {API_URL} from '../Context/Apiurl'
const OrderDetail = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('jwt');  

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`${API_URL}/orders/${orderId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOrder(response.data);
        console.log('hello',response.data)
      } catch (err) {
        console.error("Error pulling order details metadata:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrderDetails();
  }, [orderId]);

  if (loading) return <div className="text-center py-20 text-xs font-bold tracking-widest uppercase">Loading Tracking State...</div>;
  if (!order) return <div className="text-center py-20 text-xs font-bold tracking-widest uppercase">Order record context lost.</div>;
  const steps = ['Placed', 'Confirmed', 'Shipped', 'Delivered'];
  
   
  const currentStatus = order.orderStatus || 'Placed';
  const isCancelled = currentStatus.toLowerCase() === 'cancelled';
  const currentStepIndex = steps.findIndex(s => s.toLowerCase() === currentStatus.toLowerCase());

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4 py-10 font-sans text-neutral-800">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-6 mb-8 gap-4">
        <div>
          <button 
            onClick={() => navigate('/orders')}
            className="text-xs font-black tracking-wider uppercase underline hover:text-neutral-500 transition-all mb-2 inline-block"
          >
            ← Back to All Orders
          </button>
          <h1 className="text-xl sm:text-2xl font-black uppercase tracking-wider">Order #{order._id.slice(-8).toUpperCase()}</h1>
          <p className="text-xs text-neutral-400 mt-1">Placed on: {new Date(order.createdAt).toLocaleDateString()}</p>
        </div>
        <div className="bg-neutral-100 px-4 py-2 rounded-md">
          <span className="text-xs uppercase font-black tracking-widest block text-center text-neutral-500">Payment Status</span>
          <span className="text-sm font-bold block text-center uppercase tracking-wide text-green-600 mt-0.5">{order.paymentStatus || 'Paid'}</span>
        </div>
      </div>

      {/* 🚀 STEP 1: STATUS TRACKING PROGRESS TIMELINE BAR */}
      <div className="bg-white border rounded-xl p-6 mb-8 shadow-sm">
        <h3 className="text-xs font-black uppercase tracking-widest text-neutral-400 mb-8">Order Logistics Flow Tracker</h3>
        
        {isCancelled ? (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg text-xs font-black tracking-wider uppercase text-center">
            ❌ This transaction order sequence has been flagged as Cancelled.
          </div>
        ) : (
          <div className="relative flex justify-between items-center w-full max-w-2xl mx-auto px-2">
            {/* Background tracking line block links */}
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-neutral-200 z-0"></div>
            <div 
              className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-black transition-all duration-500 z-0"
              style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
            ></div>

            {/* Stepper Node Mapping */}
            {steps.map((step, idx) => {
              const isCompleted = idx <= currentStepIndex;
              return (
                <div key={step} className="flex flex-col items-center relative z-10">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${
                    isCompleted ? 'bg-black text-white scale-110 shadow-md' : 'bg-neutral-200 text-neutral-400'
                  }`}>
                    {isCompleted ? '✓' : idx + 1}
                  </div>
                  <span className={`text-[10px] font-black tracking-wider uppercase mt-3 ${
                    isCompleted ? 'text-black' : 'text-neutral-400'
                  }`}>
                    {step}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column: Summary Item Lists */}
        <div className="md:col-span-2 space-y-4">
          <div className="bg-white border rounded-xl p-6 shadow-sm">
            <h3 className="text-xs font-black uppercase tracking-widest text-neutral-400 mb-4">Items Summary</h3>
            <div className="divide-y">
              {order.items?.map((item, index) => (
                <div key={index} className="flex py-4 first:pt-0 last:pb-0 gap-4">
                  <img 
                    src={item.product?.image} 
                    alt={item.product?.name} 
                    className="w-16 h-20 object-cover rounded bg-neutral-50 border"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-sm font-black uppercase tracking-wide">{item.product?.name}</h4>
                      <p className="text-xs text-neutral-400 mt-0.5">Size variant chosen: <span className="font-bold text-neutral-700">{item.size || 'N/A'}</span></p>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-neutral-500">Qty: {item.quantity}</span>
                      <span className="text-sm font-bold">₹{(item.product?.price * item.quantity).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t mt-4 pt-4 flex justify-between items-center font-black uppercase tracking-wide text-sm">
              <span>Gross Total Paid</span>
              <span>₹{Number(order.totalAmount).toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Address and Phone Metadata Details Card Layout */}
        <div className="md:col-span-1 space-y-4">
          <div className="bg-white border rounded-xl p-6 shadow-sm">
            <h3 className="text-xs font-black uppercase tracking-widest text-neutral-400 mb-4">Delivery Coordinates</h3>
            
            <div className="space-y-4 text-xs tracking-wide">
              <div>
                <span className="block text-[10px] font-black uppercase text-neutral-400 mb-0.5">Recipient Full Name</span>
                <span className="font-bold uppercase text-sm block">{order.shippingAddress?.fullName || 'Customer Profile'}</span>
              </div>

              <div>
                <span className="block text-[10px] font-black uppercase text-neutral-400 mb-0.5">Physical Address Details</span>
                <p className="text-neutral-600 leading-relaxed font-medium">
                  {order.shippingAddress?.streetAddress || order.shippingAddress?.address}<br />
                  {order.shippingAddress?.city}, {order.shippingAddress?.state}<br />
                  PIN Postal Code: <span className="font-bold text-neutral-800">{order.shippingAddress?.pinCode || order.shippingAddress?.zipCode}</span>
                </p>
              </div>

              <div className="border-t pt-3 mt-3">
                <span className="block text-[10px] font-black uppercase text-neutral-400 mb-1">Direct Contact Phone Number</span>
                <div className="flex items-center gap-2 bg-neutral-50 border p-2.5 rounded-lg">
                  <span className="text-base">📞</span>
                  <span className="font-black text-sm tracking-widest text-neutral-800">
                    {order.shippingAddress?.phone || order.shippingAddress?.phoneNumber || 'No Contact Provided'}
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
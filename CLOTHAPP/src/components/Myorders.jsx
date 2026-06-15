import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../Context/Apiurl';
import {useNavigate} from 'react-router-dom'
export default function Myorders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
const navigate = useNavigate()
  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const token = localStorage.getItem('jwt');
        const response = await axios.get(`${API_URL}/orders/myorders`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOrders(response.data);
        console.log(response.data);
      } catch (err) {
        console.error("Error reading order history catalog metrics:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserOrders();
  }, []);
 useEffect(() => {
   
    window.history.pushState(null, null, window.location.href);
    
    const handlePopState = () => {
      navigate('/', { replace: true });
    };

    window.addEventListener('popstate', handlePopState);
    
    return () => window.removeEventListener('popstate', handlePopState);
  }, [navigate]);
  
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Delivered': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Shipped': return 'bg-blue-50 text-blue-700 border-blue-200';
      default: return 'bg-amber-50 text-amber-700 border-amber-200';  
    }
  };

  if (loading) return <div className="text-center py-32 text-sm font-bold uppercase tracking-widest text-gray-400">Syncing History Ledger...</div>;

  return (
    <div className="bg-gray-50 min-h-screen pt-28 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h2 className="text-2xl font-black uppercase tracking-wider text-gray-900">Your Purchases</h2>
          <p className="text-xs text-gray-400 mt-1">Track and audit status indicators of your placed orders.</p>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white p-12 border border-gray-100 rounded-xl shadow-sm text-center">
            <p className="text-gray-400 text-sm font-bold uppercase tracking-wider">No historic orders found matching this login profile profile.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order._id} 
               onClick={() => navigate(`/orders/${order._id}`)} 
              className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
                
                <div className="bg-gray-50 border-b border-gray-100 p-4 flex flex-wrap gap-4 justify-between items-center text-xs">
                  <div className="space-y-1">
                    <p className="text-gray-400 font-bold uppercase">Order reference ID</p>
                    <p className="font-mono font-bold text-gray-900">{order._id.slice(-8).toUpperCase()}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-400 font-bold uppercase">Placed On</p>
                    <p className="text-gray-800 font-medium">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-400 font-bold uppercase">Billing Amount</p>
                    <p className="font-mono font-black text-gray-900">₹{order.totalAmount}</p>
                  </div>
                  
             
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${getStatusStyle(order.status)}`}>
                    {order.status}
                  </span>
                </div>

             
                <div className="p-4 divide-y divide-gray-100">
                  {order.items.map((item,index) => (
                    <div 
                    key={index}
   className="flex items-center space-x-4 py-3 first:pt-0 last:pb-0">
                      <img 
                        src={item.product?.image} 
                        alt="" 
                        className="w-14 h-14 object-cover border rounded-md bg-gray-50" 
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-black text-gray-900 uppercase truncate">{item.product?.name || 'Archived Product'}</p>
                        <p className="text-[11px] text-gray-400 mt-0.5">Size: <span className="font-bold text-gray-700">{item.size}</span> | Qty: <span className="font-bold text-gray-700">{item.quantity}</span></p>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

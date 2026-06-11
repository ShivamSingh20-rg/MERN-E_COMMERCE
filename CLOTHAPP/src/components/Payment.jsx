import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from './CartContext';
import { API_URL } from '../Context/Apiurl';
import Cartsteps from './Cartsteps';

export default function Payment() {
  const { cart, setCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [paymentMethod, setPaymentMethod] = useState('COD'); 
  const [isProcessing, setIsProcessing] = useState(false);
  
   
  const [lockedTotal, setLockedTotal] = useState("0.00");

  const shippingAddress = location.state?.shippingAddress;

  // 1. Calculate and freeze the amount once the component loads
  useEffect(() => {
    if (cart && cart.items && cart.items.length > 0) {
      const total = cart.items.reduce((acc, item) => { 
        const price = item.product && item.product.price ? Number(item.product.price) : 0;
        const quantity = item.quantity ? Number(item.quantity) : 0;
        return acc + (price * quantity);
      }, 0).toFixed(2);
      
      setLockedTotal(total);
    }
  }, [cart]);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleCheckoutSubmission = async () => {
  
    if (parseFloat(lockedTotal) <= 0) {
      alert("Cannot process a checkout transaction loop value for an empty cart configuration.");
      return;
    }

    setIsProcessing(true);
    const token = localStorage.getItem('jwt');  
    // --- CASE 1: CASH ON DELIVERY ---
    if (paymentMethod === 'COD') {
      try {
        const res = await axios.post(`${API_URL}/orders/savecod`, {
          items: cart.items, 
          shippingAddress, 
          totalAmount: lockedTotal  
        }, { headers: { Authorization: `Bearer ${token}` } });

        if (res.data.success) {
          setCart({ items: [] });
          navigate('/myorders');
        }
      } catch (err) {
        alert("COD Checkout run failure.");
      } finally {
        setIsProcessing(false);
      }
      return;
    }

    // --- CASE 2: ONLINE GATEWAY (RAZORPAY) ---
    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      alert("Razorpay payment gateway failed to load. Are you offline?");
      setIsProcessing(false);
      return;
    }

    try {
      // 💡 Passed your Auth Token Header context wrapper layout down here securely
      const orderConfig = await axios.post(`${API_URL}/orders/create-razorpay-intent`, { 
        totalAmount: lockedTotal 
      }, { 
        headers: { Authorization: `Bearer ${token}` } 
      });

      const { id: gatewayOrderId, currency } = orderConfig.data.gatewayOrder;

      const checkoutOptions = {
        key: "rzp_test_SvIPe997qXNEYQ",  
        amount: Math.round(parseFloat(lockedTotal) * 100), // Ensures parsing evaluates to clean integers
        currency: currency,
        name: "E-Commerce Store",
        description: "Secure Order Checkout Payment",
        order_id: gatewayOrderId,
        handler: async function (response) {
          try {
            const confirmation = await axios.post(`${API_URL}/orders/saveonline`, {
              items: cart.items,
              shippingAddress,
              totalAmount: lockedTotal,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            }, { headers: { Authorization: `Bearer ${token}` } });

            if (confirmation.data.success) {
              setCart({ items: [] });
              navigate('/myorders');
            }
          } catch (verificationError) {
            alert("Payment token parsing authentication signature failure.");
          }
        },
        prefill: { 
          name: shippingAddress?.fullName || "User", 
          contact: shippingAddress?.phone || "" 
        },
        theme: { color: "#000000" }
      };

      const gatewayInstance = new window.Razorpay(checkoutOptions);
      gatewayInstance.open();
    } catch (err) {
      console.error(err);
      alert("Error generating online gateway interface execution loop.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen pt-28 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white py-6 px-4 rounded-xl border border-gray-100 shadow-sm mb-8">
          <Cartsteps currentStep={4} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-black uppercase tracking-wider text-gray-900">Select Payment Gateway Method</h2>
            
            {/* COD Radio Select Option */}
            <div 
              onClick={() => setPaymentMethod('COD')}
              className={`p-5 rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-between bg-white ${paymentMethod === 'COD' ? 'border-black ring-1 ring-black shadow-md' : 'border-gray-200 shadow-sm'}`}
            >
              <div>
                <p className="font-bold text-sm text-gray-900 uppercase">Cash On Delivery (COD)</p>
                <p className="text-xs text-gray-400 mt-0.5">Pay with hard currency physical cash directly at your doorstep during parcel hand-off drop.</p>
              </div>
              <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${paymentMethod === 'COD' ? 'border-black bg-black' : 'border-gray-300'}`}>
                {paymentMethod === 'COD' && <div className="w-2 h-2 rounded-full bg-white" />}
              </div>
            </div>

            {/* Online Payment Radio Select Option */}
            <div 
              onClick={() => setPaymentMethod('Online')}
              className={`p-5 rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-between bg-white ${paymentMethod === 'Online' ? 'border-black ring-1 ring-black shadow-md' : 'border-gray-200 shadow-sm'}`}
            >
              <div>
                <p className="font-bold text-sm text-gray-900 uppercase">UPI / Cards / NetBanking (Razorpay)</p>
                <p className="text-xs text-gray-400 mt-0.5">Process instantly via protected credit tokens, native cards, or smartphone applications smoothly.</p>
              </div>
              <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${paymentMethod === 'Online' ? 'border-black bg-black' : 'border-gray-300'}`}>
                {paymentMethod === 'Online' && <div className="w-2 h-2 rounded-full bg-white" />}
              </div>
            </div>
          </div>

          {/* Checkout Breakdown Sidebar */}
          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm space-y-5 sticky top-28">
            <h2 className="text-xs font-black uppercase tracking-widest text-gray-400 border-b border-gray-100 pb-3">Final Breakdown</h2>
            <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-gray-500">
              <span>Items Total Payable</span>
              <span className="font-mono text-gray-900 font-black">₹{lockedTotal}</span>
            </div>
            <hr className="border-gray-100" />
            <div className="flex justify-between items-center text-gray-900 mb-4">
              <span className="text-xs font-black uppercase tracking-widest">Total Amount</span>
              <span className="text-xl font-black font-mono">₹{lockedTotal}</span>
            </div>

            <button 
              type="button"
              disabled={isProcessing || parseFloat(lockedTotal) <= 0}
              onClick={handleCheckoutSubmission}
              className="w-full bg-black text-white py-4 text-xs font-black tracking-widest uppercase rounded-lg shadow-md hover:bg-neutral-800 transition-all duration-200 disabled:bg-gray-200 disabled:text-gray-400"
            >
              {isProcessing ? 'Processing Transaction...' : 'Authorize Purchase'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
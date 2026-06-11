// src/pages/SignupPage.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, ArrowRight } from 'lucide-react';
import {useAuth} from '../Context/Authcontext'
export default function SignupPage() {
  const navigate = useNavigate();
  const{register} = useAuth();
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
 
  };
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
  e.preventDefault(); 
  setError("");

  try {
    // Verify our context values exist before dispatching
    console.log("Form values being sent:", formData);

    // Dispatch payload directly into our hook instance
    await register(formData.fullName, formData.email, formData.password,);
    
    // Smoothly route  
  } catch (err) {
    // This catches both local code execution bugs AND backend rejections!
    console.error("Caught Form Submission Error:", err);
    setError(err.message || "An unexpected configuration error occurred.");
  }
};
   
  return (

    <div className="min-h-screen flex items-center justify-center relative bg-gray-50 px-4 py-12">
      {/* Background Decor Layer with a subtle blur effect */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] blur-[1px]" />

      {/* Main Focus Wrapper Box */}
      <div className="w-full max-w-md bg-white p-8 border border-gray-200 relative z-10 shadow-sm">
        
        {/* Cut / Exit Button (Redirects back to shop homepage) */}
        <button 
          onClick={() => navigate('/')} 
          className="absolute top-4 right-4 text-gray-400 hover:text-black transition"
          aria-label="Exit Signup"
        >
          <X size={20} />
        </button>

        <div className="mb-8">
          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-1">
            Join The Collection
          </span>
          <h2 className="text-2xl font-black uppercase tracking-wide font-serif text-black">
            Register Account
          </h2>
        </div>

        <form onSubmit={ handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] font-bold uppercase text-gray-500 mb-1">Full Name</label>
            <input 
              type="text" required name="fullName" value={formData.fullName} onChange={handleChange}
              className="w-full border border-gray-300 rounded-none px-4 py-3 text-sm focus:outline-none focus:border-black transition"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase text-gray-500 mb-1">Email Address</label>
            <input 
              type="email" required name="email" value={formData.email} onChange={handleChange}
              className="w-full border border-gray-300 rounded-none px-4 py-3 text-sm focus:outline-none focus:border-black transition"
              placeholder="name@example.com"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase text-gray-500 mb-1">Password</label>
            <input 
              type="password" required name="password" value={formData.password} onChange={handleChange}
              className="w-full border border-gray-300 rounded-none px-4 py-3 text-sm focus:outline-none focus:border-black transition"
              placeholder="Minimum 8 characters"
            />
          </div>

          <p className="text-[11px] text-gray-400 leading-relaxed">
            By creating an account, you agree to our standard terms of service, privacy values, and dynamic checkout updates.
          </p>

          <button 
            type="submit"
            className="w-full bg-black text-white py-4 mt-2 text-xs font-bold uppercase tracking-widest flex items-center justify-center space-x-2 hover:bg-gray-900 border border-black transition"
          >
            <span>Create Account</span>
            <ArrowRight size={14} />
          </button>
        </form>

        <p className="text-center text-xs text-gray-500 mt-8 pt-4 border-t border-gray-100">
          Already a member?{' '}
          <Link to="/login" className="font-bold text-black underline hover:text-gray-700">
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
}
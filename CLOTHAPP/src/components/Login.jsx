// src/pages/LoginPage.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { X, ArrowRight } from "lucide-react";
import {useAuth} from '../Context/Authcontext'

export default function Login() {
const {login}= useAuth();
const [Errror,setErrror] = useState('')
  const handdlelogin = async(e)=>{
    e.preventDefault(); 
  setErrror("");

  try {
   
    console.log("Form values being sent:", formData);
    await login(formData.email, formData.password,);
    
    // Smoothly route  
  } catch (err) {
    // This catches both local code execution bugs AND backend rejections!
    console.error("Caught Form Submission Error:", err);
    setErrror(err.message || "An unexpected configuration error occurred.");
  }
  }
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

   
  return (
    <div className="min-h-screen flex items-center justify-center relative bg-gray-50 px-4 py-12">
      {/* Background Decor Layer with a subtle blur effect */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] blur-[1px]" />

      {/* Main Focus Wrapper Box */}
      <div className="w-full max-w-md bg-white p-8 border border-gray-200 relative z-10 shadow-sm">
        {/* Cut / Exit Button (Redirects back to shop homepage) */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 right-4 text-gray-400 hover:text-black transition"
          aria-label="Exit Login"
        >
          <X size={20} />
        </button>

        <div className="mb-8">
          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-1">
            Welcome Back
          </span>
          <h2 className="text-2xl font-black uppercase tracking-wide font-serif text-black">
            Account Log In
          </h2>
        </div>

        <form onSubmit={handdlelogin} className="space-y-4">
          <div>
            <label className="block text-[10px] font-bold uppercase text-gray-500 mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-none px-4 py-3 text-sm focus:outline-none focus:border-black transition"
              placeholder="name@example.com"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase text-gray-500 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-none px-4 py-3 text-sm focus:outline-none focus:border-black transition"
              placeholder="••••••••"
            />
          </div>

          <div className="text-right">
            <button
              type="button"
              className="text-[11px] text-gray-400 hover:text-black underline transition"
            >
              Forgot your password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-4 mt-2 text-xs font-bold uppercase tracking-widest flex items-center justify-center space-x-2 hover:bg-gray-900 border border-black transition"
          >
            <span>Sign In</span>
            <ArrowRight size={14} />
          </button>
        </form>

        <p className="text-center text-xs text-gray-500 mt-8 pt-4 border-t border-gray-100">
          New to our collections?{" "}
          <Link
            to="/signup"
            className="font-bold text-black underline hover:text-gray-700"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}

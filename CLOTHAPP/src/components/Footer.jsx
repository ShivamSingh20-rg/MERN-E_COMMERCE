// 🎯 Location: Frontend/src/components/Footer.jsx
import React, { useState } from 'react';
import {  ArrowRight } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      alert(`Thank you for subscribing with: ${email}`);
      setEmail('');
    }
  };

  return (
    <footer className="w-full bg-white border-t border-neutral-200 mt-20 font-sans text-black">
      {/* Top Section: Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-6">
          
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <a href="/" className="text-xl font-black tracking-widest uppercase font-serif">
              THREADED
            </a>
            <p className="text-xs text-neutral-500 font-medium leading-relaxed max-w-sm uppercase tracking-wide">
              Crafting premium essentials for the modern wardrobe. Minimalist designs, exceptional quality, sustainable practices.
            </p>
            
            {/* Social Media Links Layout */}
            <div className="flex space-x-4 pt-2">
              {/* Instagram (Supported natively by Lucide) */}
              <a href="#" className="text-neutral-400 hover:text-black transition-colors" aria-label="Instagram">
           
              </a>

              {/* Facebook (Custom SVG Override) */}
              <a href="#" className="text-neutral-400 hover:text-black transition-colors" aria-label="Facebook">
                <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                </svg>
              </a>

              {/* Twitter / X (Custom SVG Override) */}
              <a href="#" className="text-neutral-400 hover:text-black transition-colors" aria-label="X">
                <svg className="w-[17px] h-[17px]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>

              {/* Youtube (Custom SVG Override) */}
              <a href="#" className="text-neutral-400 hover:text-black transition-colors" aria-label="Youtube">
                <svg className="w-[19px] h-[19px]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Shop Column */}
          <div className="space-y-4">
            <h4 className="text-xs font-black tracking-widest uppercase">Shop</h4>
            <ul className="space-y-2.5 text-xs font-bold uppercase tracking-wider text-neutral-500">
              <li><a href="/men" className="hover:text-black transition-colors">Men's Collection</a></li>
              <li><a href="/women" className="hover:text-black transition-colors">Women's Collection</a></li>
              <li><a href="/shop" className="hover:text-black transition-colors">All Products</a></li>
              <li><a href="/shop?search=new" className="hover:text-black transition-colors">New Arrivals</a></li>
            </ul>
          </div>

          {/* Assistance Column */}
          <div className="space-y-4">
            <h4 className="text-xs font-black tracking-widest uppercase">Assistance</h4>
            <ul className="space-y-2.5 text-xs font-bold uppercase tracking-wider text-neutral-500">
              <li><a href="/orders" className="hover:text-black transition-colors">Track Order</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-black transition-colors">FAQs</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="space-y-4">
            <h4 className="text-xs font-black tracking-widest uppercase">Newsletter</h4>
            <p className="text-xs text-neutral-500 uppercase font-medium tracking-wide leading-relaxed">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <form onSubmit={handleSubscribe} className="relative w-full mt-2">
              <input
                type="email"
                required
                placeholder="ENTER YOUR EMAIL..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-neutral-50 text-black border border-neutral-200 rounded-lg pl-3 pr-10 py-2 text-[10px] font-bold tracking-wider uppercase focus:outline-none focus:border-black transition-all"
              />
              <button 
                type="submit" 
                className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black transition-colors"
                aria-label="Subscribe"
              >
                <ArrowRight size={16} />
              </button>
            </form>
          </div>

        </div>
      </div>

      {/* Bottom Section: Copyright & Legals */}
      <div className="border-t border-neutral-100 bg-neutral-50 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
          <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
            © {new Date().getFullYear()} THREADED inc. All Rights Reserved.
          </p>
          <div className="flex space-x-6 text-[10px] font-bold uppercase tracking-widest text-neutral-400">
            <a href="#" className="hover:text-black transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-black transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
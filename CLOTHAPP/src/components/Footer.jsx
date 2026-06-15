import React, { useState } from "react";
import { ArrowRight } from "lucide-react";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    alert(`Thank you for subscribing with: ${email}`);
    setEmail("");
  };

  return (
    <footer className="w-full bg-white border-t border-neutral-200 mt-20 font-sans text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-10">
          <div className="lg:col-span-2 space-y-4">
            <a
              href="/"
              className="text-2xl font-black tracking-[0.35em] uppercase inline-block"
            >
              THREADED
            </a>

            <p className="text-xs text-neutral-500 font-medium leading-relaxed max-w-sm uppercase tracking-wide">
              Crafting premium essentials for the modern wardrobe. Minimalist
              designs, exceptional quality, sustainable practices.
            </p>

            <div className="flex items-center gap-4 pt-2">
              <a
                href="#"
                className="text-neutral-400 hover:text-black transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7.75 2C4.57 2 2 4.57 2 7.75v8.5C2 19.43 4.57 22 7.75 22h8.5C19.43 22 22 19.43 22 16.25v-8.5C22 4.57 19.43 2 16.25 2h-8.5Zm0 1.5h8.5A5.25 5.25 0 0 1 21.5 8.75v6.5a5.25 5.25 0 0 1-5.25 5.25h-8.5A5.25 5.25 0 0 1 2.5 15.25v-6.5A5.25 5.25 0 0 1 7.75 3.5Zm9.63 1.38a1.12 1.12 0 1 0 0 2.25 1.12 1.12 0 0 0 0-2.25ZM12 6.75A5.25 5.25 0 1 0 12 17.25 5.25 5.25 0 0 0 12 6.75Zm0 1.5a3.75 3.75 0 1 1 0 7.5 3.75 3.75 0 0 1 0-7.5Z" />
                </svg>
              </a>

              <a
                href="#"
                className="text-neutral-400 hover:text-black transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>

              <a
                href="#"
                className="text-neutral-400 hover:text-black transition-colors"
                aria-label="X"
              >
                <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              <a
                href="#"
                className="text-neutral-400 hover:text-black transition-colors"
                aria-label="YouTube"
              >
                <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-black tracking-[0.28em] uppercase">
              Shop
            </h4>
            <ul className="space-y-2.5 text-xs font-bold uppercase tracking-wider text-neutral-500">
              <li>
                <a href="/men" className="hover:text-black transition-colors">
                  Men's Collection
                </a>
              </li>
              <li>
                <a href="/women" className="hover:text-black transition-colors">
                  Women's Collection
                </a>
              </li>
              <li>
                <a href="/shop" className="hover:text-black transition-colors">
                  All Products
                </a>
              </li>
              <li>
                <a href="/shop?search=new" className="hover:text-black transition-colors">
                  New Arrivals
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-black tracking-[0.28em] uppercase">
              Assistance
            </h4>
            <ul className="space-y-2.5 text-xs font-bold uppercase tracking-wider text-neutral-500">
              <li>
                <a href="/orders" className="hover:text-black transition-colors">
                  Track Order
                </a>
              </li>
              <li>
                <a href="/shipping-returns" className="hover:text-black transition-colors">
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a href="/faq" className="hover:text-black transition-colors">
                  FAQs
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-black transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-black tracking-[0.28em] uppercase">
              Newsletter
            </h4>
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
                className="w-full bg-neutral-50 text-black border border-neutral-200 rounded-lg pl-3 pr-12 py-2 text-[10px] font-bold tracking-wider uppercase focus:outline-none focus:border-black transition-all"
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

      <div className="border-t border-neutral-100 bg-neutral-50 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
            © {new Date().getFullYear()} THREADED inc. All Rights Reserved.
          </p>

          <div className="flex gap-6 text-[10px] font-bold uppercase tracking-widest text-neutral-400">
            <a href="/privacy" className="hover:text-black transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-black transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React, { useState } from "react";
import Men from "./Men";
import Women from "./Women";
import { useNavigate } from "react-router-dom";
import { Search, Heart, ShoppingBag, User, Menu, X } from "lucide-react";
import { useCart } from "./CartContext";
import Avtar from "./Avtar";
import Searchbar from '../components/Searchbar'; // Ensure correct case matches filename: SearchBar or Searchbar
import { useAuth } from "../Context/Authcontext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  // 🎯 1. Dynamic Toggle State for Search Field
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const { user } = useAuth();
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  const [activeMenu, setActiveMenu] = useState(null);
  const navigate = useNavigate();

  return (
    <nav className="w-full bg-white border-b border-gray-200 fixed top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* LEFT SECTION: Categories */}
          <div
            className="hidden md:flex items-center space-x-8 uppercase text-sm font-semibold tracking-wider flex-1 h-full"
            onMouseLeave={() => setActiveMenu(null)}
          >
            <div className="h-full flex items-center" onMouseEnter={() => setActiveMenu("men")}>
              <a href="/men" className={`text-gray-700 hover:text-black h-full flex items-center border-b-2 ${activeMenu === "men" ? "border-black text-black" : "border-transparent"}`}>
                Men
              </a>
              {activeMenu === "men" && <Men />}
            </div>
            <div className="h-full flex items-center" onMouseEnter={() => setActiveMenu("women")}>
              <a href="/women" className={`text-gray-700 hover:text-black h-full flex items-center border-b-2 ${activeMenu === "women" ? "border-black text-black" : "border-transparent"}`}>
                Women
              </a>
              {activeMenu === "women" && <Women />}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 hover:text-black focus:outline-none">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* CENTER SECTION: Logo */}
          <div className="flex-shrink-0 text-center flex-1 md:flex-initial">
            <a href="/" className="text-2xl font-black tracking-widest uppercase font-serif">
              THREADED
            </a>
            <button className="bg-blue-400 rounded px-2 py-0.5 text-xs ml-2" onClick={() => navigate("/adminadd")}>
              Add Product
            </button>
          </div>

          {/* RIGHT SECTION: User Actions */}
          <div className="flex items-center justify-end space-x-3 md:space-x-4 flex-1">
            
            {/* 🎯 2. FIXED SEARCH CONTAINER CONTAINER WITH TOGGLE EFFECT */}
            <div className="flex items-center relative">
              {/* If search input is toggled open, inject the component smoothly into line space */}
              {isSearchOpen && (
                <div className="absolute right-9 top-1/2 -translate-y-1/2 w-48 sm:w-64 z-50 animated duration-200">
                  <Searchbar />
                </div>
              )}
              
              {/* The Control Toggle Switch Icon */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)} // Opens on click, closes on re-click
                className={`p-2 transition-colors cursor-pointer rounded-full hover:bg-neutral-100 ${isSearchOpen ? 'text-black bg-neutral-50' : 'text-gray-700'}`}
                aria-label="Toggle Search"
              >
                {isSearchOpen ? <X size={20} /> : <Search size={22} />}
              </button>
            </div>

            {/* Account / Login */}
            <div className="flex items-center space-x-1 p-2 text-gray-700 hover:text-black text-sm font-medium cursor-pointer">
              {user ? (
                <Avtar user={user} />
              ) : (
                <>
                  <span onClick={() => navigate("/profile")}><User size={22} /></span>
                  <span onClick={() => navigate("/login")} className="hidden lg:inline ml-1">Login /</span>
                  <span onClick={() => navigate("/signup")} className="hidden lg:inline ml-1">Sign Up</span>
                </>
              )}
            </div>

            {/* Wishlist */}
            <button className="p-2 text-gray-700 hover:text-black relative cursor-pointer" aria-label="Wishlist">
              <Heart size={22} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Cart */}
            <button onClick={() => navigate("/cart")} className="p-2 text-gray-700 hover:text-black relative cursor-pointer" aria-label="Cart">
              <ShoppingBag size={22} />
              <span className="absolute top-0 right-0 bg-black text-white text-xs w-4 h-4 flex items-center justify-center rounded-full font-bold">
                {cartCount}
              </span>
            </button>

          </div>
        </div>
      </div>

      {/* MOBILE DROP-DOWN MENU */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 pt-2 pb-4 space-y-3 shadow-lg">
          <a href="/men" className="block text-base font-semibold uppercase tracking-wider text-gray-700 hover:text-black">Men</a>
          <a href="/women" className="block text-base font-semibold uppercase tracking-wider text-gray-700 hover:text-black">Women</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
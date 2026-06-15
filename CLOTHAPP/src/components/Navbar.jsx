import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Heart, ShoppingBag, User, Menu, X, Sparkles } from "lucide-react";
import { useCart } from "./CartContext";
import Avtar from "./Avtar";
import Searchbar from "./Searchbar";
import { useAuth } from "../Context/Authcontext";
import Men from "./Men";
import Women from "./Women";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  const { user } = useAuth();
  const { getCartCount } = useCart();
  const cartCount = getCartCount();
  const navigate = useNavigate();
  const timeoutRef = useRef(null);

  // Monitor scroll activity
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);


  const openMenu = (menu) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(menu);
  };

  const closeMenu = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 200);
  };

  const closeMobileMenu = () => setIsOpen(false);

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-md" : "bg-white"
      }`}
    >
      {/* ── Promo Banner ─────────────────────────────────── */}
      <div className="w-full bg-gradient-to-r from-[#FF3D5A] via-[#5B4FF5] to-[#E879F9] px-4 py-2 text-center text-xs font-bold uppercase tracking-[0.2em] text-white">
        <span>✨ Free Express Delivery on Orders Above ₹999</span>
        <span className="mx-2 opacity-60">|</span>
        <span>🌸 New Summer Drop — Shop Now</span>
      </div>

      
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between md:h-[72px]">
          
          {/* LEFT — Desktop Link Targets */}
          <div className="hidden flex-1 items-center gap-6 md:flex h-full">
            {["men", "women"].map((cat) => (
              <div
                key={cat}
                className="relative flex h-full items-center"
                onMouseEnter={() => openMenu(cat)}
                onMouseLeave={closeMenu}
              >
                <Link
                  to={`/${cat}`}
                  className={`relative px-2 py-1 text-sm font-bold uppercase tracking-wide transition-all duration-200 h-full flex items-center ${
                    activeMenu === cat ? "text-[#5B4FF5]" : "text-gray-700 hover:text-[#5B4FF5]"
                  }`}
                >
                  {cat}
                  {activeMenu === cat && (
                    <span className="absolute bottom-0 left-0 h-[3px] w-full bg-[#5B4FF5] transition-all" />
                  )}
                </Link>
              </div>
            ))}

            <Link
              to="/shop"
              className="flex items-center gap-1 text-sm font-bold text-[#FF3D5A] transition-transform hover:scale-105"
            >
              <Sparkles size={16} />
              New Arrivals
            </Link>
          </div>

           
          <button
            className="rounded-full p-2 text-gray-800 transition hover:bg-gray-100 md:hidden"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
 
          <Link
            to="/"
            className="text-2xl font-black tracking-[0.2em] md:text-3xl flex-shrink-0"
            aria-label="Threaded home"
          >
            <span className="bg-gradient-to-r from-black to-[#5B4FF5] bg-clip-text text-transparent">
              THREAD
            </span>
            <span className="text-[#FF3D5A]">ED</span>
          </Link>

           <div className="flex flex-1 items-center justify-end gap-2">
            
             <div className="relative flex items-center">
              {isSearchOpen && (
                <div className="absolute right-12 top-1/2 z-50 w-64 -translate-y-1/2">
                  <Searchbar />
                </div>
              )}
              <button
                onClick={() => setIsSearchOpen((prev) => !prev)}
                className="rounded-full p-2 transition-colors hover:bg-gray-100"
                aria-label="Search"
                style={{ color: isSearchOpen ? "#5B4FF5" : "inherit" }}
              >
                {isSearchOpen ? <X size={20} /> : <Search size={20} className="text-gray-600" />}
              </button>
            </div>

             {user ? (
              <Avtar user={user} />
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="group flex items-center gap-1 rounded-full px-2 py-1 transition hover:bg-gray-100"
                aria-label="Login"
              >
                <User size={20} className="text-gray-600 transition group-hover:text-[#5B4FF5]" />
                <span className="hidden text-sm font-semibold text-gray-700 transition group-hover:text-[#5B4FF5] lg:inline">
                  Login
                </span>
              </button>
            )}

             <button
              className="relative rounded-full p-2 transition hover:bg-rose-50"
              aria-label="Wishlist"
            >
              <Heart size={20} className="text-[#FB7185]" />
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-[#FF3D5A]" />
            </button>

             <button
              onClick={() => navigate("/cart")}
              className="relative flex items-center gap-2 rounded-full bg-black px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-gray-800"
            >
              <ShoppingBag size={16} />
              <span className="hidden sm:inline">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#FF3D5A] text-[10px] font-black text-white">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

         {isOpen && (
          <div className="space-y-3 border-t border-gray-100 py-4 md:hidden">
            <Link
              to="/men"
              onClick={closeMobileMenu}
              className="block font-bold text-gray-800 transition hover:text-[#5B4FF5]"
            >
              Men
            </Link>
            <Link
              to="/women"
              onClick={closeMobileMenu}
              className="block font-bold text-gray-800 transition hover:text-[#5B4FF5]"
            >
              Women
            </Link>
            <Link
              to="/shop"
              onClick={closeMobileMenu}
              className="block font-bold text-[#FF3D5A] transition hover:opacity-80"
            >
              New Arrivals ✨
            </Link>
          </div>
        )}
      </nav>

       {activeMenu && (
        <div
          className="absolute left-0 top-full z-[999] w-full border-t border-gray-100 bg-white shadow-2xl"
          onMouseEnter={() => openMenu(activeMenu)}
          onMouseLeave={closeMenu}
        >
          <div className="mx-auto max-w-7xl px-8 py-8">
            {activeMenu === "men" ? <Men /> : <Women />}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

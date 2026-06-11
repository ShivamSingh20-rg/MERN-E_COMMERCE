import React, { useState, useContext, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {useAuth} from '../Context/Authcontext'
// Optional: install lucide-react (npm i lucide-react) for premium crisp iconography
import { ShoppingBag, MapPin, LogOut, ChevronDown, User } from 'lucide-react';

const Avtar = ({user}) => {
  const { user: contextUser ,logout,loading}  = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  // Gracefully close menu when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
    navigate('/login');
  };

  if (!user) return null;

  const avatarLetter = user.fullName ? user.fullName.charAt(0).toUpperCase() : 'U';
 if (loading) return <div>Loading account data...</div>;
  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      {/* --- CLICKABLE AVATAR TRIGGER CARD --- */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-3 py-1.5 rounded-full hover:bg-gray-50 border border-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
      >
        {user.avatarUrl ? (
          <img 
            src={user.avatarUrl} 
            alt="Profile" 
            className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-500/10" 
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-500 text-white flex items-center justify-center font-semibold text-sm shadow-sm">
            {avatarLetter}
          </div>
        )}
        
        <div className="hidden sm:flex flex-col text-left">
          <span className="text-sm font-medium text-gray-700 leading-tight">{user.fullName.split(' ')[0]}</span>
        
        </div>

        <ChevronDown 
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {/* --- FLOATING PREMIUM DROPDOWN CARD --- */}
      {isOpen && (
        <div className="absolute right-0 mt-2.5 w-64 origin-top-right rounded-xl bg-white border border-gray-100 shadow-xl shadow-gray-200/50 ring-1 ring-black/5 divide-y divide-gray-100 z-50 transform opacity-100 scale-100 transition-all">
          
          {/* Header Identity Panel */}
          <div className="px-4 py-3 bg-gray-50/50 rounded-t-xl">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Signed in as</p>
            <p className="text-sm font-semibold text-gray-800 truncate mt-0.5">{user.fullName || user.name || "Guest User"}</p>
            <p className="text-xs text-gray-500 truncate">{user.email || "No email provided"}</p>
          </div>

          {/* Core App Navigation Paths */}
          <div className="py-1.5">
            <Link
              to="/myorders"
              onClick={() => setIsOpen(false)}
              className="group flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-indigo-50/40 transition-colors"
            >
              <ShoppingBag className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 transition-colors" />
              <span className="font-medium">My Orders</span>
            </Link>
            
            <Link
              to="/addresses"
              onClick={() => setIsOpen(false)}
              className="group flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-indigo-50/40 transition-colors"
            >
              <MapPin className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 transition-colors" />
              <span className="font-medium">Manage Addresses</span>
            </Link>
          </div>

          {/* Destructive Logout Action */}
          <div className="py-1.5">
            <button
              onClick={logout}
              className="group flex w-full items-center gap-3 px-4 py-2.5 text-sm font-medium text-rose-600 hover:bg-rose-50/60 transition-colors text-left"
            >
              <LogOut className="w-4 h-4 text-rose-400 group-hover:text-rose-600 transition-colors" />
              <span>Sign Out</span>
            </button>
          </div>
          
        </div>
      )}
    </div>
  );
};

export default Avtar;
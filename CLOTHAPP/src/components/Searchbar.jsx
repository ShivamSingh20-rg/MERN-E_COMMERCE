// 🎯 Frontend: components/SearchBar.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Searchbar = () => {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/shop?search=${encodeURIComponent(keyword.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearchSubmit} className="relative  w-full max-w-md mx-auto">
      <input
        type="text"
        placeholder="SEARCH FOR PRODUCTS"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-4 py-2.5 text-xs font-medium tracking-wider uppercase focus:outline-none focus:border-black transition-all duration-200"
      />
      <button 
        type="submit" 
        className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-black tracking-widest uppercase hover:text-neutral-500"
      >
        GO
      </button>
    </form>
  );
};

export default Searchbar;
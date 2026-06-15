 import React from 'react';
import ProductCard from './components/Productcard';

function Allclothcard() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Trending Rentals</h1>
        <p className="text-gray-500 mt-2">Get premium fashion delivered in 30 minutes.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </div>
  );
}

export default Allclothcard;

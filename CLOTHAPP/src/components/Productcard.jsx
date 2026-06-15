import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ShoppingBag, Sparkles } from "lucide-react";
import axios from "axios";
import { API_URL } from "../Context/Apiurl";

export default function Productcard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("search");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const url = searchQuery
          ? `${API_URL}/products/search?query=${searchQuery}`
          : `${API_URL}/products/get`;

        const res = await axios.get(url);
        setProducts(searchQuery ? res.data.data : res.data);
      } catch (err) {
        console.error("Error loading products:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchQuery]);

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-coral border-t-transparent" />
      </div>
    );
  }

  return (
    /* FIX APPLIED HERE: 
      Changed py-12 to pt-32 pb-12 so the content slides down 
      below your new floating Navigation Bar! 
    */
    <div className="mx-auto max-w-7xl px-4 pt-32 pb-12">
      <div className="mb-12 text-center animate-fade-up">
        {searchQuery ? (
          <>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-electric">
              Search Results
            </p>
            <h2 className="mt-2 text-4xl font-black text-ebony">
              “{searchQuery}”
            </h2>
            <p className="mt-2 text-gray-500">
              {products.length} item{products.length !== 1 ? "s" : ""} found
            </p>
          </>
        ) : (
          <>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-lavender px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-electric">
              <Sparkles size={14} />
              Trending Rentals
            </div>
            <h2 className="text-4xl font-black bg-gradient-to-r from-electric to-coral bg-clip-text text-transparent">
              Trending Rentals
            </h2>
          </>
        )}
      </div>

      {products.length === 0 ? (
        <div className="rounded-3xl border border-gray-100 bg-white py-20 text-center shadow-sm">
          <ShoppingBag className="mx-auto mb-4 h-12 w-12 text-gray-300" />
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-gray-500">
            No products found
          </p>
          <p className="mt-2 text-gray-400">
            Try a different search term or browse the collection.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product, idx) => (
            <div
              key={product._id}
              onClick={() => navigate(`/product/${product._id}`)}
              className="group cursor-pointer overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl animate-fade-up"
              style={{ animationDelay: `${idx * 60}ms` }}
            >
              <div className="relative h-80 overflow-hidden">
                <img
                  src={
                    product.image ||
                    "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=800&auto=format&fit=crop"
                  }
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                 

                <div className="absolute bottom-3 right-3 rounded-full bg-white/90 p-2 opacity-0 backdrop-blur-sm transition group-hover:opacity-100">
                  <ShoppingBag size={18} className="text-ebony" />
                </div>
              </div>

              <div className="p-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-electric">
                  {product.category || "Premium Collection"}
                </p>

                <h3 className="mt-1 line-clamp-1 text-lg font-bold text-ebony">
                  {product.name}
                </h3>

                <p className="mt-1 line-clamp-2 text-sm text-gray-500">
                  {product.description || "Rent for 48 hours"}
                </p>

                <div className="mt-4 flex items-end justify-between">
                  <div>
                    <span className="text-2xl font-black text-ebony">
                      ₹{product.price}
                    </span>
                    <span className="ml-2 text-sm text-gray-400 line-through">
                      ₹{product.price * 3}
                    </span>
                  </div>

                  <button className="rounded-full bg-ebony px-5 py-2.5 text-sm font-bold text-white transition hover:bg-coral">
                    View Item
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

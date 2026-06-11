import React from 'react';
import {useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import axios from 'axios';
import { API_URL } from '../Context/Apiurl';
import { useNavigate,useLocation } from 'react-router-dom';

export default function Productcard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
   const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search');
 
  useEffect(() => {
    const fetchCatalog = async () => {
      setLoading(true);
      try {
        let response;
        if (searchQuery) {
          
          response = await axios.get(`${API_URL}/products/search?query=${searchQuery}`);
          setProducts(response.data.data);
        } else {
 
          response = await axios.get(`${API_URL}/products/get`);
          setProducts(response.data);
        }
      } catch (err) {
        console.error("Error loading shop database list:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCatalog();
  }, [searchQuery]);
  console.log(products,'products')

  if (loading) return <div className="text-center py-20 text-xs font-black tracking-widest uppercase">Searching Catalog...</div>;

  return (
    <div className="max-w-6xl mx-auto mt-14 px-4 py-10 font-sans">
      {searchQuery && (
        <h2 className="text-xs font-black tracking-widest uppercase mb-6 text-neutral-400">
          Showing results for: <span className="text-black">"{searchQuery}"</span> ({products.length} found)
        </h2>
      )}

      {products.length === 0 ? (
        <div className="text-center py-20 text-xs font-black tracking-widest uppercase text-neutral-500 bg-neutral-50 border rounded-xl">
          No matching products found. Try adjusting your keywords!
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product._id}
      onClick={() => navigate(`/product/${product._id}`)} 
             className="group border rounded-xl overflow-hidden p-3 bg-white hover:shadow-sm transition-all">
              <img src={product.image} alt={product.name} className="w-full h-56 object-cover rounded-lg" />
              <h3 className="text-xs font-black uppercase tracking-wider mt-3 truncate">{product.name}</h3>
              <p className="text-xs font-bold text-neutral-500 mt-1">₹{product.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
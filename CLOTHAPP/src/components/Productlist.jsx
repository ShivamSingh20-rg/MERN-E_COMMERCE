import { useEffect, useState } from 'react';
import { useParams ,useNavigate} from 'react-router-dom';
import axios from 'axios';
import {API_URL} from '../Context/Apiurl'
export default function Productlist() {
  // 1. Grab the slug from the URL
  const { subCategorySlug } = useParams(); 
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
const navigate = useNavigate()
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // 2. Pass the slug to your backend API
        const safeSubCategory = encodeURIComponent(subCategorySlug.toLowerCase());
      
        const response = await axios.get(`${API_URL}/products/category/${safeSubCategory}`);
        setProducts(response.data);
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setLoading(false);
      }
    };

    // Re-run this effect every time the subcategory changes
    fetchProducts(); 
  }, [subCategorySlug]);

  if (loading) return <p>Loading products...</p>;

  return (
    <div className=' max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 mt-12'>
      <h2 className='text-4xl text-shadow-amber-300 border-x-fuchsia-400 '>Showing items for: {subCategorySlug}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <div 
            key={product._id} 
            // Clicking a card routes the user to that product's specific page ID
            onClick={() => navigate(`/product/${product._id}`)} 
            className="border border-gray-100 p-3 rounded-lg group cursor-pointer bg-white hover:shadow-md transition-shadow duration-300"
          >
            {/* Displaying the image link saved in your DB */}
            <div className="aspect-[3/4] bg-gray-50 mb-3 overflow-hidden rounded-md relative">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" 
                onError={(e) => { e.target.src = "https://placehold.co/400x533?text=No+Image" }}
              />
            </div>
            
            {/* Category Breadcrumbs */}
            <p className="text-[10px] uppercase font-black tracking-wider text-gray-400">
              {product.gender} • {product.subCategory}
            </p>
            
            {/* Product Title */}
            <h2 className="text-sm font-bold text-gray-800 uppercase truncate mt-0.5 group-hover:text-black">
              {product.name}
            </h2>
            
            {/* Product Price */}
            <p className="font-extrabold text-black mt-1 text-base">₹{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
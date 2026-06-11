// src/pages/AddProduct.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../Context/Apiurl';

export default function Productadd() {
  const [formData, setFormData] = useState({
    name: '', description: '', price: '', image: '',
    gender: 'men', category: 'clothing', subCategory: 't-shirt'
  });
  
  // Stock data state for sizes
  const [variants, setVariants] = useState([
    { size: 'S', quantity: 5 },
    { size: 'M', quantity: 10 },
    { size: 'L', quantity: 5 }
  ]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleQuantityChange = (index, value) => {
    const updatedVariants = [...variants];
    updatedVariants[index].quantity = Number(value);
    setVariants(updatedVariants);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...formData, variants };
      const response = await axios.post(`${API_URL}/products/add`, payload);
      alert(response.data.message);
      
      // Reset Form fields
      setFormData({ name: '', description: '', price: '', image: '', gender: 'men', category: 'clothing', subCategory: 't-shirt' });
    } catch (error) {
      alert("Failed to create entry: " + error.response?.data?.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto pt-28 pb-12 px-4">
      <h2 className="text-xl font-black uppercase tracking-widest mb-6">Add New Product to Store</h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 border rounded shadow-sm">
        <div>
          <label className="block text-xs font-bold uppercase mb-1">Product Title</label>
          <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full border p-2 rounded text-sm" required />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase mb-1">Price ($)</label>
            <input type="number" name="price" value={formData.price} onChange={handleInputChange} className="w-full border p-2 rounded text-sm" required />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase mb-1">Image URL</label>
            <input type="text" name="image" value={formData.image} onChange={handleInputChange} className="w-full border p-2 rounded text-sm" placeholder="https://..." required />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase mb-1">Gender (L1)</label>
            <select name="gender" value={formData.gender} onChange={handleInputChange} className="w-full border p-2 rounded text-sm">
              <option value="men">Men</option>
              <option value="women">Women</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase mb-1">Category (L2)</label>
            <input type="text" name="category" value={formData.category} onChange={handleInputChange} className="w-full border p-2 rounded text-sm" placeholder="clothing, shoes" required />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase mb-1">Subcategory (L3)</label>
            <input type="text" name="subCategory" value={formData.subCategory} onChange={handleInputChange} className="w-full border p-2 rounded text-sm" placeholder="t-shirt, jeans" required />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase mb-2">Size Quantities Inventory</label>
          <div className="flex gap-4">
            {variants.map((v, index) => (
              <div key={v.size} className="flex items-center gap-2">
                <span className="font-bold text-sm">{v.size}:</span>
                <input type="number" value={v.quantity} onChange={(e) => handleQuantityChange(index, e.target.value)} className="w-16 border p-1 rounded text-center text-sm" min="0" />
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase mb-1">Description</label>
          <textarea name="description" value={formData.description} onChange={handleInputChange} rows="3" className="w-full border p-2 rounded text-sm" required />
        </div>

        <button type="submit" className="w-full py-3 bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-gray-900 transition-colors">
          Publish Product Live
        </button>
      </form>
    </div>
  );
}
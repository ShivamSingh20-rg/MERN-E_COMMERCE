// src/models/product.model.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  
  // 🎯 THREE-LEVEL CATEGORY SPECIFICATION
  gender: { type: String, required: true, enum: ['men', 'women',] }, // Level 1
  category: { type: String, required: true },  
  subCategory: { type: String, required: true }, // Level 3 (e.g., 't-shirt', 'jeans', 'sneakers')

  variants: [
    {
      size: { type: String, required: true },
      quantity: { type: Number, required: true, default: 0 }
    }
  ]
}, { timestamps: true });


 const Product = mongoose.model('product', productSchema);
module.exports =Product;
 
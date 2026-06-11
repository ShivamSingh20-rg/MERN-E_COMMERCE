const Product = require('../models/product');

// 1. Save new product sent from frontend form
const createProduct = async (req, res) => {
  try {
    const { name, description, price, image, gender, category, subCategory, variants } = req.body;

    const newProduct = new Product({
      name,
      description,
      price: Number(price), 
      image,
      gender: gender.toLowerCase(),
      category: category.toLowerCase(),
      subCategory: subCategory.toLowerCase(),
      variants 
    });

    await newProduct.save();
    res.status(201).json({ message: "Product created successfully!", product: newProduct });
  } catch (error) {
    res.status(500).json({ message: "Database insertion failed", error: error.message });
  }
};

 


const getProductFromId =async (req,res)=>{
const {id} = req.params

const product = await Product.findById(id) 
 
res.send(product);

}

const getCategory = async (req, res) => {
  try {
  
     const decodedSubCategory = decodeURIComponent(req.params.subCategory);
console.log(decodedSubCategory)
   
    const filteredProducts = await Product.find({ subCategory: decodedSubCategory });
    console.log(filteredProducts)
   
    res.json(filteredProducts);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const { gender, category, subCategory } = req.query;
    let query = {};
    
    if (gender) query.gender = gender;
    if (category) query.category = category;
    if (subCategory) query.subCategory = subCategory;

    const products = await Product.find(query).sort({ createdAt: -1 }); // Newest items first
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};





const searchProducts = async (req, res) => {
  try {
    const { query } = req.query;  
    
    if (!query) {
      return res.status(400).json({ success: false, message: "Search keyword is missing" });
    }

 
    const searchResults = await Product.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { category: { $regex: query, $options: 'i' } },
        { subCategory: { $regex: query, $options: 'i' } }
      ]
    });

    res.status(200).json({ success: true, count: searchResults.length, data: searchResults });
  } catch (err) {
    console.error("🔥 Search query failure:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};



module.exports = { searchProducts,createProduct, getAllProducts,getProductFromId ,getCategory};
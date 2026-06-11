const express = require('express');
const router = express.Router();
const {searchProducts,getAllProducts}= require('../controllers/pp.controller')

router.get('/products/search', searchProducts);
router.get('/products', getAllProducts);

module.exports = router
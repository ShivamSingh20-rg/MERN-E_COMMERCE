const express = require('express');
const router = express.Router();


const {getAllProducts,searchProducts,createProduct,getProductFromId,getCategory} = require('../controllers/product.jcontroller')
 


 


router.post('/add', createProduct);
router.get('/get', getAllProducts);
router.get('/category/:subCategory',getCategory);

router.get('/search', searchProducts);
router.get('/get',getAllProducts)
router.get('/:id',getProductFromId);

module.exports = router;
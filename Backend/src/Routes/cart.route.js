const express = require('express');
const router = express.Router();
const protect = require('../middleware/protect')
const {editCartItemSize,addToCart,updateCartItemQuantity,getCart,deleteCartItem}= require('../controllers/cart.controller')

router.post('/add',protect,addToCart)
router.put('/UpdateSize',protect,editCartItemSize)
router.put('/UpdateQuantity',protect,updateCartItemQuantity);
router.get('/get',protect,getCart);
router.delete('/delete',protect,deleteCartItem);

module.exports = router
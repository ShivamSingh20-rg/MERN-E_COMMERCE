const express = require('express');
const router = express.Router();
const {getOrderDetails,getOrders, placeCODOrder, createRazorpayOrder, verifyAndPlaceOnlineOrder } = require('../controllers/order.controller')
const protect = require('../middleware/protect')
router.post('/savecod',protect,placeCODOrder)
router.post('/saveonline',protect,verifyAndPlaceOnlineOrder)
router.post('/create-razorpay-intent',(req, res, next) => {
  console.log("➡️ REACHED ROUTE: /razorpay-intent is being called!");
  next(); 
},createRazorpayOrder)
router.get('/myorders',protect,getOrders)
router.get('/:id',protect,getOrderDetails)
module.exports = router
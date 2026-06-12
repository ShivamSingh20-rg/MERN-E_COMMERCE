const Razorpay = require('razorpay');
const Order = require('../models/order');
const Cart = require('../models/Cart');
const configs = require('../config/config')
const Product = require('../models/product')
const crypto = require('crypto');

 
const createRazorpayOrder = async (req, res) => {
   
  try {
    
    const keyId = configs.RAZORPAY_ID || 'rzp_test_SvIPe997qXNEYQ';
    const keySecret = configs.RAZORPAY_SECRET || '9S4Z3gcTymxq2rWwlU4ViLSj';
    
    const razorpayInstance = new Razorpay({
      key_id: keyId,
      key_secret: keySecret
    });
 
    let totalAmount = req.body && req.body.totalAmount ? req.body.totalAmount : 100;
     

    const amountInPaise = Math.round(parseFloat(totalAmount) * 100);
    
    const options = {
      amount: amountInPaise,
      currency: "INR",
      receipt: `rcpt_${Date.now()}`
    };

     
    const gatewayOrder = await razorpayInstance.orders.create(options);
    
    console.log("✅ SUCCESS: Gateway handshake loop fully completed!", gatewayOrder.id);
    return res.status(200).json({ success: true, gatewayOrder });

  } catch (err) {
    console.error("🔥 DETECTED ERROR INSIDE CONTROLLER BODY EXPLICITLY:");
    console.error("Error Name:", err.name);
    console.error("Error Message:", err.message);
    if (err.stack) console.error("Error Full Trace Stack:", err.stack);

    return res.status(500).json({ 
      success: false, 
      message: "Internal loop execution crash error caught.",
      error: err.message
    });
  }
}
const placeCODOrder = async (req, res) => {
const { 
      items, // <-- IF THIS IS MISSING, LINE 118 CRASHES THE SERVER
      shippingAddress, 
      totalAmount, 
    } = req.body;
 

for (const item of items) {
 
  const productId = item.product?._id || item.product;
  const orderedSize = item.size;             // e.g., "S"
  const orderedQty = Number(item.quantity);   

  console.log(`📉 Processing inventory reduction for Product: ${productId} | Size: ${orderedSize} | Qty: ${orderedQty}`);

 
  const product = await Product.findById(productId);

  if (!product) {
    console.error(`❌ Inventory Sync Error: Product ID ${productId} not found.`);
    continue; // Skip to next item if the product reference is missing
  }

  // 2. Locate the specific size profile inside your unique 'variants' array schema layout
  if (product.variants && Array.isArray(product.variants)) {
    const variantIndex = product.variants.findIndex(v => v.size === orderedSize);

    if (variantIndex !== -1) {
      const currentAvailableStock = product.variants[variantIndex].quantity;
      
      // Ensure the store doesn't drop below zero units
      product.variants[variantIndex].quantity = Math.max(0, currentAvailableStock - orderedQty);
      
      console.log(`✅ Reduced variant variant matrix index match [${orderedSize}] from ${currentAvailableStock} down to ${product.variants[variantIndex].quantity}`);
    } else {
      console.warn(`⚠️ Warning: Size variant "${orderedSize}" does not exist on product "${product.name}".`);
    }
 
    product.markModified('variants');
  }
 
  await product.save();
}

  
  try {
    const userId = req.user || req.user._id;
    const { items, shippingAddress, totalAmount } = req.body;

    const newOrder = new Order({
      userId,
      items,
      shippingAddress,
      totalAmount,
      paymentMethod: 'COD',
      paymentStatus: 'Pending',
      status: 'Processing' // This will be updated by Admin later
    });

    await newOrder.save();
    await Cart.findOneAndUpdate({ userId }, { $set: { items: [] } });

    res.status(201).json({ success: true, message: "Order logged via COD!", orderId: newOrder._id });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const verifyAndPlaceOnlineOrder = async (req, res) => {
 const { 
      items, // <-- IF THIS IS MISSING, LINE 118 CRASHES THE SERVER
      shippingAddress, 
      totalAmount, 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature 
    } = req.body;
for (const item of items) {
 
  const productId = item.product?._id || item.product;
  const orderedSize = item.size;             // e.g., "S"
  const orderedQty = Number(item.quantity);  // e.g., 1

  console.log(`📉 Processing inventory reduction for Product: ${productId} | Size: ${orderedSize} | Qty: ${orderedQty}`);

  // 1. Fetch the target product document
  const product = await Product.findById(productId);

  if (!product) {
    console.error(`❌ Inventory Sync Error: Product ID ${productId} not found.`);
    continue; 
  }

  // 2. Locate the specific size profile inside your unique 'variants' array schema layout
  if (product.variants && Array.isArray(product.variants)) {
    const variantIndex = product.variants.findIndex(v => v.size === orderedSize);

    if (variantIndex !== -1) {
      const currentAvailableStock = product.variants[variantIndex].quantity;
      
      // Ensure the store doesn't drop below zero units
      product.variants[variantIndex].quantity = Math.max(0, currentAvailableStock - orderedQty);
      
      console.log(`✅ Reduced variant variant matrix index match [${orderedSize}] from ${currentAvailableStock} down to ${product.variants[variantIndex].quantity}`);
    } else {
      console.warn(`⚠️ Warning: Size variant "${orderedSize}" does not exist on product "${product.name}".`);
    }

 
    product.markModified('variants');
  }
  await product.save();
}
  try {
    const userId = req.user || req.user._id;
    const { items, shippingAddress, totalAmount, razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
 
    const signSource = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSecret = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET || '9S4Z3gcTymxq2rWwlU4ViLSj')
      .update(signSource.toString())
      .digest("hex");

    if (expectedSecret !== razorpay_signature) {
      return res.status(400).json({ success: false, message: "Payment verification failed. Security mismatch." });
    }

     
    const newOrder = new Order({
      userId,
      items,
      shippingAddress,
      totalAmount,
      paymentMethod: 'Online',
      paymentStatus: 'Paid',
      gatewayTransactionId: razorpay_payment_id,
      status: 'Processing'
    });

    await newOrder.save();
    await Cart.findOneAndUpdate({ userId }, { $set: { items: [] } });

    res.status(201).json({ success: true, message: "Online transaction completed!", orderId: newOrder._id });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


 const getOrders = async(req,res)=>{
 const userId = req.user || req.user._id;
 try {
 const myorder = await Order.find({ userId })
      .populate({
        path: 'items.product', 
        model: 'product' 
      })
      .sort({ createdAt: -1 });
 res.send(myorder)
 }catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
 }

 const getOrderDetails =async(req,res)=>{
const userId = req.user || req.user._Id
try{
const id = req.params.orderId || req.params.id;


  const details = await Order.findById(id).populate({
      path: 'items.product',
      model: 'product'
    });
 console.log(details)
  res.send(details)


}catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }


 }
module.exports = {getOrderDetails, placeCODOrder, createRazorpayOrder, verifyAndPlaceOnlineOrder ,getOrders};

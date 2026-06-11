const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',  
    required: true
  },

  
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',  
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        min: [1, 'Quantity cannot be less than 1.']
      },
      size: {
        type: String,
        required: true
      }
    }
  ],

 
  shippingAddress: {
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    country: { type: String, default: 'India' }
  },
 
  totalAmount: {
    type: Number,
    required: true
  },
 
  paymentMethod: {
    type: String,
    enum: ['COD', 'Online'],
    required: true
  },
 
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Paid', 'Failed', 'Refunded'],
    default: 'Pending'
  },
 
  gatewayTransactionId: {
    type: String,
    default: null
  },
 
  status: {
    type: String,
    enum: ['Processing', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled'],
    default: 'Processing'
  },

 
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
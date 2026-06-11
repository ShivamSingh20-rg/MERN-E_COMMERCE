const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true },
      size: { type: String, required: true }, // 👈 Crucial: Size is saved per item row
      quantity: { type: Number, required: true, default: 1 }
    }
  ]
});
 const Cart = mongoose.models.Cart || mongoose.model('Cart', CartSchema);
module.exports = Cart;
module.exports = Cart;
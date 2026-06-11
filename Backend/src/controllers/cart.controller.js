const Cart = require('../models/cart');

const addToCart = async (req, res) => {
  try {
   
    const userId = req.user || req.user._id; 
    const { productId, size, quantity } = req.body;

    console.log('the item is ', productId, size, quantity);
    
    let cart = await Cart.findOne({ userId });
 

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

 
    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId && item.size === size
    );

    // Ensure quantity is treated as a clean mathematical number
    const qtyToAdd = Number(quantity) || 1;

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += qtyToAdd;
    } else {
      cart.items.push({ product: productId, size, quantity: qtyToAdd });
    }
    
   
 
    await cart.save(); 

    
    const updatedCart = await Cart.findOne({ userId }).populate('items.product');
   
    
    res.status(200).json(updatedCart);
  } catch (error) {
    console.error("Controller Error:", error);
    res.status(500).json({ message: "Cart update failed", error: error.message });
  }
};
 
const editCartItemSize = async (req, res) => {
  try { const userId = req.user; 
    const { productId, oldSize, newSize } = req.body;

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });
 
    const currentItemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId && item.size === oldSize
    );

    if (currentItemIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

     
    const existingNewSizeIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId && item.size === newSize
    );

    if (existingNewSizeIndex > -1) {
    
      cart.items[existingNewSizeIndex].quantity += cart.items[currentItemIndex].quantity;
      cart.items.splice(currentItemIndex, 1);  
    } else {
 
      cart.items[currentItemIndex].size = newSize;
    }

   const updatedCart = await Cart.findOne({ userId }).populate('items.product');
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

 

 
const updateCartItemQuantity = async (req, res) => {
  try { const userId = req.user; 
    const { productId, size, action } = req.body;  
     
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

  
    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId && item.size === size
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

   
    if (action === 'increase') {
      cart.items[itemIndex].quantity += 1;
    } else if (action === 'decrease') {
      cart.items[itemIndex].quantity -= 1;
    }

     
    if (cart.items[itemIndex].quantity <= 0) {
      cart.items.splice(itemIndex, 1);
    }
 
    await cart.save();
    
    const updatedCart = await Cart.findOne({ userId }).populate('items.product');
    res.status(200).json(updatedCart);

  } catch (error) {
   
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
const deleteCartItem = async (req, res) => {
  try {
     const userId = req.user; 
    const { productId, size } = req.body;
    const updatedCart = await Cart.findOneAndUpdate(
      { userId },
      { $pull: { items: { product: productId, size: size } } },
      { new: true }
    ).populate('items.product'); // Populate immediately so images don't break on re-render

    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getCart = async (req, res) => {
  try {
   
    const userId = req.user; 

   
    let cart = await Cart.findOne({ userId }).populate('items.product');

    
    if (!cart) {
      cart = new Cart({ userId, items: [] });
      await cart.save();
    }

    res.status(200).json(cart);
  } catch (error) { 
    res.status(500).json({ message: "Failed to load cart", error: error.message });
  }
};


module.exports ={ editCartItemSize,addToCart,updateCartItemQuantity,getCart,deleteCartItem}
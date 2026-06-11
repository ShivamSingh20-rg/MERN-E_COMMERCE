const Address = require('../Models/Address');

const saveAddress = async (req, res) => {
  try {
    const userId = req.user || req.user._id;
    const { fullName, phone, street, city, state, pincode } = req.body;

    const newAddress = new Address({
      userId, fullName, phone, street, city, state, pincode
    });

    await newAddress.save();
    res.status(201).json({ message: "Address saved successfully", address: newAddress });
  } catch (error) {
    res.status(500).json({ message: "Failed to save address", error: error.message });
  }
};

const getUserAddresses = async (req, res) => {
  try {
    const userId = req.user|| req.user._id;
    const addresses = await Address.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(addresses);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve addresses", error: error.message });
  }
};

module.exports = { saveAddress, getUserAddresses };
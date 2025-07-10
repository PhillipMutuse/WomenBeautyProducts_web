const Wishlist = require('../models/Wishlist');
const Product = require('../models/Product');

exports.addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user._id;

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if product is already in wishlist
    const existingWishlist = await Wishlist.findOne({ userId, productId });
    if (existingWishlist) {
      return res.status(400).json({ message: 'Product already in wishlist' });
    }

    // Create new wishlist item
    const wishlistItem = await Wishlist.create({
      userId,
      productId,
      productName: product.name,
      productPrice: product.price,
      productImage: product.image
    });

    res.status(201).json(wishlistItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user._id;

    await Wishlist.findOneAndDelete({ userId, productId });
    res.json({ message: 'Product removed from wishlist' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getWishlist = async (req, res) => {
  try {
    const userId = req.user._id;
    const wishlist = await Wishlist.find({ userId }).populate('productId');
    res.json(wishlist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

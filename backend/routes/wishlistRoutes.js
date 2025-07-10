const express = require('express');
const router = express.Router();
const { addToWishlist, removeFromWishlist, getWishlist } = require('../controllers/wishlistController');
const { auth } = require('../middleware/auth');

// Customer-specific routes
router.post('/add', auth, addToWishlist);
router.delete('/remove/:productId', auth, removeFromWishlist);
router.get('/', auth, getWishlist);

module.exports = router;

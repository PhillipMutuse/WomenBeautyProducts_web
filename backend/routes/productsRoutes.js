// File: backend/routes/products.js
const express = require('express');
const router = express.Router();
const { createProduct, getAllProducts, deleteProduct } = require('../controllers/productController');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

router.post('/', verifyToken, isAdmin, createProduct);
router.get('/', getAllProducts);
router.delete('/:id', verifyToken, isAdmin, deleteProduct);

module.exports = router;
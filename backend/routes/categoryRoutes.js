const express = require('express');
const router = express.Router();
const Category = require('../models/category');

// POST /api/categories/add
router.post('/add', async (req, res) => {
  const { name } = req.body;

  if (!name) return res.status(400).json({ message: 'Category name is required' });

  try {
    const newCategory = new Category({ name });
    await newCategory.save();
    res.status(201).json({ message: 'Category added successfully', category: newCategory });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST new product
router.post('/', async (req, res) => {
  try {
    const { name, quantity, price } = req.body;

    // Validation
    if (!name || quantity === undefined || price === undefined) {
      return res.status(400).json({ error: 'Please provide name, quantity, and price' });
    }

    if (quantity <= 0 || price < 0) {
      return res.status(400).json({ error: 'Quantity must be > 0 and price must be >= 0' });
    }

    const product = new Product({
      name: name.trim(),
      quantity: Number(quantity),
      price: Number(price),
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE product by ID
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully', product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

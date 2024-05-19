const express = require('express');
const mongoose = require('mongoose');
const Product = require('../models/Product');

const router = express.Router();

// GET all products
router.get('/', (req, res, next) => {
    Product.find()
        .then(products => res.json(products))
        .catch(next);
});

// GET a product by ID
router.get('/:id', (req, res, next) => {
    Product.findById(req.params.id)
        .then(product => {
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.json(product);
        })
        .catch(next);
});

// POST a new product
router.post('/', (req, res, next) => {
    Product.create(req.body)
        .then(product => res.status(201).json(product))
        .catch(next);
});

// PUT update a product by ID
router.put('/:id', (req, res, next) => {
    Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        .then(product => {
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(200).json(product);
        })
        .catch(next);
});

// DELETE a product by ID
router.delete('/:id', (req, res, next) => {
    Product.findByIdAndDelete(req.params.id)
        .then(product => {
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(200).json({ message: 'Product deleted successfully', product });
        })
        .catch(next);
});

module.exports = router;
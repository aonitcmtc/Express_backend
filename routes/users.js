const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/User');

const router = express.Router();

// GET all users
router.get('/', (req, res, next) => {
    User.find()
        .then(users => res.json(users))
        .catch(next);
});

// GET a user by ID
router.get('/:id', (req, res, next) => {
    User.findById(req.params.id)
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user);
        })
        .catch(next);
});

// POST a new user
router.post('/', (req, res, next) => {
    User.create(req.body)
        .then(user => res.status(201).json(user))
        .catch(next);
});

// PUT update a user by ID
router.put('/:id', (req, res, next) => {
    User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(user);
        })
        .catch(next);
});

// DELETE a user by ID
router.delete('/:id', (req, res, next) => {
    User.findByIdAndDelete(req.params.id)
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({ message: 'User deleted successfully', user });
        })
        .catch(next);
});

module.exports = router;

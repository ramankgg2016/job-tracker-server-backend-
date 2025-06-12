// server/validation/authValidation.js
const { body } = require('express-validator');

// Validation rules for user registration
const registerValidation = [
    body('email', 'Please include a valid email').isEmail().normalizeEmail(),
    body('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
];

// Validation rules for user login
const loginValidation = [
    body('email', 'Please include a valid email').isEmail().normalizeEmail(),
    body('password', 'Password is required').notEmpty(),
];

module.exports = {
    registerValidation,
    loginValidation,
};
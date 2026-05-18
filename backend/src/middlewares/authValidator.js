// src/middlewares/authValidator.js
import { body, validationResult } from 'express-validator';

// Middleware to check for validation errors
const checkErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
};

// Validation rules for registration and login
export const registerValidator = [
    body('username').matches(/^[a-zA-Z0-9_-]+$/).withMessage('Username can only contain letters, numbers, _, and -'),
    body('email').isEmail().withMessage('Must be a valid email'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
    checkErrors
];

// For login, we allow either username or email as the identifier
export const loginValidator = [
    body('identifier').notEmpty().withMessage('Username or Email is required'),
    body('password').notEmpty().withMessage('Password is required'),
    checkErrors
];
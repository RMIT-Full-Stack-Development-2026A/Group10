// src/middlewares/authMiddleware.js
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protectRoute = async (req, res, next) => {
    let token;

    // Check if the authorization header exists and starts with "Bearer"
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get the token out of the string "Bearer <token>"
            token = req.headers.authorization.split(' ')[1];

            // Verify the token using your secret key
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Find the user in the database and attach them to the request object (minus the password!)
            req.user = await User.findById(decoded.id).select('-password');

            // Tell Express to move on to the next function (the controller)
            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }


    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token provided' });
    }
};

export const adminRoute = (req, res, next) => {
    if (req.user && req.user.role === 'ADMIN') {
        next(); 
    } else {
        res.status(403).json({ message: 'Access denied. Not authorized as an admin.' });
    }
};
// src/middlewares/rateLimiter.js
import rateLimit from 'express-rate-limit'; 

export const loginLimiter = rateLimit({
    windowMs: 60 * 1000, 
    max: 5, 
    message: { 
        message: "Too many failed login attempts. Please try again after 60 seconds." 
    },
    standardHeaders: true, 
    legacyHeaders: false, 
});
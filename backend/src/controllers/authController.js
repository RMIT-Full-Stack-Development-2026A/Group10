// src/controllers/authController.js
import { authService } from '../services/authService.js';

export const authController = {
    
    // Use async/await and proper error handling
    registerUser: async (req, res) => {
        try {
            const userData = await authService.register(req.body);
            res.status(201).json(userData);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // Use async/await and proper error handling
    loginUser: async (req, res) => {
        try {
            const { identifier, password } = req.body; 
            const userData = await authService.login(identifier, password);
            res.status(200).json(userData);
        } catch (error) {
            res.status(401).json({ message: error.message });
        }
    }
};
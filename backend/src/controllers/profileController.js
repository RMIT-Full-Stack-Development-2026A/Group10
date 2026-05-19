// src/controllers/profileController.js
import User from '../models/User.js';
import Match from '../models/Match.js';
import bcrypt from 'bcryptjs';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

export const profileController = {
    
    // Get the authenticated user's profile
    getMyProfile: async (req, res) => {
        try {
            res.status(200).json(req.user);
        } catch (error) {
            res.status(500).json({ message: 'Server error fetching profile' });
        }
    },

    // Get the authenticated user's game history
    getGameHistory: async (req, res) => {
        try {
            const history = await Match.find({ userId: req.user._id }).sort({ createdAt: -1 });
            res.status(200).json(history);
        } catch (error) {
            res.status(500).json({ message: 'Server error fetching history' });
        }
    },
    
    // Save a new match result to the user's history
    saveMatch: async (req, res) => {
        try {
            const { opponentName, gameType, result } = req.body;
            const newMatch = new Match({
                userId: req.user._id, 
                opponentName,
                gameType,
                result
            });
            const savedMatch = await newMatch.save();
            res.status(201).json(savedMatch);
        } catch (error) {
            res.status(500).json({ message: 'Failed to save match result' });
        }
    },

    // Update the authenticated user's profile
    updateProfile: async (req, res) => {
        try {
            const user = await User.findById(req.user._id);
            if (!user) return res.status(404).json({ message: 'User not found' });

            // Update text fields
            user.username = req.body.username || user.username;
            user.email = req.body.email || user.email;
            user.country = req.body.country || user.country;

            // Hash the new password if they typed one
            if (req.body.password) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(req.body.password, salt);
            }

            // Handle logo upload if a file was sent
            if (req.file) {
                const uploadDir = 'uploads/';
                if (!fs.existsSync(uploadDir)) {
                    fs.mkdirSync(uploadDir, { recursive: true });
                }
                const filename = `${req.user._id}-${Date.now()}.webp`;
                const outputPath = path.join(uploadDir, filename);
                
                await sharp(req.file.buffer)
                    .resize(250, 250, {
                        fit: sharp.fit.cover, 
                        position: sharp.strategy.entropy 
                    })
                    .toFormat('webp')
                    .webp({ quality: 80 })
                    .toFile(outputPath);

                user.logoUrl = `http://localhost:5000/uploads/${filename}`;
            }

            const updatedUser = await user.save();
            updatedUser.password = undefined;
            res.status(200).json(updatedUser);
            
        } catch (error) {
            console.error("Profile Update Error:", error);
            res.status(500).json({ message: error.message });
        }
    }
};
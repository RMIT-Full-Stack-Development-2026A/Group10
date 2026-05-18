// src/services/authService.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

export const authService = {
    
    // Register a new user
    register: async (userData) => {
        const { username, email, password, country } = userData;
        const userExists = await User.findOne({ $or: [{ email }, { username }] });
        if (userExists) throw new Error('User with this email or username already exists');
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await User.create({
            username, email, password: hashedPassword, country
        });

        return {
            _id: user._id, username: user.username, email: user.email,
            isPremium: user.isPremium, token: generateToken(user._id)
        };
    },

    // Log in an existing user
    login: async (identifier, password) => {
        const user = await User.findOne({ 
            $or: [{ email: identifier }, { username: identifier }] 
        });
        if (!user) throw new Error('Invalid username/email or password');
        if (user.accountStatus === 'Deactivated') throw new Error('Your account has been deactivated.');
        if (user.lockUntil && user.lockUntil > Date.now()) throw new Error('Account locked due to too many failed attempts.');
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            user.loginAttempts += 1;
            if (user.loginAttempts >= 5) {
                user.lockUntil = Date.now() + 15 * 60 * 1000; 
                await user.save();
                throw new Error('Maximum login attempts reached. Account locked for 15 minutes.');
            }
            await user.save();
            throw new Error('Invalid email or password');
        }

        user.loginAttempts = 0;
        user.lockUntil = undefined;
        await user.save();

        return {
            _id: user._id, username: user.username, email: user.email,
            isPremium: user.isPremium, token: generateToken(user._id)
        };
    }
};
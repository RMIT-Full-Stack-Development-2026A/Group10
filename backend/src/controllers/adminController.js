// src/controllers/adminController.js
import User from '../models/User.js';

export const adminController = {
    // Get a list of all registered users (excluding their passwords!)
    getAllUsers: async (req, res) => {
        try {
            const users = await User.find({}).select('-password');
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: 'Server error fetching users' });
        }
    },

    // Toggle a user's account between 'Active' and 'Deactivated'
    toggleUserStatus: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Flip the status
            user.accountStatus = user.accountStatus === 'Active' ? 'Deactivated' : 'Active';
            
            const updatedUser = await user.save();
            updatedUser.password = undefined; 

            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(500).json({ message: 'Server error updating user status' });
        }
    }
};
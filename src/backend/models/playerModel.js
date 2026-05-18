import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const playerSchema = new mongoose.Schema({
    // 1. Identity & Profile
    username: {
        type: String,
        required: true,
        match: /^[a-zA-Z0-9_-]+$/ // Validation from req 1.2.3
    },
    email: {
        type: String,
        required: true,
        unique: true // Constraint from req 1.1.2
    },
    password: {
        type: String,
        required: true // Will store hashed version (req 1.1.3)
    },
    country: {
        type: String,
        required: true // Selectable dropdown (req 1.1.4)
    },
    avatarUrl: {
        type: String,
        default: 'default-avatar.png'
    },

    // 2. Security & Administration
    role: {
        type: String,
        enum: ['PLAYER', 'ADMIN'],
        default: 'PLAYER'
    },
    accountStatus: {
        type: String,
        enum: ['Active', 'Deactivated'],
        default: 'Active'
    },
    loginAttempts: {
        type: Number,
        default: 0
    },
    lockUntil: {
        type: Date
    },

    // 3. Economy & Subscription
    walletBalance: {
        type: Number,
        default: 0
    },
    isPremium: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

playerSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

// Helper Method: Compares entered login password with hashed DB password
playerSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};
export default mongoose.model('Player', playerSchema);
// src/models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    country: { type: String, default: 'Vietnam' },
    role: { type: String, enum: ['PLAYER', 'ADMIN'], default: 'PLAYER' },
    accountStatus: { type: String, enum: ['Active', 'Deactivated'], default: 'Active' },
    walletBalance: { type: Number, default: 0 },
    isPremium: { type: Boolean, default: false },
    loginAttempts: { type: Number, default: 0 },
    lockUntil: { type: Date },
    logoUrl: { type: String }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;
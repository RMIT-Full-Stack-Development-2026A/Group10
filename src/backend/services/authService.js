import bcrypt from 'bcryptjs';
import PlayerRepository from '../repositories/playerRepository.js'; // Assuming repository is refactored to ES6

class AuthService {
    async register(userData) {
        // 1. Check if email exists via Repository
        const existingUser = await PlayerRepository.findByEmail(userData.email);
        if (existingUser) throw new Error('Email already registered');

        // 2. Simply pass the raw data!
        // playerModel.js's pre-save middleware will automatically hash the password cleanly.
        return await PlayerRepository.create(userData);
    }

    async login(userData) {
        const { identifier, password } = userData;
        let existingUser = null;

        const isEmail = identifier.includes('@');
        if (isEmail) {
            existingUser = await PlayerRepository.findByEmail(identifier);
        } else {
            existingUser = await PlayerRepository.findByUsername(identifier);
        }

        if (!existingUser) {
            throw new Error("Invalid username or email.");
        }

        // Check if account is active before doing password heavy-lifting
        if (existingUser.accountStatus === 'Deactivated') {
            throw new Error("Account has been deactivated. Please contact administration.");
        }

        // 3. Leverage the helper method you already built on the model!
        const isMatch = await existingUser.matchPassword(password);
        if (!isMatch) {
            throw new Error('Invalid password');
        }

        return existingUser;
    }
}

export default AuthService;
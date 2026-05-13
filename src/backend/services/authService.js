const bcrypt = require('bcrypt');
const PlayerRepository = require('../repositories/PlayerRepository');

class AuthService {
    async register(userData) {
        // 1. Check if email exists via Repository
        const existingUser = await PlayerRepository.findByEmail(userData.email);
        if (existingUser) throw new Error('Email already registered');

        // 2. Hash the password (req 1.1.3)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userData.password, salt);

        // 3. Create the player
        return await PlayerRepository.create({
            ...userData,
            password: hashedPassword
        });
    }
}
const bcrypt = require('bcrypt');
const PlayerRepository = require('../repositories/playerRepository');

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

    async login(userData) {
        const { identifier, password } = userData;
        let existingUser = null;

        // 1. Check if username OR email (identifier) matches an existing user
        // We can distinguish them by checking if the identifier looks like an email
        const isEmail = identifier.includes('@');

        if (isEmail) {
            existingUser = await PlayerRepository.findByEmail(identifier);
        } else {
            // Assuming your repository has a findByUsername method
            existingUser = await PlayerRepository.findByUsername(identifier);
        }

        // If no user is found, throw a generic error to prevent user enumeration
        if (!existingUser) {
            throw new Error("User not found. Wrong username?");
        }

        // 2. Compare passwords
        // bcrypt.compare automatically handles hashing the incoming plaintext password
        // with the salt stored inside the existing hash before comparing them.
        const isMatch = await bcrypt.compare(password, existingUser.password);

        if (!isMatch) {
            throw new Error('Invalid password');
        }

        // Login successful.
        // Typically, you would generate and return a JWT or session object here.
        return existingUser;
    }
}

module.exports = AuthService;
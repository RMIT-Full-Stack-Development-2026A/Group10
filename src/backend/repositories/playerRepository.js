// repositories/PlayerRepository.js
class PlayerRepository {
    async findByEmail(email) {
        return await Player.findOne({ email });
    }

    async findByUsername(username) {
        return await Player.findOne({ username });
    }

    async incrementLoginAttempts(userId) {
        return await Player.findByIdAndUpdate(userId, {
            $inc: { loginAttempts: 1 }
        });
    }

    async lockAccount(userId, lockTime) {
        return await Player.findByIdAndUpdate(userId, {
            lockUntil: lockTime
        });
    }

    async resetLoginAttempts(userId) {
        return await Player.findByIdAndUpdate(userId, {
            $set: { loginAttempts: 0, lockUntil: null }
        });
    }
}
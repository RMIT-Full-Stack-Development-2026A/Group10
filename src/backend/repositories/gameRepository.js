// repositories/GameRepository.js
import GameSession from '../models/gameSessionModel.js';

class GameRepository {
    /**
     * Create a new match record
     */
    async create(gameData) {
        return await GameSession.create(gameData);
    }

    /**
     * Find a session by ID or Room Number
     */
    async findById(id) {
        return await GameSession.findById(id);
    }

    /**
     * Record a new move in the 'moves' array (req 4.3.3)
     */
    async addMove(sessionId, moveData) {
        return await GameSession.findByIdAndUpdate(
            sessionId,
            { $push: { moves: moveData } },
            { new: true }
        );
    }

    /**
     * Update game status to Win/Lose/Aborted (req 4.1.4, 4.1.5)
     */
    async updateMatchResult(sessionId, updateFields) {
        return await GameSession.findByIdAndUpdate(
            sessionId,
            { $set: updateFields },
            { new: true }
        );
    }

    /**
     * Find active rooms for the Admin Dashboard (req 6.3.1)
     */
    async findActiveRooms() {
        return await GameSession.find({ result: 'Active' })
            .populate('player1', 'username')
            .sort({ startTime: -1 });
    }
}

module.exports = new GameRepository();
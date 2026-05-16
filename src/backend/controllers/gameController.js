import GameSession from '../models/gameSessionModel.js';

/**
 * @desc    Initialize a new game session when players join a room
 * @route   POST /api/games/start
 */
export const startSession = async (req, res) => {
    try {
        const { roomNumber, gameType, boardSize, player1, player2, player2Name } = req.body;

        if (!roomNumber || !gameType || !player1 || !player2) {
            return res.status(400).json({ message: 'Missing required fields to start a session.' });
        }

        const session = await GameSession.create({
            roomNumber,
            gameType,
            boardSize: boardSize || 10,
            player1,
            player2,
            player2Name,
            // startTime is handled by default: Date.now
            // result is handled by default: 'Active'
        });

        res.status(201).json({ message: 'Game session started', session });
    } catch (error) {
        console.error('Error starting game session:', error);
        // Handle duplicate room numbers
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Room number already exists.' });
        }
        res.status(500).json({ message: 'Server error while starting session.' });
    }
};

/**
 * @desc    Record a single move during an active game
 * @route   PUT /api/games/:sessionId/move
 */
export const recordMove = async (req, res) => {
    try {
        const { sessionId } = req.params;
        const { player, coordinate } = req.body; // e.g., player: 'X', coordinate: 'c2'

        if (!player || !coordinate) {
            return res.status(400).json({ message: 'Player and coordinate are required.' });
        }

        // Using $push to efficiently append the move without fetching the whole document first
        const session = await GameSession.findByIdAndUpdate(
            sessionId,
            { $push: { moves: { player, coordinate } } },
            { new: true, runValidators: true }
        );

        if (!session) {
            return res.status(404).json({ message: 'Game session not found.' });
        }

        res.status(200).json({ message: 'Move recorded', session });
    } catch (error) {
        console.error('Error recording move:', error);
        res.status(500).json({ message: 'Server error while recording move.' });
    }
};

/**
 * @desc    End an active game session
 * @route   PUT /api/games/:sessionId/end
 */
export const endSession = async (req, res) => {
    try {
        const { sessionId } = req.params;
        const { result, winner } = req.body; // result: 'Win', 'Lose', 'Aborted'

        if (!['Win', 'Lose', 'Aborted'].includes(result)) {
            return res.status(400).json({ message: 'Invalid result state.' });
        }

        const session = await GameSession.findByIdAndUpdate(
            sessionId,
            {
                result,
                winner,
                endTime: new Date() // Record the exact moment the match finished
            },
            { new: true, runValidators: true }
        );

        if (!session) {
            return res.status(404).json({ message: 'Game session not found.' });
        }

        res.status(200).json({ message: 'Game session ended', session });
    } catch (error) {
        console.error('Error ending game session:', error);
        res.status(500).json({ message: 'Server error while ending session.' });
    }
};

/**
 * @desc    Get match history for a specific player (Player 1 or Player 2)
 * @route   GET /api/games/history/:playerId
 */
export const getPlayerHistory = async (req, res) => {
    try {
        const { playerId } = req.params;

        // Find matches where the player is either player1 (ObjectId) or player2 (Mixed)
        // We sort by startTime descending to show newest games first
        const history = await GameSession.find({
            $or: [{ player1: playerId }, { player2: playerId }]
        })
            .sort({ startTime: -1 })
            .populate('player1', 'username email'); // Assuming your Player model has username/email

        if (!history || history.length === 0) {
            return res.status(404).json({ message: 'No match history found for this player.' });
        }

        res.status(200).json(history);
    } catch (error) {
        console.error('Error fetching history:', error);
        res.status(500).json({ message: 'Server error while fetching match history.' });
    }
};
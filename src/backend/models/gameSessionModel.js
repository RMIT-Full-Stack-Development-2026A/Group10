import mongoose from 'mongoose';

const gameSessionSchema = new mongoose.Schema({
    // 1. Identification & Config
    roomNumber: {
        type: String,
        required: true,
        unique: true // Needed for Admin Search (req 6.3.2)
    },
    gameType: {
        type: String,
        enum: ['Single Player', 'Two Player', 'Online Match'],
        required: true
    },
    boardSize: {
        type: Number,
        enum: [10, 15],
        default: 10 // (req 4.1.2, 4.2.1)
    },

    // 2. Participants
    player1: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
        required: true
    },
    player2: {
        // Can be a Player ID or a String for AI bot name (req 3.1.2, 4.2.2)
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    player2Name: {
        type: String // Stored separately for quick pattern search (req 3.2.2)
    },

    // 3. Match Record & Logic
    moves: [{
        player: { type: String, enum: ['X', 'O'] },
        coordinate: { type: String }, // Algebraic notation e.g., "c2" (req 4.3.3)
        timestamp: { type: Date, default: Date.now }
    }],
    result: {
        type: String,
        enum: ['Win', 'Lose', 'Aborted', 'Active'],
        default: 'Active'
    },
    winner: {
        type: mongoose.Schema.Types.Mixed // Player ID or AI Name
    },

    // 4. Time Tracking
    startTime: { type: Date, default: Date.now },
    endTime: { type: Date }
}, { timestamps: true });

export default mongoose.model('GameSession', gameSessionSchema);
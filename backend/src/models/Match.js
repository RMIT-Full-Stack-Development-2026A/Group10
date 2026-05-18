// src/models/Match.js
import mongoose from 'mongoose';

const matchSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    }, 
    // The player who owns this record
    opponentName: { 
        type: String, 
        required: true 
    }, 
    // E.g., "Bot", "Player 2", or an Online username
    gameType: { 
        type: String, 
        enum: ['Local', 'Bot', 'Online'], 
        required: true 
    },
    
    result: { 
        type: String, 
        enum: ['Win', 'Loss', 'Draw'], 
        required: true 
    }
}, { timestamps: true }); 

const Match = mongoose.model('Match', matchSchema);
export default Match;
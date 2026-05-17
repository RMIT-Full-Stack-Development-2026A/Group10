import express from 'express';
import { getAllPlayers, togglePlayerStatus } from '../controllers/adminController.js';

const router = express.Router();

// Get all players
router.get('/players', getAllPlayers);

// Toggle a specific player's status
router.put('/players/:id/toggle-status', togglePlayerStatus);

export default router;
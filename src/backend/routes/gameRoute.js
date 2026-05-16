import express from 'express';
import {
    startSession,
    recordMove,
    endSession,
    getPlayerHistory
} from '../controllers/gameController.js';

const router = express.Router();

router.post('/start', startSession);
router.put('/:sessionId/move', recordMove);
router.put('/:sessionId/end', endSession);
router.get('/history/:playerId', getPlayerHistory);

export default router;
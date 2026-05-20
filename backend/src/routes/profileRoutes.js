// src/routes/profileRoutes.js
import express from 'express';
import { protectRoute } from '../middlewares/authMiddleware.js';
import { profileController } from '../controllers/profileController.js';
import { upload } from '../middlewares/uploadMiddleware.js';

const router = express.Router();
router.get('/:id', protectRoute, profileController.getMyProfile);
router.put('/:id', protectRoute, upload.single('logo'), profileController.updateProfile);
router.get('/:id/history', protectRoute, upload.single('logo'), profileController.getGameHistory);
router.post('/:id/history', protectRoute, profileController.saveMatch);

export default router;
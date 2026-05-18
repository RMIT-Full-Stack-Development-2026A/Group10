// src/routes/adminRoutes.js
import express from 'express';
import { protectRoute, adminRoute } from '../middlewares/authMiddleware.js';
import { adminController } from '../controllers/adminController.js';

const router = express.Router();

// Notice we use BOTH middlewares! They must be logged in AND be an admin.
router.get('/users', protectRoute, adminRoute, adminController.getAllUsers);
router.put('/users/:id/toggle-status', protectRoute, adminRoute, adminController.toggleUserStatus);

export default router;
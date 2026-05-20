// src/routes/authRoutes.js
import express from 'express';
import { authController } from '../controllers/authController.js';
import { registerValidator, loginValidator } from '../middlewares/authValidator.js';

const router = express.Router();

router.post('/register', registerValidator, authController.registerUser);
router.post('/login', loginValidator, authController.loginUser);

export default router;
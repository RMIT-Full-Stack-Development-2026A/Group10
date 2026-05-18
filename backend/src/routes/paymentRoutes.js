// src/routes/paymentRoutes.js
import express from 'express';
import { protectRoute } from '../middlewares/authMiddleware.js';
import { paymentController } from '../controllers/paymentController.js';

const router = express.Router();

router.post('/deposit', protectRoute, paymentController.depositFunds);
router.post('/subscribe/wallet', protectRoute, paymentController.subscribeWithWallet);
router.post('/create-checkout-session', protectRoute, paymentController.createStripeCheckout);

export default router;
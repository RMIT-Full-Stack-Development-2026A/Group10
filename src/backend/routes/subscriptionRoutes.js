import express from 'express';
import {
    depositToWallet,
    payWithWallet,
    createStripeCheckout,
    confirmStripePayment
} from '../controllers/subscriptionController.js';

const router = express.Router();

router.post('/deposit', depositToWallet);
router.post('/wallet-pay', payWithWallet);
router.post('/stripe-checkout', createStripeCheckout);
router.post('/stripe-success', confirmStripePayment);

export default router;
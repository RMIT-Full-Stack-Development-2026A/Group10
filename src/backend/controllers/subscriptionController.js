import Player from '../models/playerModel.js';
import { sendPremiumWelcomeEmail } from '../../utils/sendEmail.js';
import Stripe from 'stripe';

// Initialize Stripe with your secret key from .env\
// TODO: Other payment methods?
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const SUBSCRIPTION_PRICE = 10; // 10 USD

/**
 * @desc    Deposit money into local wallet (Simulated)
 * @route   POST /api/subscription/deposit
 */
export const depositToWallet = async (req, res) => {
    try {
        const { playerId, amount } = req.body;

        const player = await Player.findByIdAndUpdate(
            playerId,
            { $inc: { walletBalance: amount } },
            { new: true }
        );

        res.status(200).json({ message: `Deposited $${amount}`, balance: player.walletBalance });
    } catch (error) {
        res.status(500).json({ message: 'Error depositing funds' });
    }
};

/**
 * @desc    Pay for subscription using Local Wallet (Req 5.1.1 & 5.1.2)
 * @route   POST /api/subscription/wallet-pay
 */
export const payWithWallet = async (req, res) => {
    try {
        const { playerId } = req.body;
        const player = await Player.findById(playerId);

        if (player.isPremium) {
            return res.status(400).json({ message: 'Already a premium member.' });
        }

        if (player.walletBalance < SUBSCRIPTION_PRICE) {
            return res.status(400).json({ message: 'Insufficient wallet balance.' });
        }

        // Deduct 10 USD and upgrade status
        player.walletBalance -= SUBSCRIPTION_PRICE;
        player.isPremium = true;
        await player.save();

        // Send Email (Req 5.1.2)
        await sendPremiumWelcomeEmail(player.email, player.username);

        res.status(200).json({ message: 'Subscription successful via Wallet!', player });
    } catch (error) {
        res.status(500).json({ message: 'Error processing wallet payment.' });
    }
};

/**
 * @desc    Create Stripe Checkout Session (Req 5.2.1)
 * @route   POST /api/subscription/stripe-checkout
 */
export const createStripeCheckout = async (req, res) => {
    try {
        const { playerId } = req.body;

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: { name: 'Premium Monthly Subscription' },
                        unit_amount: SUBSCRIPTION_PRICE * 100, // Stripe uses cents
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment', // Use 'subscription' if setting up recurring billing in Stripe
            success_url: `${process.env.CLIENT_URL}/profile?success=true&playerId=${playerId}`,
            cancel_url: `${process.env.CLIENT_URL}/profile?canceled=true`,
        });

        res.status(200).json({ url: session.url });
    } catch (error) {
        res.status(500).json({ message: 'Error creating Stripe session.' });
    }
};

/**
 * @desc    Confirm Stripe Success (Called by frontend after redirect)
 * @route   POST /api/subscription/stripe-success
 */
export const confirmStripePayment = async (req, res) => {
    try {
        const { playerId } = req.body;
        const player = await Player.findByIdAndUpdate(
            playerId,
            { isPremium: true },
            { new: true }
        );

        // Send Email (Req 5.1.2)
        if (player) {
            await sendPremiumWelcomeEmail(player.email, player.username);
        }

        res.status(200).json({ message: 'Stripe payment confirmed, account upgraded.' });
    } catch (error) {
        res.status(500).json({ message: 'Error confirming Stripe payment.' });
    }
};
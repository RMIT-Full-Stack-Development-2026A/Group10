// src/controllers/paymentController.js
import User from '../models/User.js';
import { sendEmail } from '../utils/sendEmail.js'; 
import Stripe from 'stripe';

// Initialize Stripe 
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder');

export const paymentController = {
    
    // Deposit funds into local wallet
    depositFunds: async (req, res) => {
        try {
            const { amount } = req.body;
            if (!amount || amount <= 0) return res.status(400).json({ message: 'Invalid deposit amount' });
            
            const user = await User.findById(req.user._id);
            user.walletBalance += Number(amount);
            
            await user.save();
            res.status(200).json({ message: `Successfully deposited $${amount}`, walletBalance: user.walletBalance });
        } 
        catch (error) {
            res.status(500).json({ message: 'Server error during deposit' });
        }
    },

    // Subscribe to Premium using local wallet funds
    subscribeWithWallet: async (req, res) => {
        try {
            const user = await User.findById(req.user._id);
            const SUBSCRIPTION_COST = 10;

            if (user.isPremium) return res.status(400).json({ message: 'You are already a Premium member!' });
            if (user.walletBalance < SUBSCRIPTION_COST) {
                return res.status(400).json({ message: `Insufficient funds. You need $${SUBSCRIPTION_COST}.` });
            }

            user.walletBalance -= SUBSCRIPTION_COST;
            user.isPremium = true;
            await user.save();

            const emailText = `Hello ${user.username},\n\nThank you for subscribing to TicTacToe Premium!\n$10 has been deducted from your local wallet.\nYour new balance is $${user.walletBalance}.\n\nEnjoy your premium features!`;
            sendEmail(user.email, 'Premium Subscription Confirmed!', emailText);

            res.status(200).json({ 
                message: 'Successfully upgraded to Premium!', 
                walletBalance: user.walletBalance,
                isPremium: user.isPremium
            });
        } 
        catch (error) {
            res.status(500).json({ message: 'Server error during subscription' });
        }
    },

    // Stripe checkout session creation for premium subscription
    createStripeCheckout: async (req, res) => {
        try {
            const user = await User.findById(req.user._id);

            if (user.isPremium) {
                return res.status(400).json({ message: 'You are already a Premium member!' });
            }

            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                mode: 'payment', 
                customer_email: user.email,
                client_reference_id: user._id.toString(), 
                line_items: [
                    {
                        price_data: {
                            currency: 'usd',
                            product_data: {
                                name: 'TicTacToe Premium Subscription (1 Month)',
                                description: 'Unlock all premium features, exclusive avatars, and more.',
                            },
                            unit_amount: 1000, 
                        },
                        quantity: 1,
                    },
                ],
                success_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/profile?success=true`,
                cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/profile?canceled=true`,
            });

            res.status(200).json({ url: session.url });

        } 
        catch (error) {
            console.error("Stripe Checkout Error:", error);
            res.status(500).json({ message: 'Failed to create checkout session. Check Stripe Keys.' });
        }
    }
};
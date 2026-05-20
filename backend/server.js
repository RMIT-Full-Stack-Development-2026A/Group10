// server.js
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import Stripe from 'stripe';

import { createServer } from 'http';
import { Server } from 'socket.io';
import { connectDB } from './src/config/db.js'; 
import { sendEmail } from './src/utils/sendEmail.js';

import authRoutes from './src/routes/authRoutes.js'; 
import profileRoutes from './src/routes/profileRoutes.js';
import adminRoutes from './src/routes/adminRoutes.js';
import paymentRoutes from './src/routes/paymentRoutes.js';
import User from './src/models/User.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB before starting the server
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);   
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: { origin: "http://localhost:5173", methods: ["GET", "POST"] }
});

// --- STRIPE WEBHOOK ENDPOINT ---
app.post('/api/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        console.error(`Webhook Error: ${err.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        const userId = session.client_reference_id; 
        try {
            const user = await User.findById(userId);
            if (user) {
                user.isPremium = true;
                await user.save();
                const emailText = `Hello ${user.username},\n\nYour Stripe payment of $10 was successful! You are now a Premium Member.`;
                sendEmail(user.email, 'Stripe Premium Payment Successful!', emailText);
                console.log(`User ${userId} successfully upgraded via Stripe!`);
            }
        } catch (error) {
            console.error("Error upgrading user in DB:", error);
        }
    }
    res.json({ received: true });
});

// --- MIDDLEWARE ---
app.use(cors());
app.use(express.json()); 
app.use('/uploads', express.static('uploads'));

// --- ROUTES ---
app.use('/api/auth', authRoutes); 
app.use('/api/profile', profileRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/admin', adminRoutes);

app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'TicTacToe Backend is running!' });
});

// --- WEBSOCKETS ---
let waitingPlayer = null;

io.on('connection', (socket) => {
    console.log(`New client connected: ${socket.id}`);
    
    socket.on('findMatch', () => {
        console.log(`🔍 ${socket.id} is looking for a match...`);

        if (waitingPlayer && waitingPlayer.id !== socket.id) {
            const roomName = `room_${waitingPlayer.id}_${socket.id}`;
            waitingPlayer.join(roomName);
            socket.join(roomName);

            waitingPlayer.emit('matchFound', { role: 'Player 1', room: roomName });
            socket.emit('matchFound', { role: 'Player 2', room: roomName });

            console.log(`✅ Match started in ${roomName}`);
            waitingPlayer = null; 
        } else {
            waitingPlayer = socket;
            socket.emit('waitingForOpponent');
        }
    });

    socket.on('makeMove', (data) => {
        socket.to(data.room).emit('opponentMove', data);
    });

    socket.on('disconnecting', () => {
        for (const room of socket.rooms) {
            if (room.startsWith('room_')) {
                socket.to(room).emit('opponentDisconnected');
            }
        }
    });

    socket.on('disconnect', () => {
        console.log(`Client disconnected: ${socket.id}`);
        if (waitingPlayer && waitingPlayer.id === socket.id) {
            waitingPlayer = null;
        }
    });
});

// --- START THE ENGINE ---
httpServer.listen(PORT, () => {
    console.log(`Server & WebSockets running on http://localhost:${PORT}`);
});
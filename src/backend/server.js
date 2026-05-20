import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

// Load environment configurations
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware to parse incoming JSON payloads from your frontend forms
app.use(express.json());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
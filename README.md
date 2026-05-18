# 🎮 Full-Stack Real-Time Tic-Tac-Toe

A commercial-grade, real-time multiplayer Tic-Tac-Toe web application. This project goes far beyond a simple grid, featuring secure user authentication, an Admin dashboard, an integrated Stripe payment gateway for premium features, a 3-tier AI engine, and real-time WebSockets matchmaking.

Frontend:
* React (Vite)
* Socket.io-Client
* Custom CSS

Backend:
* Node.js & Express
* Socket.io (WebSockets)
* MongoDB & Mongoose
* JWT (JSON Web Tokens)
* Stripe API (Payments & Webhooks)
* Nodemailer (Emails)

## 🚀 Running the Project Locally

1. Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed and a [MongoDB](https://www.mongodb.com/) database running locally or in the cloud (Atlas). You will also need a free [Stripe](https://stripe.com/) account for test API keys.

2. Installation
Clone the repository and install dependencies for both the frontend and backend:

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

3. Environment Variables
Navigate to the backend folder and create a .env file based on the provided .env.example:

PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
STRIPE_SECRET_KEY=your_stripe_test_secret
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
FRONTEND_URL=http://localhost:5173
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

4. Start the Development Servers
You will need two terminal windows running simultaneously.

Bash
# Terminal 1: Start the backend server
cd backend
npm run dev

# Terminal 2: Start the React frontend
cd frontend
npm run dev

5. Testing the Multiplayer Matchmaking
To test the real-time WebSockets locally:
    Open the app in your primary browser window and log in.
    Open a new Incognito/Private window and log in with a different test account.
    On both windows, navigate to the Game Menu and select Play Online.
    The server will automatically pair the two windows into a private room!
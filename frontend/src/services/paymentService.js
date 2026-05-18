// src/services/paymentService.js
import { httpHelper } from '../utils/httpHelper';

const API_BASE_URL = 'http://localhost:5000/api';

export const paymentService = {
    deposit: async (amount) => {
        return await httpHelper(`${API_BASE_URL}/payments/deposit`, 'POST', { amount });
    },
    subscribeWallet: async () => {
        return await httpHelper(`${API_BASE_URL}/payments/subscribe/wallet`, 'POST');
    },
    createStripeCheckout: async () => {
        return await httpHelper(`${API_BASE_URL}/payments/create-checkout-session`, 'POST');
    }
};
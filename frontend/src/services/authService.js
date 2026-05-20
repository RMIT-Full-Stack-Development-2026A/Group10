// src/services/authService.js
import { httpHelper } from '../utils/httpHelper';

const API_BASE_URL = 'http://localhost:5000/api/auth';

export const authService = {
    register: async (userData) => {
        const response = await httpHelper(`${API_BASE_URL}/register`, 'POST', userData);
        
        // If the backend returns a 400 or 500, throw an error to catch in the component
        if (response.status >= 400) {
            const errorMsg = response.data?.errors?.[0]?.msg || response.data?.message || 'Registration failed';
            throw new Error(errorMsg);
        }
        
        return response.data;
    },

    login: async (credentials) => {
        const response = await httpHelper(`${API_BASE_URL}/login`, 'POST', credentials);
        
        if (response.status >= 400) {
            const errorMsg = response.data?.errors?.[0]?.msg || response.data?.message || 'Login failed';
            throw new Error(errorMsg);
        }
        
        return response.data;
    }
};
// src/services/profileService.js
import { httpHelper } from '../utils/httpHelper';

const API_BASE_URL = 'http://localhost:5000/api';

export const profileService = {
    getProfile: async (userId) => {
        const endpoint = `${API_BASE_URL}/profile/${userId}`;
        return await httpHelper(endpoint, 'GET'); 
    },

    // Fetch the player's match history for the data table
    getGameHistory: async (userId) => {
        const endpoint = `${API_BASE_URL}/profile/${userId}/history`;
        return await httpHelper(endpoint, 'GET');
    },
    
    // Update the player's profile info, including uploading a new logo if they choose
    updateProfile: async (userId, formData) => {
        const endpoint = `${API_BASE_URL}/profile/${userId}`;
        return await httpHelper(endpoint, 'PUT', formData);
    },
    
    // Save a new match result to the player's history
    saveGameResult: async (userId, matchData) => {
        const endpoint = `${API_BASE_URL}/profile/${userId}/history`;
        return await httpHelper(endpoint, 'POST', matchData);
    }
};
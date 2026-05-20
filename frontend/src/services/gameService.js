// src/services/gameService.js
import { httpHelper } from '../utils/httpHelper';

const API_BASE_URL = 'http://localhost:5000/api';

export const gameService = {
    saveMatch: async (matchData) => {
        const endpoint = `${API_BASE_URL}/game/save`;
        return await httpHelper(endpoint, 'POST', matchData);
    }
};
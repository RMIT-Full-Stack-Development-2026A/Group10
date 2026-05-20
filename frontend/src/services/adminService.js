// src/services/adminService.js
import { httpHelper } from '../utils/httpHelper';

const API_BASE_URL = 'http://localhost:5000/api';

export const adminService = {
    // Fetch all users
    getAllUsers: async () => {
        return await httpHelper(`${API_BASE_URL}/admin/users`, 'GET');
    },

    // Toggle a user's Active/Deactivated status
    toggleUserStatus: async (userId) => {
        return await httpHelper(`${API_BASE_URL}/admin/users/${userId}/toggle-status`, 'PUT');
    }
};
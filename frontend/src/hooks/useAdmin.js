// src/pages/useAdmin.js
import { useState, useEffect } from 'react';
import { adminService } from '../services/adminService';

export const useAdmin = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch all users when the dashboard opens
    useEffect(() => {
        const fetchUsers = async () => {
            const response = await adminService.getAllUsers();
            
            if (response.status === 200 && response.data) {
                setUsers(response.data);
            } else if (response.status === 403) {
                setError("Access Denied: You do not have Admin privileges.");
            } else {
                setError("Failed to load users.");
            }
            setIsLoading(false);
        };
        
        fetchUsers();
    }, []);

    // Handle the ban/reactivate button
    const toggleUserStatus = async (userId) => {
        const response = await adminService.toggleUserStatus(userId);
        
        if (response.status === 200 && response.data) {
            setUsers(prevUsers => prevUsers.map(user => 
                user._id === userId ? response.data : user
            ));
        } else {
            alert("Failed to update user status.");
        }
    };

    return { users, isLoading, error, toggleUserStatus };
};
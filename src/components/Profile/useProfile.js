// src/components/Profile/useProfile.js
import { useState } from 'react';

export const useProfile = () => {
    // In a real app, this would be populated by fetching data from the backend
    const [profileData, setProfileData] = useState({
        username: 'PlayerOne',
        email: 'player@example.com',
        password: '', // Usually left blank unless changing
        country: 'VN',
        logoUrl: null // Will hold the uploaded image preview
    });

    const [updateMessage, setUpdateMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Feature 3.2.1: Frontend preview generation
            // In a full implementation, you would resize this using a Canvas API or backend library
            const imageUrl = URL.createObjectURL(file);
            setProfileData(prev => ({ ...prev, logoUrl: imageUrl }));
            setUpdateMessage('Logo uploaded! Remember to save changes.');
        }
    };

    const handleSave = (e) => {
        e.preventDefault();
        // TODO: Use httpHelper here to send the updated profileData (and image file) to the backend
        console.log("Saving profile data:", profileData);
        setUpdateMessage('Profile updated successfully!');
        
        // Clear message after 3 seconds
        setTimeout(() => setUpdateMessage(''), 3000);
    };

    return { profileData, updateMessage, handleChange, handleImageUpload, handleSave };
};
// src/components/Profile/useProfile.js
import { useState, useEffect } from 'react';
import { profileService } from '../services/profileService';

export const useProfile = () => {
    const [profileData, setProfileData] = useState({
        username: 'Loading...', 
        email: 'Loading...', 
        password: '', 
        country: '', 
        logoUrl: null
    });
    const [logoFile, setLogoFile] = useState(null);
    const [updateMessage, setUpdateMessage] = useState('');

    useEffect(() => {
        const loadProfile = async () => {
            const response = await profileService.getProfile('me'); 
            if (response.data) {
                setProfileData(prev => ({
                    ...prev,
                    username: response.data.username,
                    email: response.data.email,
                    country: response.data.country || 'VN',
                    logoUrl: response.data.logoUrl || null
                }));
            }
        };
        loadProfile();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileData(prev => ({ ...prev, logoUrl: URL.createObjectURL(file) }));
            setLogoFile(file);
            setUpdateMessage('Logo uploaded! Remember to save changes.');
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        
        // Create a FormData object to send text fields and the file together
        const formData = new FormData();
        formData.append('username', profileData.username);
        formData.append('email', profileData.email);
        formData.append('country', profileData.country);
        if (profileData.password) formData.append('password', profileData.password);
        if (logoFile) formData.append('logo', logoFile); 

        // Call the service to update the profile
        const response = await profileService.updateProfile('me', formData);

        // Check response status and show appropriate message
        if (response.status === 200) {
            setUpdateMessage('Profile updated successfully!');
            setProfileData(prev => ({ ...prev, password: '' })); 
            setLogoFile(null); 
        } else {
            setUpdateMessage('Failed to update profile.');
        }
        
        setTimeout(() => setUpdateMessage(''), 3000);
    };

    return { profileData, updateMessage, handleChange, handleImageUpload, handleSave };
};
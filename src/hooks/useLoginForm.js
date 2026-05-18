// src/components/Auth/useLoginForm.js
import { useState } from 'react';
import { httpHelper } from '../utils/httpHelper';
import { useNavigate } from "react-router-dom"; // Prepared for future API calls

// Define the shape of your state for type safety


export const useLoginForm = () => {

    const [credentials, setCredentials] = useState({
        identifier: '', // Can be either Username or Email
        password: ''
    });

    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const updateField = (field, value) => {
        // 1. Update the credential value (identifier or password)
        setCredentials((prev) => ({
            ...prev,
            [field]: value,
        }));

        // 2. Clear field-specific error if it exists so the red border disappears while typing
        if (error && error[field]) {
            setError((prev) => ({
                ...prev,
                [field]: undefined,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Basic Frontend Validation: Fields must not be empty
        if (!credentials.identifier || !credentials.password) {
            setError('Please enter both Username/Email and Password.');
            return;
        }

        setIsLoading(true);
        console.log("Ready to send login request:", credentials);

        // Simulate API loading time
        setTimeout(() => {
            setIsLoading(false);

            // 3. Navigate to the profile page upon "success"
            console.log("Login simulated successfully. Redirecting to Profile...");
            navigate('/');

        }, 1000);
    };

    return { credentials, error, isLoading, updateField, handleSubmit };
};
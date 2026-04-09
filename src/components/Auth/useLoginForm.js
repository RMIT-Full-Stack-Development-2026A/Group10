// src/components/Auth/useLoginForm.js
import { useState } from 'react';
import { httpHelper } from '../../utils/httpHelper'; // Prepared for future API calls

export const useLoginForm = () => {
    const [credentials, setCredentials] = useState({
        identifier: '', // Can be either Username or Email
        password: ''
    });

    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prev => ({ ...prev, [name]: value }));
        // Clear the error message as soon as the user starts typing again
        if (error) setError(''); 
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
        
        // TODO: We will use httpHelper here later to send data to the Backend
        // Example: const response = await httpHelper('/api/auth/login', 'POST', credentials);
        // If the Backend returns an error (e.g., 5 failed attempts), we use: setError(response.error);

        // Simulate API loading time for now
        setTimeout(() => {
            setIsLoading(false);
            // Simulate an error so you can test the UI warning banner
            // setError('Invalid credentials or account locked.'); 
        }, 1000);
    };

    return { credentials, error, isLoading, handleChange, handleSubmit };
};
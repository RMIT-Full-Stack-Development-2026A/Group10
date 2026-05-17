// src/components/Auth/useLoginForm.js
import { useState } from 'react';
import { httpHelper } from '../../utils/httpHelper';
import { useNavigate } from "react-router-dom"; // Prepared for future API calls

export const useLoginForm = () => {
    const [credentials, setCredentials] = useState({
        identifier: '', // Can be either Username or Email
        password: ''
    });

    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

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

        // Simulate API loading time
        setTimeout(() => {
            setIsLoading(false);

            // 3. Navigate to the profile page upon "success"
            console.log("Login simulated successfully. Redirecting to Profile...");
            navigate('/profile');

        }, 1000);
    };

    return { credentials, error, isLoading, handleChange, handleSubmit };
};
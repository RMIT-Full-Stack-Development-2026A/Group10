// src/components/Auth/useLoginForm.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService'; 

export const useLoginForm = () => {
    const [credentials, setCredentials] = useState({
        identifier: '',
        password: ''
    });

    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prev => ({ ...prev, [name]: value }));
        if (error) setError(''); 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!credentials.identifier || !credentials.password) {
            setError('Please enter both Username/Email and Password.');
            return;
        }

        setIsLoading(true);
        setError(''); 
        
        try {
            const loginPayload = {
                identifier: credentials.identifier,
                password: credentials.password
            };

            const response = await authService.login(loginPayload);
            localStorage.setItem('token', response.token);
            navigate('/profile'); 
            
        } catch (err) {
            setError(err.message || 'Login failed. Please check your credentials.');
        } finally {
            setIsLoading(false);
        }
    };

    return { credentials, error, isLoading, handleChange, handleSubmit };
};
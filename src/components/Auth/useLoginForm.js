// src/components/Auth/useLoginForm.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { httpHelper } from '../../utils/httpHelper';

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

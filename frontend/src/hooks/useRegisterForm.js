// src/components/Auth/useRegisterForm.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService'; 

export const useRegisterForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        country: ''
    });

    const [errors, setErrors] = useState({});
    const [apiError, setApiError] = useState(''); 
    const [isLoading, setIsLoading] = useState(false); 
    const navigate = useNavigate();

    // Validate a single field based on strict requirements
    const validateField = (name, value) => {
        let errorMsg = '';

        switch (name) {
            case 'username':
                const usernameRegex = /^[a-zA-Z0-9_-]+$/;
                if (!usernameRegex.test(value)) {
                    errorMsg = 'Username can only contain letters, numbers, _, and -. Example: John_Doe-99';
                }
                break;
            case 'email':
                const emailRegex = /^[^\s@()]+@[^\s@()]+\.[^\s@()]+$/;
                if (value.length >= 255 || !emailRegex.test(value)) {
                    errorMsg = 'Invalid email syntax. Must contain exactly one "@" and "." after it. Example: user@domain.com';
                }
                break;
            case 'password':
                if (value.length < 8) errorMsg = 'Password must be at least 8 characters.';
                else if (!/(?=.*\d)/.test(value)) errorMsg = 'Password must contain at least 1 number.';
                else if (!/(?=.*[!@#$%^&*])/.test(value)) errorMsg = 'Password must contain at least 1 special character (!@#$%^&*).';
                else if (!/(?=.*[A-Z])/.test(value)) errorMsg = 'Password must contain at least 1 uppercase letter.';
                break;
            case 'confirmPassword':
                if (value !== formData.password) {
                    errorMsg = 'Passwords do not match.';
                }
                break;
            default:
                break;
        }
        return errorMsg;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        
        const error = validateField(name, value);
        setErrors(prev => ({ ...prev, [name]: error }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let formIsValid = true;
        let newErrors = {};
        
        Object.keys(formData).forEach(key => {
            const error = validateField(key, formData[key]);
            if (error) {
                newErrors[key] = error;
                formIsValid = false;
            }
        });

        setErrors(newErrors);

        if (formIsValid) {
            setIsLoading(true);
            setApiError('');

            try {
                const { confirmPassword, ...dataToSend } = formData; 
                const response = await authService.register(dataToSend);
                localStorage.setItem('token', response.token);
                navigate('/profile');
            } 
            catch (err) {
                setApiError(err.message || 'Registration failed. Try a different username or email.');
            } 
            finally {
                setIsLoading(false);
            }
        }
    };

    return { formData, errors, apiError, isLoading, handleChange, handleSubmit };
};
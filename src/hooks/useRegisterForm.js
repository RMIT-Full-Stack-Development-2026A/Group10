// src/components/Auth/useRegisterForm.js
import { useState } from 'react';

export const useRegisterForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        country: ''
    });

    const [errors, setErrors] = useState({});

    // Validate a single field based on strict requirements
    const validateField = (name, value) => {
        let errorMsg = '';

        switch (name) {
            case 'username':
                // Only English alphabets, numbers, underscore, and hyphen (Req 1.2.3)
                const usernameRegex = /^[a-zA-Z0-9_-]+$/;
                if (!usernameRegex.test(value)) {
                    errorMsg = 'Username can only contain letters, numbers, _, and -. Example: John_Doe-99';
                }
                break;
            case 'email':
                // Exactly one '@', at least one '.' after '@', < 255 chars, no spaces/prohibited chars (Req 1.2.2)
                const emailRegex = /^[^\s@()]+@[^\s@()]+\.[^\s@()]+$/;
                if (value.length >= 255 || !emailRegex.test(value)) {
                    errorMsg = 'Invalid email syntax. Must contain exactly one "@" and "." after it. Example: user@domain.com';
                }
                break;
            case 'password':
                // Req 1.2.1: 8 chars, 1 number, 1 special char, 1 uppercase letter
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

    // Inside your useRegisterForm hook:
    const setField = (field, value) => {
        // 1. Update the form data value dynamically
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));

        // 2. Clear field-specific error if it exists
        if (errors && errors[field]) {
            setErrors((prev) => ({
                ...prev,
                [field]: undefined,
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validate all fields before submission
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
            console.log("Validation passed! Ready to send to API:", formData);
            // We will call the httpHelper here to send data to backend later
        }
    };

    return { formData, errors, setField, handleSubmit };
};
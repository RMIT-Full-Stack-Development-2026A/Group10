// src/components/Auth/RegisterForm.jsx
import React from 'react';
import './RegisterForm.css';
import { useRegisterForm } from '../../hooks/useRegisterForm'; 
import { Link } from 'react-router-dom';
import { Card } from '../common/Card';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import { Button } from '../common/Button';

const RegisterForm = () => {
    const { formData, errors, apiError, isLoading, handleChange, handleSubmit } = useRegisterForm();

    const countryOptions = [
        { label: 'Vietnam', value: 'VN' },
        { label: 'United States', value: 'US' },
        { label: 'United Kingdom', value: 'UK' }
    ];

    return (
        <Card title="Create an Account" className="register-form-container card-sm">
            {apiError && <div className="error-banner" style={{ marginBottom: '15px' }}>{apiError}</div>}
            
            <form onSubmit={handleSubmit}>
                <Input 
                    label="Username" 
                    name="username" 
                    value={formData.username} 
                    onChange={handleChange} 
                    error={errors.username}
                    required 
                />

                <Input 
                    label="Email" 
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    error={errors.email}
                    required 
                />

                <Input 
                    label="Password" 
                    type="password" 
                    name="password" 
                    value={formData.password} 
                    onChange={handleChange} 
                    error={errors.password}
                    required 
                />

                <Input 
                    label="Confirm Password" 
                    type="password" 
                    name="confirmPassword" 
                    value={formData.confirmPassword} 
                    onChange={handleChange} 
                    error={errors.confirmPassword}
                    required 
                />

                <Select 
                    label="Country" 
                    name="country" 
                    value={formData.country} 
                    onChange={handleChange} 
                    options={countryOptions}
                    required 
                />

                <Button type="submit" variant="primary" disabled={isLoading}>
                    {isLoading ? 'Creating Account...' : 'Register'}
                </Button>
            </form>

            <div className="auth-footer" style={{ textAlign: 'center', marginTop: '20px' }}>
                <p>Already have an account? <Link to="/" className="text-link" style={{ color: '#2196F3', fontWeight: '500' }}>Login here</Link></p>
            </div>
        </Card>
    );
};

export default RegisterForm;
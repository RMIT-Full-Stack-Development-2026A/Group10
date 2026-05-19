// src/components/Auth/LoginForm.jsx
import React from 'react';
import './LoginForm.css';
import { useLoginForm } from '../../hooks/useLoginForm';
import { Link } from 'react-router-dom';
import { Card } from '../common/Card';
import { Input } from '../common/Input';
import { Button } from '../common/Button';

const LoginForm = () => {
    const { credentials, error, isLoading, handleChange, handleSubmit } = useLoginForm();

    return (
        <Card title="Welcome to TicTacToang" className="auth-form-container card-sm">
            <p className="subtitle">Sign in to continue your journey</p>
            
            {error && <div className="error-banner">{error}</div>}

            <form onSubmit={handleSubmit}>
                <Input 
                    label="Username or Email" 
                    name="identifier" 
                    value={credentials.identifier} 
                    onChange={handleChange} 
                    required 
                    placeholder="Enter username or email"
                />

                <Input 
                    label="Password" 
                    type="password" 
                    name="password" 
                    value={credentials.password} 
                    onChange={handleChange} 
                    required 
                    placeholder="Enter password"
                />

                <Button type="submit" variant="primary" disabled={isLoading}>
                    {isLoading ? 'Signing in...' : 'Login'}
                </Button>
            </form>

            <div className="auth-footer" style={{ textAlign: 'center', marginTop: '20px' }}>
                <p>Don't have an account? <Link to="/register" className="text-link" style={{ color: '#2196F3', fontWeight: '500' }}>Register here</Link></p>
            </div>
        </Card>
    );
};

export default LoginForm;
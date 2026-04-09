// src/components/Auth/LoginForm.jsx
import React from 'react';
import './LoginForm.css'; // Import the specific CSS file
import { useLoginForm } from './useLoginForm';
import { Link } from 'react-router-dom'; // Used to navigate to the Register page

const LoginForm = () => {
    const { credentials, error, isLoading, handleChange, handleSubmit } = useLoginForm();

    return (
        <div className="auth-form-container">
            <h2>Welcome to TicTacToang</h2>
            <p className="subtitle">Sign in to continue your journey</p>
            
            {/* Display global errors (e.g., wrong password, locked account) at the top */}
            {error && <div className="error-banner">{error}</div>}

            <form onSubmit={handleSubmit} className="auth-form">
                <div className="form-group">
                    <label htmlFor="identifier">Username or Email</label>
                    <input 
                        type="text" 
                        id="identifier" 
                        name="identifier" 
                        value={credentials.identifier} 
                        onChange={handleChange} 
                        required 
                        placeholder="Enter username or email"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        value={credentials.password} 
                        onChange={handleChange} 
                        required 
                        placeholder="Enter password"
                    />
                </div>

                <button type="submit" className="submit-btn" disabled={isLoading}>
                    {isLoading ? 'Signing in...' : 'Login'}
                </button>
            </form>

            <div className="auth-footer">
                <p>Don't have an account? <Link to="/register" className="text-link">Register here</Link></p>
            </div>
        </div>
    );
};

export default LoginForm;
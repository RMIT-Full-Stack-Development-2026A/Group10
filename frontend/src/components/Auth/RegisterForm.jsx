// src/components/Auth/RegisterForm.jsx
import React from 'react';
import './RegisterForm.css';
import { useRegisterForm } from '../../hooks/useRegisterForm'; 
import { Link } from 'react-router-dom';

const RegisterForm = () => {
    const { formData, errors, apiError, isLoading, handleChange, handleSubmit } = useRegisterForm();

    return (
        <div className="register-form-container">
            <h2>Create an Account</h2>
            {apiError && <div className="error-banner" style={{ marginBottom: '15px' }}>{apiError}</div>}
            <form onSubmit={handleSubmit} className="register-form">
                
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required />
                    {errors.username && <span className="error-text">{errors.username}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                    {errors.email && <span className="error-text">{errors.email}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
                    {errors.password && <span className="error-text">{errors.password}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
                    {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="country">Country</label>
                    <select id="country" name="country" value={formData.country} onChange={handleChange} required>
                        <option value="">Select a country</option>
                        <option value="VN">Vietnam</option>
                        <option value="US">United States</option>
                        <option value="UK">United Kingdom</option>
                    </select>
                </div>

                <button type="submit" className="submit-btn" disabled={isLoading}>
                    {isLoading ? 'Creating Account...' : 'Register'}
                 </button>
            </form>
            <div className="auth-footer" style={{ textAlign: 'center', marginTop: '20px' }}>
                <p>Already have an account? <Link to="/" className="text-link" style={{ color: 'var(--secondary-color)', fontWeight: '500' }}>Login here</Link></p>
            </div>
        </div>
    );
};


export default RegisterForm;
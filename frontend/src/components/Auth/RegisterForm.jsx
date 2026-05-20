// src/components/Auth/RegisterForm.jsx
/* import React from 'react';
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


export default RegisterForm; */

// src/components/Auth/RegisterForm.jsx
import React from 'react';
import './RegisterForm.css';
import { useRegisterForm } from '../../hooks/useRegisterForm';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGamepad, faXmark, faO } from '@fortawesome/free-solid-svg-icons';

const countries = [
    'Vietnam', 'Philippines', 'Singapore', 'Thailand', 'Japan',
    'South Korea', 'United States', 'United Kingdom', 'Germany',
    'France', 'Italy', 'Spain', 'Australia', 'Canada'
];

const RegisterForm = () => {
    const { formData, errors, apiError, isLoading, handleChange, handleSubmit } = useRegisterForm();

    return (
        <div className="register-wrapper">
            {/* Background floating icons */}
            <FontAwesomeIcon icon={faXmark} className="bg-icon bg-icon-x" />
            <FontAwesomeIcon icon={faO} className="bg-icon bg-icon-o" />

            <div className="auth-card">
                <div className="auth-header">
                    <p className="auth-title">
                        <FontAwesomeIcon icon={faGamepad} /> TicTacToang
                    </p>
                    <p className="auth-subtitle">Create your player account</p>
                </div>

                {apiError && <div className="error-banner">{apiError}</div>}

                <form onSubmit={handleSubmit} className="auth-form">

                    <div className="input-group">
                        <label htmlFor="username" className="input-label">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Enter your username"
                            className={`input-field ${errors.username ? 'input-error' : ''}`}
                            required
                        />
                        {errors.username && <span className="error-text">{errors.username}</span>}
                    </div>

                    <div className="input-group">
                        <label htmlFor="email" className="input-label">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className={`input-field ${errors.email ? 'input-error' : ''}`}
                            required
                        />
                        {errors.email && <span className="error-text">{errors.email}</span>}
                    </div>

                    <div className="input-group">
                        <label htmlFor="country" className="input-label">Country</label>
                        <select
                            id="country"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            className={`input-field custom-select ${errors.country ? 'input-error' : ''}`}
                            required
                        >
                            <option value="" disabled>Select</option>
                            {countries.map(country => (
                                <option key={country} value={country}>{country}</option>
                            ))}
                        </select>
                        {errors.country && <span className="error-text">{errors.country}</span>}
                    </div>

                    {/* Passwords row (Side-by-side on desktop, stacked on mobile) */}
                    <div className="password-row">
                        <div className="input-group">
                            <label htmlFor="password" className="input-label">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                className={`input-field ${errors.password ? 'input-error' : ''}`}
                                required
                            />
                            {errors.password && <span className="error-text">{errors.password}</span>}
                        </div>

                        <div className="input-group">
                            <label htmlFor="confirmPassword" className="input-label">Confirm Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm your password"
                                className={`input-field ${errors.confirmPassword ? 'input-error' : ''}`}
                                required
                            />
                            {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
                        </div>
                    </div>

                    <button type="submit" className="submit-btn" disabled={isLoading}>
                        {isLoading ? 'Creating Account...' : 'Initiate Account'}
                    </button>
                </form>

                <div className="auth-footer">
                    <p>
                        Already have an account?{' '}
                        <Link to="/login" className="footer-link">Login here</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;
import React, {useState} from 'react';
import './LoginForm.css';
import { useLoginForm } from '../../hooks/useLoginForm';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGamepad, faXmark, faO } from '@fortawesome/free-solid-svg-icons';

const LoginForm = () => {
    const { credentials, error, isLoading, handleChange, handleSubmit } = useLoginForm();
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="login-wrapper">
            <FontAwesomeIcon icon={faXmark} className="bg-icon bg-icon-x" />
            <FontAwesomeIcon icon={faO} className="bg-icon bg-icon-o" />

            <div className="auth-card">
                <div className="auth-header">
                    <p className="auth-title">
                        <FontAwesomeIcon icon={faGamepad} /> TicTacToang
                    </p>
                    <p className="auth-subtitle">Sign in to continue your journey</p>
                </div>

                {error && <div className="error-banner">{error}</div>}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="input-group">
                        <label htmlFor="identifier" className="input-label">Username or Email</label>
                        <input
                            type="text"
                            id="identifier"
                            name="identifier"
                            value={credentials.identifier}
                            onChange={handleChange}
                            required
                            placeholder="Enter username or email"
                            className="input-field"
                        />

                    </div>

                    <div className="input-group">
                        <label htmlFor="password" className="input-label">Password</label>
                        <div className="password-field">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            name="password"
                            value={credentials.password}
                            onChange={handleChange}
                            required
                            placeholder="Enter your password"
                            className="input-field"
                        />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="password-toggle-btn"
                            >
                                {showPassword ? 'Hide' : 'Show'}
                            </button>
                        </div>
                    </div>

                    <button type="submit" className="submit-btn" disabled={isLoading}>
                        {isLoading ? 'Signing in...' : 'Enter the arena'}
                    </button>
                </form>

                <div className="auth-footer">
                    <p>
                        Don't have an account?{' '}
                        <Link to="/register" className="footer-link">Register here</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
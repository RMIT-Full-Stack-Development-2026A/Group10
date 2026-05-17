// src/components/Auth/LoginForm.jsx
import React from 'react';
import { useLoginForm } from '../../hooks/useLoginForm';
import { Link } from 'react-router-dom'; // Used to navigate to the Register page

const LoginForm = () => {
    const { credentials, error, isLoading, handleChange, handleSubmit } = useLoginForm();

    return (
        <div className="max-w-md mx-auto my-10 p-6 bg-white rounded-xl shadow-md border border-gray-100 font-sans">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Welcome to TicTacToang</h2>
            <p className="text-sm text-gray-500 mb-6">Sign in to continue your journey</p>

            {/* Display global errors (e.g., wrong password, locked account) at the top */}
            {error && (
                <div className="p-3 mb-4 text-sm text-red-800 bg-red-50 rounded-lg border border-red-200">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col space-y-1">
                    <label htmlFor="identifier" className="text-sm font-medium text-gray-700">
                        Username or Email
                    </label>
                    <input
                        type="text"
                        id="identifier"
                        name="identifier"
                        value={credentials.identifier}
                        onChange={handleChange}
                        required
                        placeholder="Enter username or email"
                        className="px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div className="flex flex-col space-y-1">
                    <label htmlFor="password" className="text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        required
                        placeholder="Enter password"
                        className="px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full px-4 py-2 mt-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-sm transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? 'Signing in...' : 'Login'}
                </button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-600">
                <p>
                    Don't have an account?{' '}
                    <Link to="/register" className="text-blue-600 font-medium hover:text-blue-500 hover:underline">
                        Register here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginForm;
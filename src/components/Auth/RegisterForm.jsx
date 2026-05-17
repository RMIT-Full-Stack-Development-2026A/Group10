// src/components/Auth/RegisterForm.jsx
import React from 'react';
import { useRegisterForm } from '../../hooks/useRegisterForm'; // Import our custom logic
import { Link } from 'react-router-dom';

const RegisterForm = () => {
    // Bring in logic from the hook
    const { formData, errors, handleChange, handleSubmit } = useRegisterForm();

    return (
        <div className="max-w-md mx-auto my-10 p-6 bg-white rounded-xl shadow-md border border-gray-100 font-sans">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Create an Account</h2>
            <form onSubmit={handleSubmit} className="space-y-4">

                <div className="flex flex-col space-y-1">
                    <label htmlFor="username" className="text-sm font-medium text-gray-700">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        className="px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.username && <span className="text-xs text-red-500 mt-1">{errors.username}</span>}
                </div>

                <div className="flex flex-col space-y-1">
                    <label htmlFor="email" className="text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.email && <span className="text-xs text-red-500 mt-1">{errors.email}</span>}
                </div>

                <div className="flex flex-col space-y-1">
                    <label htmlFor="password" className="text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.password && <span className="text-xs text-red-500 mt-1">{errors.password}</span>}
                </div>

                <div className="flex flex-col space-y-1">
                    <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        className="px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.confirmPassword && <span className="text-xs text-red-500 mt-1">{errors.confirmPassword}</span>}
                </div>

                <div className="flex flex-col space-y-1">
                    <label htmlFor="country" className="text-sm font-medium text-gray-700">
                        Country
                    </label>
                    <select
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        required
                        className="px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="">Select a country</option>
                        <option value="VN">Vietnam</option>
                        <option value="US">United States</option>
                        <option value="UK">United Kingdom</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="w-full px-4 py-2 mt-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-sm transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Register
                </button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-600">
                <p>
                    Already have an account?{' '}
                    <Link to="/" className="text-blue-600 font-medium hover:text-blue-500 hover:underline">
                        Login here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterForm;
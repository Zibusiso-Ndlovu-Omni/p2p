import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from "../../../services/auth.service.js";
import Cookies from 'js-cookie';

export function UserLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await authService.userLogin({ email, password });
            const { token } = response.data;


            Cookies.set('token', token, { expires: 7, secure: true, sameSite: 'Lax' });
            navigate('/user-dashboard');
        } catch (err) {

            const errorMessage = err.response?.data?.message || 'Login failed. Please check your credentials and try again.';
            setError(errorMessage);
            console.error("Login Error:", err);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-300 hover:scale-105">
                <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">User Login</h1>
                <p className="text-center text-gray-600 mb-6">Welcome back! Please log in to your account.</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <strong className="font-bold">Oops! </strong>
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-800 mb-1">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out placeholder-gray-400"
                            placeholder="your.email@example.com"
                            aria-label="Email Address"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-800 mb-1">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out placeholder-gray-400"
                            placeholder="••••••••"
                            aria-label="Password"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 ease-in-out transform hover:-translate-y-0.5"
                    >
                        Login
                    </button>
                </form>
                <p className="mt-6 text-center text-gray-600 text-sm">
                    Don't have an account? {' '}
                    <a href="/register" className="font-medium text-blue-600 hover:text-blue-500 hover:underline">
                        Sign up here
                    </a>
                </p>
            </div>
        </div>
    );
}

export function ExhibitorLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear any previous errors

        try {
            const response = await authService.exhibitorLogin({ email, password });
            const { token } = response.data;

            // Set the token as a secure cookie, expiring in 7 days
            Cookies.set('token', token, { expires: 7, secure: true, sameSite: 'Lax' });
            navigate('/exhibitor-dashboard'); // Redirect to exhibitor dashboard on successful login
        } catch (err) {
            // Display a more specific error message if available, otherwise a generic one
            const errorMessage = err.response?.data?.message || 'Login failed. Please check your credentials and try again.';
            setError(errorMessage);
            console.error("Exhibitor Login Error:", err); // Log the error for debugging
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-teal-100 p-4">
            <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-300 hover:scale-105">
                <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8">Exhibitor Login</h1>
                <p className="text-center text-gray-600 mb-6">Access your exhibitor dashboard.</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <strong className="font-bold">Error! </strong>
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-800 mb-1">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition duration-150 ease-in-out placeholder-gray-400"
                            placeholder="your.email@company.com"
                            aria-label="Email Address"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-800 mb-1">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition duration-150 ease-in-out placeholder-gray-400"
                            placeholder="••••••••"
                            aria-label="Password"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-semibold text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-200 ease-in-out transform hover:-translate-y-0.5"
                    >
                        Login
                    </button>
                </form>
                <p className="mt-6 text-center text-gray-600 text-sm">
                    Having trouble logging in? {' '}
                    <a href="/exhibitor-support" className="font-medium text-green-600 hover:text-green-500 hover:underline">
                        Contact Support
                    </a>
                </p>
            </div>
        </div>
    );
}

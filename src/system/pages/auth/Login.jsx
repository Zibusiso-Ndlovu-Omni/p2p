import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from "../../../services/auth.service.js";
import Cookies from 'js-cookie';
import { Building2 } from 'lucide-react';
import {jwtDecode} from "jwt-decode";

export function UserLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const roleDashboardMap = {
        1: '/user-dashboard',
        2: '/dashboard'
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await authService.userLogin({ email, password });
            const { token } = response.data;

            Cookies.set('token', token, { expires: 7, secure: true, sameSite: 'Lax' });

            const decodedToken = jwtDecode(token);
            const roleId = decodedToken.role_id;

            const redirectTo = roleDashboardMap[roleId] || '/default-dashboard';

            navigate(redirectTo);

        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Login failed. Please check your credentials and try again.';
            setError(errorMessage);
            console.error("Login Error:", err);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black p-4 relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-amber-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-2000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-300 rounded-full mix-blend-multiply filter blur-xl opacity-5 animate-pulse animation-delay-4000"></div>
            </div>

            <div className="relative z-10 bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 hover:scale-105">
                <h1 className="text-4xl font-bold text-center text-white mb-8">Attendant Login</h1>
                <p className="text-center text-gray-300 mb-6">Welcome back! Please log in to your account.</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="bg-red-900 border border-red-700 text-red-300 px-4 py-3 rounded-lg relative" role="alert">
                            <strong className="font-bold">Oops! </strong>
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-1">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-800 text-white focus:ring-amber-500 focus:border-amber-500 transition duration-150 ease-in-out placeholder-gray-400"
                            placeholder="your.email@example.com"
                            aria-label="Email Address"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-1">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-800 text-white focus:ring-amber-500 focus:border-amber-500 transition duration-150 ease-in-out placeholder-gray-400"
                            placeholder="••••••••"
                            aria-label="Password"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full group relative overflow-hidden bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-gray-900 py-4 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-amber-400/25"
                    >
                        <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                        <span className="relative flex items-center justify-center text-lg">Login</span>
                    </button>
                </form>

                <p className="mt-6 text-center text-gray-300 text-sm">
                    Don't have an account? {' '}
                    <a href="/register" className="font-medium text-amber-400 hover:text-amber-300 hover:underline">
                        Sign up here
                    </a>
                </p>
            </div>

            <div className="absolute top-20 left-20 w-2 h-2 bg-amber-400/30 rounded-full animate-ping"></div>
            <div className="absolute bottom-32 right-16 w-3 h-3 bg-amber-400/40 rounded-full animate-bounce"></div>
            <div className="absolute top-1/3 right-8 w-1 h-1 bg-amber-400/50 rounded-full animate-pulse"></div>
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
        setError('');

        try {
            const response = await authService.exhibitorLogin({ email, password });
            const { token } = response.data;
            Cookies.set('token', token, { expires: 7, secure: true, sameSite: 'Lax' });
            navigate('/exhibitor/dashboard');
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Login failed. Please check your credentials and try again.';
            setError(errorMessage);
            console.error("Exhibitor Login Error:", err);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black p-4 relative overflow-hidden">

            <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-amber-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-2000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-300 rounded-full mix-blend-multiply filter blur-xl opacity-5 animate-pulse animation-delay-4000"></div>

            <div className="relative z-10 bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-2xl shadow-2xl w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full mb-4 shadow-lg shadow-amber-400/25">
                        <Building2 className="w-8 h-8 text-black" />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Exhibitor Login</h1>
                    <p className="text-gray-300">Access your exhibitor dashboard</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="bg-red-200 border border-red-400 text-red-800 px-4 py-3 rounded relative text-sm">
                            <strong className="font-bold">Error: </strong>
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-1">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 bg-black/20 text-white border border-amber-400/20 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                            placeholder="your.email@company.com"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-1">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 bg-black/20 text-white border border-amber-400/20 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full group relative overflow-hidden bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-amber-400/25 border border-amber-400/30"
                    >
                        <div className="absolute inset-0 bg-amber-400/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                        <span className="relative z-10">Login</span>
                    </button>
                </form>

                <p className="mt-6 text-center text-gray-400 text-sm">
                    Having trouble logging in?{' '}
                    <a href="/exhibitor-support" className="font-medium text-amber-400 hover:underline">
                        Contact Support
                    </a>
                </p>
            </div>

            <div className="absolute top-20 left-20 w-2 h-2 bg-amber-400/30 rounded-full animate-ping"></div>
            <div className="absolute bottom-32 right-16 w-3 h-3 bg-amber-400/40 rounded-full animate-bounce"></div>
            <div className="absolute top-1/3 right-8 w-1 h-1 bg-amber-400/50 rounded-full animate-pulse"></div>
        </div>
    );
    }

import React from 'react';
import { useNavigate } from "react-router-dom";
import { User, Building2 } from 'lucide-react';

export function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black p-4 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-amber-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-2000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-300 rounded-full mix-blend-multiply filter blur-xl opacity-5 animate-pulse animation-delay-4000"></div>
            </div>

            <div className="relative z-10 bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-2xl shadow-2xl w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full mb-4 shadow-lg shadow-amber-400/25">
                        <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                            <div className="w-4 h-4 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full"></div>
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
                    <p className="text-gray-300">Choose your account type to continue</p>
                </div>

                {/* Login Buttons */}
                <div className="space-y-4">
                    <button
                        onClick={() => navigate('/user-login')}
                        className="w-full group relative overflow-hidden bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-gray-900 py-4 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-amber-400/25"
                    >
                        <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                        <div className="relative flex items-center justify-center space-x-3">
                            <User className="w-5 h-5" />
                            <span>User Login</span>
                        </div>
                    </button>

                    <button
                        onClick={() => navigate('/exhibitor-login')}
                        className="w-full group relative overflow-hidden bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-gray-700/25 border border-amber-400/30"
                    >
                        <div className="absolute inset-0 bg-amber-400/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                        <div className="relative flex items-center justify-center space-x-3">
                            <Building2 className="w-5 h-5 text-amber-400" />
                            <span>Exhibitor Login</span>
                        </div>
                    </button>
                </div>
            </div>

            {/* Floating elements with amber theme */}
            <div className="absolute top-20 left-20 w-2 h-2 bg-amber-400/30 rounded-full animate-ping"></div>
            <div className="absolute bottom-32 right-16 w-3 h-3 bg-amber-400/40 rounded-full animate-bounce"></div>
            <div className="absolute top-1/3 right-8 w-1 h-1 bg-amber-400/50 rounded-full animate-pulse"></div>
        </div>
    );
}
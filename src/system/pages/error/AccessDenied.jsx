import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldOff } from 'lucide-react';

const AccessDenied = () => (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-900 to-black text-white p-4">
        <div className="text-center">
            <ShieldOff className="w-24 h-24 text-red-500 mx-auto mb-6 animate-pulse" />
            <h1 className="text-8xl font-extrabold text-red-600 mb-4 animate-fadeIn">
                403
            </h1>
            <p className="text-3xl md:text-4xl font-semibold text-gray-300 mb-8 animate-slideUp">
                Access Denied
            </p>
            <p className="text-lg text-gray-400 mb-10 max-w-md mx-auto animate-fadeIn delay-200">
                You do not have permission to view this page. Please contact support if you believe this is an error.
            </p>
            <Link
                to="/"
                className="inline-flex items-center px-8 py-4 border border-transparent text-base font-medium rounded-full shadow-lg text-gray-900 bg-gradient-to-r from-gray-300 to-gray-400 hover:from-gray-400 hover:to-gray-500 transform transition-all duration-300 hover:scale-105 hover:shadow-gray-400/50 group"
            >
                <span className="relative z-10">Go to Home</span>
                <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
            </Link>
        </div>
    </div>
);

export default AccessDenied;
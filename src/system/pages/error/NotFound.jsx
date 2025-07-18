import React from 'react';
import { Link } from 'react-router-dom';
import { Frown } from 'lucide-react';

const NotFound = () => (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white p-4">
        <div className="text-center">
            <Frown className="w-24 h-24 text-amber-400 mx-auto mb-6 animate-bounce" />
            <h1 className="text-8xl font-extrabold text-amber-500 mb-4 animate-fadeIn">
                404
            </h1>
            <p className="text-3xl md:text-4xl font-semibold text-gray-300 mb-8 animate-slideUp">
                Oops! Page Not Found
            </p>
            <p className="text-lg text-gray-400 mb-10 max-w-md mx-auto animate-fadeIn delay-200">
                The page you're looking for doesn't exist or has been moved. Don't worry, you can always go back to safety.
            </p>
            <Link
                to="/"
                className="inline-flex items-center px-8 py-4 border border-transparent text-base font-medium rounded-full shadow-lg text-gray-900 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 transform transition-all duration-300 hover:scale-105 hover:shadow-amber-400/50 group"
            >
                <span className="relative z-10">Go to Home</span>
                <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
            </Link>
        </div>
    </div>
);

export default NotFound;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userService from "../../../services/user.service.js";

export default function UserRegister() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [interests, setInterests] = useState('');
    const [industry, setIndustry] = useState('');
    const [occupation, setOccupation] = useState('');
    const [company, setCompany] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        try {
            const userData = {
                first_name: firstName,
                last_name: lastName,
                email,
                phone_number: phoneNumber,
                password,
                interests,
                role_id: 1,
                industry,
                occupation,
                company,
            };

            const response = await userService.createUser(userData);
            if (response.status === 201) {
                setSuccessMessage('Registration successful! You can now log in.');
                navigate('/user-login');
            }
        } catch (err) {

            const errorMessage = err.response?.data?.message || 'Registration failed. Please try again.';
            setError(errorMessage);
            console.error("Registration Error:", err);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black p-4 relative overflow-hidden">
            {/* Animated background elements - consistent with other login pages */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-amber-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-2000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-300 rounded-full mix-blend-multiply filter blur-xl opacity-5 animate-pulse animation-delay-4000"></div>
            </div>

            {/* Main registration card container */}
            <div className="relative z-10 bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-2xl shadow-2xl w-full max-w-2xl transform transition-all duration-300 hover:scale-100">
                <h1 className="text-4xl font-bold text-center text-white mb-8">User Registration</h1>
                <p className="text-center text-gray-300 mb-6">Create your account to get started!</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Error message display */}
                    {error && (
                        <div className="bg-red-900 border border-red-700 text-red-300 px-4 py-3 rounded-lg relative" role="alert">
                            <strong className="font-bold">Error! </strong>
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}
                    {/* Success message display */}
                    {successMessage && (
                        <div className="bg-green-900 border border-green-700 text-green-300 px-4 py-3 rounded-lg relative" role="alert">
                            <strong className="font-bold">Success! </strong>
                            <span className="block sm:inline">{successMessage}</span>
                        </div>
                    )}

                    {/* Grid for first name and last name */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-200 mb-1">First Name</label>
                            <input
                                type="text"
                                id="firstName"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                                className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-800 text-white focus:ring-amber-500 focus:border-amber-500 transition duration-150 ease-in-out placeholder-gray-400"
                                placeholder="John"
                                aria-label="First Name"
                            />
                        </div>
                        <div>
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-200 mb-1">Last Name</label>
                            <input
                                type="text"
                                id="lastName"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                                className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-800 text-white focus:ring-amber-500 focus:border-amber-500 transition duration-150 ease-in-out placeholder-gray-400"
                                placeholder="Doe"
                                aria-label="Last Name"
                            />
                        </div>
                    </div>

                    {/* Email address field */}
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

                    {/* Phone number field */}
                    <div>
                        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-200 mb-1">Phone Number</label>
                        <input
                            type="tel"
                            id="phoneNumber"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-800 text-white focus:ring-amber-500 focus:border-amber-500 transition duration-150 ease-in-out placeholder-gray-400"
                            placeholder="+1234567890"
                            aria-label="Phone Number"
                        />
                    </div>

                    {/* Password field */}
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

                    {/* Interests textarea */}
                    <div>
                        <label htmlFor="interests" className="block text-sm font-medium text-gray-200 mb-1">Interests (e.g., Tech, Marketing, Finance)</label>
                        <textarea
                            id="interests"
                            value={interests}
                            onChange={(e) => setInterests(e.target.value)}
                            required
                            rows="3"
                            className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-800 text-white focus:ring-amber-500 focus:border-amber-500 transition duration-150 ease-in-out placeholder-gray-400"
                            placeholder="List your interests, separated by commas."
                            aria-label="Interests"
                        ></textarea>
                    </div>

                    {/* Grid for industry and occupation */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="industry" className="block text-sm font-medium text-gray-200 mb-1">Industry</label>
                            <input
                                type="text"
                                id="industry"
                                value={industry}
                                onChange={(e) => setIndustry(e.target.value)}
                                required
                                className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-800 text-white focus:ring-amber-500 focus:border-amber-500 transition duration-150 ease-in-out placeholder-gray-400"
                                placeholder="Technology"
                                aria-label="Industry"
                            />
                        </div>
                        <div>
                            <label htmlFor="occupation" className="block text-sm font-medium text-gray-200 mb-1">Occupation</label>
                            <input
                                type="text"
                                id="occupation"
                                value={occupation}
                                onChange={(e) => setOccupation(e.target.value)}
                                required
                                className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-800 text-white focus:ring-amber-500 focus:border-amber-500 transition duration-150 ease-in-out placeholder-gray-400"
                                placeholder="Software Engineer"
                                aria-label="Occupation"
                            />
                        </div>
                    </div>

                    {/* Company field */}
                    <div>
                        <label htmlFor="company" className="block text-sm font-medium text-gray-200 mb-1">Company</label>
                        <input
                            type="text"
                            id="company"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-800 text-white focus:ring-amber-500 focus:border-amber-500 transition duration-150 ease-in-out placeholder-gray-400"
                            placeholder="Acme Corp"
                            aria-label="Company"
                        />
                    </div>

                    {/* Register Account button */}
                    <button
                        type="submit"
                        className="w-full group relative overflow-hidden bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-gray-900 py-4 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-amber-400/25"
                    >
                        <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                        <span className="relative flex items-center justify-center text-lg">Register Account</span>
                    </button>
                </form>

                {/* Log in link */}
                <p className="mt-6 text-center text-gray-300 text-sm">
                    Already have an account? {' '}
                    <a href="/user-login" className="font-medium text-amber-400 hover:text-amber-300 hover:underline">
                        Log in here
                    </a>
                </p>
            </div>

            {/* Floating elements with amber theme - consistent with other login pages */}
            <div className="absolute top-20 left-20 w-2 h-2 bg-amber-400/30 rounded-full animate-ping"></div>
            <div className="absolute bottom-32 right-16 w-3 h-3 bg-amber-400/40 rounded-full animate-bounce"></div>
            <div className="absolute top-1/3 right-8 w-1 h-1 bg-amber-400/50 rounded-full animate-pulse"></div>
        </div>
    );
}

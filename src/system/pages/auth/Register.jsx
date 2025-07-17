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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-100 p-4">
            <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-2xl transform transition-all duration-300 hover:scale-100">
                <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8">User Registration</h1>
                <p className="text-center text-gray-600 mb-6">Create your account to get started!</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <strong className="font-bold">Error! </strong>
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}
                    {successMessage && (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                            <strong className="font-bold">Success! </strong>
                            <span className="block sm:inline">{successMessage}</span>
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-800 mb-1">First Name</label>
                            <input
                                type="text"
                                id="firstName"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 transition duration-150 ease-in-out placeholder-gray-400"
                                placeholder="John"
                                aria-label="First Name"
                            />
                        </div>
                        <div>
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-800 mb-1">Last Name</label>
                            <input
                                type="text"
                                id="lastName"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 transition duration-150 ease-in-out placeholder-gray-400"
                                placeholder="Doe"
                                aria-label="Last Name"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-800 mb-1">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 transition duration-150 ease-in-out placeholder-gray-400"
                            placeholder="your.email@example.com"
                            aria-label="Email Address"
                        />
                    </div>

                    <div>
                        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-800 mb-1">Phone Number</label>
                        <input
                            type="tel" // Use type="tel" for phone numbers
                            id="phoneNumber"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 transition duration-150 ease-in-out placeholder-gray-400"
                            placeholder="+1234567890"
                            aria-label="Phone Number"
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
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 transition duration-150 ease-in-out placeholder-gray-400"
                            placeholder="••••••••"
                            aria-label="Password"
                        />
                    </div>

                    <div>
                        <label htmlFor="interests" className="block text-sm font-medium text-gray-800 mb-1">Interests (e.g., Tech, Marketing, Finance)</label>
                        <textarea
                            id="interests"
                            value={interests}
                            onChange={(e) => setInterests(e.target.value)}
                            required
                            rows="3"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 transition duration-150 ease-in-out placeholder-gray-400"
                            placeholder="List your interests, separated by commas."
                            aria-label="Interests"
                        ></textarea>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="industry" className="block text-sm font-medium text-gray-800 mb-1">Industry</label>
                            <input
                                type="text"
                                id="industry"
                                value={industry}
                                onChange={(e) => setIndustry(e.target.value)}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 transition duration-150 ease-in-out placeholder-gray-400"
                                placeholder="Technology"
                                aria-label="Industry"
                            />
                        </div>
                        <div>
                            <label htmlFor="occupation" className="block text-sm font-medium text-gray-800 mb-1">Occupation</label>
                            <input
                                type="text"
                                id="occupation"
                                value={occupation}
                                onChange={(e) => setOccupation(e.target.value)}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 transition duration-150 ease-in-out placeholder-gray-400"
                                placeholder="Software Engineer"
                                aria-label="Occupation"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="company" className="block text-sm font-medium text-gray-800 mb-1">Company</label>
                        <input
                            type="text"
                            id="company"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 transition duration-150 ease-in-out placeholder-gray-400"
                            placeholder="Acme Corp"
                            aria-label="Company"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-semibold text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-200 ease-in-out transform hover:-translate-y-0.5"
                    >
                        Register Account
                    </button>
                </form>
                <p className="mt-6 text-center text-gray-600 text-sm">
                    Already have an account? {' '}
                    <a href="/user-login" className="font-medium text-purple-600 hover:text-purple-500 hover:underline">
                        Log in here
                    </a>
                </p>
            </div>
        </div>
    );
}

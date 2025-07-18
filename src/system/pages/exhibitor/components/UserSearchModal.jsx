import React, { useState, useEffect } from 'react';
import userService from "../../../../services/user.service.js";

function UserSearchModal({ productId, onSelectUser, onClose, organisationId }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [allUsers, setAllUsers] = useState([]); // Stores all users fetched from backend
    const [filteredUsers, setFilteredUsers] = useState([]); // Users displayed after search
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [initialLoadComplete, setInitialLoadComplete] = useState(false); // To manage initial loading state

    // Fetch all users once when the modal opens
    useEffect(() => {
        const fetchAllUsers = async () => {
            setLoading(true);
            try {
                // Assuming getAllUsers returns { success: true, data: [...] }
                const res = await userService.getAllUsers();
                setAllUsers(res.data.data);
                // No initial filter, as search term is empty
            } catch (err) {
                console.error('Error fetching all users:', err);
                setError(err.response?.data?.message || 'Failed to load users for search.');
            } finally {
                setLoading(false);
                setInitialLoadComplete(true);
            }
        };

        fetchAllUsers();
    }, []); // Empty dependency array means this runs once on mount

    // Effect to filter users whenever searchTerm or allUsers changes
    useEffect(() => {
        if (searchTerm.trim() === '') {
            setFilteredUsers([]); // Clear results if search term is empty
            return;
        }

        // Filter users based on the search term (case-insensitive email match)
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        const results = allUsers.filter(user =>
            user.email && user.email.toLowerCase().includes(lowerCaseSearchTerm)
        );
        setFilteredUsers(results);
    }, [searchTerm, allUsers]);


    const handleSearch = (e) => {
        // With frontend filtering, hitting "Search" simply updates the searchTerm,
        // which triggers the useEffect hook to re-filter.
        e.preventDefault();
        // The filtering logic is now in the useEffect,
        // so we just ensure searchTerm is set and error is cleared.
        setError('');
        if (!searchTerm.trim()) {
            setError('Please enter an email to search.');
        }
        // No explicit API call here anymore
    };

    if (loading && !initialLoadComplete) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4">
                <div className="text-center p-8 bg-white rounded-lg shadow-lg w-full max-w-lg">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
                    <p className="text-xl font-semibold text-gray-700">Loading users...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4">
                <div className="p-8 text-center bg-red-50 border border-red-200 text-red-600 rounded-lg shadow-md w-full max-w-lg">
                    <h3 className="text-2xl font-bold mb-3">Error! 😟</h3>
                    <p className="text-lg">{error}</p>
                    <button
                        onClick={onClose} // Allow closing the modal on error
                        className="mt-6 px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition duration-300 ease-in-out"
                    >
                        Close
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4">
            <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg transform scale-100 animate-fade-in-up">
                <h3 className="text-3xl font-bold text-gray-800 mb-6 text-center">Add Product Interest by Email 📧</h3>

                <form onSubmit={handleSearch} className="mb-6">
                    <label htmlFor="emailSearch" className="block text-gray-700 text-lg font-semibold mb-2">
                        Search User by Email:
                    </label>
                    <div className="flex gap-3">
                        <input
                            type="email"
                            id="emailSearch"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="e.g., user@example.com"
                            className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                            required
                        />
                        <button
                            type="submit"
                            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out disabled:opacity-50"
                            disabled={loading} // Still disable if initial load is happening
                        >
                            Search
                        </button>
                    </div>
                </form>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                        <strong className="font-bold">Error!</strong>
                        <span className="block sm:inline"> {error}</span>
                    </div>
                )}

                {filteredUsers.length > 0 && (
                    <div className="mt-6">
                        <h4 className="text-xl font-bold text-gray-800 mb-3">Search Results:</h4>
                        <ul className="space-y-3 max-h-60 overflow-y-auto">
                            {filteredUsers.map(user => (
                                <li
                                    key={user.user_id}
                                    className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex justify-between items-center cursor-pointer hover:bg-gray-100 transition duration-200"
                                    onClick={() => onSelectUser(user)}
                                >
                                    <div>
                                        <p className="text-lg font-medium text-gray-900">{user.first_name} {user.last_name}</p>
                                        <p className="text-gray-600 text-sm">{user.email}</p>
                                        {user.company && <p className="text-gray-500 text-xs">{user.company}</p>}
                                    </div>
                                    <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
                                        Select
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Messages for no results */}
                {initialLoadComplete && filteredUsers.length === 0 && searchTerm.trim() !== '' && !loading && !error && (
                    <p className="text-center text-gray-500 mt-6">No users found with this email.</p>
                )}
                {initialLoadComplete && searchTerm.trim() === '' && !loading && !error && (
                    <p className="text-center text-gray-500 mt-6">Enter an email to find users.</p>
                )}

                <button
                    className="mt-8 px-8 py-3 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 transition duration-300 ease-in-out w-full"
                    onClick={onClose}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}

export default UserSearchModal;
import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import userService from '../../../../services/user.service.js';
import { baseImageUrl } from '../../../../api/api.js';

const UserDetailsModal = ({ isOpen, onClose, userId }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            if (!userId) return;
            setLoading(true);
            setError('');
            setMessage('');
            try {
                const res = await userService.getUserById(userId);
                if (res.status === 200) {
                    setUser(res.data);
                    setFormData(res.data);
                } else {
                    setError('Failed to load user details.');
                    console.error("Failed to load user:", res);
                }
            } catch (err) {
                setError('Error fetching user details.');
                console.error("Error fetching user:", err);
            } finally {
                setLoading(false);
            }
        };

        if (isOpen) {
            fetchUser();
        } else {
            // Reset state when modal closes
            setUser(null);
            setIsEditing(false);
            setFormData({});
            setError('');
            setMessage('');
        }
    }, [isOpen, userId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');
        try {
            const res = await userService.updateUser(userId, formData);
            if (res.status === 200) {
                setUser(res.data.data);
                setIsEditing(false);
                setMessage('User updated successfully!');
            } else {
                setError('Failed to update user.');
                console.error("Failed to update user:", res);
            }
        } catch (err) {
            setError('Error updating user.');
            console.error("Error updating user:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={isEditing ? "Edit User" : "User Details"}>
            {loading ? (
                <div className="text-center py-8">Loading user details...</div>
            ) : error ? (
                <div className="text-center py-8 text-red-500">{error}</div>
            ) : user ? (
                <div className="space-y-4">
                    {message && <div className="p-3 bg-green-100 text-green-700 rounded-md">{message}</div>}
                    {isEditing ? (
                        <form onSubmit={handleSave} className="space-y-4">
                            <div>
                                <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">First Name</label>
                                <input
                                    type="text"
                                    name="first_name"
                                    id="first_name"
                                    value={formData.first_name || ''}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">Last Name</label>
                                <input
                                    type="text"
                                    name="last_name"
                                    id="last_name"
                                    value={formData.last_name || ''}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={formData.email || ''}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="company" className="block text-sm font-medium text-gray-700">Company</label>
                                <input
                                    type="text"
                                    name="company"
                                    id="company"
                                    value={formData.company || ''}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                />
                            </div>
                            <div>
                                <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">Phone Number</label>
                                <input
                                    type="text"
                                    name="phone_number"
                                    id="phone_number"
                                    value={formData.phone_number || ''}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                />
                            </div>
                            <div className="flex justify-end space-x-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="text-gray-700">
                            <img
                                src={`${baseImageUrl}/${user.qr_code_path}`}
                                alt="User QR Code"
                                className="w-40 h-40 mx-auto border border-gray-300 rounded p-2"
                            />
                            <p><strong className="font-semibold">Full Name:</strong> {user.first_name} {user.last_name}</p>
                            <p><strong className="font-semibold">Company:</strong> {user.company || 'N/A'}</p>
                            <p><strong className="font-semibold">Email:</strong> {user.email}</p>
                            <p><strong className="font-semibold">Phone:</strong> {user.phone_number || 'N/A'}</p>
                            <p><strong className="font-semibold">Industry:</strong> {user.industry || 'N/A'}</p>
                            <p><strong className="font-semibold">Interests:</strong> {user.interests || 'N/A'}</p>
                            <p><strong className="font-semibold">Occupation:</strong> {user.occupation || 'N/A'}</p>
                            <p><strong className="font-semibold">Company:</strong> {user.company || 'N/A'}</p>
                            <div className="flex justify-end mt-6">

                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className="text-center py-8">No user data available.</div>
            )}
        </Modal>
    );
};

export default UserDetailsModal;

import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import exhibitorService from '../../../../services/exhibitor.service.js';

const ExhibitorDetailsModal = ({ isOpen, onClose, exhibitorId }) => {
    const [exhibitor, setExhibitor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchExhibitor = async () => {
            if (!exhibitorId) return;
            setLoading(true);
            setError('');
            setMessage('');
            try {
                const res = await exhibitorService.getExhibitorById(exhibitorId);
                if (res.status === 200) {
                    setExhibitor(res.data.data);
                    setFormData(res.data.data); // Initialize form data with fetched data
                } else {
                    setError('Failed to load exhibitor details.');
                    console.error("Failed to load exhibitor:", res);
                }
            } catch (err) {
                setError('Error fetching exhibitor details.');
                console.error("Error fetching exhibitor:", err);
            } finally {
                setLoading(false);
            }
        };

        if (isOpen) {
            fetchExhibitor();
        } else {
            // Reset state when modal closes
            setExhibitor(null);
            setIsEditing(false);
            setFormData({});
            setError('');
            setMessage('');
        }
    }, [isOpen, exhibitorId]);

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
            const res = await exhibitorService.updateExhibitor(exhibitorId, formData);
            if (res.status === 200) {
                setExhibitor(res.data.data);
                setIsEditing(false);
                setMessage('Exhibitor updated successfully!');
                // Optionally, trigger a re-fetch in the parent AdminDashboard
            } else {
                setError('Failed to update exhibitor.');
                console.error("Failed to update exhibitor:", res);
            }
        } catch (err) {
            setError('Error updating exhibitor.');
            console.error("Error updating exhibitor:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={isEditing ? "Edit Exhibitor" : "Exhibitor Details"}>
            {loading ? (
                <div className="text-center py-8">Loading exhibitor details...</div>
            ) : error ? (
                <div className="text-center py-8 text-red-500">{error}</div>
            ) : exhibitor ? (
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
                            {/* Add other editable fields for exhibitor here */}
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
                            <p><strong className="font-semibold">ID:</strong> {exhibitor.exhibitor_id}</p>
                            <p><strong className="font-semibold">First Name:</strong> {exhibitor.first_name}</p>
                            <p><strong className="font-semibold">Last Name:</strong> {exhibitor.last_name}</p>
                            <p><strong className="font-semibold">Email:</strong> {exhibitor.email}</p>
                            <p><strong className="font-semibold">Organisation:</strong> {exhibitor.organisation?.organisation_name || 'N/A'}</p>
                            {/* Display other exhibitor details here */}
                            <div className="flex justify-end mt-6">
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                >
                                    Edit
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className="text-center py-8">No exhibitor data available.</div>
            )}
        </Modal>
    );
};

export default ExhibitorDetailsModal;

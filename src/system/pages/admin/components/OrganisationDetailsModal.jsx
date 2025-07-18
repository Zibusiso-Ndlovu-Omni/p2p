import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import organisationService from '../../../../services/organisation.service.js';

const OrganisationDetailsModal = ({ isOpen, onClose, organisationId }) => {
    const [organisation, setOrganisation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchOrganisation = async () => {
            if (!organisationId) return;
            setLoading(true);
            setError('');
            setMessage('');
            try {
                const res = await organisationService.getOrganisationById(organisationId);
                if (res.status === 200) {
                    setOrganisation(res.data.data);
                    setFormData(res.data.data);
                } else {
                    setError('Failed to load organisation details.');
                    console.error("Failed to load organisation:", res);
                }
            } catch (err) {
                setError('Error fetching organisation details.');
                console.error("Error fetching organisation:", err);
            } finally {
                setLoading(false);
            }
        };

        if (isOpen) {
            fetchOrganisation();
        } else {
            // Reset state when modal closes
            setOrganisation(null);
            setIsEditing(false);
            setFormData({});
            setError('');
            setMessage('');
        }
    }, [isOpen, organisationId]);

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
            const res = await organisationService.updateOrganisation(organisationId, formData);
            if (res.status === 200) {
                setOrganisation(res.data.data);
                setIsEditing(false);
                setMessage('Organisation updated successfully!');

            } else {
                setError('Failed to update organisation.');
                console.error("Failed to update organisation:", res);
            }
        } catch (err) {
            setError('Error updating organisation.');
            console.error("Error updating organisation:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={isEditing ? "Edit Organisation" : "Organisation Details"}>
            {loading ? (
                <div className="text-center py-8">Loading organisation details...</div>
            ) : error ? (
                <div className="text-center py-8 text-red-500">{error}</div>
            ) : organisation ? (
                <div className="space-y-4">
                    {message && <div className="p-3 bg-green-100 text-green-700 rounded-md">{message}</div>}
                    {isEditing ? (
                        <form onSubmit={handleSave} className="space-y-4">
                            <div>
                                <label htmlFor="organisation_name" className="block text-sm font-medium text-gray-700">Organisation Name</label>
                                <input
                                    type="text"
                                    name="organisation_name"
                                    id="organisation_name"
                                    value={formData.organisation_name || ''}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                                <input
                                    type="text"
                                    name="description"
                                    id="description"
                                    value={formData.description || ''}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                />
                            </div>
                            <div>
                                <label htmlFor="contact_email" className="block text-sm font-medium text-gray-700">Contact Email</label>
                                <input
                                    type="email"
                                    name="contact_email"
                                    id="contact_email"
                                    value={formData.contact_email || ''}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                    required
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
                            <div>
                                <label htmlFor="industry" className="block text-sm font-medium text-gray-700">Industry</label>
                                <input
                                    type="text"
                                    name="industry"
                                    id="industry"
                                    value={formData.industry || ''}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                />
                            </div>
                            <div>
                                <label htmlFor="website" className="block text-sm font-medium text-gray-700">Website</label>
                                <input
                                    type="text"
                                    name="website"
                                    id="website"
                                    value={formData.website || ''}
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
                            <p><strong className="font-semibold">Name:</strong> {organisation.organisation_name}</p>
                            <p><strong className="font-semibold">Description:</strong> {organisation.description || 'N/A'}</p>
                            <p><strong className="font-semibold">Email:</strong> {organisation.contact_email}</p>
                            <p><strong className="font-semibold">Phone:</strong> {organisation.phone_number || 'N/A'}</p>
                            <p><strong className="font-semibold">Industry:</strong> {organisation.industry || 'N/A'}</p>
                            <p><strong className="font-semibold">Website:</strong> {organisation.website || 'N/A'}</p>
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
                <div className="text-center py-8">No organisation data available.</div>
            )}
        </Modal>
    );
};

export default OrganisationDetailsModal;

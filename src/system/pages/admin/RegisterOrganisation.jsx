import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import organisationService from "../../../services/organisation.service.js";

const showMessage = (message, type = 'info') => {
    console.log(`Message (${type}): ${message}`);
};

const RegisterOrganisation = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        organisation_name: "",
        description: "",
        industry: "",
        contact_email: "",
        phone_number: "",
        website: "",
        is_active: true,
    });
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({
            ...form,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        try {
            const res = await organisationService.createOrganisation(form);

            if (res.status === 201) {
                setSuccessMessage("Organisation registered successfully!");
                showMessage("Organisation registered successfully", "success");
                setForm({
                    organisation_name: "",
                    description: "",
                    industry: "",
                    contact_email: "",
                    phone_number: "",
                    website: "",
                    is_active: true,
                });
                navigate("/dashboard");
            } else {
                const err = await res.json();
                const errorMessage = err.message || "Failed to register organisation. Please try again.";
                setError(errorMessage);
                showMessage(errorMessage, "error");
            }
        } catch (error) {
            console.error("Error:", error);
            const errorMessage = "An error occurred while registering the organisation.";
            setError(errorMessage);
            showMessage(errorMessage, "error");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-2xl transform transition-all duration-300 hover:scale-100">
                <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8">Register Organisation</h1>
                <p className="text-center text-gray-600 mb-6">Enter the details for the new organisation.</p>

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

                    <div>
                        <label htmlFor="organisation_name" className="block text-sm font-medium text-gray-800 mb-1">Organisation Name</label>
                        <input
                            name="organisation_name"
                            type="text"
                            id="organisation_name"
                            required
                            placeholder="e.g., Global Tech Solutions"
                            value={form.organisation_name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 transition duration-150 ease-in-out placeholder-gray-400"
                            aria-label="Organisation Name"
                        />
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-800 mb-1">Description</label>
                        <textarea
                            name="description"
                            id="description"
                            placeholder="Brief description of the organisation."
                            value={form.description}
                            onChange={handleChange}
                            rows="3"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 transition duration-150 ease-in-out placeholder-gray-400"
                            aria-label="Description"
                        />
                    </div>

                    <div>
                        <label htmlFor="industry" className="block text-sm font-medium text-gray-800 mb-1">Industry</label>
                        <input
                            name="industry"
                            type="text"
                            id="industry"
                            placeholder="e.g., Software, Manufacturing, Retail"
                            value={form.industry}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 transition duration-150 ease-in-out placeholder-gray-400"
                            aria-label="Industry"
                        />
                    </div>

                    <div>
                        <label htmlFor="contact_email" className="block text-sm font-medium text-gray-800 mb-1">Contact Email</label>
                        <input
                            name="contact_email"
                            type="email"
                            id="contact_email"
                            placeholder="e.g., info@organisation.com"
                            value={form.contact_email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 transition duration-150 ease-in-out placeholder-gray-400"
                            aria-label="Contact Email"
                        />
                    </div>

                    <div>
                        <label htmlFor="phone_number" className="block text-sm font-medium text-gray-800 mb-1">Phone Number</label>
                        <input
                            name="phone_number"
                            type="tel"
                            id="phone_number"
                            placeholder="e.g., +1234567890"
                            value={form.phone_number}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 transition duration-150 ease-in-out placeholder-gray-400"
                            aria-label="Phone Number"
                        />
                    </div>

                    <div>
                        <label htmlFor="website" className="block text-sm font-medium text-gray-800 mb-1">Website</label>
                        <input
                            name="website"
                            type="text"
                            id="website"
                            placeholder="e.g., https://www.organisation.com"
                            value={form.website}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 transition duration-150 ease-in-out placeholder-gray-400"
                            aria-label="Website"
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="is_active"
                            id="is_active"
                            checked={form.is_active}
                            onChange={handleChange}
                            className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                            aria-label="Is Active"
                        />
                        <label htmlFor="is_active" className="text-sm font-medium text-gray-800">Active Organisation</label>
                    </div>

                    <div className="flex justify-end space-x-4 mt-6">
                        <button
                            type="button"
                            onClick={() => navigate("/dashboard")}
                            className="px-6 py-3 bg-gray-300 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-400 transition duration-200 ease-in-out"
                        >
                            Back to Dashboard
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-3 bg-emerald-600 text-black font-semibold rounded-lg shadow-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition duration-200 ease-in-out transform hover:-translate-y-0.5"
                        >
                            Register Organisation
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterOrganisation;

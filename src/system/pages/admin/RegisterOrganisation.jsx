import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    X,
    Building,
    Mail,
    Phone,
    Globe,
    Briefcase,
    FileText,
    CheckCircle,
    AlertCircle,
    ArrowLeft,
    PlusCircle
} from "lucide-react";
import organisationService from "../../../services/organisation.service.js";

// MessageModal Component (copied from RegisterExhibitor for consistency)
const MessageModal = ({ message, type, onClose }) => {
    if (!message) return null;

    const isSuccess = type === 'success';
    const Icon = isSuccess ? CheckCircle : AlertCircle;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
            <div className={`relative max-w-md w-full rounded-2xl shadow-2xl transform transition-all duration-300 scale-100 ${
                isSuccess
                    ? 'bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200'
                    : 'bg-red-50 to-red-100 border border-red-200'
            }`}>
                <div className="p-6">
                    <div className="flex items-start space-x-4">
                        <div className={`flex-shrink-0 p-2 rounded-full ${
                            isSuccess ? 'bg-emerald-500' : 'bg-red-500'
                        }`}>
                            <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                            <h3 className={`text-lg font-semibold ${
                                isSuccess ? 'text-emerald-900' : 'text-red-900'
                            }`}>
                                {isSuccess ? 'Success!' : 'Error!'}
                            </h3>
                            <p className={`mt-1 text-sm ${
                                isSuccess ? 'text-emerald-700' : 'text-red-700'
                            }`}>
                                {message}
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="flex-shrink-0 p-1 rounded-full hover:bg-black/10 transition-colors duration-200"
                        >
                            <X className="w-5 h-5 text-gray-500" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Reusable InputField Component
const InputField = ({ icon: Icon, label, ...props }) => (
    <div className="space-y-2">
        <label htmlFor={props.id} className="block text-sm font-semibold text-gray-700">
            {label}
        </label>
        <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon className="h-5 w-5 text-gray-400" />
            </div>
            <input
                {...props}
                className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 placeholder-gray-400 text-gray-900 bg-white hover:border-gray-400"
            />
        </div>
    </div>
);

// Reusable TextAreaField Component
const TextAreaField = ({ icon: Icon, label, ...props }) => (
    <div className="space-y-2">
        <label htmlFor={props.id} className="block text-sm font-semibold text-gray-700">
            {label}
        </label>
        <div className="relative">
            <div className="absolute top-3 left-0 pl-3 flex items-center pointer-events-none">
                <Icon className="h-5 w-5 text-gray-400" />
            </div>
            <textarea
                {...props}
                className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 placeholder-gray-400 text-gray-900 bg-white hover:border-gray-400"
            />
        </div>
    </div>
);

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
    const [modalMessage, setModalMessage] = useState(''); // State for modal message
    const [modalType, setModalType] = useState('info'); // State for modal type (success/error)
    const [isSubmitting, setIsSubmitting] = useState(false); // State for submission loading

    // Function to show modal messages
    const showMessage = (message, type = 'info') => {
        setModalMessage(message);
        setModalType(type);
    };

    // Function to close modal
    const closeModal = () => {
        setModalMessage('');
    };

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
        setIsSubmitting(true); // Set submitting state to true
        closeModal(); // Close any existing modal messages

        // Basic form validation
        if (!form.organisation_name || !form.description || !form.industry || !form.contact_email || !form.phone_number) {
            setError("Please fill in all required fields.");
            showMessage("Please fill in all required fields.", "error");
            setIsSubmitting(false);
            return;
        }

        try {
            const res = await organisationService.createOrganisation(form);

            if (res.status === 201) {
                setSuccessMessage("Organisation registered successfully!");
                showMessage("Organisation registered successfully", "success");

                // Clear form fields after successful submission
                setForm({
                    organisation_name: "",
                    description: "",
                    industry: "",
                    contact_email: "",
                    phone_number: "",
                    website: "",
                    is_active: true,
                });
                // Navigate to dashboard after a short delay for user to see success message
                setTimeout(() => {
                    navigate("/dashboard");
                }, 2000);
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
        } finally {
            setIsSubmitting(false); // Reset submitting state
        }
    };

    return (
        <div className="min-h-screen bg-gray-200 p-4">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center space-x-3 mb-4">
                        <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg">
                            <Building className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-4xl font-bold text-gray-900">Register Organisation</h1>
                    </div>
                    <p className="text-gray-600 text-lg">Enter the details for the new organisation</p>
                </div>

                {/* Form Card */}
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8">
                    <div className="space-y-6">
                        {/* Alert Messages */}
                        {error && (
                            <div className="bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-2xl p-4">
                                <div className="flex items-center space-x-3">
                                    <AlertCircle className="w-5 h-5 text-red-600" />
                                    <div>
                                        <span className="font-semibold text-red-800">Error!</span>
                                        <span className="text-red-700 ml-2">{error}</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {successMessage && (
                            <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 border border-emerald-200 rounded-2xl p-4">
                                <div className="flex items-center space-x-3">
                                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                                    <div>
                                        <span className="font-semibold text-emerald-800">Success!</span>
                                        <span className="text-emerald-700 ml-2">{successMessage}</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Organisation Name */}
                        <InputField
                            icon={Building}
                            label="Organisation Name"
                            name="organisation_name"
                            type="text"
                            id="organisation_name"
                            required
                            placeholder="e.g., Global Tech Solutions"
                            value={form.organisation_name}
                            onChange={handleChange}
                        />

                        {/* Description */}
                        <TextAreaField
                            icon={FileText}
                            label="Description"
                            name="description"
                            id="description"
                            placeholder="Brief description of the organisation."
                            value={form.description}
                            onChange={handleChange}
                            rows="3"
                        />

                        {/* Industry */}
                        <InputField
                            icon={Briefcase}
                            label="Industry"
                            name="industry"
                            type="text"
                            id="industry"
                            required
                            placeholder="e.g., Software, Manufacturing, Retail"
                            value={form.industry}
                            onChange={handleChange}
                        />

                        {/* Contact Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputField
                                icon={Mail}
                                label="Contact Email"
                                name="contact_email"
                                type="email"
                                id="contact_email"
                                required
                                placeholder="e.g., info@organisation.com"
                                value={form.contact_email}
                                onChange={handleChange}
                            />
                            <InputField
                                icon={Phone}
                                label="Phone Number"
                                name="phone_number"
                                type="tel"
                                id="phone_number"
                                required
                                placeholder="e.g., +1 (555) 123-4567"
                                value={form.phone_number}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Website */}
                        <InputField
                            icon={Globe}
                            label="Website"
                            name="website"
                            type="text"
                            id="website"
                            placeholder="e.g., https://www.organisation.com"
                            value={form.website}
                            onChange={handleChange}
                        />

                        {/* Active Status */}
                        <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-2xl">
                            <input
                                type="checkbox"
                                name="is_active"
                                id="is_active"
                                checked={form.is_active}
                                onChange={handleChange}
                                className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <label htmlFor="is_active" className="text-sm font-medium text-gray-700">
                                Active Organisation Status
                            </label>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4 pt-6">
                            <button
                                type="button"
                                onClick={() => navigate("/dashboard")}
                                className="flex items-center justify-center space-x-2 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-xl shadow-md transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5"
                            >
                                <ArrowLeft className="w-5 h-5" />
                                <span>Back to Dashboard</span>
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                onClick={handleSubmit}
                                className="flex items-center justify-center space-x-2 px-8 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                        <span>Registering...</span>
                                    </>
                                ) : (
                                    <>
                                        <PlusCircle className="w-5 h-5" />
                                        <span>Register Organisation</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <MessageModal message={modalMessage} type={modalType} onClose={closeModal} />
        </div>
    );
};

export default RegisterOrganisation;

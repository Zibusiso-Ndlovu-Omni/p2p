import React from 'react';

function UserDetailModal({ userInterest, onClose }) {
    if (!userInterest) return null;
    const { user, product, exhibitor_notes, all_interests_details } = userInterest;

    const interestsToDisplay = all_interests_details && all_interests_details.length > 0
        ? all_interests_details
        : (product ? [{ product, exhibitor_notes }] : []);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4">
            <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-2xl text-left relative transform scale-100 animate-fade-in-up">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition duration-200 ease-in-out text-3xl font-semibold leading-none"
                    aria-label="Close"
                >
                    &times;
                </button>

                <hr className="my-12 border-t-2 border-gray-100" />

                {/* User Information Section */}
                <div className="mb-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Personal Information:</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-lg">
                        {user?.first_name && (
                            <p className="text-gray-700">
                                <strong className="text-blue-700">First Name:</strong> {user?.first_name}
                            </p>
                        )}
                        {user?.last_name && (
                            <p className="text-gray-700">
                                <strong className="text-blue-700">Last Name:</strong> {user?.last_name}
                            </p>
                        )}
                        <p className="text-gray-700">
                            <strong className="text-blue-700">Email:</strong> {user?.email || 'N/A'}
                        </p>
                        {user?.phone_number && (
                            <p className="text-gray-700">
                                <strong className="text-blue-700">Phone:</strong> {user?.phone_number}
                            </p>
                        )}
                        {user?.company && (
                            <p className="text-gray-700">
                                <strong className="text-blue-700">Company:</strong> {user?.company}
                            </p>
                        )}
                        {user?.occupation && (
                            <p className="text-gray-700">
                                <strong className="text-blue-700">Job Title:</strong> {user?.occupation}
                            </p>
                        )}
                        {user?.industry && (
                            <p className="text-gray-700">
                                <strong className="text-blue-700">Industry:</strong> {user?.industry}
                            </p>
                        )}
                        {user?.interests && (
                            <p className="text-gray-700">
                                <strong className="text-blue-700">Interests:</strong> {user?.interests}
                            </p>
                        )}
                    </div>
                </div>

                <hr className="my-6 border-t-2 border-gray-100" />

                {/* Bottom Close Button */}
                <div className="flex justify-center mt-8">
                    <button
                        onClick={onClose}
                        className="px-8 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition duration-300 ease-in-out transform hover:scale-105 text-lg"
                    >
                        Close Details
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UserDetailModal;
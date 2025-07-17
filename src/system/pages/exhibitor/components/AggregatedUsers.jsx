import React, { useState, useEffect, useMemo } from 'react';
import userInterestService from "../../../../services/userInterest.service.js";
import organisationService from "../../../../services/organisation.service.js";
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import UserDetailModal from './UserDetailModal.jsx'; // Assuming UserDetailModal is in components
import { Link } from 'react-router-dom';

function AggregatedUsers() {
    const token = Cookies.get('token');
    const decoded = jwtDecode(token);

    const exhibitorUser = useMemo(() => ({
        id: decoded.exhibitor_id,
        organisation_id: decoded.organisation_id
    }), [decoded]);

    const [allInterests, setAllInterests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [organisationDetails, setOrganisationDetails] = useState(null);

    const [showUserDetailModal, setShowUserDetailModal] = useState(false);
    const [selectedUserInterest, setSelectedUserInterest] = useState(null);

    useEffect(() => {
        const fetchAggregatedUserInterests = async () => {
            try {
                setLoading(true);
                const [orgRes, interestsRes] = await Promise.all([
                    organisationService.getOrganisationById(exhibitorUser.organisation_id),
                    userInterestService.getInterestsByOrganisationId(exhibitorUser.organisation_id)
                ]);
                setOrganisationDetails(orgRes.data.data);
                // Ensure unique users and aggregate their interests
                const aggregatedData = {};
                interestsRes.data.data.forEach(interest => {
                    const userId = interest.user_id;
                    if (!aggregatedData[userId]) {
                        aggregatedData[userId] = {
                            user: interest.user,
                            interests: [],
                            organisation: orgRes.data.data, // Attach org details for UserDetailModal
                        };
                    }
                    aggregatedData[userId].interests.push({
                        product: interest.product,
                        exhibitor_notes: interest.exhibitor_notes,
                        interest_id: interest.interest_id // Keep interest_id for potential future actions
                    });
                });
                setAllInterests(Object.values(aggregatedData));
            } catch (err) {
                console.error('Error fetching aggregated user interests:', err);
                setError(err.response?.data?.message || 'Failed to load aggregated user interests.');
            } finally {
                setLoading(false);
            }
        };

        if (exhibitorUser.organisation_id) {
            fetchAggregatedUserInterests();
        }
    }, [exhibitorUser.organisation_id]);

    const handleViewUserDetail = (userAggregate) => {
        // When showing details for an aggregated user, we need to pass a structure
        // that UserDetailModal expects. It expects a single 'interest' object with user and product.
        // For an aggregated view, we can select the first interest or restructure.
        // For simplicity, let's pass a structure mimicking what UserDetailModal might need,
        // combining user details with their first interest's product, and all interests as a list.
        setSelectedUserInterest({
            user: userAggregate.user,
            product: userAggregate.interests[0]?.product || null, // Pick one product to display as primary
            exhibitor_notes: userAggregate.interests[0]?.exhibitor_notes || null, // Pick one note as primary
            all_interests_details: userAggregate.interests, // Pass all interests for detailed view
            organisation: organisationDetails
        });
        setShowUserDetailModal(true);
    };


    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <div className="text-center p-8 bg-white rounded-lg shadow-lg">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
                    <p className="text-xl font-semibold text-gray-700">Loading aggregated user interests...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <div className="p-8 text-center bg-red-50 border border-red-200 text-red-600 rounded-lg shadow-md max-w-lg mx-auto">
                    <h3 className="text-2xl font-bold mb-3">Error! 😟</h3>
                    <p className="text-lg">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-6 px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition duration-300 ease-in-out"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="font-sans min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-2xl p-8 md:p-10">
                <h1 className="text-5xl font-extrabold text-gray-900 text-center mb-4 leading-tight">All Interested Users 👥</h1>
                <p className="text-lg text-gray-700 text-center mb-10">
                    Discover all users who have shown interest in products from <strong className="text-indigo-700">{organisationDetails?.organisation_name || `Your Organisation`}.</strong>
                </p>

                <div className="flex justify-center mb-12">
                    <Link
                        to="/exhibitor-dashboard"
                        className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 text-lg"
                    >
                        ⬅️ Back to Dashboard
                    </Link>
                </div>

                <hr className="my-12 border-t-4 border-gray-200 rounded-full" />

                {allInterests.length === 0 ? (
                    <div className="text-center p-8 bg-purple-50 border-2 border-purple-200 rounded-lg shadow-inner">
                        <p className="text-xl text-purple-700 italic">
                            No users have registered interest in any of your organization's products yet.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {allInterests.map(userAggregate => (
                            <div
                                key={userAggregate.user?.user_id}
                                className="bg-white border border-gray-200 rounded-xl shadow-lg p-7 flex flex-col transition-all duration-300 hover:shadow-2xl hover:border-green-400 cursor-pointer"
                                onClick={() => handleViewUserDetail(userAggregate)}
                            >
                                <h3 className="text-2xl font-bold text-gray-800 mb-2 leading-tight">
                                    {userAggregate.user?.first_name} {userAggregate.user?.last_name}
                                </h3>
                                <p className="text-gray-600 mb-3">
                                    <span className="font-semibold">Email:</span> {userAggregate.user?.email}
                                </p>
                                {userAggregate.user?.company && (
                                    <p className="text-gray-600 mb-3">
                                        <span className="font-semibold">Company:</span> {userAggregate.user?.company}
                                    </p>
                                )}
                                {userAggregate.user?.phone_number && (
                                    <p className="text-gray-600 mb-3">
                                        <span className="font-semibold">Phone:</span> {userAggregate.user?.phone_number}
                                    </p>
                                )}

                                <h4 className="text-xl font-semibold text-gray-800 mt-6 pt-4 border-t-2 border-dashed border-gray-200">
                                    Interested In:
                                </h4>
                                <ul className="mt-3 space-y-2">
                                    {userAggregate.interests.map((interest, index) => (
                                        <li key={index} className="bg-green-50 border-l-4 border-green-400 p-3 rounded-md shadow-sm">
                                            <p className="text-gray-800 font-medium">
                                                ➡️ {interest.product?.product_name}
                                            </p>
                                            {interest.exhibitor_notes && (
                                                <p className="text-gray-600 italic text-sm mt-1">
                                                    Notes: "{interest.exhibitor_notes}"
                                                </p>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                )}

                {showUserDetailModal && selectedUserInterest && (
                    <UserDetailModal
                        userInterest={selectedUserInterest}
                        onClose={() => { setShowUserDetailModal(false); setSelectedUserInterest(null); }}
                    />
                )}
            </div>
        </div>
    );
}

export default AggregatedUsers;
import React, { useState, useEffect, useMemo } from 'react';
import userInterestService from "../../../../services/userInterest.service.js";
import organisationService from "../../../../services/organisation.service.js";
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import UserDetailModal from './UserDetailModal.jsx';
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
                const aggregatedData = {};
                interestsRes.data.data.forEach(interest => {
                    const userId = interest.user_id;
                    if (!aggregatedData[userId]) {
                        aggregatedData[userId] = {
                            user: interest.user,
                            interests: [],
                            organisation: orgRes.data.data,
                        };
                    }
                    aggregatedData[userId].interests.push({
                        product: interest.product,
                        exhibitor_notes: interest.exhibitor_notes,
                        interest_id: interest.interest_id
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
        setSelectedUserInterest({
            user: userAggregate.user,
            product: userAggregate.interests[0]?.product || null,
            exhibitor_notes: userAggregate.interests[0]?.exhibitor_notes || null,
            all_interests_details: userAggregate.interests,
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
                <h1 className="text-5xl font-extrabold text-gray-900 text-center mb-4 leading-tight">All Interested Attendants</h1>
                <p className="text-lg text-gray-700 text-center mb-10">
                    Discover all users who have shown interest in products from <strong className="text-indigo-700">{organisationDetails?.organisation_name || `Your Organisation`}.</strong>
                </p>

                <div className="flex justify-center mb-12">
                    <Link
                        to="/exhibitor/dashboard"
                        className="px-8 py-3 bg-gray-800 text-white font-semibold rounded-lg shadow-md hover:bg-gray-900 transition duration-300 ease-in-out transform hover:scale-105 text-lg"
                    >
                        Back to Dashboard
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
                    <div className="space-y-4"> {/* Changed to space-y for vertical spacing */}
                        {allInterests.map(userAggregate => (
                            <div
                                key={userAggregate.user?.user_id}
                                className="bg-white border border-gray-200 rounded-xl shadow-md p-5 flex items-center justify-between transition-all duration-300 hover:shadow-lg hover:border-amber-400 cursor-pointer"
                                onClick={() => handleViewUserDetail(userAggregate)}
                            >
                                <div className="flex-grow">
                                    <h3 className="text-xl font-semibold text-gray-800">
                                        {userAggregate.user?.first_name} {userAggregate.user?.last_name}
                                    </h3>
                                    <p className="text-gray-600 text-sm">
                                        {userAggregate.user?.email} {userAggregate.user?.company && ` | ${userAggregate.user?.company}`}
                                    </p>
                                    <p className="text-gray-600 text-sm mt-1">
                                        Interested in: {userAggregate.interests.map(i => i.product?.product_name).join(', ')}
                                    </p>
                                </div>
                                <button className="ml-4 px-4 py-2 bg-amber-500 text-black rounded-md hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50">
                                    View Details
                                </button>
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
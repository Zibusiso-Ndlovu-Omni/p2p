import React, { useState, useEffect, useMemo } from 'react';
import ProductModal from './components/ProductModal.jsx';
import QRScanner from './components/QRScanner.jsx';
import NoteInput from './components/NoteInput.jsx';
import UserDetailModal from './components/UserDetailModal.jsx';
import UserSearchModal from './components/UserSearchModal.jsx';
import productService from "../../../services/product.service.js";
import userInterestService from "../../../services/userInterest.service.js";
import organisationService from "../../../services/organisation.service.js";
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import { Link } from 'react-router-dom';

function ExhibitorDashboard() {
    const token = Cookies.get('token');
    const decoded = jwtDecode(token);

    const exhibitorUser = useMemo(() => ({
        id: decoded.exhibitor_id,
        organisation_id: decoded.organisation_id
    }), [decoded]);

    const [products, setProducts] = useState([]);
    const [showProductModal, setShowProductModal] = useState(false);
    const [showQRScanner, setShowQRScanner] = useState(false);
    const [scannedUserData, setScannedUserData] = useState(null);
    const [currentProductId, setCurrentProductId] = useState(null);
    const [showNotesInput, setShowNotesInput] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showEditNotesModal, setShowEditNotesModal] = useState(false);
    const [editingInterest, setEditingInterest] = useState(null);
    const [showUserDetailModal, setShowUserDetailModal] = useState(false);
    const [selectedUserInterest, setSelectedUserInterest] = useState(null);
    const [organisationDetails, setOrganisationDetails] = useState(null);

    // New state for the user search modal
    const [showUserSearchModal, setShowUserSearchModal] = useState(false);
    const [selectedUserForInterest, setSelectedUserForInterest] = useState(null);


    useEffect(() => {
        const fetchExhibitorData = async () => {
            try {
                const [orgRes, productRes] = await Promise.all([
                    organisationService.getOrganisationById(exhibitorUser.organisation_id),
                    productService.getProductsByOrganisationId(exhibitorUser.organisation_id)
                ]);
                setOrganisationDetails(orgRes.data.data);
                setProducts(productRes.data.data);
            } catch (err) {
                console.error('Error fetching exhibitor data:', err);
                setError(err.response?.data?.message || 'Failed to load dashboard data.');
            } finally {
                setLoading(false);
            }
        };
        if (exhibitorUser.organisation_id) {
            fetchExhibitorData();
        }
    }, [exhibitorUser.organisation_id]);

    const refreshProductList = async () => {
        try {
            setLoading(true);
            const res = await productService.getProductsByOrganisationId(exhibitorUser.organisation_id);
            setProducts(res.data.data);
            setLoading(false);
        } catch (err) {
            console.error('Error refreshing product list:', err);
            setError(err.response?.data?.message || 'Failed to refresh product list.');
            setLoading(false);
        }
    };

    const handleProductCreate = async (productData) => {
        setError('');
        try {
            const res = await productService.createProduct({
                ...productData,
                organisation_id: exhibitorUser.organisation_id
            });
            setProducts([...products, res.data.data]);
            setShowProductModal(false);
        } catch (err) {
            console.error('Error creating product:', err);
            setError(err.response?.data?.message || 'Failed to create product.');
        }
    };

    const handleScanUserQR = (productId) => {
        setCurrentProductId(productId);
        setShowQRScanner(true);
    };

    // New handler for "Add Product Interest" button
    const handleAddInterestByEmailClick = (productId) => {
        setCurrentProductId(productId);
        setShowUserSearchModal(true);
    };

    const handleUserSelectedFromSearch = (user) => {
        setSelectedUserForInterest(user);
        setShowUserSearchModal(false); // Close search modal
        setShowNotesInput(true); // Open notes input for the selected user
        setScannedUserData(user); // Use scannedUserData state for consistency with NoteInput
    };


    const handleQRScanResult = (data) => {
        if (data) {
            setError('');
            try {
                const userData = JSON.parse(data);
                if (!userData.user_id) {
                    throw new Error('Invalid user QR code format (missing user_id).');
                }
                setScannedUserData(userData);
                setShowQRScanner(false);
                setShowNotesInput(true);
            } catch (error) {
                console.error("Failed to parse QR code data or invalid format:", error);
                setError("Invalid QR code scanned. Please ensure it's a valid user QR.");
                setShowQRScanner(false);
                setScannedUserData(null);
            }
        }
    };

    const handleNotesSubmit = async (notes) => {
        setError('');
        const userToRegister = scannedUserData || selectedUserForInterest;

        if (!userToRegister || !currentProductId) {
            setError('Missing user data or product for interest registration.');
            return;
        }

        try {
            await productService.registerInterest(currentProductId, {
                user_id: userToRegister.user_id,
                exhibitor_notes: notes,
                organisation_id: exhibitorUser.organisation_id
            });
            alert('User interest registered and notes saved! 🎉');
            await refreshProductList();
            setScannedUserData(null);
            setSelectedUserForInterest(null);
            setCurrentProductId(null);
            setShowNotesInput(false);
        } catch (err) {
            console.error('Error registering interest:', err);
            setError(err.response?.data?.message || 'Failed to register interest.');
        }
    };

    const handleEditNotesClick = (interest) => {
        setEditingInterest(interest);
        setShowEditNotesModal(true);
    };

    const handleUpdateNotes = async (newNotes) => {
        setError('');
        if (!editingInterest) {
            setError('No interest selected for updating notes.');
            return;
        }

        try {
            const payload = {
                user_id: editingInterest.user_id,
                organisation_id: exhibitorUser.organisation_id,
                product_id: editingInterest.product_id,
                exhibitor_notes: newNotes,
            };

            await userInterestService.editExhibitorNotes(payload);
            alert('Notes updated successfully! 🎉');
            await refreshProductList();
            setShowEditNotesModal(false);
            setEditingInterest(null);
        } catch (err) {
            console.error('Error updating notes:', err);
            setError(err.response?.data?.message || 'Failed to update notes.');
        }
    };

    const handleViewUserDetail = (interest) => {
        setSelectedUserInterest({ ...interest, organisation: organisationDetails });
        setShowUserDetailModal(true);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <div className="text-center p-8 bg-white rounded-lg shadow-lg">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
                    <p className="text-xl font-semibold text-gray-700">Loading exhibitor dashboard...</p>
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
                <h1 className="text-5xl font-extrabold text-gray-900 text-center mb-4 leading-tight">Exhibitor Dashboard ✨</h1>
                <p className="text-lg text-gray-700 text-center mb-10">
                    Welcome, <strong className="text-blue-600">{decoded?.first_name} {decoded?.last_name}</strong>! You are managing products for <strong className="text-indigo-700">{organisationDetails?.organisation_name || `Organisation ID: ${exhibitorUser.organisation_id}`}</strong>.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
                    <button
                        className="flex-1 px-8 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-300 ease-in-out transform hover:scale-105 text-lg"
                        onClick={() => setShowProductModal(true)}
                    >
                        ➕ Create New Product
                    </button>
                    <Link
                        to="/exhibitor/aggregated-users"
                        className="flex-1 text-center px-8 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 transition duration-300 ease-in-out transform hover:scale-105 text-lg"
                    >
                        📊 View All Interested Users
                    </Link>
                </div>

                <hr className="my-12 border-t-4 border-gray-200 rounded-full" />

                <h2 className="text-4xl font-bold text-gray-900 text-center mb-10">Your Products 📦</h2>
                {products.length === 0 ? (
                    <div className="text-center p-8 bg-blue-50 border-2 border-blue-200 rounded-lg shadow-inner">
                        <p className="text-xl text-blue-700 italic">
                            You haven't created any products yet. Click "Create New Product" to add your first one!
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {products.map(product => (
                            <div key={product?.product_id} className="bg-white border border-gray-200 rounded-xl shadow-lg p-7 flex flex-col transition-all duration-300 hover:shadow-2xl hover:border-blue-400">
                                <div className="flex-grow">
                                    <h3 className="text-2xl font-bold text-gray-800 mb-3 leading-tight">{product?.product_name}</h3>
                                    <p className="text-gray-700 text-base leading-relaxed mb-5">{product?.description}</p>
                                </div>
                                <button
                                    className="w-full mt-4 px-6 py-3 bg-yellow-500 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-600 transition duration-300 ease-in-out transform hover:scale-105"
                                    onClick={() => handleScanUserQR(product.product_id)}
                                >
                                    ✨ Scan User QR for this Product
                                </button>

                                {/* New "Add Product Interest" button */}
                                <button
                                    className="w-full mt-4 px-6 py-3 bg-indigo-500 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-600 transition duration-300 ease-in-out transform hover:scale-105"
                                    onClick={() => handleAddInterestByEmailClick(product.product_id)}
                                >
                                    ➕ Add Product Interest (Email)
                                </button>

                                <h4 className="text-xl font-semibold text-gray-800 mt-8 pt-5 border-t-2 border-dashed border-gray-200">Interested Users: ({product?.productInterests?.length || 0})</h4>
                                {product?.productInterests && product?.productInterests.length > 0 ? (
                                    <ul className="mt-4 space-y-4">
                                        {product.productInterests.map(interest => (
                                            <li
                                                key={interest.interest_id}
                                                className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg cursor-pointer hover:bg-blue-100 transition duration-200 ease-in-out shadow-sm"
                                                onClick={() => handleViewUserDetail(interest)}
                                            >
                                                <p className="text-gray-900 font-medium text-lg leading-snug">
                                                    👤 {interest.user?.first_name} {interest.user?.last_name}
                                                    {interest.user?.company && <span className="text-blue-700 ml-2 text-sm">({interest.user?.company})</span>}
                                                </p>
                                                {interest.exhibitor_notes ? (
                                                    <p className="text-gray-600 italic text-sm mt-2">
                                                        " {interest?.exhibitor_notes} " {' '}
                                                        <button
                                                            onClick={(e) => { e.stopPropagation(); handleEditNotesClick(interest); }}
                                                            className="text-purple-600 hover:text-purple-800 font-semibold text-xs ml-2 hover:underline"
                                                        >
                                                            ✏️ Edit
                                                        </button>
                                                    </p>
                                                ) : (
                                                    <p className="text-gray-500 italic text-sm mt-2">
                                                        No notes yet. {' '}
                                                        <button
                                                            onClick={(e) => { e.stopPropagation(); handleEditNotesClick(interest); }}
                                                            className="text-purple-600 hover:text-purple-800 font-semibold text-xs ml-2 hover:underline"
                                                        >
                                                            ➕ Add Notes
                                                        </button>
                                                    </p>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-gray-500 italic mt-4 text-base">No users registered interest yet for this product.</p>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* Modals */}
                {showProductModal && (
                    <ProductModal onClose={() => setShowProductModal(false)} onSubmit={handleProductCreate} />
                )}

                {showQRScanner && (
                    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4">
                        <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg text-center transform scale-100 animate-fade-in-up">
                            <h3 className="text-3xl font-bold text-gray-800 mb-6">Scan User QR Code 📱</h3>
                            <QRScanner onScan={handleQRScanResult} onError={(err) => console.error(err)} />
                            <button
                                className="mt-8 px-8 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition duration-300 ease-in-out"
                                onClick={() => setShowQRScanner(false)}
                            >
                                Cancel Scan
                            </button>
                        </div>
                    </div>
                )}

                {/* New User Search Modal */}
                {showUserSearchModal && (
                    <UserSearchModal
                        productId={currentProductId}
                        onSelectUser={handleUserSelectedFromSearch}
                        onClose={() => { setShowUserSearchModal(false); setCurrentProductId(null); }}
                        organisationId={exhibitorUser.organisation_id}
                    />
                )}

                {showNotesInput && (scannedUserData || selectedUserForInterest) && ( // Ensure one of them is present
                    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4">
                        <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg text-center transform scale-100 animate-fade-in-up">
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">
                                Add Notes for: <span className="text-purple-600">
                                    {(scannedUserData || selectedUserForInterest)?.first_name} {(scannedUserData || selectedUserForInterest)?.last_name}
                                </span>
                                (<span className="text-gray-600">{(scannedUserData || selectedUserForInterest)?.email}</span>)
                            </h3>
                            <NoteInput onSubmit={handleNotesSubmit} initialNotes={''} />
                            <button
                                onClick={() => {
                                    setShowNotesInput(false);
                                    setScannedUserData(null);
                                    setSelectedUserForInterest(null);
                                    setCurrentProductId(null);
                                }}
                                className="mt-6 px-6 py-3 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 transition duration-300 ease-in-out"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}

                {showEditNotesModal && editingInterest && (
                    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4">
                        <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg text-center transform scale-100 animate-fade-in-up">
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">Edit Notes for <span className="text-purple-600">{editingInterest.user?.first_name} {editingInterest.user?.last_name}</span> on <span className="text-blue-600">{editingInterest.product?.product_name}</span></h3>
                            <NoteInput
                                onSubmit={handleUpdateNotes}
                                initialNotes={editingInterest.exhibitor_notes || ''}
                            />
                            <button
                                onClick={() => { setShowEditNotesModal(false); setEditingInterest(null); }}
                                className="mt-6 px-6 py-3 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 transition duration-300 ease-in-out"
                            >
                                Cancel
                            </button>
                        </div>
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

export default ExhibitorDashboard;
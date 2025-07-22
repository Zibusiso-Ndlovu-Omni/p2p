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
    const decoded = token ? jwtDecode(token) : {};

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

    const [showUserSearchModal, setShowUserSearchModal] = useState(false);
    const [selectedUserForInterest, setSelectedUserForInterest] = useState(null);


    useEffect(() => {
        const fetchExhibitorData = async () => {
            if (!exhibitorUser.organisation_id) {
                setLoading(false);
                setError('Organisation ID not found.');
                return;
            }
            try {
                const [orgRes, productRes] = await Promise.all([
                    organisationService.getOrganisationById(exhibitorUser.organisation_id),
                    productService.getProductsByOrganisationId(exhibitorUser.organisation_id)
                ]);
                setOrganisationDetails(orgRes.data.data);
                setProducts(productRes.data.data);
            } catch (err) {
                console.error('Error fetching exhibitor data:', err);
                setError(err.response?.data?.message || 'Failed to load dashboard data. Please try again.');
            } finally {
                setLoading(false);
            }
        };
        fetchExhibitorData();
    }, [exhibitorUser.organisation_id]);

    const refreshProductList = async () => {
        try {
            const res = await productService.getProductsByOrganisationId(exhibitorUser.organisation_id);
            setProducts(res.data.data);
        } catch (err) {
            console.error('Error refreshing product list:', err);
            setError('Failed to refresh product list.');
            setTimeout(() => setError(''), 3000);
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
            alert('Product created successfully! 🎉');
        } catch (err) {
            console.error('Error creating product:', err);
            setError(err.response?.data?.message || 'Failed to create product.');
        }
    };

    const handleScanUserQR = (productId) => {
        setCurrentProductId(productId);
        setShowQRScanner(true);
    };

    const handleAddInterestByEmailClick = (productId) => {
        setCurrentProductId(productId);
        setShowUserSearchModal(true);
    };

    const handleUserSelectedFromSearch = (user) => {
        setSelectedUserForInterest(user);
        setShowUserSearchModal(false);
        setShowNotesInput(true);
        setScannedUserData(user);
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
            <div className="flex justify-center items-center min-h-screen bg-gray-50">
                <div className="text-center p-10 bg-white rounded-2xl shadow-xl flex flex-col items-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-amber-500 mb-6"></div>
                    <p className="text-2xl font-semibold text-gray-700">Loading your exhibitor dashboard... 🚀</p>
                    <p className="text-gray-500 mt-2">Please wait a moment while we fetch your data.</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-red-50">
                <div className="p-10 text-center bg-white border-2 border-red-300 text-red-700 rounded-2xl shadow-xl max-w-lg mx-auto">
                    <h3 className="text-3xl font-bold mb-4">Oops! Something went wrong</h3>
                    <p className="text-lg mb-6">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-8 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition duration-300 ease-in-out transform hover:scale-105"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="font-sans min-h-screen bg-gradient-to-br from-amber-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100">
                <h1 className="text-5xl font-extrabold text-gray-900 text-center mb-5 leading-tight tracking-tight">
                    Exhibitor Dashboard
                </h1>
                <p className="text-xl text-gray-700 text-center mb-12 max-w-2xl mx-auto">
                    Welcome, <strong className="text-amber-600">{decoded?.first_name} {decoded?.last_name}</strong>! You are managing products for <strong className="text-indigo-700">{organisationDetails?.organisation_name || `Organisation ID: ${exhibitorUser.organisation_id}`}</strong>.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-6 mb-16">
                    <button
                        className="flex-1 px-10 py-4 bg-gradient-to-r from-amber-600 to-amber-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-102 text-xl tracking-wide"
                        onClick={() => setShowProductModal(true)}
                    >
                        Create New Product
                    </button>
                    <Link
                        to="/exhibitor/aggregated-users"
                        className="flex-1 text-center px-10 py-4 bg-gradient-to-r from-gray-700 to-gray-900 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-102 text-xl tracking-wide"
                    >
                        View All Interested Attendants
                    </Link>
                </div>

                <hr className="my-16 border-t-6 border-amber-200 rounded-full opacity-70" />

                <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">Your Products</h2>
                {products.length === 0 ? (
                    <div className="text-center p-12 bg-amber-50 border-2 border-amber-200 rounded-2xl shadow-inner max-w-xl mx-auto">
                        <p className="text-2xl text-amber-700 italic font-medium">
                            It looks like you haven't created any products yet.
                        </p>
                        <p className="text-lg text-amber-600 mt-4">
                            Click the "Create New Product" button above to add your first offering!
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {products.map(product => (
                            <div key={product?.product_id} className="bg-white border border-gray-200 rounded-2xl shadow-lg p-8 flex flex-col transition-all duration-300 hover:shadow-xl hover:border-amber-300">
                                <div className="flex-grow">
                                    <h3 className="text-2xl font-extrabold text-gray-700 mb-4 leading-tight">{product?.product_name}</h3>
                                    <p className="text-gray-700 text-base leading-relaxed mb-6">{product?.description}</p>
                                </div>
                                <div className="space-y-4 pt-6 border-t border-gray-100">
                                    <button
                                        className="w-full px-8 py-3 bg-amber-500 text-black font-semibold rounded-lg shadow-md hover:bg-amber-600 transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center gap-2 text-lg"
                                        onClick={() => handleScanUserQR(product.product_id)}
                                    >
                                        Scan User QR
                                    </button>
                                    <button
                                        className="w-full px-8 py-3 bg-gray-800 text-white font-semibold rounded-lg shadow-md hover:bg-gray-900 transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center gap-2 text-lg"
                                        onClick={() => handleAddInterestByEmailClick(product.product_id)}
                                    >
                                        Add by Email
                                    </button>
                                </div>

                                <h4 className="text-xl font-bold text-gray-900 mt-8 pt-6 border-t-2 border-dashed border-gray-100">
                                    Interested Users ({product?.productInterests?.length || 0})
                                </h4>
                                {product?.productInterests && product?.productInterests.length > 0 ? (
                                    <ul className="mt-5 space-y-4">
                                        {product.productInterests.map(interest => (
                                            <li
                                                key={interest.interest_id}
                                                className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-lg cursor-pointer hover:bg-amber-100 transition duration-200 ease-in-out shadow-sm flex flex-col gap-1"
                                                onClick={() => handleViewUserDetail(interest)}
                                            >
                                                <p className="text-gray-900 font-bold text-lg leading-snug flex items-center">
                                                    <span className="mr-2 text-amber-500">👤</span> {interest.user?.first_name} {interest.user?.last_name}
                                                    {interest.user?.company && <span className="text-amber-700 ml-3 text-sm font-medium">({interest.user?.company})</span>}
                                                </p>
                                                {interest.exhibitor_notes ? (
                                                    <p className="text-gray-600 italic text-sm mt-1 leading-snug">
                                                        " {interest?.exhibitor_notes} " {' '}
                                                        <button
                                                            onClick={(e) => { e.stopPropagation(); handleEditNotesClick(interest); }}
                                                            className="text-purple-600 hover:text-purple-800 font-semibold text-xs ml-2 hover:underline focus:outline-none"
                                                        >
                                                            ✏️ Edit
                                                        </button>
                                                    </p>
                                                ) : (
                                                    <p className="text-gray-500 italic text-sm mt-1">
                                                        No notes yet. {' '}
                                                        <button
                                                            onClick={(e) => { e.stopPropagation(); handleEditNotesClick(interest); }}
                                                            className="text-purple-600 hover:text-purple-800 font-semibold text-xs ml-2 hover:underline focus:outline-none"
                                                        >
                                                            ➕ Add Notes
                                                        </button>
                                                    </p>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-gray-500 italic mt-5 text-base">No users have registered interest yet for this product. Be the first to scan a QR or add manually!</p>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* Modals - Wrapped with consistent styling */}

                {showProductModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4 animate-fade-in">
                        <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-xl transform scale-95 animate-scale-up">
                            <h3 className="text-3xl font-bold text-gray-800 mb-6 text-center">Create New Product 🛍️</h3>
                            <ProductModal onClose={() => setShowProductModal(false)} onSubmit={handleProductCreate} />
                        </div>
                    </div>
                )}

                {showQRScanner && (
                    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4 animate-fade-in">
                        <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-lg text-center transform scale-95 animate-scale-up">
                            <QRScanner onScan={handleQRScanResult} onError={(err) => console.error(err)} />
                            <button
                                className="mt-8 px-8 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition duration-300 ease-in-out transform hover:scale-105"
                                onClick={() => setShowQRScanner(false)}
                            >
                                Cancel Scan
                            </button>
                        </div>
                    </div>
                )}

                {showUserSearchModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4 animate-fade-in">
                        <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-xl transform scale-95 animate-scale-up">
                            <UserSearchModal
                                productId={currentProductId}
                                onSelectUser={handleUserSelectedFromSearch}
                                onClose={() => { setShowUserSearchModal(false); setCurrentProductId(null); }}
                                organisationId={exhibitorUser.organisation_id}
                            />
                        </div>
                    </div>
                )}

                {showNotesInput && (scannedUserData || selectedUserForInterest) && (
                    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4 animate-fade-in">
                        <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-lg text-center transform scale-95 animate-scale-up">
                            <h3 className="text-3xl font-bold text-gray-800 mb-5">
                                Add Notes for: <span className="text-purple-600">
                                    {(scannedUserData || selectedUserForInterest)?.first_name} {(scannedUserData || selectedUserForInterest)?.last_name}
                                </span>
                                <span className="block text-xl text-gray-600 font-normal mt-1">({(scannedUserData || selectedUserForInterest)?.email})</span>
                            </h3>
                            <NoteInput onSubmit={handleNotesSubmit} initialNotes={''} />
                            <button
                                onClick={() => {
                                    setShowNotesInput(false);
                                    setScannedUserData(null);
                                    setSelectedUserForInterest(null);
                                    setCurrentProductId(null);
                                }}
                                className="mt-8 px-8 py-3 bg-gray-900 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 transition duration-300 ease-in-out transform hover:scale-105"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}

                {showEditNotesModal && editingInterest && (
                    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4 animate-fade-in">
                        <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-lg text-center transform scale-95 animate-scale-up">
                            <h3 className="text-3xl font-bold text-gray-800 mb-5">Edit Notes for
                                <span className="text-purple-600 block mt-2">{editingInterest.user?.first_name} {editingInterest.user?.last_name}</span>
                                <span className="text-amber-600 block text-xl mt-1">on {editingInterest.product?.product_name}</span>
                            </h3>
                            <NoteInput
                                onSubmit={handleUpdateNotes}
                                initialNotes={editingInterest.exhibitor_notes || ''}
                            />
                            <button
                                onClick={() => { setShowEditNotesModal(false); setEditingInterest(null); }}
                                className="mt-8 px-8 py-3 bg-gray-900 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 transition duration-300 ease-in-out transform hover:scale-105"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}

                {showUserDetailModal && selectedUserInterest && (
                    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4 animate-fade-in">
                        <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-2xl transform scale-95 animate-scale-up">
                            <UserDetailModal
                                userInterest={selectedUserInterest}
                                onClose={() => { setShowUserDetailModal(false); setSelectedUserInterest(null); }}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ExhibitorDashboard;
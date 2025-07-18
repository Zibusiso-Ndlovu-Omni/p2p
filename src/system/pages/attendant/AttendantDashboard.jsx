import React, { useEffect, useState } from 'react';
import NoteInput from './components/NoteInput';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import userInterestService from "../../../services/userInterest.service.js";
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
    Avatar,
} from "@material-tailwind/react";
import { baseImageUrl } from "../../../api/api.js";

function AttendantDashboard() {
    const [showNotesInput, setShowNotesInput] = useState(false);
    const [currentProductForNotes, setCurrentProductForNotes] = useState(null);
    const [interestedProducts, setInterestedProducts] = useState([]);
    const token = Cookies.get('token');
    const decoded = jwtDecode(token);

    useEffect(() => {
        const fetchInterestedProducts = async () => {
            try {
                const response = await userInterestService.getUserInterestsByUserId(decoded.user_id);
                setInterestedProducts(response.data.data);
                console.log('Response:', response.data.data);
            } catch (err) {
                console.error('Error fetching interested products:', err);
            }
        };
        fetchInterestedProducts();
    }, [decoded.user_id]);

    const handleAddEditNotes = (product) => {
        setCurrentProductForNotes(product);
        setShowNotesInput(true);
    };

    const handleCloseNotes = () => {
        setShowNotesInput(false);
        setCurrentProductForNotes(null);
    };

    const handleUserNotesSubmit = async (notes) => {
        if (!currentProductForNotes) {
            console.error("No product selected for notes.");
            return;
        }

        try {
            const payload = {
                user_id: decoded.user_id,
                organisation_id: currentProductForNotes.organisation.organisation_id,
                product_id: currentProductForNotes.product.product_id,
                user_notes: notes,
            };
            console.log("Submitting notes payload:", payload);

            await userInterestService.addNotesToInterest(payload);

            setInterestedProducts(prevProducts =>
                prevProducts.map(item =>
                    item.product.product_id === currentProductForNotes.product.product_id
                        ? { ...item, user_notes: notes }
                        : item
                )
            );

            alert('Your notes have been saved!');
        } catch (error) {
            console.error('Error saving user notes:', error);
            alert('Failed to save notes. Please try again.');
        } finally {
            setShowNotesInput(false);
            setCurrentProductForNotes(null);
        }
    };

    console.log('Decoded:', decoded);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <Typography variant="h2" color="blue-gray" className="mb-2">
                        User Dashboard
                    </Typography>
                    <Typography variant="paragraph" className="text-gray-600">
                        Manage your interests and track your event connections
                    </Typography>
                </div>

                {/* User Information & QR Code Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    {/* User Profile Card */}
                    <Card className="shadow-lg">
                        <CardHeader floated={false} className="h-16 bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                            <Typography variant="h4" color="white" className="font-bold">
                                Profile Information
                            </Typography>
                        </CardHeader>
                        <CardBody className="p-6">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between border-b pb-3">
                                    <Typography variant="h5" color="blue-gray" className="font-semibold">
                                        {decoded?.first_name} {decoded?.last_name}
                                    </Typography>
                                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                                        <Typography variant="h6" color="white" className="font-bold">
                                            {decoded?.first_name?.[0]}{decoded?.last_name?.[0]}
                                        </Typography>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Typography variant="small" color="gray" className="font-semibold uppercase tracking-wide">
                                            Email
                                        </Typography>
                                        <Typography variant="paragraph" color="blue-gray" className="mt-1">
                                            {decoded?.email}
                                        </Typography>
                                    </div>

                                    <div>
                                        <Typography variant="small" color="gray" className="font-semibold uppercase tracking-wide">
                                            Phone
                                        </Typography>
                                        <Typography variant="paragraph" color="blue-gray" className="mt-1">
                                            {decoded?.phone_number || 'Not provided'}
                                        </Typography>
                                    </div>

                                    <div>
                                        <Typography variant="small" color="gray" className="font-semibold uppercase tracking-wide">
                                            Industry
                                        </Typography>
                                        <Typography variant="paragraph" color="blue-gray" className="mt-1">
                                            {decoded?.industry || 'Not specified'}
                                        </Typography>
                                    </div>

                                    <div>
                                        <Typography variant="small" color="gray" className="font-semibold uppercase tracking-wide">
                                            Occupation
                                        </Typography>
                                        <Typography variant="paragraph" color="blue-gray" className="mt-1">
                                            {decoded?.occupation || 'Not specified'}
                                        </Typography>
                                    </div>

                                    <div className="md:col-span-2">
                                        <Typography variant="small" color="gray" className="font-semibold uppercase tracking-wide">
                                            Company
                                        </Typography>
                                        <Typography variant="paragraph" color="blue-gray" className="mt-1">
                                            {decoded?.company || 'Not specified'}
                                        </Typography>
                                    </div>

                                    <div className="md:col-span-2">
                                        <Typography variant="small" color="gray" className="font-semibold uppercase tracking-wide">
                                            Interests
                                        </Typography>
                                        <Typography variant="paragraph" color="blue-gray" className="mt-1">
                                            {decoded?.interests || 'Not specified'}
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                        </CardBody>
                    </Card>

                    {/* QR Code Card */}
                    <Card className="shadow-lg">
                        <CardHeader floated={false} className="h-16 bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center">
                            <Typography variant="h4" color="white" className="font-bold">
                                Your QR Code
                            </Typography>
                        </CardHeader>
                        <CardBody className="p-6 text-center">
                            <div className="flex flex-col items-center">
                                <div className="bg-white p-4 rounded-2xl shadow-inner mb-4">
                                    <Avatar
                                        src={`${baseImageUrl}/${decoded.qr_code_path}`}
                                        alt="Your QR Code"
                                        variant="rounded"
                                        className="border-4 border-green-100 w-52 h-52"
                                    />
                                </div>
                                <Typography variant="h6" color="blue-gray" className="mb-2 font-semibold">
                                    Show this to exhibitors
                                </Typography>
                                <Typography variant="paragraph" className="text-gray-600">
                                    Scan this QR code to register your interest in products and services
                                </Typography>
                            </div>
                        </CardBody>
                    </Card>
                </div>

                {/* Interested Products Section */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <Typography variant="h3" color="blue-gray" className="font-bold">
                            Your Interested Products
                        </Typography>
                        <div className="bg-blue-500 text-white px-4 py-2 rounded-full">
                            <Typography variant="small" className="font-semibold">
                                {interestedProducts.length} {interestedProducts.length === 1 ? 'Product' : 'Products'}
                            </Typography>
                        </div>
                    </div>

                    {interestedProducts.length === 0 ? (
                        <Card className="shadow-lg">
                            <CardBody className="text-center py-12">
                                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Typography variant="h1" color="gray" className="opacity-50">
                                        📱
                                    </Typography>
                                </div>
                                <Typography variant="h5" color="blue-gray" className="mb-2">
                                    No products yet
                                </Typography>
                                <Typography variant="paragraph" className="text-gray-600">
                                    Start scanning QR codes at exhibitor booths to build your interest list
                                </Typography>
                            </CardBody>
                        </Card>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {interestedProducts.map(product => (
                                <Card key={product.product.product_id} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                                    <CardBody className="p-6">
                                        <div className="flex items-start justify-between mb-4">
                                            <Typography variant="h5" color="blue-gray" className="font-bold flex-1">
                                                {product.product.product_name}
                                            </Typography>
                                            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center ml-3">
                                                <Typography variant="small" color="white" className="font-bold">
                                                    {product.organisation.organisation_name?.[0]}
                                                </Typography>
                                            </div>
                                        </div>

                                        <div className="space-y-3 mb-4">
                                            <div>
                                                <Typography variant="small" color="gray" className="font-semibold uppercase tracking-wide">
                                                    Organization
                                                </Typography>
                                                <Typography variant="paragraph" color="blue-gray" className="mt-1">
                                                    {product.organisation.organisation_name}
                                                </Typography>
                                            </div>

                                            <div>
                                                <Typography variant="small" color="gray" className="font-semibold uppercase tracking-wide">
                                                    Industry
                                                </Typography>
                                                <Typography variant="paragraph" color="blue-gray" className="mt-1">
                                                    {product.organisation.industry}
                                                </Typography>
                                            </div>

                                            <div>
                                                <Typography variant="small" color="gray" className="font-semibold uppercase tracking-wide">
                                                    Contact
                                                </Typography>
                                                <Typography variant="paragraph" color="blue-gray" className="mt-1">
                                                    {product.organisation.contact_email}
                                                </Typography>
                                            </div>

                                            {product.organisation.phone_number && (
                                                <div>
                                                    <Typography variant="small" color="gray" className="font-semibold uppercase tracking-wide">
                                                        Phone
                                                    </Typography>
                                                    <Typography variant="paragraph" color="blue-gray" className="mt-1">
                                                        {product.organisation.phone_number}
                                                    </Typography>
                                                </div>
                                            )}

                                            {product.organisation.website && (
                                                <div>
                                                    <Typography variant="small" color="gray" className="font-semibold uppercase tracking-wide">
                                                        Website
                                                    </Typography>
                                                    <Typography variant="paragraph" className="mt-1">
                                                        <a
                                                            href={product.organisation.website}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-blue-500 hover:text-blue-700 hover:underline transition-colors"
                                                        >
                                                            {product.organisation.website}
                                                        </a>
                                                    </Typography>
                                                </div>
                                            )}
                                        </div>

                                        <div className="border-t pt-4">
                                            <Typography variant="small" color="gray" className="font-semibold uppercase tracking-wide mb-2">
                                                Your Notes
                                            </Typography>
                                            <Typography variant="paragraph" color="blue-gray" className="mb-4 min-h-[3rem]">
                                                {product.user_notes || (
                                                    <span className="text-gray-400 italic">
                                                        No notes yet. Click below to add your thoughts.
                                                    </span>
                                                )}
                                            </Typography>
                                            <Button
                                                onClick={() => handleAddEditNotes(product)}
                                                color="blue"
                                                size="sm"
                                                className="w-full"
                                                variant={product.user_notes ? "outlined" : "filled"}
                                            >
                                                {product.user_notes ? '✏️ Edit Notes' : '📝 Add Notes'}
                                            </Button>
                                        </div>
                                    </CardBody>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>

                {/* Notes Input Modal */}
                {showNotesInput && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-lg shadow-2xl max-w-md w-full">
                            <NoteInput
                                onSubmit={handleUserNotesSubmit}
                                initialNotes={currentProductForNotes?.user_notes || ''}
                                onClose={handleCloseNotes}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AttendantDashboard;
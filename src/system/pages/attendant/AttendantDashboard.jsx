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
    // Ensure token exists before decoding
    const decoded = token ? jwtDecode(token) : {};

    useEffect(() => {
        const fetchInterestedProducts = async () => {
            if (!decoded.user_id) return;
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

            alert('Your notes have been saved! 🎉');
        } catch (error) {
            console.error('Error saving user notes:', error);
            alert('Failed to save notes. Please try again. 😟');
        } finally {
            setShowNotesInput(false);
            setCurrentProductForNotes(null);
        }
    };

    console.log('Decoded:', decoded);

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <div className="container mx-auto px-6 py-12">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <Typography variant="h2" color="blue-gray" className="mb-3 font-extrabold text-4xl">
                        Attendant Dashboard
                    </Typography>
                    <Typography variant="paragraph" className="text-gray-700 text-lg">
                        Manage your interests and track your event connections with ease.
                    </Typography>
                </div>


                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
                    {/* User Profile Card */}
                    <Card className="shadow-xl rounded-xl border border-gray-100">
                        <CardHeader floated={false} className="h-20 bg-gradient-to-r from-gray-900 to-amber-600 flex items-center justify-center rounded-t-xl shadow-md">
                            <Typography variant="h4" color="white" className="font-bold tracking-wide">
                                Profile Information
                            </Typography>
                        </CardHeader>
                        <CardBody className="p-8">
                            <div className="space-y-6">
                                <div className="flex items-center justify-between border-b pb-4 border-gray-100">
                                    <Typography variant="h5" color="blue-gray" className="font-bold text-2xl">
                                        {decoded?.first_name} {decoded?.last_name}
                                    </Typography>
                                    <div className="w-14 h-14 bg-amber-700 rounded-full flex items-center justify-center shadow-md">
                                        <Typography variant="h5" color="white" className="font-bold">
                                            {decoded?.first_name?.[0]}{decoded?.last_name?.[0]}
                                        </Typography>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                    {[
                                        { label: 'Email', value: decoded?.email },
                                        { label: 'Phone', value: decoded?.phone_number || 'Not provided' },
                                        { label: 'Industry', value: decoded?.industry || 'Not specified' },
                                        { label: 'Occupation', value: decoded?.occupation || 'Not specified' },
                                    ].map((item, index) => (
                                        <div key={index}>
                                            <Typography variant="small" color="gray" className="font-semibold uppercase tracking-wider text-xs mb-1">
                                                {item.label}
                                            </Typography>
                                            <Typography variant="paragraph" color="blue-gray" className="text-base">
                                                {item.value}
                                            </Typography>
                                        </div>
                                    ))}
                                    <div className="md:col-span-2">
                                        <Typography variant="small" color="gray" className="font-semibold uppercase tracking-wider text-xs mb-1">
                                            Company
                                        </Typography>
                                        <Typography variant="paragraph" color="blue-gray" className="text-base">
                                            {decoded?.company || 'Not specified'}
                                        </Typography>
                                    </div>

                                    <div className="md:col-span-2">
                                        <Typography variant="small" color="gray" className="font-semibold uppercase tracking-wider text-xs mb-1">
                                            Interests
                                        </Typography>
                                        <Typography variant="paragraph" color="blue-gray" className="text-base">
                                            {decoded?.interests || 'Not specified'}
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                        </CardBody>
                    </Card>

                    {/* QR Code Card */}
                    <Card className="shadow-xl rounded-xl border border-gray-100">
                        <CardHeader floated={false} className="h-20 bg-gradient-to-r from-amber-500 to-gray-900 flex items-center justify-center rounded-t-xl shadow-md">
                            <Typography variant="h4" color="white" className="font-bold tracking-wide">
                                Your QR Code
                            </Typography>
                        </CardHeader>
                        <CardBody className="p-8 text-center">
                            <div className="flex flex-col items-center">
                                <div className="bg-white p-6 rounded-3xl shadow-lg mb-6 border border-gray-100">
                                    {decoded.qr_code_path ? (
                                        <Avatar
                                            src={`${baseImageUrl}/${decoded.qr_code_path}`}
                                            alt="Your QR Code"
                                            variant="rounded"
                                            className="border-4 border-amber-200 w-60 h-60 object-contain p-2"
                                        />
                                    ) : (
                                        <div className="w-60 h-60 bg-gray-100 rounded-lg flex items-center justify-center">
                                            <Typography variant="h6" color="gray">QR Code not available</Typography>
                                        </div>
                                    )}
                                </div>
                                <Typography variant="h5" color="blue-gray" className="mb-2 font-bold">
                                    Show this to exhibitors!
                                </Typography>
                                <Typography variant="paragraph" className="text-gray-700 text-lg">
                                    Scan this QR code to effortlessly register your interest in products and services at the event.
                                </Typography>
                            </div>
                        </CardBody>
                    </Card>
                </div>


                <div className="mb-12">
                    <div className="flex items-center justify-between mb-8">
                        <Typography variant="h3" color="blue-gray" className="font-bold text-3xl">
                            Your Interested Products
                        </Typography>
                        <div className="bg-amber-600 text-white px-5 py-2 rounded-full shadow-md">
                            <Typography variant="small" className="font-semibold text-base">
                                {interestedProducts.length} {interestedProducts.length === 1 ? 'Product' : 'Products'}
                            </Typography>
                        </div>
                    </div>

                    {interestedProducts.length === 0 ? (
                        <Card className="shadow-lg rounded-xl border border-gray-100">
                            <CardBody className="text-center py-16">
                                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Typography variant="h1" color="gray" className="opacity-60 text-5xl">

                                    </Typography>
                                </div>
                                <Typography variant="h5" color="blue-gray" className="mb-3 font-semibold">
                                    No products yet!
                                </Typography>
                                <Typography variant="paragraph" className="text-gray-700 text-lg max-w-md mx-auto">
                                    Start scanning QR codes at exhibitor booths to easily build your personalized interest list.
                                </Typography>
                            </CardBody>
                        </Card>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {interestedProducts.map(product => (
                                <Card key={product.product.product_id} className="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl border border-gray-100">
                                    <CardBody className="p-7">
                                        <div className="flex items-start justify-between mb-5">
                                            <Typography variant="h5" color="blue-gray" className="font-bold flex-1 text-xl">
                                                {product.product.product_name}
                                            </Typography>
                                            <div className="w-11 h-11 bg-gray-900 rounded-full flex items-center justify-center ml-4 shadow-sm">
                                                <Typography variant="small" color="white" className="font-bold text-base">
                                                    {product.organisation.organisation_name?.[0]}
                                                </Typography>
                                            </div>
                                        </div>

                                        <div className="space-y-4 mb-5">
                                            {[
                                                { label: 'Organization', value: product.organisation.organisation_name },
                                                { label: 'Industry', value: product.organisation.industry },
                                                { label: 'Contact', value: product.organisation.contact_email },
                                                product.organisation.phone_number && { label: 'Phone', value: product.organisation.phone_number },
                                                product.organisation.website && { label: 'Website', value: product.organisation.website, isLink: true },
                                            ].filter(Boolean).map((item, index) => (
                                                <div key={index}>
                                                    <Typography variant="small" color="gray" className="font-semibold uppercase tracking-wider text-xs mb-1">
                                                        {item.label}
                                                    </Typography>
                                                    {item.isLink ? (
                                                        <Typography variant="paragraph" className="mt-1 text-base">
                                                            <a
                                                                href={item.value}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                                                            >
                                                                {item.value}
                                                            </a>
                                                        </Typography>
                                                    ) : (
                                                        <Typography variant="paragraph" color="blue-gray" className="mt-1 text-base">
                                                            {item.value}
                                                        </Typography>
                                                    )}
                                                </div>
                                            ))}
                                        </div>

                                        <div className="border-t pt-5 border-gray-100">
                                            <Typography variant="small" color="gray" className="font-semibold uppercase tracking-wider mb-2 text-xs">
                                                Your Notes
                                            </Typography>
                                            <Typography variant="paragraph" color="blue-gray" className="mb-5 min-h-[4rem] text-base leading-relaxed">
                                                {product.user_notes || (
                                                    <span className="text-gray-400 italic">
                                                        No notes yet. Click below to add your thoughts and insights.
                                                    </span>
                                                )}
                                            </Typography>
                                            <Button
                                                onClick={() => handleAddEditNotes(product)}
                                                color="gray"
                                                size="md"
                                                className="w-full flex items-center justify-center gap-2 rounded-lg"
                                                variant={product.user_notes ? "outlined" : "gradient"}
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
                    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 animate-fade-in">
                        <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full transform scale-95 animate-scale-up">
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
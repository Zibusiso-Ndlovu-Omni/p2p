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

function AttendantDashboard() {
    const [showNotesInput, setShowNotesInput] = useState(false);
    const [currentProductForNotes, setCurrentProductForNotes] = useState(null);
    const [interestedProducts, setInterestedProducts] = useState([]);
    const token = Cookies.get('token');
    const decoded = jwtDecode(token);

    console.log('Decoded token:', decoded);

    const userQRCodePath = "/qrcodes/users/1.png";

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

    return (
        <div className="container mx-auto p-4">
            <Typography variant="h2" color="blue-gray" className="mb-4">
                User Dashboard
            </Typography>
            <Typography variant="paragraph" className="mb-4">
                Welcome, **{decoded?.first_name} {decoded?.last_name}**!
            </Typography>

            <Card className="w-full max-w-sm mb-8">
                <CardHeader floated={false} className="h-48 flex justify-center items-center">
                    <Avatar src={userQRCodePath} alt="Your QR Code" size="xxl" variant="rounded" className="p-1 border-2 border-blue-gray-50" />
                </CardHeader>
                <CardBody className="text-center">
                    <Typography variant="h5" color="blue-gray" className="mb-2">
                        Your QR Code
                    </Typography>
                    <Typography className="font-normal text-blue-gray-600">
                        Show this to exhibitors to register your interest!
                    </Typography>
                </CardBody>
            </Card>
            <hr className="my-8" />

            <Typography variant="h3" color="blue-gray" className="mb-6">
                Products You're Interested In:
            </Typography>

            {interestedProducts.length === 0 ? (
                <Typography variant="paragraph" className="text-gray-600">
                    You haven't shown interest in any products yet.
                </Typography>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {interestedProducts.map(product => (
                        <Card key={product.product.product_id} className="w-full p-4">
                            <CardBody>
                                <Typography variant="h5" color="blue-gray" className="mb-2">
                                    {product.product.product_name}
                                </Typography>
                                <Typography className="text-gray-700">
                                    <span className="font-semibold">Scanned by:</span> {product.organisation.organisation_name}
                                </Typography>
                                <Typography className="text-gray-700">
                                    <span className="font-semibold">Industry:</span> {product.organisation.industry}
                                </Typography>
                                <Typography className="text-gray-700">
                                    <span className="font-semibold">Contact:</span> {product.organisation.contact_email}
                                </Typography>
                                <Typography className="text-gray-700">
                                    <span className="font-semibold">Phone:</span> {product.organisation.phone_number || 'N/A'}
                                </Typography>
                                <Typography className="text-gray-700">
                                    <span className="font-semibold">Website:</span> <a href={product.organisation.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{product.organisation.website}</a>
                                </Typography>
                                <Typography className="text-gray-700 mt-4">
                                    <span className="font-semibold">Your Notes:</span> {product.user_notes || 'No notes yet.'}
                                </Typography>
                                <Button
                                    onClick={() => handleAddEditNotes(product)}
                                    color="blue"
                                    size="sm"
                                    className="mt-4"
                                >
                                    {product.user_notes ? 'Edit Notes' : 'Add Notes'}
                                </Button>
                            </CardBody>
                        </Card>
                    ))}
                </div>
            )}

            {showNotesInput && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <NoteInput
                        onSubmit={handleUserNotesSubmit}
                        initialNotes={currentProductForNotes?.user_notes || ''}
                        onClose={handleCloseNotes}
                    />
                </div>
            )}
        </div>
    );
}

export default AttendantDashboard;
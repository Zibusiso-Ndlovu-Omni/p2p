
import { useState, useRef } from "react";
import { Outlet } from "react-router-dom";
import QrScanner from 'qr-scanner';

const ExhibitorDashboard = () => {
    const [products] = useState([
        {
            id: 1,
            name: "Enterprise Software Suite",
            description: "Comprehensive business management solution",
            price: "$50,000 - $100,000",
            category: "Enterprise"
        },
        {
            id: 2,
            name: "Marketing Automation Tool",
            description: "Advanced marketing campaign management",
            price: "$25,000 - $50,000",
            category: "Marketing"
        },
        {
            id: 3,
            name: "Basic CRM Package",
            description: "Customer relationship management system",
            price: "$5,000 - $15,000",
            category: "CRM"
        },
        {
            id: 4,
            name: "E-commerce Platform",
            description: "Complete online store solution",
            price: "$100,000+",
            category: "E-commerce"
        },
        {
            id: 5,
            name: "Analytics Dashboard",
            description: "Business intelligence and reporting",
            price: "$15,000 - $30,000",
            category: "Analytics"
        }
    ]);

    const [attendees, setAttendees] = useState([
        {
            id: 1,
            name: "John Smith",
            email: "john.smith@techcorp.com",
            phone: "+1 (555) 123-4567",
            company: "TechCorp Solutions LLC",
            position: "CTO",
            status: "Hot Lead",
            interestedProducts: [1, 5],
            budget: "$150,000",
            contactDate: "2024-06-28",
            notes: "Very interested in enterprise solutions. Decision maker with budget authority.",
            exhibitorNotes: "Follow up scheduled for next week. Showed great interest in analytics features."
        },
        {
            id: 2,
            name: "Sarah Johnson",
            email: "sarah.j@digitalinnov.com",
            phone: "+1 (555) 987-6543",
            company: "Digital Innovations Inc",
            position: "Marketing Director",
            status: "Warm Lead",
            interestedProducts: [2, 3],
            budget: "$75,000",
            contactDate: "2024-06-25",
            notes: "Looking to upgrade current marketing stack. Timeline is Q3 2024.",
            exhibitorNotes: "Needs pricing comparison with competitors. Send detailed proposal by Friday."
        },
        {
            id: 3,
            name: "Mike Chen",
            email: "mike@startuphub.co",
            phone: "+1 (555) 246-8135",
            company: "StartupHub Co",
            position: "Founder & CEO",
            status: "Cold Lead",
            interestedProducts: [3],
            budget: "$15,000",
            contactDate: "2024-06-20",
            notes: "Early stage startup, budget conscious but growing rapidly.",
            exhibitorNotes: "Potential for future expansion. Keep in touch for Q1 2025."
        },
        {
            id: 4,
            name: "Emily Rodriguez",
            email: "e.rodriguez@megaretail.com",
            phone: "+1 (555) 369-2580",
            company: "MegaRetail Group",
            position: "IT Director",
            status: "Hot Lead",
            interestedProducts: [4, 5],
            budget: "$200,000",
            contactDate: "2024-06-30",
            notes: "Expanding online presence. Urgent need for Q4 launch.",
            exhibitorNotes: "High priority lead. Decision expected within 2 weeks. Prepare detailed implementation timeline."
        },
        {
            id: 5,
            name: "David Kim",
            email: "david.kim@techcorp.com",
            phone: "+1 (555) 123-4568",
            company: "TechCorp Solutions LLC",
            position: "VP of Operations",
            status: "Warm Lead",
            interestedProducts: [1, 2],
            budget: "$120,000",
            contactDate: "2024-06-27",
            notes: "Secondary contact from TechCorp. Focused on operational efficiency.",
            exhibitorNotes: "Coordinate with John Smith (CTO) for joint meeting. Focus on ROI metrics."
        }
    ]);

    const [selectedAttendee, setSelectedAttendee] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingNotes, setEditingNotes] = useState(false);
    const [tempNotes, setTempNotes] = useState("");

    // QR Scanner states
    const [qrScannerOpen, setQrScannerOpen] = useState(false);
    const [selectedProductForQR, setSelectedProductForQR] = useState(null);
    const [scanResult, setScanResult] = useState(null);
    const [isScanning, setIsScanning] = useState(false);
    const [scanError, setScanError] = useState("");
    const [cameraPermission, setCameraPermission] = useState(null);
    const [scanMode, setScanMode] = useState(null); // 'camera' or 'file'

    const fileInputRef = useRef(null);
    const videoRef = useRef(null);
    const qrScannerRef = useRef(null);

    const getStatusColor = (status) => {
        switch (status) {
            case "Hot Lead":
                return "bg-red-100 text-red-800";
            case "Warm Lead":
                return "bg-yellow-100 text-yellow-800";
            case "Cold Lead":
                return "bg-blue-100 text-blue-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const getAttendeesByProduct = (productId) => {
        return attendees.filter(attendee => attendee.interestedProducts.includes(productId));
    };

    const openAttendeeModal = (attendee) => {
        setSelectedAttendee(attendee);
        setTempNotes(attendee.exhibitorNotes || "");
        setIsModalOpen(true);
        setEditingNotes(false);
    };

    const closeAttendeeModal = () => {
        setSelectedAttendee(null);
        setIsModalOpen(false);
        setEditingNotes(false);
        setTempNotes("");
    };

    const startEditingNotes = () => {
        setEditingNotes(true);
    };

    const saveNotes = () => {
        setAttendees(prevAttendees =>
            prevAttendees.map(attendee =>
                attendee.id === selectedAttendee.id
                    ? { ...attendee, exhibitorNotes: tempNotes }
                    : attendee
            )
        );
        setSelectedAttendee(prev => ({ ...prev, exhibitorNotes: tempNotes }));
        setEditingNotes(false);
    };

    const cancelEditingNotes = () => {
        setTempNotes(selectedAttendee.exhibitorNotes || "");
        setEditingNotes(false);
    };

    const updateNotesInline = (attendeeId, newNotes) => {
        setAttendees(prevAttendees =>
            prevAttendees.map(attendee =>
                attendee.id === attendeeId
                    ? { ...attendee, exhibitorNotes: newNotes }
                    : attendee
            )
        );
    };

    // Parse QR code data - handles both JSON and simple text formats
    const parseQRData = (qrText) => {
        try {
            // Try parsing as JSON first
            const jsonData = JSON.parse(qrText);
            return {
                id: jsonData.id || Date.now(),
                first_name: jsonData.first_name || "",
                email: jsonData.email || "",
                phone: jsonData.phone || jsonData.phoneNumber || "",
                company: jsonData.company || jsonData.organization || "",
                position: jsonData.position || jsonData.title || jsonData.jobTitle || "",
                budget: jsonData.budget || "Not specified",
                notes: jsonData.notes || jsonData.interests || `Scanned QR: ${qrText.substring(0, 100)}...`
            };
        } catch (error) {
            // If not JSON, try to extract info from plain text
            const lines = qrText.split('\n').filter(line => line.trim());

            // Check if it's vCard format
            if (qrText.startsWith('BEGIN:VCARD')) {
                const vCardData = parseVCard(qrText);
                return {
                    id: Date.now(),
                    first_name: vCardData.first_name || "Unknown",
                    email: vCardData.email || "",
                    phone: vCardData.phone || "",
                    company: vCardData.company || "",
                    position: vCardData.position || "",
                    budget: "Not specified",
                    notes: `Scanned from vCard: ${vCardData.name || "Contact"}`
                };
            }

            // For simple text, return basic info
            return {
                id: Date.now(),
                first_name: lines[0] || "Unknown Contact",
                email: lines.find(line => line.includes('@')) || "",
                phone: lines.find(line => /[\d\-\(\)\s\+]{10,}/.test(line)) || "",
                company: lines[1] || "",
                position: "",
                budget: "Not specified",
                notes: `QR Code Content: ${qrText}`
            };
        }
    };

    // Parse vCard format
    const parseVCard = (vCardText) => {
        const lines = vCardText.split('\n');
        const vCardData = {};

        lines.forEach(line => {
            if (line.startsWith('FN:')) {
                vCardData.first_name = line.substring(3);
            } else if (line.startsWith('EMAIL:')) {
                vCardData.email = line.substring(6);
            } else if (line.startsWith('TEL:')) {
                vCardData.phone = line.substring(4);
            } else if (line.startsWith('ORG:')) {
                vCardData.company = line.substring(4);
            } else if (line.startsWith('TITLE:')) {
                vCardData.position = line.substring(6);
            }
        });

        return vCardData;
    };

    // QR Scanner Functions
    const openQRScanner = (productId) => {
        setSelectedProductForQR(productId);
        setQrScannerOpen(true);
        setScanResult(null);
        setScanError("");
        setScanMode(null);
        setCameraPermission(null);
    };

    const closeQRScanner = () => {
        // Stop camera if running
        if (qrScannerRef.current) {
            qrScannerRef.current.stop();
            qrScannerRef.current.destroy();
            qrScannerRef.current = null;
        }

        setQrScannerOpen(false);
        setSelectedProductForQR(null);
        setScanResult(null);
        setScanError("");
        setIsScanning(false);
        setScanMode(null);
        setCameraPermission(null);
    };

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            setIsScanning(true);
            setScanError("");
            setScanMode('file');

            try {
                const result = await QrScanner.scanImage(file, {
                    returnDetailedScanResult: true,
                    highlightScanRegion: true,
                });

                const parsedData = parseQRData(result.data);
                setScanResult(parsedData);
                setIsScanning(false);
            } catch (error) {
                console.error('QR scan error:', error);
                setScanError("Could not detect a QR code in this image. Please try again with a clearer image.");
                setIsScanning(false);
            }
        }

        // Reset file input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const startCameraScanning = async () => {
        setScanMode('camera');
        setIsScanning(true);
        setScanError("");

        try {
            // Check camera permission
            const hasCamera = await QrScanner.hasCamera();
            if (!hasCamera) {
                throw new Error("No camera found on this device");
            }

            // Create QR scanner instance
            const qrScanner = new QrScanner(
                videoRef.current,
                (result) => {
                    const parsedData = parseQRData(result.data);
                    setScanResult(parsedData);
                    setIsScanning(false);
                    qrScanner.stop();
                },
                {
                    onDecodeError: (error) => {
                        // Ignore decode errors as they happen frequently while scanning
                        console.debug('Decode error:', error);
                    },
                    highlightScanRegion: true,
                    highlightCodeOutline: true,
                    preferredCamera: 'environment' // Use back camera if available
                }
            );

            qrScannerRef.current = qrScanner;
            await qrScanner.start();
            setCameraPermission('granted');

        } catch (error) {
            console.error('Camera error:', error);
            let errorMessage = "Unable to access camera. ";

            if (error.name === 'NotAllowedError') {
                errorMessage += "Please allow camera access and try again.";
                setCameraPermission('denied');
            } else if (error.name === 'NotFoundError') {
                errorMessage += "No camera found on this device.";
            } else if (error.message.includes('secure context')) {
                errorMessage += "Camera access requires HTTPS.";
            } else {
                errorMessage += error.message || "Please check camera permissions.";
            }

            setScanError(errorMessage);
            setIsScanning(false);
            setScanMode(null);
        }
    };

    const stopCameraScanning = () => {
        if (qrScannerRef.current) {
            qrScannerRef.current.stop();
            qrScannerRef.current.destroy();
            qrScannerRef.current = null;
        }
        setIsScanning(false);
        setScanMode(null);
    };

    const registerAttendeeInterest = () => {
        if (scanResult && selectedProductForQR) {
            const existingAttendee = attendees.find(att =>
                att.email.toLowerCase() === scanResult.email.toLowerCase() && scanResult.email
            );

            const productName = products.find(p => p.id === selectedProductForQR)?.name;

            if (existingAttendee) {
                // Update existing attendee's interested products
                setAttendees(prevAttendees =>
                    prevAttendees.map(attendee =>
                        attendee.id === existingAttendee.id
                            ? {
                                ...attendee,
                                interestedProducts: [...new Set([...attendee.interestedProducts, selectedProductForQR])],
                                contactDate: new Date().toISOString().split('T')[0],
                                exhibitorNotes: attendee.exhibitorNotes +
                                    ` | ${new Date().toLocaleDateString()}: Added interest in ${productName} via QR scan`
                            }
                            : attendee
                    )
                );
                alert(`Updated ${existingAttendee.name}'s interest to include ${productName}!`);
            } else {
                // Add new attendee
                const newAttendee = {
                    ...scanResult,
                    id: Date.now(), // Generate unique ID
                    status: "Cold Lead",
                    interestedProducts: [selectedProductForQR],
                    contactDate: new Date().toISOString().split('T')[0],
                    exhibitorNotes: `${new Date().toLocaleDateString()}: Scanned QR code and registered interest in ${productName}`
                };

                setAttendees(prevAttendees => [...prevAttendees, newAttendee]);
                alert(`Successfully registered ${scanResult.name}'s interest in ${productName}!`);
            }

            closeQRScanner();
        }
    };

    const stats = {
        totalProducts: products.length,
        totalAttendees: attendees.length,
        hotLeads: attendees.filter(attendee => attendee.status === "Hot Lead").length,
        warmLeads: attendees.filter(attendee => attendee.status === "Warm Lead").length,
        coldLeads: attendees.filter(attendee => attendee.status === "Cold Lead").length
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Exhibitor Dashboard</h1>
                    <p className="text-gray-600 mt-2">Manage your products and interested attendees</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="p-2 bg-purple-100 rounded-lg">
                                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Products</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Total Attendees</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.totalAttendees}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="p-2 bg-red-100 rounded-lg">
                                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Hot Leads</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.hotLeads}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="p-2 bg-yellow-100 rounded-lg">
                                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Warm Leads</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.warmLeads}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Cold Leads</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.coldLeads}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Products and Interested Attendees */}
                <div className="space-y-6">
                    {products.map((product) => {
                        const interestedAttendees = getAttendeesByProduct(product.id);

                        return (
                            <div key={product.id} className="bg-white rounded-lg shadow overflow-hidden">
                                <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-xl font-semibold text-gray-900">{product.name}</h3>
                                            <p className="text-gray-600 mt-1">{product.description}</p>
                                            <div className="flex items-center mt-2 space-x-4">
                                                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                                                    {product.category}
                                                </span>
                                                <span className="text-sm font-medium text-gray-700">
                                                    Price: {product.price}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="text-right space-y-2">
                                            <div>
                                                <span className="text-2xl font-bold text-blue-600">{interestedAttendees.length}</span>
                                                <p className="text-sm text-gray-500">Interested Attendees</p>
                                            </div>
                                            <button
                                                onClick={() => openQRScanner(product.id)}
                                                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
                                            >
                                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                                                </svg>
                                                Scan QR Code
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {interestedAttendees.length > 0 ? (
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Attendee
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Contact
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Budget
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Status
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Exhibitor Notes
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Actions
                                                </th>
                                            </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                            {interestedAttendees.map((attendee) => (
                                                <tr key={attendee.id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div>
                                                            <div className="text-sm font-medium text-gray-900">{attendee.name}</div>
                                                            <div className="text-sm text-gray-500">{attendee.company}</div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">{attendee.email}</div>
                                                        <div className="text-sm text-gray-500">{attendee.phone}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm font-medium text-gray-900">{attendee.budget}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(attendee.status)}`}>
                                                            {attendee.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="max-w-xs">
                                                            <textarea
                                                                className="w-full text-sm text-gray-700 border border-gray-200 rounded-md p-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                                rows="2"
                                                                placeholder="Add your notes about this attendee..."
                                                                value={attendee.exhibitorNotes || ""}
                                                                onChange={(e) => updateNotesInline(attendee.id, e.target.value)}
                                                            />
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                        <button
                                                            onClick={() => openAttendeeModal(attendee)}
                                                            className="text-blue-600 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded-md transition-colors"
                                                        >
                                                            View Details
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div className="px-6 py-8 text-center">
                                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                        <h3 className="mt-2 text-sm font-medium text-gray-900">No interested attendees</h3>
                                        <p className="mt-1 text-sm text-gray-500">No attendees have shown interest in this product yet.</p>
                                        <button
                                            onClick={() => openQRScanner(product.id)}
                                            className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
                                        >
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                                            </svg>
                                            Scan QR Code to Add Interest
                                        </button>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* QR Scanner Modal */}
            {qrScannerOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                    <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
                        <div className="mt-3">
                            {/* Modal Header */}
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900">Scan Attendee QR Code</h3>
                                    <p className="text-gray-600">
                                        Register interest for: {products.find(p => p.id === selectedProductForQR)?.name}
                                    </p>
                                </div>
                                <button
                                    onClick={closeQRScanner}
                                    className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                                >
                                    ×
                                </button>
                            </div>

                            {/* Scanner Content */}
                            <div className="space-y-6">
                                {!scanResult ? (
                                    <div>
                                        {!scanMode && (
                                            <div>
                                                <h4 className="text-lg font-semibold text-gray-900 mb-4">Choose Scanning Method</h4>

                                                {/* Camera Scanning */}
                                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center mb-4">
                                                    <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </svg>
                                                    <h3 className="text-lg font-medium text-gray-900 mb-2">Use Camera</h3>
                                                    <p className="text-gray-500 mb-4">Point your camera at the attendee's QR code</p>
                                                    <button
                                                        onClick={startCameraScanning}
                                                        disabled={isScanning}
                                                        className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
                                                    >
                                                        {isScanning ? "Starting Camera..." : "Start Camera Scan"}
                                                    </button>
                                                </div>

                                                {/* File Upload */}
                                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                                    <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                    </svg>
                                                    <h3 className="text-lg font-medium text-gray-900 mb-2">Upload QR Code Image</h3>
                                                    <p className="text-gray-500 mb-4">Upload an image file containing the QR code</p>
                                                    <input
                                                        type="file"
                                                        ref={fileInputRef}
                                                        onChange={handleFileUpload}
                                                        accept="image/*"
                                                        className="hidden"
                                                    />
                                                    <button
                                                        onClick={() => fileInputRef.current?.click()}
                                                        disabled={isScanning}
                                                        className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:opacity-50"
                                                    >
                                                        {isScanning ? "Processing..." : "Choose File"}
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        {/* Camera Video Stream */}
                                        {scanMode === 'camera' && (
                                            <div className="text-center">
                                                <div className="relative inline-block">
                                                    <video
                                                        ref={videoRef}
                                                        className="w-full max-w-md mx-auto rounded-lg shadow-lg"
                                                        playsInline
                                                        muted
                                                    />
                                                    {isScanning && (
                                                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
                                                            <div className="text-white text-center">
                                                                <div className="animate-pulse mb-2">
                                                                    <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                                                                    </svg>
                                                                </div>
                                                                <p className="text-sm">Scanning for QR codes...</p>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="mt-4 space-x-2">
                                                    <button
                                                        onClick={stopCameraScanning}
                                                        className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                                                    >
                                                        Stop Camera
                                                    </button>
                                                    <button
                                                        onClick={() => setScanMode(null)}
                                                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                                                    >
                                                        Choose Different Method
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        {scanError && (
                                            <div className="bg-red-50 border border-red-200 rounded-md p-4">
                                                <div className="flex">
                                                    <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                                    </svg>
                                                    <div className="ml-3">
                                                        <p className="text-sm text-red-700">{scanError}</p>
                                                    </div>
                                                </div>
                                                {cameraPermission === 'denied' && (
                                                    <div className="mt-2">
                                                        <p className="text-xs text-red-600">
                                                            To use camera scanning, please allow camera access in your browser settings and refresh the page.
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {isScanning && scanMode === 'file' && (
                                            <div className="flex items-center justify-center p-6">
                                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                                                <span className="ml-2 text-gray-600">Processing QR code...</span>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div>
                                        <h4 className="text-lg font-semibold text-gray-900 mb-4">QR Code Scanned Successfully!</h4>

                                        <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-4">
                                            <div className="flex">
                                                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                                <div className="ml-3">
                                                    <p className="text-sm text-green-700">
                                                        Successfully extracted attendee information from QR code!
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-gray-50 rounded-lg p-4 mb-6">
                                            <h5 className="font-medium text-gray-900 mb-3">Attendee Information:</h5>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                                <div>
                                                    <span className="font-medium text-gray-600">Name:</span>
                                                    <p className="text-gray-900">{scanResult.first_name}</p>
                                                </div>
                                                <div>
                                                    <span className="font-medium text-gray-600">Email:</span>
                                                    <p className="text-gray-900">{scanResult.email || 'Not provided'}</p>
                                                </div>
                                                <div>
                                                    <span className="font-medium text-gray-600">Phone:</span>
                                                    <p className="text-gray-900">{scanResult.phone || 'Not provided'}</p>
                                                </div>
                                                <div>
                                                    <span className="font-medium text-gray-600">Company:</span>
                                                    <p className="text-gray-900">{scanResult.company || 'Not provided'}</p>
                                                </div>
                                                <div>
                                                    <span className="font-medium text-gray-600">Position:</span>
                                                    <p className="text-gray-900">{scanResult.position || 'Not provided'}</p>
                                                </div>
                                                <div>
                                                    <span className="font-medium text-gray-600">Budget:</span>
                                                    <p className="text-gray-900">{scanResult.budget}</p>
                                                </div>
                                            </div>
                                            {scanResult.notes && (
                                                <div className="mt-4">
                                                    <span className="font-medium text-gray-600">Notes:</span>
                                                    <p className="text-gray-900 text-sm mt-1">{scanResult.notes}</p>
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex justify-end space-x-3">
                                            <button
                                                onClick={closeQRScanner}
                                                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={registerAttendeeInterest}
                                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                                            >
                                                Register Interest
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Attendee Details Modal */}
            {isModalOpen && selectedAttendee && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                    <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-2/3 lg:w-1/2 shadow-lg rounded-md bg-white">
                        <div className="mt-3">
                            {/* Modal Header */}
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900">{selectedAttendee.name}</h3>
                                    <p className="text-gray-600">{selectedAttendee.company} - {selectedAttendee.position}</p>
                                </div>
                                <button
                                    onClick={closeAttendeeModal}
                                    className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                                >
                                    ×
                                </button>
                            </div>

                            {/* Attendee Details */}
                            <div className="space-y-6">
                                {/* Contact Information */}
                                <div>
                                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Contact Information</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <span className="font-medium text-gray-600">Email:</span>
                                            <p className="text-gray-900">{selectedAttendee.email}</p>
                                        </div>
                                        <div>
                                            <span className="font-medium text-gray-600">Phone:</span>
                                            <p className="text-gray-900">{selectedAttendee.phone}</p>
                                        </div>
                                        <div>
                                            <span className="font-medium text-gray-600">Budget:</span>
                                            <p className="text-gray-900">{selectedAttendee.budget}</p>
                                        </div>
                                        <div>
                                            <span className="font-medium text-gray-600">Status:</span>
                                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedAttendee.status)}`}>
                                                {selectedAttendee.status}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="font-medium text-gray-600">Contact Date:</span>
                                            <p className="text-gray-900">{selectedAttendee.contactDate}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Interested Products */}
                                <div>
                                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Interested Products</h4>
                                    <div className="space-y-2">
                                        {selectedAttendee.interestedProducts.map(productId => {
                                            const product = products.find(p => p.id === productId);
                                            return product ? (
                                                <div key={productId} className="flex items-center p-3 bg-gray-50 rounded-lg">
                                                    <div>
                                                        <p className="font-medium text-gray-900">{product.name}</p>
                                                        <p className="text-sm text-gray-600">{product.description}</p>
                                                    </div>
                                                </div>
                                            ) : null;
                                        })}
                                    </div>
                                </div>

                                {/* Attendee Notes */}
                                <div>
                                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Attendee Notes</h4>
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <p className="text-gray-700 text-sm">{selectedAttendee.notes}</p>
                                    </div>
                                </div>

                                {/* Exhibitor Notes */}
                                <div>
                                    <div className="flex justify-between items-center mb-3">
                                        <h4 className="text-lg font-semibold text-gray-900">Your Notes</h4>
                                        {!editingNotes && (
                                            <button
                                                onClick={startEditingNotes}
                                                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                            >
                                                Edit Notes
                                            </button>
                                        )}
                                    </div>

                                    {editingNotes ? (
                                        <div className="space-y-3">
                                            <textarea
                                                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                rows="4"
                                                placeholder="Add your notes about this attendee..."
                                                value={tempNotes}
                                                onChange={(e) => setTempNotes(e.target.value)}
                                            />
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={saveNotes}
                                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
                                                >
                                                    Save Notes
                                                </button>
                                                <button
                                                    onClick={cancelEditingNotes}
                                                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors text-sm"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="bg-gray-50 rounded-lg p-4">
                                            <p className="text-gray-700 text-sm">
                                                {selectedAttendee.exhibitorNotes || "No notes added yet."}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-end mt-6">
                                <button
                                    onClick={closeAttendeeModal}
                                    className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <Outlet />
        </div>
    );
};

export default ExhibitorDashboard;
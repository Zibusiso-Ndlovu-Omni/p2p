
import { useState } from "react";
import { Outlet } from "react-router-dom";

const AttendantDashboard = () => {
    const [currentAttendee] = useState({
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
        notes: "Very interested in enterprise solutions. Decision maker with budget authority."
    });

    const [products] = useState([
        {
            id: 1,
            name: "Enterprise Software Suite",
            description: "Comprehensive business management solution",
            price: "$50,000 - $100,000",
            category: "Enterprise",
            features: ["Advanced Analytics", "Multi-tenant Architecture", "24/7 Support", "Custom Integrations"],
            vendor: {
                name: "TechSolutions Inc.",
                email: "sales@techsolutions.com",
                phone: "+1 (555) 100-2000",
                website: "www.techsolutions.com",
                address: "123 Tech Street, Silicon Valley, CA 94025",
                salesRep: {
                    name: "Michael Johnson",
                    email: "m.johnson@techsolutions.com",
                    phone: "+1 (555) 100-2001",
                    position: "Senior Sales Manager"
                },
                businessHours: "Monday - Friday: 8:00 AM - 6:00 PM PST",
                timezone: "Pacific Standard Time (PST)"
            }
        },
        {
            id: 2,
            name: "Marketing Automation Tool",
            description: "Advanced marketing campaign management",
            price: "$25,000 - $50,000",
            category: "Marketing",
            features: ["Email Campaigns", "Lead Scoring", "A/B Testing", "ROI Analytics"],
            vendor: {
                name: "MarketPro Solutions",
                email: "info@marketpro.com",
                phone: "+1 (555) 200-3000",
                website: "www.marketpro.com",
                address: "456 Marketing Ave, Austin, TX 78701",
                salesRep: {
                    name: "Sarah Williams",
                    email: "s.williams@marketpro.com",
                    phone: "+1 (555) 200-3001",
                    position: "Account Executive"
                },
                businessHours: "Monday - Friday: 9:00 AM - 5:00 PM CST",
                timezone: "Central Standard Time (CST)"
            }
        },
        {
            id: 3,
            name: "Basic CRM Package",
            description: "Customer relationship management system",
            price: "$5,000 - $15,000",
            category: "CRM",
            features: ["Contact Management", "Sales Pipeline", "Reporting", "Mobile App"],
            vendor: {
                name: "CRM Masters",
                email: "contact@crmmasters.com",
                phone: "+1 (555) 300-4000",
                website: "www.crmmasters.com",
                address: "789 CRM Boulevard, Denver, CO 80202",
                salesRep: {
                    name: "David Chen",
                    email: "d.chen@crmmasters.com",
                    phone: "+1 (555) 300-4001",
                    position: "Sales Consultant"
                },
                businessHours: "Monday - Friday: 8:30 AM - 5:30 PM MST",
                timezone: "Mountain Standard Time (MST)"
            }
        },
        {
            id: 4,
            name: "E-commerce Platform",
            description: "Complete online store solution",
            price: "$100,000+",
            category: "E-commerce",
            features: ["Multi-channel Selling", "Payment Gateway", "Inventory Management", "SEO Tools"],
            vendor: {
                name: "E-Shop Builders",
                email: "sales@eshopbuilders.com",
                phone: "+1 (555) 400-5000",
                website: "www.eshopbuilders.com",
                address: "321 Commerce Lane, Miami, FL 33101",
                salesRep: {
                    name: "Emily Rodriguez",
                    email: "e.rodriguez@eshopbuilders.com",
                    phone: "+1 (555) 400-5001",
                    position: "Enterprise Sales Director"
                },
                businessHours: "Monday - Friday: 9:00 AM - 6:00 PM EST",
                timezone: "Eastern Standard Time (EST)"
            }
        },
        {
            id: 5,
            name: "Analytics Dashboard",
            description: "Business intelligence and reporting",
            price: "$15,000 - $30,000",
            category: "Analytics",
            features: ["Real-time Dashboards", "Custom Reports", "Data Visualization", "API Integration"],
            vendor: {
                name: "DataViz Pro",
                email: "hello@datavizpro.com",
                phone: "+1 (555) 500-6000",
                website: "www.datavizpro.com",
                address: "654 Analytics Way, Seattle, WA 98101",
                salesRep: {
                    name: "Alex Thompson",
                    email: "a.thompson@datavizpro.com",
                    phone: "+1 (555) 500-6001",
                    position: "Solutions Specialist"
                },
                businessHours: "Monday - Friday: 8:00 AM - 5:00 PM PST",
                timezone: "Pacific Standard Time (PST)"
            }
        }
    ]);

    // Product-specific notes for the current attendee
    const [productNotes, setProductNotes] = useState({
        1: "Perfect fit for our enterprise needs. Need to discuss implementation timeline and custom integrations. Key decision factors: scalability and support quality.",
        5: "Great analytics capabilities. Would like to see a demo of custom reporting features. Important for our quarterly business reviews."
    });

    const [editingNote, setEditingNote] = useState(null);
    const [tempNote, setTempNote] = useState("");
    const [contactModalOpen, setContactModalOpen] = useState(false);
    const [selectedVendor, setSelectedVendor] = useState(null);

    // Get products the attendee is interested in
    const getInterestedProducts = () => {
        return products.filter(product =>
            currentAttendee.interestedProducts.includes(product.id)
        );
    };

    const startEditingNote = (productId) => {
        setEditingNote(productId);
        setTempNote(productNotes[productId] || "");
    };

    const saveProductNote = (productId) => {
        setProductNotes(prev => ({
            ...prev,
            [productId]: tempNote
        }));
        setEditingNote(null);
        setTempNote("");
    };

    const cancelEditingNote = () => {
        setEditingNote(null);
        setTempNote("");
    };

    const openContactModal = (vendor) => {
        setSelectedVendor(vendor);
        setContactModalOpen(true);
    };

    const closeContactModal = () => {
        setContactModalOpen(false);
        setSelectedVendor(null);
    };

    const addProductInterest = (productId) => {
        // In a real app, this would update the backend
        console.log(`Adding interest in product ${productId}`);
    };

    const removeProductInterest = (productId) => {
        // In a real app, this would update the backend
        console.log(`Removing interest in product ${productId}`);
    };

    const getCategoryColor = (category) => {
        switch (category) {
            case "Enterprise":
                return "bg-purple-100 text-purple-800";
            case "Marketing":
                return "bg-pink-100 text-pink-800";
            case "CRM":
                return "bg-blue-100 text-blue-800";
            case "E-commerce":
                return "bg-green-100 text-green-800";
            case "Analytics":
                return "bg-yellow-100 text-yellow-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const interestedProducts = getInterestedProducts();

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">My Product Interests</h1>
                    <p className="text-gray-600 mt-2">
                        Welcome back, {currentAttendee.name}! Manage your product interests and notes.
                    </p>
                </div>

                {/* Attendee Profile Summary */}
                <div className="bg-white rounded-lg shadow p-6 mb-8">
                    <div className="flex items-start justify-between">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900">{currentAttendee.name}</h2>
                            <p className="text-gray-600">{currentAttendee.position} at {currentAttendee.company}</p>
                            <p className="text-sm text-gray-500 mt-1">Budget: {currentAttendee.budget}</p>
                        </div>
                        <div className="text-right">
                            <span className="text-2xl font-bold text-blue-600">{interestedProducts.length}</span>
                            <p className="text-sm text-gray-500">Products of Interest</p>
                        </div>
                    </div>
                </div>

                {/* Interested Products */}
                {interestedProducts.length > 0 ? (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-gray-900">Your Interested Products</h2>

                        {interestedProducts.map((product) => (
                            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                                {/* Product Header */}
                                <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-3 mb-2">
                                                <h3 className="text-xl font-semibold text-gray-900">{product.name}</h3>
                                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(product.category)}`}>
                                                    {product.category}
                                                </span>
                                            </div>
                                            <p className="text-gray-600 mb-2">{product.description}</p>
                                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                                                <span>Vendor: {product.vendor.name}</span>
                                                <span>•</span>
                                                <span className="font-medium text-green-600">Price: {product.price}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Product Features */}
                                <div className="px-6 py-4 border-b border-gray-200">
                                    <h4 className="text-sm font-medium text-gray-900 mb-3">Key Features</h4>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                        {product.features.map((feature, index) => (
                                            <div key={index} className="flex items-center">
                                                <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                                <span className="text-sm text-gray-700">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Personal Notes Section */}
                                <div className="px-6 py-4">
                                    <div className="flex justify-between items-center mb-3">
                                        <h4 className="text-lg font-medium text-gray-900">My Notes</h4>
                                        {editingNote !== product.id && (
                                            <button
                                                onClick={() => startEditingNote(product.id)}
                                                className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                                            >
                                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                                Edit Notes
                                            </button>
                                        )}
                                    </div>

                                    {editingNote === product.id ? (
                                        <div className="space-y-3">
                                            <textarea
                                                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                                rows="4"
                                                placeholder="Add your thoughts, questions, or requirements about this product..."
                                                value={tempNote}
                                                onChange={(e) => setTempNote(e.target.value)}
                                            />
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => saveProductNote(product.id)}
                                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm flex items-center"
                                                >
                                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    Save Notes
                                                </button>
                                                <button
                                                    onClick={cancelEditingNote}
                                                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors text-sm"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="bg-blue-50 rounded-lg p-4 min-h-[120px]">
                                            {productNotes[product.id] ? (
                                                <p className="text-gray-700 whitespace-pre-wrap">{productNotes[product.id]}</p>
                                            ) : (
                                                <div className="text-center text-gray-500">
                                                    <svg className="w-8 h-8 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                    <p>No notes added yet.</p>
                                                    <p className="text-sm">Click "Edit Notes" to add your thoughts about this product.</p>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Action Buttons */}
                                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                                    <div className="flex justify-between items-center">
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => openContactModal(product.vendor)}
                                                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm flex items-center"
                                            >
                                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.959 8.959 0 01-4.906-1.476L3 21l2.476-5.906A8.959 8.959 0 013 12c0-4.418 3.582-8 8-8s8 3.582 8 8z" />
                                                </svg>
                                                Contact Vendor
                                            </button>
                                            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm flex items-center">
                                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                </svg>
                                                Request Demo
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => removeProductInterest(product.id)}
                                            className="px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors text-sm flex items-center"
                                        >
                                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                            Remove Interest
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow p-8 text-center">
                        <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                        <h3 className="text-xl font-medium text-gray-900 mb-2">No Products of Interest</h3>
                        <p className="text-gray-500 mb-4">You haven't shown interest in any products yet.</p>
                        <button className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                            Browse Products
                        </button>
                    </div>
                )}
            </div>

            {/* Contact Vendor Modal */}
            {contactModalOpen && selectedVendor && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                    <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
                        <div className="mt-3">
                            {/* Modal Header */}
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900">{selectedVendor.name}</h3>
                                    <p className="text-gray-600">Contact Information</p>
                                </div>
                                <button
                                    onClick={closeContactModal}
                                    className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                                >
                                    ×
                                </button>
                            </div>

                            {/* Modal Content */}
                            <div className="space-y-6">
                                {/* Company Information */}
                                <div>
                                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Company Information</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Email</p>
                                            <a href={`mailto:${selectedVendor.email}`} className="text-sm text-blue-600 hover:text-blue-800">
                                                {selectedVendor.email}
                                            </a>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Phone</p>
                                            <a href={`tel:${selectedVendor.phone}`} className="text-sm text-blue-600 hover:text-blue-800">
                                                {selectedVendor.phone}
                                            </a>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Website</p>
                                            <a href={`https://${selectedVendor.website}`} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:text-blue-800">
                                                {selectedVendor.website}
                                            </a>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Timezone</p>
                                            <p className="text-sm text-gray-900">{selectedVendor.timezone}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Sales Representative */}
                                <div>
                                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Sales Representative</h4>
                                    <div className="bg-blue-50 p-4 rounded-lg">
                                        <div className="flex items-start space-x-4">
                                            <div className="flex-shrink-0">
                                                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                                                    <span className="text-white font-medium text-lg">
                                                        {selectedVendor.salesRep.name.split(' ').map(n => n[0]).join('')}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <h5 className="text-lg font-medium text-gray-900">{selectedVendor.salesRep.name}</h5>
                                                <p className="text-gray-600 text-sm">{selectedVendor.salesRep.position}</p>
                                                <div className="mt-2 space-y-1">
                                                    <div className="flex items-center">
                                                        <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                        </svg>
                                                        <a href={`mailto:${selectedVendor.salesRep.email}`} className="text-sm text-blue-600 hover:text-blue-800">
                                                            {selectedVendor.salesRep.email}
                                                        </a>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                        </svg>
                                                        <a href={`tel:${selectedVendor.salesRep.phone}`} className="text-sm text-blue-600 hover:text-blue-800">
                                                            {selectedVendor.salesRep.phone}
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Business Hours */}
                                <div>
                                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Business Hours</h4>
                                    <div className="flex items-center p-3 bg-green-50 rounded-lg">
                                        <svg className="w-5 h-5 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <p className="text-sm text-gray-700">{selectedVendor.businessHours}</p>
                                    </div>
                                </div>

                                {/* Address */}
                                <div>
                                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Address</h4>
                                    <div className="flex items-start p-3 bg-gray-50 rounded-lg">
                                        <svg className="w-5 h-5 text-gray-600 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <p className="text-sm text-gray-700">{selectedVendor.address}</p>
                                    </div>
                                </div>

                                {/* Quick Actions */}
                                <div>
                                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Quick Actions</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <a
                                            href={`mailto:${selectedVendor.salesRep.email}?subject=Inquiry about ${selectedVendor.name} Products`}
                                            className="flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                                        >
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                            Send Email
                                        </a>
                                        <a
                                            href={`tel:${selectedVendor.salesRep.phone}`}
                                            className="flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                                        >
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                            Call Now
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="flex justify-end mt-6 pt-4 border-t border-gray-200">
                                <button
                                    onClick={closeContactModal}
                                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
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

export default AttendantDashboard;
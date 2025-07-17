import React, { useState, useEffect } from "react";
import { Users, Building, UserCheck, Package, Plus, Activity, Eye, Pencil } from "lucide-react";
import organisationService from "../../../services/organisation.service.js";
import exhibitorService from "../../../services/exhibitor.service.js";
import userService from "../../../services/user.service.js";
import productService from "../../../services/product.service.js";
import {Link} from "react-router-dom";
import Modal from './components/Modal.jsx';
import OrganisationDetailsModal from './components/OrganisationDetailsModal';
import ExhibitorDetailsModal from './components/ExhibitorDetailsModal';
import UserDetailsModal from './components/UserDetailsModal';


const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('organisations');

    const [metrics, setMetrics] = useState({
        totalUsers: 0,
        totalExhibitors: 0,
        totalOrganisations: 0,
        totalProducts: 0,
    });
    const [loadingMetrics, setLoadingMetrics] = useState(true);

    const [organisations, setOrganisations] = useState([]);
    const [exhibitors, setExhibitors] = useState([]);
    const [users, setUsers] = useState([]);
    const [loadingOrganisations, setLoadingOrganisations] = useState(true);
    const [loadingExhibitors, setLoadingExhibitors] = useState(true);
    const [loadingUsers, setLoadingUsers] = useState(true);

    // State for modals
    const [isOrganisationModalOpen, setIsOrganisationModalOpen] = useState(false);
    const [selectedOrganisationId, setSelectedOrganisationId] = useState(null);

    const [isExhibitorModalOpen, setIsExhibitorModalOpen] = useState(false);
    const [selectedExhibitorId, setSelectedExhibitorId] = useState(null);

    const [isUserModalOpen, setIsUserModalOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);


    useEffect(() => {
        const fetchMetrics = async () => {
            setLoadingMetrics(true);
            try {
                const [userRes, exhibitorRes, organisationRes, productRes] = await Promise.all([
                    userService.getAllUsers(),
                    exhibitorService.getAllExhibitors(),
                    organisationService.getAllOrganisations(),
                    productService.getAllProducts()
                ]);

                const totalUsers = userRes.data?.data?.length || 0;
                const totalExhibitors = exhibitorRes.data?.data?.length || 0;
                const totalOrganisations = organisationRes.data?.data?.organisations?.length || 0;
                const totalProducts = productRes?.data?.length || 0;

                setMetrics({
                    totalUsers,
                    totalExhibitors,
                    totalOrganisations,
                    totalProducts,
                });
            } catch (error) {
                console.error("Failed to fetch metrics:", error);
            } finally {
                setLoadingMetrics(false);
            }
        };

        fetchMetrics();
    }, []);

    // Function to fetch organisations, can be called on tab change and after modal updates
    const fetchOrganisationsData = async () => {
        setLoadingOrganisations(true);
        try {
            const res = await organisationService.getAllOrganisations();
            if (res.status === 200) {
                setOrganisations(res.data.data.organisations);
            } else {
                console.error("Failed to load organisations.");
            }
        } catch (error) {
            console.error("Error fetching organisations:", error);
        } finally {
            setLoadingOrganisations(false);
        }
    };

    useEffect(() => {
        if (activeTab === 'organisations') {
            fetchOrganisationsData();
        }
    }, [activeTab]);

    // Function to fetch exhibitors, can be called on tab change and after modal updates
    const fetchExhibitorsData = async () => {
        setLoadingExhibitors(true);
        try {
            const res = await exhibitorService.getAllExhibitors();
            if (res.status === 200) {
                setExhibitors(res.data.data);
            } else {
                console.error("Failed to load exhibitors.");
            }
        } catch (error) {
            console.error("Error fetching exhibitors:", error);
        } finally {
            setLoadingExhibitors(false);
        }
    };

    useEffect(() => {
        if (activeTab === 'exhibitors') {
            fetchExhibitorsData();
        }
    }, [activeTab]);

    // Function to fetch users, can be called on tab change and after modal updates
    const fetchUsersData = async () => {
        setLoadingUsers(true);
        try {
            const res = await userService.getAllUsers();
            if (res.status === 200) {
                setUsers(res.data.data);
            } else {
                console.error("Failed to load users.");
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setLoadingUsers(false);
        }
    };

    useEffect(() => {
        if (activeTab === 'users') {
            fetchUsersData();
        }
    }, [activeTab]);


    // Handlers for opening modals
    const openOrganisationModal = (id) => {
        setSelectedOrganisationId(id);
        setIsOrganisationModalOpen(true);
    };

    const closeOrganisationModal = () => {
        setIsOrganisationModalOpen(false);
        setSelectedOrganisationId(null);
        // Re-fetch data to reflect any changes made in the modal
        fetchOrganisationsData();
    };

    const openExhibitorModal = (id) => {
        setSelectedExhibitorId(id);
        setIsExhibitorModalOpen(true);
    };

    const closeExhibitorModal = () => {
        setIsExhibitorModalOpen(false);
        setSelectedExhibitorId(null);
        // Re-fetch data to reflect any changes made in the modal
        fetchExhibitorsData();
    };

    const openUserModal = (id) => {
        setSelectedUserId(id);
        setIsUserModalOpen(true);
    };

    const closeUserModal = () => {
        setIsUserModalOpen(false);
        setSelectedUserId(null);
        // Re-fetch data to reflect any changes made in the modal
        fetchUsersData();
    };


    const MetricCard = ({ icon: Icon, title, value, color, bgColor }) => (
        <div className={`${bgColor} backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}>
            <div className="flex items-center justify-between">
                <div>
                    <p className={`text-sm font-medium ${color} opacity-80`}>{title}</p>
                    <p className={`text-3xl font-bold ${color} mt-1`}>{value}</p>
                </div>
                <div className={`p-3 rounded-full ${color} bg-white/20`}>
                    <Icon size={24} />
                </div>
            </div>
        </div>
    );

    const LoadingCard = () => (
        <div className="bg-gray-200 animate-pulse rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
                <div className="flex-1">
                    <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
                    <div className="h-8 bg-gray-300 rounded w-3/4"></div>
                </div>
                <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
            </div>
        </div>
    );

    const TabButton = ({ active, onClick, children }) => (
        <button
            onClick={onClick}
            className={`px-6 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                active
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
        >
            {children}
        </button>
    );

    const LoadingTable = () => (
        <div className="animate-pulse">
            <div className="h-12 bg-gray-200 rounded-t-lg mb-4"></div>
            {[...Array(5)].map((_, i) => (
                <div key={i} className="h-16 bg-gray-100 rounded mb-2"></div>
            ))}
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-200 p-4 font-sans">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center space-x-3 mb-4">
                        <div className="p-2 bg-indigo-600 rounded-lg">
                            <Activity className="text-white" size={24} />
                        </div>
                        <h1 className="text-4xl font-bold text-gray-800">Admin Dashboard</h1>
                    </div>
                    <p className="text-gray-700 text-lg">Comprehensive platform management and insights</p>
                </div>

                {/* Metrics Section */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">Key Metrics</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {loadingMetrics ? (
                            <>
                                <LoadingCard />
                                <LoadingCard />
                                <LoadingCard />
                                <LoadingCard />
                            </>
                        ) : (
                            <>
                                <MetricCard
                                    icon={Users}
                                    title="Total Users"
                                    value={metrics.totalUsers}
                                    color="text-blue-700"
                                    bgColor="bg-gradient-to-br from-blue-50 to-blue-100"
                                />
                                <MetricCard
                                    icon={UserCheck}
                                    title="Total Exhibitors"
                                    value={metrics.totalExhibitors}
                                    color="text-emerald-700"
                                    bgColor="bg-gradient-to-br from-emerald-50 to-emerald-100"
                                />
                                <MetricCard
                                    icon={Building}
                                    title="Total Organisations"
                                    value={metrics.totalOrganisations}
                                    color="text-green-700"
                                    bgColor="bg-gradient-to-br from-green-50 to-green-100"
                                />
                                <MetricCard
                                    icon={Package}
                                    title="Total Products"
                                    value={metrics.totalProducts}
                                    color="text-amber-700"
                                    bgColor="bg-gradient-to-br from-amber-50 to-amber-100"
                                />
                            </>
                        )}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 mb-8">
                    <Link to="/dashboard/register-organisation" className="flex items-center space-x-2">
                        <button
                            className="flex items-center space-x-2 px-6 py-3 bg-indigo-600 text-white
                            font-semibold rounded-lg shadow-lg hover:shadow-xl hover:bg-indigo-700 transition-all
                            duration-200 transform hover:-translate-y-0.5 cursor-pointer"><Plus size={20} /> <span>Create Organisation</span>
                        </button>
                    </Link>

                    <Link to="/dashboard/register-exhibitor" className="flex items-center space-x-2">
                        <button
                            className="flex items-center space-x-2 px-6 py-3 border-2 border-indigo-600 text-indigo-600 font-semibold
                            rounded-lg shadow-lg hover:shadow-xl hover:bg-indigo-50 transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer">
                            <Plus size={20} /><span>Create Exhibitor</span>
                        </button>
                    </Link>
                </div>

                {/* Main Content Card */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
                    {/* Tab Navigation */}
                    <div className="flex space-x-2 mb-8 bg-gray-100 p-2 rounded-lg">
                        <TabButton
                            active={activeTab === 'organisations'}
                            onClick={() => setActiveTab('organisations')}
                        >
                            Organisations
                        </TabButton>
                        <TabButton
                            active={activeTab === 'exhibitors'}
                            onClick={() => setActiveTab('exhibitors')}
                        >
                            Exhibitors
                        </TabButton>
                        <TabButton
                            active={activeTab === 'users'}
                            onClick={() => setActiveTab('users')}
                        >
                            Users
                        </TabButton>
                    </div>

                    {/* Tab Content */}
                    <div>
                        {activeTab === 'organisations' && (
                            <div>
                                <div className="flex items-center space-x-3 mb-6">
                                    <Building className="text-purple-600" size={24} />
                                    <h3 className="text-2xl font-bold text-gray-800">All Organisations</h3>
                                </div>
                                {loadingOrganisations ? (
                                    <LoadingTable />
                                ) : (
                                    <div className="overflow-x-auto rounded-xl border border-gray-200">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                                            <tr>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ID</th>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Organisation Name</th>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Contact Email</th>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Phone Number</th>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Website</th>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                                            </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                            {organisations.map((org, index) => (
                                                <tr key={org.organisation_id} className={`hover:bg-gray-50 transition-colors duration-150 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{org.organisation_id}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-medium">{org.organisation_name}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{org.contact_email}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{org.phone_number}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-800">{org.website}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <div className="flex items-center space-x-2">
                                                            <button
                                                                onClick={() => openOrganisationModal(org.organisation_id)}
                                                                className="p-2 rounded-full bg-indigo-50 hover:bg-indigo-100 transition-colors duration-200 text-indigo-600 hover:text-indigo-900"
                                                                title="View Organisation"
                                                            >
                                                                <Eye size={18} />
                                                            </button>
                                                            <button
                                                                onClick={() => openOrganisationModal(org.organisation_id)} // Re-use view modal, it handles editing internally
                                                                className="p-2 rounded-full bg-green-50 hover:bg-green-100 transition-colors duration-200 text-green-600 hover:text-green-900"
                                                                title="Edit Organisation"
                                                            >
                                                                <Pencil size={18} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'exhibitors' && (
                            <div>
                                <div className="flex items-center space-x-3 mb-6">
                                    <UserCheck className="text-emerald-600" size={24} />
                                    <h3 className="text-2xl font-bold text-gray-800">All Exhibitors</h3>
                                </div>
                                {loadingExhibitors ? (
                                    <LoadingTable />
                                ) : (
                                    <div className="overflow-x-auto rounded-xl border border-gray-200">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                                            <tr>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ID</th>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">First Name</th>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Last Name</th>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Organisation</th>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                                            </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                            {exhibitors.map((exhibitor, index) => (
                                                <tr key={exhibitor.exhibitor_id} className={`hover:bg-gray-50 transition-colors duration-150 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{exhibitor.exhibitor_id}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-medium">{exhibitor.first_name}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-medium">{exhibitor.last_name}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{exhibitor.email}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{exhibitor.organisation?.organisation_name}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <div className="flex items-center space-x-2">
                                                            <button
                                                                onClick={() => openExhibitorModal(exhibitor.exhibitor_id)}
                                                                className="p-2 rounded-full bg-indigo-50 hover:bg-indigo-100 transition-colors duration-200 text-indigo-600 hover:text-indigo-900"
                                                                title="View Exhibitor"
                                                            >
                                                                <Eye size={18} />
                                                            </button>
                                                            <button
                                                                onClick={() => openExhibitorModal(exhibitor.exhibitor_id)} // Re-use view modal, it handles editing internally
                                                                className="p-2 rounded-full bg-green-50 hover:bg-green-100 transition-colors duration-200 text-green-600 hover:text-green-900"
                                                                title="Edit Exhibitor"
                                                            >
                                                                <Pencil size={18} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'users' && (
                            <div>
                                <div className="flex items-center space-x-3 mb-6">
                                    <Users className="text-blue-600" size={24} />
                                    <h3 className="text-2xl font-bold text-gray-800">All Users</h3>
                                </div>
                                {loadingUsers ? (
                                    <LoadingTable />
                                ) : (
                                    <div className="overflow-x-auto rounded-xl border border-gray-200">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                                            <tr>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Fullname</th>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Company</th>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Phone Number</th>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                                            </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                            {users.map((user, index) => (
                                                <tr key={user.user_id} className={`hover:bg-gray-50 transition-colors duration-150 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.first_name} {user.last_name}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.company}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.email}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.phone_number}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <div className="flex items-center space-x-2">
                                                            <button
                                                                onClick={() => openUserModal(user.user_id)}
                                                                className="p-2 rounded-full bg-indigo-50 hover:bg-indigo-100 transition-colors duration-200 text-indigo-600 hover:text-indigo-900"
                                                                title="View User"
                                                            >
                                                                <Eye size={18} />
                                                            </button>
                                                            <button
                                                                onClick={() => openUserModal(user.user_id)} // Re-use view modal, it handles editing internally
                                                                className="p-2 rounded-full bg-green-50 hover:bg-green-100 transition-colors duration-200 text-green-600 hover:text-green-900"
                                                                title="Edit User"
                                                            >
                                                                <Pencil size={18} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Modals */}
            <OrganisationDetailsModal
                isOpen={isOrganisationModalOpen}
                onClose={closeOrganisationModal}
                organisationId={selectedOrganisationId}
            />

            <ExhibitorDetailsModal
                isOpen={isExhibitorModalOpen}
                onClose={closeExhibitorModal}
                exhibitorId={selectedExhibitorId}
            />

            <UserDetailsModal
                isOpen={isUserModalOpen}
                onClose={closeUserModal}
                userId={selectedUserId}
            />
        </div>
    );
};

export default AdminDashboard;

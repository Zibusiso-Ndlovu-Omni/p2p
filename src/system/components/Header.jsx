import { Collapse, IconButton, Navbar, Typography } from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/auth.service.js";
import Cookies from 'js-cookie';
import exhibitorService from "../../services/exhibitor.service.js";
import userService from "../../services/user.service.js";
import { jwtDecode } from "jwt-decode";

export default function Navigation() {
    const token = Cookies.get('token');
    let decoded = {};
    if (token) {
        decoded = jwtDecode(token);
    }

    const [openNav, setOpenNav] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const exhibitorId = decoded.exhibitor_id;
    const userId = decoded.user_id;

    console.log("Exhibitor ID:", exhibitorId);
    console.log("User ID:", userId);

    const handleLogout = async () => {
        try {
            await authService.logout();
            Cookies.remove('token');
            navigate('/');
            console.log("Logged out successfully!");
        } catch (error) {
            console.error("Logout failed:", error);
            setMessage('Logout failed. Please try again.');
            setMessageType('error');
            setTimeout(() => setMessage(''), 3000);
        }
    };

    const handleChangePassword = async () => {
        setMessage('');
        setMessageType('');

        if (newPassword !== confirmNewPassword) {
            setMessage('New password and confirm password do not match.');
            setMessageType('error');
            return;
        }

        if (newPassword.length < 8) {
            setMessage('New password must be at least 8 characters long.');
            setMessageType('error');
            return;
        }

        setIsLoading(true);
        try {
            let response;
            let targetId;
            let serviceToUse;
            let redirectPath;
            let modelName;

            if (exhibitorId) {
                targetId = exhibitorId;
                serviceToUse = exhibitorService;
                redirectPath = '/exhibitor-login';
                modelName = 'Exhibitor';
            } else if (userId) {
                targetId = userId;
                serviceToUse = userService;
                redirectPath = '/user-login';
                modelName = 'User';
            } else {
                setMessage('User ID or Exhibitor ID not found in token. Cannot change password.');
                setMessageType('error');
                setIsLoading(false);
                return;
            }

            response = await serviceToUse.changePassword(targetId, {
                old_password: oldPassword,
                new_password: newPassword,
                modelName: modelName
            });

            if (response.status === 200) {
                setMessage(response.data.message || 'Password changed successfully!');
                setMessageType('success');
                setOldPassword('');
                setNewPassword('');
                setConfirmNewPassword('');
                setTimeout(async () => {
                    setShowPasswordModal(false);
                    setMessage('');
                    await handleLogout();
                    navigate(redirectPath);
                }, 2000);
            } else {
                const errorMessage = response.data?.message || 'Failed to change password. Please try again.';
                setMessage(errorMessage);
                setMessageType('error');
            }
        } catch (error) {
            console.error("Change password failed:", error);
            // Check if it's an Axios error and has a response from the server
            if (error.response && error.response.data && error.response.data.message) {
                setMessage(error.response.data.message);
            } else {
                setMessage('An error occurred. Please try again later.');
            }
            setMessageType('error');
        } finally {
            setIsLoading(false);
        }
    };

    const navList = (
        <ul className="mt-2 mb-4 flex flex-col gap-3 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-8">
            {/* Change Password Button */}
            <Typography
                as="li"
                variant="small"
                className="relative p-2 font-medium text-gray-200 hover:text-amber-400 cursor-pointer transition-all duration-300
                          before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-amber-400
                          before:transition-all before:duration-300 hover:before:w-full"
            >
                <span onClick={() => setShowPasswordModal(true)} className="block">Change Password</span>
            </Typography>
            {/* Logout Button */}
            <Typography
                as="li"
                variant="small"
                className="relative p-2 font-medium text-gray-200 hover:text-amber-400 cursor-pointer transition-all duration-300
                          before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-amber-400
                          before:transition-all before:duration-300 hover:before:w-full"
            >
                <span onClick={handleLogout} className="block">Logout</span>
            </Typography>
        </ul>
    );

    return (
        <>
            <Navbar className="sticky top-0 z-100 h-max max-w-full rounded-none px-6 py-3 lg:px-10 lg:py-5 bg-gray-900/95 backdrop-blur-sm border-b border-gray-700/50 shadow-lg">
                <div className="flex items-center justify-between text-white">
                    <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2 bg-amber-400/10 px-3 py-2 rounded-lg border border-amber-400/20">
                            <Typography className="text-3xl font-black text-amber-400 tracking-tight">P2P</Typography>
                            <div className="w-px h-6 bg-amber-400/30"></div>
                            <Typography className="text-sm font-semibold text-gray-200 tracking-wide">ZIMBABWE 2025</Typography>
                        </div>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="mr-6 hidden lg:block">{navList}</div>
                        <IconButton
                            variant="text"
                            className="ml-auto h-8 w-8 text-gray-200 hover:bg-amber-400/10 hover:text-amber-400 focus:bg-amber-400/10 focus:text-amber-400 active:bg-amber-400/20 lg:hidden transition-all duration-300 rounded-lg"
                            ripple={false}
                            onClick={() => setOpenNav(!openNav)}
                        >
                            {openNav ? (
                                <XMarkIcon className="h-6 w-6" strokeWidth={2.5} />
                            ) : (
                                <Bars3Icon className="h-6 w-6" strokeWidth={2.5} />
                            )}
                        </IconButton>
                    </div>
                </div>
                <Collapse open={openNav}>
                    <div className="mt-4 pt-4 border-t border-gray-700/50">
                        {navList}
                    </div>
                </Collapse>
            </Navbar>

            {/* Change Password Modal */}
            {showPasswordModal && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black bg-opacity-70 backdrop-blur-sm">
                    <div className="relative w-full max-w-md mx-auto bg-gray-800 rounded-xl shadow-2xl p-6 border border-gray-700">
                        <h2 className="text-2xl font-bold text-white mb-6 text-center">Change Password</h2>
                        <button
                            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                            onClick={() => {
                                setShowPasswordModal(false);
                                setMessage(''); // Clear message on close
                                setOldPassword('');
                                setNewPassword('');
                                setConfirmNewPassword('');
                            }}
                        >
                            <XMarkIcon className="h-6 w-6" />
                        </button>

                        <div className="space-y-4">
                            <div>
                                <label htmlFor="old-password" className="block text-sm font-medium text-gray-300 mb-1">Old Password</label>
                                <input
                                    type="password"
                                    id="old_password"
                                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-amber-500 focus:border-amber-500"
                                    placeholder="Enter your old password"
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="new-password" className="block text-sm font-medium text-gray-300 mb-1">New Password</label>
                                <input
                                    type="password"
                                    id="new_password"
                                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-amber-500 focus:border-amber-500"
                                    placeholder="Enter your new password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="confirm-new-password" className="block text-sm font-medium text-gray-300 mb-1">Confirm New Password</label>
                                <input
                                    type="password"
                                    id="confirm-new-password"
                                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-amber-500 focus:border-amber-500"
                                    placeholder="Confirm your new password"
                                    value={confirmNewPassword}
                                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                                />
                            </div>

                            {message && (
                                <div className={`p-3 rounded-lg text-sm ${messageType === 'error' ? 'bg-red-500/20 text-red-300 border border-red-400' : 'bg-green-500/20 text-green-300 border border-green-400'}`}>
                                    {message}
                                </div>
                            )}

                            <button
                                className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                onClick={handleChangePassword}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Changing Password...' : 'Change Password'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
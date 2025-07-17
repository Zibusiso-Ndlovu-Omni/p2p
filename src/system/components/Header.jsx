import { Collapse, IconButton, Navbar, Typography } from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/auth.service.js";
import Cookies from 'js-cookie';
export default function Navigation() {
    const [openNav, setOpenNav] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await authService.logout();
            Cookies.remove('token');
            navigate('/');
            console.log("Logged out successfully!");
        } catch (error) {
            console.error("Logout failed:", error);
            alert("Logout failed. Please try again.");
        }
    };

    const navList = (
        <ul className="mt-2 mb-4 flex flex-col gap-3 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-8">
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
    );
}
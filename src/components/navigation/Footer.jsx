import { Typography } from "@material-tailwind/react"
import { MapPinIcon, CalendarDaysIcon } from "@heroicons/react/24/outline"

export default function Footer() {
    return (
            <footer className="bg-gray-900 py-12 border-t border-gray-700">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <div className="flex items-center space-x-2 mb-4">
                                <Typography className="text-2xl font-bold text-amber-400">P2P</Typography>
                                <Typography className="text-sm font-medium text-white">ZIMBABWE 2025</Typography>
                            </div>
                            <Typography className="text-gray-400 mb-4">
                                Port to Point - The Logistics, Shipping & Clearing Expo
                            </Typography>
                            <div className="text-gray-400">
                                <p className="flex items-center gap-2 mb-2">
                                    <CalendarDaysIcon className="h-4 w-4" />
                                    4 & 5 November 2025
                                </p>
                                <p className="flex items-center gap-2">
                                    <MapPinIcon className="h-4 w-4" />
                                    Hyatt Regency Harare
                                </p>
                            </div>
                        </div>

                        <div>
                            <Typography variant="h6" className="text-white mb-4">
                                Quick Links
                            </Typography>
                            <ul className="text-gray-400 space-y-2">
                                <li>
                                    <a href="#" className="hover:text-amber-400">
                                        About P2P
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-amber-400">
                                        Exhibit
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-amber-400">
                                        Sponsor
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-amber-400">
                                        Awards
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-amber-400">
                                        Program
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <Typography variant="h6" className="text-white mb-4">
                                Contact Info
                            </Typography>
                            <div className="text-gray-400 space-y-2">
                                <p>Partner Info: partner@p2pzimbabwe.com</p>
                                <p>Exhibitors: exhibit@p2pzimbabwe.com</p>
                                <p>Sponsors: sponsor@p2pzimbabwe.com</p>
                                <p>Support: support@p2pzimbabwe.com</p>
                                <p>Phone: +263 XXX XXXX</p>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-700 mt-8 pt-8 text-center">
                        <Typography className="text-gray-400">© 2025 P2P Zimbabwe. All rights reserved.</Typography>
                    </div>
                </div>
            </footer>
    )
}

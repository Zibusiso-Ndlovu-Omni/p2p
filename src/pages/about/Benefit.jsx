import { Typography } from "@material-tailwind/react"
import { 
    UserGroupIcon,
    BuildingStorefrontIcon,
    TruckIcon,
    DocumentCheckIcon,
    GlobeAltIcon,
    HandRaisedIcon,
    CogIcon,
    RocketLaunchIcon
} from "@heroicons/react/24/outline"

export default function Benefit() {
    const beneficiaries = [
        {
            icon: UserGroupIcon,
            title: "Entrepreneurs & Small Business Owners",
            description: "Scale your business with trade opportunities, networking, and access to logistics solutions tailored for growing enterprises.",
            gradient: "from-amber-400 to-amber-600",
            bgColor: "bg-amber-50",
            borderColor: "border-amber-200"
        },
        {
            icon: BuildingStorefrontIcon,
            title: "Retailers/Wholesalers",
            description: "Explore import opportunities, connect with global suppliers, and streamline your supply chain operations.",
            gradient: "from-gray-600 to-gray-800",
            bgColor: "bg-gray-50",
            borderColor: "border-gray-200"
        },
        {
            icon: TruckIcon,
            title: "Transport & Shipping Companies",
            description: "Expand your service offerings, find new clients, and stay updated on industry innovations and regulations.",
            gradient: "from-amber-500 to-amber-700",
            bgColor: "bg-amber-50",
            borderColor: "border-amber-200"
        },
        {
            icon: DocumentCheckIcon,
            title: "Clearing & Forwarding Agents",
            description: "Master new customs procedures, network with ZIMRA officials, and discover tools to enhance your services.",
            gradient: "from-gray-700 to-gray-900",
            bgColor: "bg-gray-50",
            borderColor: "border-gray-200"
        },
        {
            icon: GlobeAltIcon,
            title: "Diaspora Investors",
            description: "Navigate Zimbabwe's trade landscape, understand regulations, and identify profitable import/export opportunities.",
            gradient: "from-amber-400 to-amber-600",
            bgColor: "bg-amber-50",
            borderColor: "border-amber-200"
        },
        {
            icon: HandRaisedIcon,
            title: "Development Partners & NGOs",
            description: "Connect with policy makers, understand trade impacts on development, and explore partnership opportunities.",
            gradient: "from-gray-600 to-gray-800",
            bgColor: "bg-gray-50",
            borderColor: "border-gray-200"
        },
        {
            icon: CogIcon,
            title: "Producers & Manufacturers",
            description: "Scale regionally, find export pathways, and connect with logistics partners to expand your market reach.",
            gradient: "from-amber-500 to-amber-700",
            bgColor: "bg-amber-50",
            borderColor: "border-amber-200"
        },
        {
            icon: RocketLaunchIcon,
            title: "Logistics & Procurement Startups",
            description: "Showcase your innovations, find investors, and connect with potential clients in the trade ecosystem.",
            gradient: "from-gray-700 to-gray-900",
            bgColor: "bg-gray-50",
            borderColor: "border-gray-200"
        }
    ]

    return (
        <div className="bg-white py-16">
            <div className="container mx-auto px-4">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <Typography variant="h1" className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Who Will Benefit from Attending?
                    </Typography>
                    <Typography className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
                        P2P Zimbabwe brings together diverse professionals across the trade ecosystem. 
                        Discover how this expo can accelerate your business growth and expand your network.
                    </Typography>
                </div>

                {/* Beneficiaries Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
                    {beneficiaries.map((beneficiary, index) => (
                        <div 
                            key={index} 
                            className={`${beneficiary.bgColor} ${beneficiary.borderColor} border-2 rounded-xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group`}
                        >
                            <div className="flex flex-col items-center text-center">
                                {/* Icon with gradient background */}
                                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${beneficiary.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    <beneficiary.icon className="h-8 w-8 text-white" />
                                </div>
                                
                                {/* Title */}
                                <Typography variant="h5" className="font-bold text-gray-900 mb-4 group-hover:text-amber-600 transition-colors duration-300">
                                    {beneficiary.title}
                                </Typography>
                                
                                {/* Description */}
                                <Typography className="text-gray-600 leading-relaxed">
                                    {beneficiary.description}
                                </Typography>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Statistics Section */}
                <div className="bg-gray-900 rounded-xl p-12 mb-16">
                    <Typography variant="h3" className="text-2xl md:text-3xl font-bold text-white text-center mb-8">
                        Join a Diverse Professional Community
                    </Typography>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <Typography className="text-3xl md:text-4xl font-bold text-amber-400 mb-2">
                                200+
                            </Typography>
                            <Typography className="text-gray-300">
                                Expected Attendees
                            </Typography>
                        </div>
                        <div>
                            <Typography className="text-3xl md:text-4xl font-bold text-amber-400 mb-2">
                                20+
                            </Typography>
                            <Typography className="text-gray-300">
                                Exhibitor Booths
                            </Typography>
                        </div>
                        <div>
                            <Typography className="text-3xl md:text-4xl font-bold text-amber-400 mb-2">
                                15+
                            </Typography>
                            <Typography className="text-gray-300">
                                Countries Represented
                            </Typography>
                        </div>
                        <div>
                            <Typography className="text-3xl md:text-4xl font-bold text-amber-400 mb-2">
                                3
                            </Typography>
                            <Typography className="text-gray-300">
                                Days of Events
                            </Typography>
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="text-center bg-gradient-to-r from-amber-400 to-amber-600 rounded-xl p-12">
                    <Typography variant="h3" className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                        Ready to Connect with Your Industry Peers?
                    </Typography>
                    <Typography className="text-gray-800 mb-8 max-w-2xl mx-auto text-lg">
                        Regardless of your role in the trade ecosystem, P2P Zimbabwe offers valuable opportunities 
                        for growth, learning, and networking.
                    </Typography>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-4 px-8 rounded-lg transition-colors duration-300 shadow-lg">
                            Register Now
                        </button>
                        <button className="border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white font-bold py-4 px-8 rounded-lg transition-colors duration-300">
                            View Program
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
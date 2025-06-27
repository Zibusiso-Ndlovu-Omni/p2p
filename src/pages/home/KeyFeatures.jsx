import { GlobeAmericasIcon, HandRaisedIcon, LightBulbIcon, UsersIcon, ChartBarIcon } from "@heroicons/react/24/solid";
import keyFeatures from "../../assets/4.jpg";

export default function KeyFeatures() {
    const features = [
        {
            title: "International Conference",
            description: "Experienced industry experts will share their knowledge and experiences with attendees, discussing best practices. This type of knowledge exchange is crucial for sustainable development and the implementation of best practices.",
            icon: GlobeAmericasIcon,
        },
        {
            title: "B2B Meetings",
            description: "Participate in pre-scheduled meetings to build effective connections with potential partners and clients.",
            icon: HandRaisedIcon,
        },
        {
            title: "Innovative Companies",
            description: "Discover cutting-edge technologies, services, and products in transportation, logistics, and supply chain management.",
            icon: LightBulbIcon,
        },
        {
            title: "Networking Opportunities",
            description: "Connect with industry leaders, service providers, manufacturers, and government representatives.",
            icon: UsersIcon,
        },
        {
            title: "Global Market Insights",
            description: "Gain a deeper understanding of global logistics trends through case studies, market analyses, and expert-led discussions. Discover strategies to navigate challenges and capitalize on opportunities in international markets.",
            icon: ChartBarIcon,
        },
    ];

    return (
        <div className="min-h-screen bg-gray-200 py-16 px-4 sm:px-6 lg:px-8 flex items-center">
            <div className="container mx-auto max-w-7xl">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Key Highlights of P2P Zimbabwe 2025
                    </h1>
                    <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                        A closer look at what makes our event an unmissable opportunity.
                    </p>
                    <div className="w-24 h-1 bg-amber-500 mx-auto mt-6 rounded-full"></div>
                </div>

                <div className="flex flex-col md:flex-row gap-12 lg:gap-20 rounded-xl p-8 md:p-12 items-center">

                    {/* Left Column: Key Features List */}
                    <div className="w-full md:w-1/2 space-y-8">
                        {features.map((feature, index) => (
                            // Added bg-gray-50, p-6, rounded-lg, and shadow-md for card-like appearance
                            <div
                                key={index}
                                className="flex items-start gap-4 bg-white p-6 rounded-lg shadow-md transition-shadow duration-300 hover:shadow-xl"
                            >
                                {feature.icon && (
                                    <feature.icon className="h-8 w-8 text-amber-600 flex-shrink-0 mt-1" />
                                )}
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed text-base">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right Column: Single Full Image */}
                    <div className="w-full md:w-1/2 flex flex-col justify-center items-center space-y-6"> {/* Added flex-col and space-y for vertical stacking */}
                        <img
                            src={keyFeatures}
                            alt="Event Highlights 1"
                            className="w-full h-auto object-cover rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105"
                            // Fallback for image loading errors
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = `https://placehold.co/800x400/D1D5DB/1F2937?text=Image+1`;
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

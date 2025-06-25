import { Typography } from "@material-tailwind/react"
import { 
    FireIcon, 
    CheckCircleIcon,
    GlobeAltIcon,
    DocumentTextIcon,
    TruckIcon,
    CogIcon,
    UsersIcon,
    BuildingStorefrontIcon,
    AcademicCapIcon,
    GlobeAsiaAustraliaIcon,
    SparklesIcon,
    BookOpenIcon
} from "@heroicons/react/24/outline"

export default function WhyAttend() {
    const reasons = [
        {
            icon: GlobeAltIcon,
            title: "Learn How to Trade Across Borders",
            description: "Understand how to import/export from China, South Africa, Dubai, Turkey, and other key markets — legally, affordably, and confidently."
        },
        {
            icon: DocumentTextIcon,
            title: "Clear Customs Without the Headaches",
            description: "Engage directly with ZIMRA officials and licensed agents. Master customs documentation, clearing processes, and compliance strategies."
        },
        {
            icon: TruckIcon,
            title: "Meet Your Next Logistics Partner",
            description: "Air, sea, road, and warehousing providers ready to serve SMEs, large companies, and traders."
        },
        {
            icon: CogIcon,
            title: "Discover Trade Tech & Innovations",
            description: "Explore freight apps, ERP systems, cargo tracking tools, and bonded warehouse models changing the way Africa trades."
        },
        {
            icon: UsersIcon,
            title: "Expand Your Network",
            description: "Make high-value business connections, meet decision-makers, and engage potential clients and collaborators."
        }
    ]

    const expectations = [
        {
            icon: BuildingStorefrontIcon,
            title: "Exhibitions",
            description: "20+ booths from local and global logistics, freight, warehousing, tech, and clearing service providers"
        },
        {
            icon: AcademicCapIcon,
            title: "Workshops & Seminars",
            description: "Real insight into customs processes, regional exports, cargo tracking, and trade documentation"
        },
        {
            icon: GlobeAsiaAustraliaIcon,
            title: "Import/Export Pathways",
            description: "Learn how to source from China, Dubai, South Africa, Turkey, and beyond"
        },
        {
            icon: SparklesIcon,
            title: "Networking Events",
            description: "Cocktail evening, roundtable sessions, and gala dinner"
        },
        {
            icon: BookOpenIcon,
            title: "Magazine Launch",
            description: "A 100-page trade publication filled with exhibitor features, tools, insights, and advertisements"
        }
    ]

    return (
        <div className="bg-gray-50 py-16">
            <div className="container mx-auto px-4">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <Typography variant="h1" className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Why Attend the P2P Expo
                    </Typography>
                    <Typography className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
                        P2P is more than an exhibition — it's where Zimbabwe's trade ecosystem comes together to solve real-world challenges, create new partnerships, and unlock cross-border opportunity.
                    </Typography>
                </div>

                {/* Top Reasons Section */}
                <div className="mb-20">
                    <div className="flex items-center justify-center gap-3 mb-12">
                        <FireIcon className="h-8 w-8 text-amber-400" />
                        <Typography variant="h2" className="text-3xl md:text-4xl font-bold text-gray-900">
                            Top Reasons to Attend
                        </Typography>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {reasons.map((reason, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0">
                                        <CheckCircleIcon className="h-6 w-6 text-amber-400 mt-1" />
                                    </div>
                                    <div className="flex-grow">
                                        <div className="flex items-center gap-3 mb-4">
                                            <reason.icon className="h-6 w-6 text-gray-700" />
                                            <Typography variant="h6" className="font-bold text-gray-900">
                                                {index + 1}. {reason.title}
                                            </Typography>
                                        </div>
                                        <Typography className="text-gray-600 leading-relaxed">
                                            {reason.description}
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* What to Expect Section */}
                <div className="mb-20">
                    <div className="text-center mb-12">
                        <Typography variant="h2" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            What to Expect
                        </Typography>
                        <Typography className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Experience a comprehensive trade ecosystem designed to accelerate your business growth
                        </Typography>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {expectations.map((expectation, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 border-l-4 border-amber-400">
                                <div className="flex items-start gap-6">
                                    <div className="flex-shrink-0 bg-amber-50 p-3 rounded-lg">
                                        <expectation.icon className="h-8 w-8 text-amber-600" />
                                    </div>
                                    <div className="flex-grow">
                                        <Typography variant="h5" className="font-bold text-gray-900 mb-3">
                                            {expectation.title}
                                        </Typography>
                                        <Typography className="text-gray-600 leading-relaxed">
                                            {expectation.description}
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Call to Action */}
                <div className="text-center bg-gray-900 rounded-lg p-12">
                    <Typography variant="h3" className="text-2xl md:text-3xl font-bold text-white mb-4">
                        Ready to Transform Your Trade Business?
                    </Typography>
                    <Typography className="text-gray-300 mb-8 max-w-2xl mx-auto">
                        Join hundreds of trade professionals, logistics experts, and business leaders at P2P Zimbabwe 2025.
                    </Typography>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold py-3 px-8 rounded-lg transition-colors duration-300">
                            Register to Attend
                        </button>
                        <button className="border-2 border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-gray-900 font-bold py-3 px-8 rounded-lg transition-colors duration-300">
                            Learn More
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
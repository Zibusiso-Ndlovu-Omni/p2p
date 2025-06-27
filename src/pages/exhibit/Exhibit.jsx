import {Button, Typography, Card, CardBody} from "@material-tailwind/react";
import {CheckCircleIcon, StarIcon, TrophyIcon, AcademicCapIcon, BuildingOfficeIcon} from "@heroicons/react/24/solid";

export default function Exhibit() {
    const ticketOptions = [
        {
            name: "General Admission",
            price: "Free",
            description: "Access to exhibition floor and networking areas",
            features: [
                "Exhibition floor access",
                "Networking areas",
                "Basic event materials",
                "Welcome refreshments"
            ],
            popular: false,
            color: "bg-gray-900"
        },
        {
            name: "Cocktail Ticket",
            price: "$50",
            description: "Includes networking cocktail event",
            features: [
                "Everything in General Admission",
                "Networking cocktail access",
                "Premium event materials",
                "Cocktail reception"
            ],
            popular: false,
            color: "bg-gray-900"
        },
        {
            name: "Awards Gala Ticket",
            price: "$70",
            description: "Access to prestigious awards ceremony",
            features: [
                "Everything in General Admission",
                "Awards gala dinner",
                "Ceremony participation",
                "Networking opportunities"
            ],
            popular: false,
            color: "bg-gray-900"
        },
        {
            name: "Gold Pass",
            price: "$100",
            description: "Premium experience with VIP access",
            features: [
                "Front row access to any workshop",
                "VIP cocktail access",
                "Awards gala included",
                "Priority seating",
                "Exclusive networking"
            ],
            popular: true,
            color: "bg-gray-900"
        },
        {
            name: "Platinum Pass",
            price: "$150",
            description: "Ultimate VIP experience",
            features: [
                "All Gold Pass benefits",
                "VIP table at awards gala",
                "Premium gift package",
                "Exclusive VIP lounge access",
                "Meet & greet opportunities"
            ],
            popular: false,
            color: "bg-gray-900"
        }
    ];

    const exhibitionFeatures = [
        "3m x 3m exhibition space",
        "Shell scheme construction",
        "Trestle table and 2 chairs",
        "Lunch and teas for 2 people (2 days)",
        "1 Networking cocktail ticket",
        "Power supply included",
        "Wi-Fi access",
        "Event signage"
    ];

    return (
        <div
            className="min-h-screen py-20 relative bg-cover bg-center"
            style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")' }}
        >
            <div className="absolute inset-0 bg-black opacity-60"></div> {/* Overlay for better text readability */}
            <div className="container mx-auto px-4 relative z-10">
                {/* Header Section */}
                <div className="text-center mb-20">
                    <Typography variant="h1" className="text-4xl md:text-6xl font-bold text-white mb-6">
                        Join P2P Zimbabwe 2025
                    </Typography>
                    <Typography className="text-xl text-gray-300 max-w-4xl mx-auto mb-8">
                        Connect with hundreds of industry professionals, importers, exporters, and decision-makers.
                        Choose your perfect experience from tickets to exhibition spaces.
                    </Typography>
                    <div className="w-32 h-1 bg-amber-400 mx-auto rounded-full"></div>
                </div>

                {/* Tickets Section */}
                <div className="mb-24">
                    <div className="text-center mb-12">
                        <Typography variant="h2" className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Event Tickets & Passes
                        </Typography>
                        <Typography className="text-lg text-gray-300 max-w-2xl mx-auto">
                            Select the perfect pass for your P2P experience
                        </Typography>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        {ticketOptions.map((ticket, index) => (
                            <Card key={index} className={`${ticket.color} border ${ticket.popular ? 'border-amber-400 ring-4 ring-amber-400 ring-opacity-50' : 'border-gray-600'} relative overflow-hidden`}>
                                {ticket.popular && (
                                    <div className="absolute top-0 right-0 bg-amber-400 text-gray-900 px-4 py-1 text-sm font-bold">
                                        <StarIcon className="h-4 w-4 inline mr-1" />
                                        POPULAR
                                    </div>
                                )}
                                <CardBody className="p-8">
                                    <div className="text-center mb-6">
                                        <Typography variant="h4" className="text-white mb-2">
                                            {ticket.name}
                                        </Typography>
                                        <Typography variant="h2" className="text-amber-400 mb-4">
                                            {ticket.price}
                                        </Typography>
                                        <Typography className="text-gray-300 mb-6">
                                            {ticket.description}
                                        </Typography>
                                    </div>

                                    <div className="space-y-3 mb-8">
                                        {ticket.features.map((feature, idx) => (
                                            <div key={idx} className="flex items-center gap-3">
                                                <CheckCircleIcon className="h-5 w-5 text-amber-400 flex-shrink-0"/>
                                                <Typography className="text-gray-300 text-sm">
                                                    {feature}
                                                </Typography>
                                            </div>
                                        ))}
                                    </div>

                                    <Button
                                        size="lg"
                                        className={`w-full ${ticket.popular ? 'bg-amber-400 text-gray-900 hover:bg-amber-500' : 'bg-white text-gray-900 hover:bg-gray-100'}`}
                                    >
                                        {ticket.price === 'Free' ? 'Register Free' : 'Purchase Ticket'}
                                    </Button>
                                </CardBody>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Workshop Hosting Section */}
                <div className="mb-24">
                    <div className="text-center mb-12">
                        <Typography variant="h2" className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Host a Workshop
                        </Typography>
                        <Typography className="text-lg text-gray-300 max-w-2xl mx-auto">
                            Share your expertise with industry professionals
                        </Typography>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-500 relative overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1557804506-669a0397793d?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                alt="Workshop"
                                className="absolute inset-0 w-full h-full object-cover opacity-20"
                            />
                            <div className="relative z-10 p-10 text-center">
                                <AcademicCapIcon className="h-16 w-16 text-amber-400 mx-auto mb-6" />
                                <Typography variant="h3" className="text-white mb-4">
                                    1 Hour Workshop Slot
                                </Typography>
                                <Typography variant="h2" className="text-amber-400 mb-6">
                                    $1,000
                                </Typography>
                                <Typography className="text-blue-100 mb-8 text-lg">
                                    Perfect opportunity to showcase your expertise, build thought leadership,
                                    and connect with potential clients in an intimate workshop setting.
                                </Typography>
                                <div className="grid grid-cols-2 gap-4 mb-8">
                                    <div className="flex items-center gap-2">
                                        <CheckCircleIcon className="h-5 w-5 text-amber-400"/>
                                        <Typography className="text-blue-100 text-sm">Professional A/V setup</Typography>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircleIcon className="h-5 w-5 text-amber-400"/>
                                        <Typography className="text-blue-100 text-sm">Marketing support</Typography>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircleIcon className="h-5 w-5 text-amber-400"/>
                                        <Typography className="text-blue-100 text-sm">Dedicated workshop space</Typography>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircleIcon className="h-5 w-5 text-amber-400"/>
                                        <Typography className="text-blue-100 text-sm">Attendee registration</Typography>
                                    </div>
                                </div>
                                <Button size="lg" className="w-full bg-amber-400 text-gray-900 hover:bg-amber-500">
                                    Apply to Host Workshop
                                </Button>
                            </div>
                        </Card>
                    </div>
                </div>

                {/* Exhibition Space Section */}
                <div className="mb-20">
                    <div className="text-center mb-12">
                        <Typography variant="h2" className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Exhibition Spaces
                        </Typography>
                        <Typography className="text-lg text-gray-300 max-w-2xl mx-auto">
                            Showcase your products and services to industry professionals
                        </Typography>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border border-amber-400 relative overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1505373877845-8f2a20be62bf?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                alt="Exhibition"
                                className="absolute inset-0 w-full h-full object-cover opacity-15"
                            />
                            <CardBody className="p-10 relative z-10">
                                <div className="grid md:grid-cols-2 gap-12 items-center">
                                    <div>
                                        <div className="flex items-center gap-3 mb-6">
                                            <BuildingOfficeIcon className="h-12 w-12 text-amber-400" />
                                            <div>
                                                <Typography variant="h3" className="text-white">
                                                    Exhibition Package
                                                </Typography>
                                                <Typography className="text-gray-400">
                                                    3m x 3m Space (Expandable on request)
                                                </Typography>
                                            </div>
                                        </div>

                                        <Typography variant="h2" className="text-amber-400 mb-6">
                                            $750
                                        </Typography>

                                        <Typography className="text-gray-300 mb-8">
                                            Complete exhibition package for maximum exposure at P2P Zimbabwe.
                                            Perfect for showcasing your products and connecting with potential clients.
                                        </Typography>

                                        <Button size="lg" className="w-full bg-amber-400 text-gray-900 hover:bg-amber-500 mb-4">
                                            Book Exhibition Space
                                        </Button>

                                        <Typography className="text-sm text-gray-400 text-center">
                                            * Space expandable on request for additional fee
                                        </Typography>
                                    </div>

                                    <div>
                                        <Typography variant="h5" className="text-white mb-6">
                                            What's Included:
                                        </Typography>
                                        <div className="space-y-4">
                                            {exhibitionFeatures.map((feature, index) => (
                                                <div key={index} className="flex items-start gap-3">
                                                    <CheckCircleIcon className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5"/>
                                                    <Typography className="text-gray-300">
                                                        {feature}
                                                    </Typography>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                </div>

                {/* Call to Action Section */}
                <div className="text-center bg-gradient-to-r from-amber-400 to-amber-500 rounded-2xl p-12">
                    <TrophyIcon className="h-16 w-16 text-gray-900 mx-auto mb-6" />
                    <Typography variant="h2" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Ready to Join P2P Zimbabwe 2025?
                    </Typography>
                    <Typography className="text-xl text-gray-800 mb-8 max-w-3xl mx-auto">
                        Don't miss Zimbabwe's premier logistics, shipping, and trade event. Connect with industry leaders,
                        showcase your expertise, and grow your business network.
                    </Typography>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button size="lg" className="bg-gray-900 text-amber-400 hover:bg-gray-800">
                            Get Started Today
                        </Button>
                        <Button
                            size="lg"
                            variant="outlined"
                            className="border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-amber-400"
                        >
                            Contact Us for More Info
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
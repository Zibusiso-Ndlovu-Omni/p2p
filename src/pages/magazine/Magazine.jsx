import {Button, Typography, Card, CardBody, CardHeader, Dialog, DialogBody, DialogHeader} from "@material-tailwind/react";
import {
    NewspaperIcon,
    DocumentArrowDownIcon,
    CurrencyDollarIcon,
    PaintBrushIcon,
    EnvelopeIcon,
    StarIcon
} from "@heroicons/react/24/outline";
import {CheckCircleIcon, SparklesIcon} from "@heroicons/react/24/solid";
import {useState} from "react";

export default function Magazine() {
    const [open, setOpen] = useState(false);

    const adRates = [
        {
            name: "Quarter Page",
            price: "$200",
            description: "Perfect for small businesses",
            features: ["High-quality print", "Digital version included", "Brand visibility"],
            popular: false
        },
        {
            name: "Half Page",
            price: "$300",
            description: "Great exposure for your brand",
            features: ["High-quality print", "Digital version included", "Brand visibility", "Priority placement"],
            popular: true
        },
        {
            name: "Full Page",
            price: "$450",
            description: "Maximum impact advertising",
            features: ["High-quality print", "Digital version included", "Brand visibility", "Priority placement", "Premium positioning"],
            popular: false
        }
    ];

    const premiumCovers = [
        {
            name: "Back Cover",
            price: "$900",
        },
        {
            name: "Inside Front Cover",
            price: "$850",
        },
        {
            name: "Inside Back Cover",
            price: "$650",
        },
        {
            name: "Front Cover (Exclusive)",
            price: "$1000",
        }
    ];

    const handleOpen = () => setOpen(!open);

    return (
        <div className="min-h-screen bg-gray-100 py-20">
            <div className="container mx-auto px-4">
                {/* Header Section */}
                <div className="text-center mb-16">
                    {/* Background Image */}
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-800/80">
                        <img
                            src="https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                            alt="Magazine printing press"
                            className="w-full h-full object-cover opacity-40"
                        />
                    </div>

                    {/* background overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-black/80"></div>
                    <div className="z-50 relative">
                        <div className="flex justify-center items-center mb-6">
                            <div>
                                <Typography variant="h1" className="text-4xl md:text-6xl font-bold text-gray-200 mb-2">
                                    Advertise in the Official
                                </Typography>
                                <Typography variant="h1" className="text-4xl md:text-6xl font-bold text-amber-600">
                                    P2P Journal
                                </Typography>
                            </div>
                        </div>
                        <Typography className="text-xl text-gray-400 max-w-4xl mx-auto mb-8">
                            Reach hundreds of industry professionals, importers, exporters, and decision-makers
                            through our exclusive publication distributed at the P2P Zimbabwe 2025 event.
                        </Typography>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-8">
                            <div className="bg-gray-900/10 backdrop-blur-sm rounded-lg p-4 border border-gray-700/20">
                                <Typography variant="h3" className="text-amber-600 font-bold">500+</Typography>
                                <Typography className="text-gray-600 text-sm">Attendees</Typography>
                            </div>
                            <div className="bg-gray-900/10 backdrop-blur-sm rounded-lg p-4 border border-gray-700/20">
                                <Typography variant="h3" className="text-amber-600 font-bold">100+</Typography>
                                <Typography className="text-gray-600 text-sm">Companies</Typography>
                            </div>
                            <div className="bg-gray-900/10 backdrop-blur-sm rounded-lg p-4 border border-gray-700/20">
                                <Typography variant="h3" className="text-amber-600 font-bold">2 Days</Typography>
                                <Typography className="text-gray-600 text-sm">Exposure</Typography>
                            </div>
                            <div className="bg-gray-900/10 backdrop-blur-sm rounded-lg p-4 border border-gray-700/20">
                                <Typography variant="h3" className="text-amber-600 font-bold">Digital</Typography>
                                <Typography className="text-gray-600 text-sm">+ Print</Typography>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Standard Ad Rates */}
                <div className="mb-16 z-50 relative">
                    <div className="text-center mb-12">
                        <Typography variant="h2" className="text-3xl md:text-4xl font-bold text-gray-200 mb-4">
                            Standard Advertisement Rates
                        </Typography>
                        <Typography className="text-lg text-gray-400">
                            Choose the perfect size for your marketing needs
                        </Typography>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {adRates.map((ad, index) => (
                            <Card key={index} className={`relative ${ad.popular ? 'border-2 border-amber-400 bg-gray-900' : 'bg-gray-900 border border-gray-700'}`}>
                                {ad.popular && (
                                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                        <div className="bg-amber-400 text-gray-900 px-4 py-1 rounded-full flex items-center gap-1">
                                            <StarIcon className="h-4 w-4" />
                                            <Typography variant="small" className="font-bold">Most Popular</Typography>
                                        </div>
                                    </div>
                                )}
                                <CardBody className="p-8">
                                    <Typography variant="h4" className="text-white mb-2">
                                        {ad.name}
                                    </Typography>
                                    <Typography variant="h2" className="text-amber-400 mb-2">
                                        {ad.price}
                                    </Typography>
                                    <Typography className="text-gray-400 mb-6">
                                        {ad.description}
                                    </Typography>
                                    <div className="space-y-3 mb-8">
                                        {ad.features.map((feature, idx) => (
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
                                        className={`w-full ${ad.popular ? 'bg-amber-400 text-gray-900 hover:bg-amber-500' : 'bg-transparent border border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-gray-900'}`}
                                        onClick={handleOpen}
                                    >
                                        Book This Space
                                    </Button>
                                </CardBody>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Premium Covers */}
                <div className="mb-16">
                    <div className="text-center mb-12">
                        <div className="flex justify-center items-center mb-4">
                            <SparklesIcon className="h-8 w-8 text-amber-400 mr-2" />
                            <Typography variant="h2" className="text-3xl md:text-4xl font-bold text-gray-900">
                                Premium Cover Positions
                            </Typography>
                            <SparklesIcon className="h-8 w-8 text-amber-400 ml-2" />
                        </div>
                        <Typography className="text-lg text-gray-700">
                            Exclusive high-impact placements for maximum visibility
                        </Typography>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                        {premiumCovers.map((cover, index) => (
                            <Card key={index} className="bg-gradient-to-br from-gray-900 to-gray-800 border border-amber-400/50">
                                <CardBody className="p-6 text-center">
                                    <div className="bg-amber-400/10 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                        <CurrencyDollarIcon className="h-8 w-8 text-amber-400" />
                                    </div>
                                    <Typography variant="h5" className="text-white mb-2">
                                        {cover.name}
                                    </Typography>
                                    <Typography variant="h3" className="text-amber-400 mb-4">
                                        {cover.price}
                                    </Typography>
                                    <Button
                                        size="sm"
                                        variant="outlined"
                                        className="border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-gray-900"
                                        onClick={handleOpen}
                                    >
                                        Reserve Now
                                    </Button>
                                </CardBody>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Magazine Preview & Download */}
                {/*<div className="mb-16">*/}
                {/*    <Card className="bg-gray-900 border border-gray-700">*/}
                {/*        <CardBody className="p-8">*/}
                {/*            <div className="grid md:grid-cols-2 gap-8 items-center">*/}
                {/*                <div>*/}
                {/*                    <Typography variant="h3" className="text-white mb-4">*/}
                {/*                        View Previous Edition*/}
                {/*                    </Typography>*/}
                {/*                    <Typography className="text-gray-300 mb-6">*/}
                {/*                        Get a preview of our publication quality and see how your advertisement*/}
                {/*                        will look alongside premium content about logistics, trade, and industry insights.*/}
                {/*                    </Typography>*/}
                {/*                    <div className="flex flex-col sm:flex-row gap-4">*/}
                {/*                        <Button*/}
                {/*                            size="lg"*/}
                {/*                            className="bg-amber-400 text-gray-900 hover:bg-amber-500 flex items-center gap-2"*/}
                {/*                        >*/}
                {/*                            <DocumentArrowDownIcon className="h-5 w-5" />*/}
                {/*                            Download PDF*/}
                {/*                        </Button>*/}
                {/*                        <Button*/}
                {/*                            size="lg"*/}
                {/*                            variant="outlined"*/}
                {/*                            className="border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-gray-900 flex items-center gap-2"*/}
                {/*                        >*/}
                {/*                            <NewspaperIcon className="h-5 w-5" />*/}
                {/*                            View Online*/}
                {/*                        </Button>*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*                <div className="bg-gray-800 rounded-lg p-8 text-center border border-gray-600">*/}
                {/*                    <NewspaperIcon className="h-24 w-24 text-amber-400 mx-auto mb-4" />*/}
                {/*                    <Typography className="text-gray-300">*/}
                {/*                        P2P Journal 2024 Edition*/}
                {/*                    </Typography>*/}
                {/*                    <Typography variant="small" className="text-gray-500">*/}
                {/*                        48 pages • Full Color • Premium Print*/}
                {/*                    </Typography>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </CardBody>*/}
                {/*    </Card>*/}
                {/*</div>*/}

                {/* CTA Section */}
                <div className="text-center">
                    <Card className="bg-gradient-to-r from-amber-400 to-amber-500 border-0">
                        <CardBody className="p-12">
                            <Typography variant="h2" className="text-gray-900 mb-4 font-bold">
                                Ready to Advertise?
                            </Typography>
                            <Typography className="text-gray-800 text-lg mb-8 max-w-2xl mx-auto">
                                Join leading brands in the official P2P Zimbabwe 2025 Journal.
                                Book your space today and reach your target audience effectively.
                            </Typography>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button
                                    size="lg"
                                    className="bg-gray-900 text-white hover:bg-gray-800 flex items-center gap-2"
                                    onClick={handleOpen}
                                >
                                    <PaintBrushIcon className="h-5 w-5" />
                                    Book Ad Space
                                </Button>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>

            {/* Booking Dialog */}
            <Dialog open={open} handler={handleOpen} size="md">
                <DialogHeader className="bg-gray-900 text-white">
                    <Typography variant="h4">Book Your Advertisement Space</Typography>
                </DialogHeader>
                <DialogBody className="bg-gray-900 text-white">
                    <div className="space-y-6">
                        <Typography className="text-gray-300">
                            Ready to advertise in the official P2P Journal? We'll help you create an impactful 
                            advertisement that reaches your target audience.
                        </Typography>
                        
                        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                            <Typography variant="h6" className="text-amber-400 mb-4">Next Steps:</Typography>
                            <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <div className="bg-amber-400 text-gray-900 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-0.5">1</div>
                                    <Typography className="text-gray-300 text-sm">Contact our team to discuss your requirements</Typography>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="bg-amber-400 text-gray-900 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-0.5">2</div>
                                    <Typography className="text-gray-300 text-sm">Submit your artwork or let us design it for you</Typography>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="bg-amber-400 text-gray-900 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-0.5">3</div>
                                    <Typography className="text-gray-300 text-sm">Secure your space with payment confirmation</Typography>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button 
                                size="lg"
                                className="bg-amber-400 text-gray-900 hover:bg-amber-500 flex-1"
                                onClick={handleOpen}
                            >
                                Contact Sales Team
                            </Button>
                        </div>
                    </div>
                </DialogBody>
            </Dialog>
        </div>
    );
}
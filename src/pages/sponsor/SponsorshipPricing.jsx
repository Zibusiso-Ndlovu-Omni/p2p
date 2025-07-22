import {Button, Card, CardBody, CardHeader, Chip, Typography} from "@material-tailwind/react";

function SponsorshipPricing() {

    return (
        <>
            <div id="sponsorship-pricing">
                <section className="py-16 bg-gray-900">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <Typography variant="h2" className="text-3xl md:text-4xl font-bold text-white mb-4">
                                Partner With Us
                            </Typography>
                            <Typography className="text-xl text-gray-300 max-w-3xl mx-auto">
                                Sponsorship gives your brand unrivaled visibility in Zimbabwe's logistics and trade sectors.
                            </Typography>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                            {/* Headline Sponsor */}
                            <Card className="bg-gray-800 border-gray-700 transform hover:scale-105 transition-transform duration-300">
                                <CardHeader className="text-center pb-4 bg-amber-400">
                                    <Typography variant="h6" className="text-gray-900 mb-2 mt-4">
                                        Headline Sponsor
                                    </Typography>
                                    <Typography variant="h3" className="text-gray-800 font-bold">
                                        $10,000
                                    </Typography>
                                </CardHeader>
                                <CardBody className="pt-0 my-4">
                                    <ul className="text-gray-300 space-y-2 mb-6">
                                        <li>• Premium branding</li>
                                        <li>• Speaking opportunities</li>
                                        <li>• Exclusive booth space</li>
                                        <li>• VIP gala tickets</li>
                                        <li>• Maximum visibility</li>
                                    </ul>
                                    <Button fullWidth className="bg-amber-400 text-gray-900 hover:bg-amber-500">
                                        Request Sponsor Pack
                                    </Button>
                                </CardBody>
                            </Card>

                            {/* Gala Sponsor */}
                            <Card className="bg-gray-800 border-gray-700 transform hover:scale-105 transition-transform duration-300">
                                <CardHeader className="text-center pb-4 bg-amber-400">
                                    <Typography variant="h6" className="text-gray-900 mb-2 mt-4">
                                        Awards Gala Sponsor
                                    </Typography>
                                    <Typography variant="h3" className="text-gray-800 font-bold">
                                        $8,000
                                    </Typography>
                                </CardHeader>
                                <CardBody className="pt-0 my-4">
                                    <ul className="text-gray-300 space-y-2 mb-6">
                                        <li>• Event branding visibility</li>
                                        <li>• Premium booth location</li>
                                        <li>• Gala dinner tickets</li>
                                        <li>• Speaking opportunities</li>
                                        <li>• Networking access</li>
                                    </ul>
                                    <Button
                                        fullWidth
                                        variant="outlined"
                                        className="border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-gray-900"
                                    >
                                        Request Sponsor Pack
                                    </Button>
                                </CardBody>
                            </Card>

                            {/* Awards Night Sponsor */}
                            <Card className="bg-gray-800 border-gray-700 transform hover:scale-105 transition-transform duration-300">
                                <CardHeader className="text-center pb-4 bg-amber-400">
                                    <Typography variant="h6" className="text-gray-900 mb-2 mt-4">
                                        Cocktail Sponsor
                                    </Typography>
                                    <Typography variant="h3" className="text-gray-800 font-bold">
                                        $5,000
                                    </Typography>
                                </CardHeader>
                                <CardBody className="pt-0 my-4">
                                    <ul className="text-gray-300 space-y-2 mb-6">
                                        <li>• Awards ceremony branding</li>
                                        <li>• Booth space included</li>
                                        <li>• Awards night tickets</li>
                                        <li>• Speaking opportunities</li>
                                        <li>• Industry recognition</li>
                                    </ul>
                                    <Button
                                        fullWidth
                                        variant="outlined"
                                        className="border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-gray-900"
                                    >
                                        Request Sponsor Pack
                                    </Button>
                                </CardBody>
                            </Card>

                            {/* General Sponsor */}
                            <Card className="bg-gray-800 border-gray-700 transform hover:scale-105 transition-transform duration-300">
                                <CardHeader className="text-center pb-4 bg-amber-400">
                                    <Typography variant="h6" className="text-gray-900 mb-2 mt-4">
                                        Host a Work Shop
                                    </Typography>
                                    <Typography variant="h3" className="text-gray-800 font-bold">
                                        $1,000/hr
                                    </Typography>
                                </CardHeader>
                                <CardBody className="pt-0 my-4">
                                    <ul className="text-gray-300 space-y-2 mb-6">
                                        <li>• Brand visibility</li>
                                        <li>• Standard booth space</li>
                                        <li>• Event tickets included</li>
                                        <li>• Speaking opportunities</li>
                                        <li>• Networking benefits</li>
                                    </ul>
                                    <Button
                                        fullWidth
                                        variant="outlined"
                                        className="border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-gray-900"
                                    >
                                        Request Here
                                    </Button>
                                </CardBody>
                            </Card>
                        </div>

                        {/* Benefits Summary */}
                        <div className="mt-12 text-center">
                            <Typography variant="h4" className="text-white mb-4">
                                All Packages Include
                            </Typography>
                            <div className="flex flex-wrap justify-center gap-4 text-gray-300">
                                <span className="bg-gray-800 px-4 py-2 rounded-full">• Branding Opportunities</span>
                                <span className="bg-gray-800 px-4 py-2 rounded-full">• Booth Space</span>
                                <span className="bg-gray-800 px-4 py-2 rounded-full">• Event Tickets</span>
                                <span className="bg-gray-800 px-4 py-2 rounded-full">• Speaking Opportunities</span>
                            </div>
                        </div>

                        {/* CTA Section */}
                        <div className="mt-12 text-center">
                            <Typography className="text-xl text-gray-300 mb-6">
                                Ready to maximize your brand visibility?
                            </Typography>
                            <div className="flex flex-wrap justify-center gap-4">
                                <Button
                                    size="lg"
                                    variant="outlined"
                                    className="border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-gray-900"
                                >
                                    Contact Us
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default SponsorshipPricing
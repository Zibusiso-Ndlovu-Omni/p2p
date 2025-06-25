import {Typography} from "@material-tailwind/react";

function About() {

    return (
        <>
            <section className="py-16 bg-gray-800">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <Typography variant="h2" className="text-3xl md:text-4xl font-bold text-white mb-6">
                            What is P2P?
                        </Typography>
                        <Typography className="text-xl text-gray-300 mb-8 leading-relaxed">
                            Port to Point (P2P) is Zimbabwe’s leading logistics, shipping, and trade expo — a two-day exhibition and
                            conference designed to connect the entire supply chain ecosystem from clearing agents and freight
                            operators to importers, exporters, entrepreneurs, and policy makers.
                        </Typography>
                        <Typography className="text-sm text-amber-400 mb-8 leading-relaxed italic">
                            Taking place at the luxurious Hyatt Regency Harare, P2P is your gateway to discovering how
                            goods move across borders and how your business can plug into global and regional trade.
                        </Typography>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                            <div className="text-center">
                                <div className="bg-amber-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Typography variant="h4" className="text-gray-900 font-bold">
                                        2
                                    </Typography>
                                </div>
                                <Typography variant="h6" className="text-white mb-2">
                                    Days of Expo
                                </Typography>
                                <Typography className="text-gray-400">Comprehensive exhibition and networking</Typography>
                            </div>
                            <div className="text-center">
                                <div className="bg-amber-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Typography variant="h4" className="text-gray-900 font-bold">
                                        500+
                                    </Typography>
                                </div>
                                <Typography variant="h6" className="text-white mb-2">
                                    Professionals
                                </Typography>
                                <Typography className="text-gray-400">Industry decision-makers and experts</Typography>
                            </div>
                            <div className="text-center">
                                <div className="bg-amber-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Typography variant="h4" className="text-gray-900 font-bold">
                                        50+
                                    </Typography>
                                </div>
                                <Typography variant="h6" className="text-white mb-2">
                                    Exhibitors
                                </Typography>
                                <Typography className="text-gray-400">Leading logistics and trade companies</Typography>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default About

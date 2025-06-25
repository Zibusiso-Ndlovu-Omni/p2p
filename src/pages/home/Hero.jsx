import {Button, Typography} from "@material-tailwind/react";
import {CalendarDaysIcon, EnvelopeIcon, MapPinIcon, PhoneIcon} from "@heroicons/react/24/outline/index.js";
import docking from "../../assets/docking.jpg"

export default function Hero() {
    return (
        <section className="relative py-20">
            {/* background image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80 z-0"
                style={{
                    backgroundImage: `url(${docking})`,
                }}
            ></div>
            {/* background overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-black/80"></div>
            <div className="container mx-auto px-4 z-50 relative">
                <div className="text-center py-16">

                    <Typography variant="h1" className="text-4xl md:text-6xl font-bold text-white mb-4">
                        Join Zimbabwe's Premier
                    </Typography>
                    <Typography variant="h2" className="text-3xl md:text-5xl font-bold text-amber-400 mb-6">
                        Logistics, Shipping & Trade Event
                    </Typography>

                    <div className="flex flex-wrap justify-center items-center gap-4 mb-8 text-white">
                        <div className="flex items-center gap-2">
                            <CalendarDaysIcon className="h-5 w-5 text-amber-400" />
                            <Typography className="text-lg">4 & 5 November 2025</Typography>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPinIcon className="h-5 w-5 text-amber-400" />
                            <Typography className="text-lg">Hyatt Regency Harare</Typography>
                        </div>
                        <div className="flex items-center gap-2">
                            <EnvelopeIcon className="h-5 w-5 text-amber-400" />
                            <Typography className="text-lg">example@gmail.com</Typography>
                        </div>
                        <div className="flex items-center gap-2">
                            <PhoneIcon className="h-5 w-5 text-amber-400" />
                            <Typography className="text-lg">0123456789</Typography>
                        </div>
                    </div>

                    <Typography className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                        P2P is a 2-day expo connecting logistics, freight, clearing, import/export and transport professionals in
                        Zimbabwe.
                    </Typography>

                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        <Button size="lg" className="bg-amber-400 text-gray-900 hover:bg-amber-500">
                            Book a Booth
                        </Button>
                        <Button
                            size="lg"
                            variant="outlined"
                            className="border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-gray-900"
                        >
                            Buy Tickets
                        </Button>
                        <Button
                            size="lg"
                            variant="outlined"
                            className="border-white text-white hover:bg-white hover:text-gray-900"
                        >
                            Sponsor Us
                        </Button>
                        <Button size="lg" className="bg-gray-700 text-white hover:bg-gray-600">
                            Register to Attend
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}

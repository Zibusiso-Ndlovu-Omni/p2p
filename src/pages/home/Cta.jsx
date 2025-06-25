import {Button, Typography} from "@material-tailwind/react";

function Cta() {
    return (
        <>
            <section className="py-16 bg-amber-400">
                <div className="container mx-auto px-4 text-center">
                    <Typography variant="h2" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Ready to Join P2P Zimbabwe 2025?
                    </Typography>
                    <Typography className="text-xl text-gray-800 mb-8 max-w-2xl mx-auto">
                        Don't miss Zimbabwe's premier logistics, shipping, and trade event. Connect with industry leaders and grow
                        your business.
                    </Typography>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button size="lg" className="bg-gray-900 text-amber-400 hover:bg-gray-800">
                            Register Now - Free
                        </Button>
                        <Button
                            size="lg"
                            variant="outlined"
                            className="border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-amber-400"
                        >
                            Contact Us
                        </Button>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Cta

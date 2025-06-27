import {Button, Card, CardBody, CardHeader, Typography} from "@material-tailwind/react";
import {NewspaperIcon, TrophyIcon, UserGroupIcon} from "@heroicons/react/24/outline";
import quickActionBg from "../../assets/11.jpg";

function QuickActions() {
    return (
        <>
            <section
                className="py-16 bg-cover bg-center relative"
                style={{ backgroundImage: `url(${quickActionBg})` }}
            >
                <div className="absolute inset-0 bg-black opacity-70"></div>
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-12 lg:grid-cols-4 lg:gap-6">
                        <Card className="bg-transparent shadow-xl hover:shadow-2xl transition-all duration-300 border-1 border-amber-500">
                            <CardHeader className="text-center pb-4">
                                <NewspaperIcon className="h-12 w-12 text-amber-600 mx-auto mb-2 my-4" />
                                <Typography variant="h6" className="text-gray-700">
                                    View Program
                                </Typography>
                            </CardHeader>
                            <CardBody className="pt-0 my-4">
                                <Typography className="text-white text-center mb-4">
                                    Explore our comprehensive 2-day program
                                </Typography>
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    className="border-amber-400 text-amber-400 hover:bg-amber-500 hover:text-gray-900 shadow-md cursor-pointer"
                                >
                                    View Program
                                </Button>
                            </CardBody>
                        </Card>

                        <Card className="bg-transparent shadow-xl hover:shadow-2xl transition-all duration-300 border-1 border-amber-500">
                            <CardHeader className="text-center pb-4">
                                <TrophyIcon className="h-12 w-12 text-amber-300 mx-auto mb-2 my-4" />
                                <Typography variant="h6" className="text-gray-700">
                                    Nominate for Awards
                                </Typography>
                            </CardHeader>
                            <CardBody className="pt-0 my-4">
                                <Typography className="text-gray-300 text-center mb-4">Recognize excellence in logistics</Typography>
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    className="border-amber-300 text-amber-300 hover:bg-amber-500 hover:text-gray-900 shadow-md cursor-pointer"
                                >
                                    Nominate Now
                                </Button>
                            </CardBody>
                        </Card>

                        <Card className="bg-transparent shadow-xl hover:shadow-2xl transition-all duration-300 border-1 border-amber-500">
                            <CardHeader className="text-center pb-4">
                                <NewspaperIcon className="h-12 w-12 text-amber-400 mx-auto mb-2 my-4" />
                                <Typography variant="h6" className="text-gray-700">
                                    Download Magazine
                                </Typography>
                            </CardHeader>
                            <CardBody className="pt-0 my-4">
                                <Typography className="text-gray-300 text-center mb-4">Get the official P2P Journal</Typography>
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    className="border-amber-400 text-amber-400 hover:bg-amber-500 hover:text-gray-900 shadow-md cursor-pointer"
                                >
                                    Download PDF
                                </Button>
                            </CardBody>
                        </Card>

                        <Card className="bg-transparent shadow-xl hover:shadow-2xl transition-all duration-300 border-1 border-amber-500">
                            <CardHeader className="text-center pb-4">
                                <UserGroupIcon className="h-12 w-12 text-amber-400 mx-auto mb-2 my-4" />
                                <Typography variant="h6" className="text-gray-700">
                                    Register Free
                                </Typography>
                            </CardHeader>
                            <CardBody className="pt-0 my-4">
                                <Typography className="text-gray-300 text-center mb-4">Free expo access for trade visitors</Typography>
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    className="border-amber-400 text-amber-400 hover:bg-amber-500 hover:text-gray-900 shadow-md cursor-pointer"
                                >
                                    Register Now
                                </Button>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </section>
        </>
    )
}

export default QuickActions;
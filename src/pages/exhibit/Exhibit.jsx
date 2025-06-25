import {Button, Typography, Card, CardBody} from "@material-tailwind/react";
import {CheckCircleIcon} from "@heroicons/react/24/solid";

export default function Exhibit() {
    const boothFeatures = [
        "Table and chairs included",
        "Power supply",
        "Gala ticket",
        "Wi-Fi access"
    ];

    return (
        <div className="min-h-screen bg-gray-300 py-20">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <Typography variant="h1" className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                        Exhibit at P2P
                    </Typography>
                    <Typography className="text-xl text-gray-800 max-w-3xl mx-auto">
                        Expose your brand to hundreds of industry professionals, importers, exporters and
                        decision-makers.
                    </Typography>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    <Card className="bg-gray-900 border border-gray-700">
                        <CardBody className="p-8">
                            <Typography variant="h4" className="text-white mb-4">
                                Standard Booth
                            </Typography>
                            <Typography variant="h2" className="text-amber-400 mb-6">
                                $300
                            </Typography>
                            <Typography variant="small" className="text-gray-400 mb-6">
                                3m x 3m Space
                            </Typography>
                            <div className="space-y-4 mb-8">
                                {boothFeatures.map((feature, index) => (
                                    <div key={index} className="flex items-center gap-4">
                                        <CheckCircleIcon className="h-5 w-5 text-amber-400"/>
                                        <Typography className="text-gray-300">
                                            {feature}
                                        </Typography>
                                    </div>
                                ))}
                            </div>
                            <Button size="lg" className="w-full bg-amber-400 text-gray-900 hover:bg-amber-500">
                                Apply to Exhibit
                            </Button>
                        </CardBody>
                    </Card>

                    <Card className="bg-gray-900 border border-gray-700">
                        <CardBody className="p-8">
                            <Typography variant="h4" className="text-white mb-4">
                                Premium Location
                            </Typography>
                            <Typography variant="h2" className="text-amber-400 mb-6">
                                $450
                            </Typography>
                            <Typography variant="small" className="text-gray-400 mb-6">
                                3m x 3m Space
                            </Typography>
                            <div className="space-y-4 mb-8">
                                {boothFeatures.map((feature, index) => (
                                    <div key={index} className="flex items-center gap-4">
                                        <CheckCircleIcon className="h-5 w-5 text-amber-400"/>
                                        <Typography className="text-gray-300">
                                            {feature}
                                        </Typography>
                                    </div>
                                ))}
                            </div>
                            <Button size="lg" className="w-full bg-amber-400 text-gray-900 hover:bg-amber-500">
                                Apply to Exhibit
                            </Button>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    );
}
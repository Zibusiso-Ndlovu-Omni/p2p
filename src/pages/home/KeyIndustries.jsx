import React from 'react';
import logistics from "../../assets/6.jpg";
import freight from "../../assets/7.jpg";
import transport from "../../assets/8.jpg";
import importExport from "../../assets/9.jpg";
import clearing from "../../assets/10.webp";

export default function KeyIndustries() {
    const industries = [
        {
            title: "Logistics",
            description: "Connecting the dots: Discover advanced solutions for supply chain management, warehousing, and distribution.",
            imageUrl: `${logistics}`
        },
        {
            title: "Freight",
            description: "Optimize your cargo movement: Explore solutions for air, sea, and road freight, ensuring timely and secure deliveries.",
            imageUrl: `${freight}`,
        },
        {
            title: "Clearing",
            description: "Navigate customs effortlessly: Connect with experts in customs brokerage and trade compliance for smooth operations.",
            imageUrl: `${clearing}`,
        },
        {
            title: "Import/Export",
            description: "Expand your global reach: Find resources and partners to streamline your international trade activities.",
            imageUrl: `${importExport}`,
        },
        {
            title: "Transport",
            description: "Efficiently move your goods: Discover innovative solutions for road, rail, and specialized transportation services.",
            imageUrl: `${transport}`,
        },
    ];

    return (
        <div className="min-h-screen bg-gray-100 py-16 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto max-w-7xl">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Key Industries Represented
                    </h1>
                    <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                        P2P Zimbabwe connects professionals across critical sectors of the supply chain.
                    </p>
                    <div className="w-24 h-1 bg-amber-500 mx-auto mt-6 rounded-full"></div>
                </div>

                {/* Industries Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {industries.map((industry, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg shadow-lg overflow-hidden
                                transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
                        >
                            <img
                                src={industry.imageUrl}
                                alt={industry.title}
                                className="w-full h-48 object-cover object-center rounded-t-lg"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = `https://placehold.co/600x300/D1D5DB/1F2937?text=${industry.title.replace(/\s/g, '+')}`;
                                }}
                            />
                            <div className="p-6 text-center">
                                <h3 className="text-xl font-bold text-gray-800 mb-2">
                                    {industry.title}
                                </h3>
                                <p className="text-gray-600 text-sm">
                                    {industry.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

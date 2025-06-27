import React from 'react';
import aboutEvent from "../../assets/5.jpg";


export default function AboutEvent() {
    const aboutContent = `Port to Point (P2P) is Zimbabwe’s leading logistics, shipping, and trade expo — a two-day 
    exhibition and conference designed to connect the entire supply chain ecosystem from clearing agents and freight 
    operators to importers, exporters, entrepreneurs, and policy makers.`;

    const objectiveContent = `P2P is more than an exhibition — it's where Zimbabwe's trade ecosystem 
    comes together to solve real-world challenges, create new partnerships, and unlock cross-border opportunity.`;

    return (
        <div className="min-h-screen bg-gray-100 py-16 px-4 sm:px-6 lg:px-8 flex items-center">
            <div className="container mx-auto max-w-7xl">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Port to Point (P2P) - Zimbabwe
                    </h1>
                    <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                        Your gateway to Zimbabwe's logistics and trade industry.
                    </p>
                    <div className="w-24 h-1 bg-amber-500 mx-auto mt-6 rounded-full"></div>
                </div>

                {/* Main Content: About/Objective on Left, Image on Right */}
                <div className="flex flex-col md:flex-row gap-12 lg:gap-20 p-8 md:p-12 items-center">
                    {/* Left Column: About and Objective */}
                    <div className="w-full md:w-1/2 space-y-8">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-800 mb-4">
                                About Us
                            </h2>
                            <p className="text-gray-600 leading-relaxed text-base">
                                {aboutContent}
                            </p>
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-gray-800 mb-4">
                                Our Objective
                            </h2>
                            <p className="text-gray-600 leading-relaxed text-base">
                                {objectiveContent}
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Single Image */}
                    <div className="w-full md:w-1/2 flex justify-center items-center">
                        <img
                            src={aboutEvent}
                            alt="P2P Zimbabwe"
                            className="w-full h-auto max-h-[500px] object-cover rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105"
                            // Fallback for image loading errors
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = `https://placehold.co/800x600/D1D5DB/1F2937?text=P2P+Zimbabwe`;
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

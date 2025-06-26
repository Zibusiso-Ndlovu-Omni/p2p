import { useState } from 'react';

const Sponsors = () => {
    const sponsors = [
        { id: '1', name: 'Sponsor A', imageUrl: 'https://placehold.co/150x150/CCE0E6/000000?text=Sponsor+A' },
        { id: '2', name: 'Sponsor B', imageUrl: 'https://placehold.co/150x150/B3D2E6/000000?text=Sponsor+B' },
        { id: '3', name: 'Sponsor C', imageUrl: 'https://placehold.co/150x150/99C4E6/000000?text=Sponsor+C' },
        { id: '4', name: 'Sponsor D', imageUrl: 'https://placehold.co/150x150/80B6E6/000000?text=Sponsor+D' },
        { id: '5', name: 'Sponsor E', imageUrl: 'https://placehold.co/150x150/66A8E6/000000?text=Sponsor+E' },
        { id: '6', name: 'Sponsor F', imageUrl: 'https://placehold.co/150x150/4D9BE6/000000?text=Sponsor+F' },
    ];

    const [hoveredLogo, setHoveredLogo] = useState(null);

    return (
        <div className="bg-white flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
            <div className="w-full bg-white rounded-xl p-6 sm:p-8 lg:p-10">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center text-gray-800 mb-8 sm:mb-10 lg:mb-12 leading-tight">
                    Our Valued Sponsors
                </h1>

                <p className="text-center text-gray-600 text-lg mb-8">
                    We extend our heartfelt gratitude to the incredible organizations and companies that support us. Their contributions are invaluable to our mission.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 justify-items-center">
                    {sponsors.map((sponsor) => (
                        <div
                            key={sponsor.id}
                            className={`
                relative flex flex-col items-center justify-center p-4 rounded-xl 
                transition-all duration-300 ease-in-out transform
                ${
                                hoveredLogo === sponsor.id
                                    ? 'scale-110 z-10 bg-white'
                                    : hoveredLogo !== null
                                        ? 'opacity-30 blur-sm scale-95' 
                                        : 'opacity-100 scale-100' 
                            }
              `}
                            onMouseEnter={() => setHoveredLogo(sponsor.id)}
                            onMouseLeave={() => setHoveredLogo(null)}
                        >
                            <img
                                src={sponsor.imageUrl}
                                alt={`${sponsor.name} Logo`}
                                className="w-28 h-28 sm:w-36 sm:h-36 lg:w-36 lg:h-36 xl:w-48 xl:h-48 object-cover rounded-md shadow-md mb-3"
                                // Fallback for image loading errors
                                onError={(e) => {
                                    e.target.onerror = null; // Prevent infinite loop if fallback also fails
                                    e.target.src = `https://placehold.co/150x150/EEEEEE/000000?text=No+Logo`;
                                }}
                            />
                            <span className="text-sm sm:text-base font-semibold text-gray-700 text-center">
                {sponsor.name}
              </span>
                        </div>
                    ))}
                </div>

                <p className="text-center text-gray-500 text-sm mt-8 sm:mt-10 lg:mt-12">
                    Interested in becoming a sponsor? Contact us to learn more!
                </p>
            </div>
        </div>
    );
};

export default Sponsors;
import React from 'react';
import sponsorBannerImage from "../../assets/3.jpg"
import {Link} from "react-router-dom";

const SponsorBanner = () => {

  const handleViewPackages = () => {
    const pricingSection = document.getElementById('sponsorship-pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div className="relative w-full h-96 md:h-[500px] lg:h-[600px] overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
            backgroundImage: `url(${sponsorBannerImage})`
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/70 "></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">
          Become a Sponsor
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl text-gray-400 mb-8 max-w-3xl leading-relaxed">
          Partner with us to drive innovation and make a lasting impact. 
          Join our community of forward-thinking organizations.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={handleViewPackages}
            className="bg-amber-400 hover:bg-amber-600 cursor-pointer text-black font-semibold py-3 px-8 rounded-lg transition-colors duration-300 shadow-lg"
          >
            View Sponsorship Packages
          </button>
          <button className="bg-transparent border-2 border-white cursor-pointer text-white hover:bg-white hover:text-gray-900 font-semibold py-3 px-8 rounded-lg transition-all duration-300">
              <Link to="/contact">Contact Us</Link>

          </button>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black to-transparent opacity-30"></div>
    </div>
  );
};

export default SponsorBanner;
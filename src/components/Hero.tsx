
import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';

const Hero: React.FC = () => {
  const images = [
    "https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1639518904146-30bca2ff2591?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="py-16 md:py-28 px-4 relative">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img 
          src={images[currentImageIndex]} 
          alt="Family home" 
          className="w-full h-full object-cover transition-opacity duration-1000"
          key={currentImageIndex}
        />
      </div>
      
      <div className="container mx-auto max-w-4xl text-center relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
          Your Family's Home Service Solution
        </h1>
        <p className="text-lg md:text-xl text-white mb-8 max-w-2xl mx-auto">
          Connect with trusted local experts for all your home needs. From plumbing to landscaping, find family-friendly professionals near you.
        </p>
        <SearchBar className="max-w-3xl mx-auto shadow-lg rounded-lg overflow-hidden" />
        <div className="mt-6 text-sm text-white">
          Popular: Plumbing, Electrical, HVAC, House Cleaning, Lawn Care
        </div>

        <div className="flex justify-center mt-6 space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${index === currentImageIndex ? 'bg-white' : 'bg-gray-400'}`}
              onClick={() => setCurrentImageIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;

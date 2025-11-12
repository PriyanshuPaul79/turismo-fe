import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const HeroSection = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/explore?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/explore');
    }
  };

  const heroImages = [
    {
      url: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800",
      alt: "Beautiful mountain landscape with lake reflection"
    },
    {
      url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
      alt: "Tropical beach with palm trees and turquoise water"
    },
    {
      url: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e",
      alt: "Historic European city with cobblestone streets"
    }
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[600px] lg:h-[700px] overflow-hidden">
      {/* Background Image Carousel */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={image.url}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 mb-6 border border-white/20">
              <Icon name="Sparkles" size={16} color="white" />
              <span className="text-white text-sm font-medium">AI-Powered Travel Planning</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-headline font-bold text-white mb-6 leading-tight">
              Discover Your Next
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-300">
                Adventure
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl leading-relaxed">
              Plan perfect trips with AI-powered recommendations, personalized itineraries, 
              and discover hidden gems around the world.
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="mb-8">
              <div className="flex flex-col sm:flex-row gap-3 max-w-2xl">
                <div className="flex-1 relative">
                  <Icon 
                    name="Search" 
                    size={20} 
                    color="currentColor" 
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Where do you want to go?"
                    className="w-full pl-12 pr-4 py-4 rounded-lg bg-white/95 backdrop-blur-sm border border-white/20 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <Button
                  type="submit"
                  variant="default"
                  size="lg"
                  className="bg-conversion hover:bg-conversion/90 text-conversion-foreground whitespace-nowrap"
                >
                  <Icon name="Search" size={20} className="mr-2" />
                  Explore
                </Button>
              </div>
            </form>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-4">
              <Button
                variant="outline"
                onClick={() => navigate('/itinerary-builder')}
                className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20"
              >
                <Icon name="MapPin" size={18} className="mr-2" />
                Plan Your Trip
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/events')}
                className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20"
              >
                <Icon name="Calendar" size={18} className="mr-2" />
                Find Events
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/explore')}
                className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20"
              >
                <Icon name="Compass" size={18} className="mr-2" />
                Explore Destinations
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Image Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex space-x-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentImageIndex
                ? 'w-8 bg-white'
                : 'w-2 bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;


import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HeroGallery = ({ destination }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === destination?.gallery?.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? destination?.gallery?.length - 1 : prev - 1
    );
  };

  return (
    <div className="relative h-96 lg:h-[500px] overflow-hidden rounded-lg shadow-floating">
      {/* Main Image */}
      <div className="relative w-full h-full">
        <Image
          src={destination?.gallery?.[currentImageIndex]?.url}
          alt={destination?.gallery?.[currentImageIndex]?.alt}
          className="w-full h-full object-cover"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        
        {/* Navigation Arrows */}
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-200"
        >
          <Icon name="ChevronLeft" size={20} color="white" />
        </button>
        
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-200"
        >
          <Icon name="ChevronRight" size={20} color="white" />
        </button>
        
        {/* Fullscreen Button */}
        <button
          onClick={() => setIsFullscreen(true)}
          className="absolute top-4 right-4 w-10 h-10 bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-200"
        >
          <Icon name="Maximize" size={20} color="white" />
        </button>
        
        {/* Image Counter */}
        <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm">
          {currentImageIndex + 1} / {destination?.gallery?.length}
        </div>
        
        {/* Destination Title Overlay */}
        <div className="absolute bottom-6 left-6 right-6">
          <h1 className="text-3xl lg:text-4xl font-headline font-bold text-white mb-2">
            {destination?.name}
          </h1>
          <div className="flex items-center space-x-4 text-white/90">
            <div className="flex items-center space-x-1">
              <Icon name="MapPin" size={16} />
              <span className="text-sm">{destination?.location}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Star" size={16} className="fill-yellow-400 text-yellow-400" />
              <span className="text-sm">{destination?.rating} ({destination?.reviewCount} reviews)</span>
            </div>
          </div>
        </div>
      </div>
      {/* Thumbnail Strip */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/30 backdrop-blur-sm p-4">
        <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
          {destination?.gallery?.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`flex-shrink-0 w-16 h-12 rounded overflow-hidden border-2 transition-all duration-200 ${
                index === currentImageIndex 
                  ? 'border-white' :'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              <Image
                src={image?.url}
                alt={image?.alt}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-4 right-4 w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-all duration-200 z-10"
          >
            <Icon name="X" size={24} color="white" />
          </button>
          
          <Image
            src={destination?.gallery?.[currentImageIndex]?.url}
            alt={destination?.gallery?.[currentImageIndex]?.alt}
            className="max-w-full max-h-full object-contain"
          />
          
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-all duration-200"
          >
            <Icon name="ChevronLeft" size={24} color="white" />
          </button>
          
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-all duration-200"
          >
            <Icon name="ChevronRight" size={24} color="white" />
          </button>
        </div>
      )}
    </div>
  );
};

export default HeroGallery;
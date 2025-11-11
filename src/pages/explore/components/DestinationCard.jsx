import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const DestinationCard = ({ destination, onSave, onCompare, onViewDetails, isSaved, isComparing }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleSave = (e) => {
    e?.stopPropagation();
    onSave(destination);
  };

  const handleCompare = (e) => {
    e?.stopPropagation();
    onCompare(destination);
  };

  const handleViewDetails = () => {
    onViewDetails(destination);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    })?.format(price);
  };

  const getBudgetColor = (budget) => {
    switch (budget) {
      case 'budget': return 'text-green-600 bg-green-50';
      case 'mid': return 'text-blue-600 bg-blue-50';
      case 'luxury': return 'text-purple-600 bg-purple-50';
      case 'ultra': return 'text-amber-600 bg-amber-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-subtle hover:shadow-floating transition-all duration-300 overflow-hidden group cursor-pointer">
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={destination?.image}
          alt={destination?.imageAlt}
          className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Image Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        
        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex space-x-2">
          <Button
            variant="secondary"
            size="icon"
            onClick={handleSave}
            className={`bg-background/90 backdrop-blur-sm hover:bg-background ${
              isSaved ? 'text-red-500' : 'text-muted-foreground hover:text-foreground'
            }`}
            title={isSaved ? 'Remove from saved' : 'Save destination'}
          >
            <Icon name={isSaved ? "Heart" : "Heart"} size={18} className={isSaved ? 'fill-current' : ''} />
          </Button>
          
          <Button
            variant="secondary"
            size="icon"
            onClick={handleCompare}
            className={`bg-background/90 backdrop-blur-sm hover:bg-background ${
              isComparing ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
            }`}
            title={isComparing ? 'Remove from comparison' : 'Add to comparison'}
          >
            <Icon name="GitCompare" size={18} />
          </Button>
        </div>

        {/* Budget Badge */}
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getBudgetColor(destination?.budget)}`}>
            {destination?.budget === 'budget' && 'Budget Friendly'}
            {destination?.budget === 'mid' && 'Mid-range'}
            {destination?.budget === 'luxury' && 'Luxury'}
            {destination?.budget === 'ultra' && 'Ultra Luxury'}
          </span>
        </div>

        {/* Quick Stats */}
        <div className="absolute bottom-3 left-3 flex items-center space-x-3 text-white">
          <div className="flex items-center space-x-1">
            <Icon name="Star" size={14} className="fill-current text-yellow-400" />
            <span className="text-sm font-medium">{destination?.rating}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="MessageCircle" size={14} />
            <span className="text-sm">{destination?.reviews}</span>
          </div>
        </div>
      </div>
      {/* Content */}
      <div className="p-4" onClick={handleViewDetails}>
        {/* Header */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-card-foreground text-lg truncate group-hover:text-primary transition-colors">
              {destination?.name}
            </h3>
            <p className="text-muted-foreground text-sm flex items-center">
              <Icon name="MapPin" size={14} className="mr-1" />
              {destination?.country}
            </p>
          </div>
          <div className="text-right flex-shrink-0 ml-3">
            <div className="text-lg font-bold text-card-foreground">
              {formatPrice(destination?.priceFrom)}
            </div>
            <div className="text-xs text-muted-foreground">per person</div>
          </div>
        </div>

        {/* Description */}
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
          {destination?.description}
        </p>

        {/* Highlights */}
        <div className="flex flex-wrap gap-1 mb-3">
          {destination?.highlights?.slice(0, 3)?.map((highlight, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md"
            >
              {highlight}
            </span>
          ))}
          {destination?.highlights?.length > 3 && (
            <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md">
              +{destination?.highlights?.length - 3} more
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={14} />
              <span>{destination?.duration}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Thermometer" size={14} />
              <span>{destination?.climate}</span>
            </div>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e?.stopPropagation();
              handleViewDetails();
            }}
            className="group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors"
          >
            View Details
            <Icon name="ArrowRight" size={14} className="ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;
import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EventCard = ({ event, onViewDetails, onBookTicket, className = '' }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatPrice = (price) => {
    return price === 0 ? 'Free' : `$${price}`;
  };

  return (
    <div className={`bg-card rounded-xl shadow-subtle hover:shadow-floating transition-all duration-300 overflow-hidden group ${className}`}>
      {/* Event Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={event?.image}
          alt={event?.imageAlt}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            event?.category === 'Festival' ? 'bg-accent text-accent-foreground' :
            event?.category === 'Cultural' ? 'bg-secondary text-secondary-foreground' :
            event?.category === 'Music' ? 'bg-conversion text-conversion-foreground' :
            'bg-primary text-primary-foreground'
          }`}>
            {event?.category}
          </span>
        </div>
        {event?.featured && (
          <div className="absolute top-4 right-4">
            <div className="bg-warning text-warning-foreground px-2 py-1 rounded-full text-xs font-medium flex items-center">
              <Icon name="Star" size={12} className="mr-1" />
              Featured
            </div>
          </div>
        )}
      </div>
      {/* Event Content */}
      <div className="p-6">
        {/* Date and Location */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center text-sm text-muted-foreground">
            <Icon name="Calendar" size={16} className="mr-2" />
            <span>{formatDate(event?.startDate)}</span>
            {event?.endDate && event?.endDate !== event?.startDate && (
              <span> - {formatDate(event?.endDate)}</span>
            )}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Icon name="MapPin" size={16} className="mr-1" />
            <span>{event?.location}</span>
          </div>
        </div>

        {/* Event Title */}
        <h3 className="text-xl font-headline font-semibold text-foreground mb-2 line-clamp-2">
          {event?.title}
        </h3>

        {/* Event Description */}
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
          {event?.description}
        </p>

        {/* Cultural Significance */}
        {event?.culturalSignificance && (
          <div className="mb-4 p-3 bg-muted rounded-lg">
            <div className="flex items-center mb-2">
              <Icon name="BookOpen" size={16} className="mr-2 text-accent" />
              <span className="text-sm font-medium text-foreground">Cultural Context</span>
            </div>
            <p className="text-xs text-muted-foreground line-clamp-2">
              {event?.culturalSignificance}
            </p>
          </div>
        )}

        {/* Event Details */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-sm">
              <Icon name="Clock" size={16} className="mr-1 text-muted-foreground" />
              <span className="text-muted-foreground">{event?.duration}</span>
            </div>
            <div className="flex items-center text-sm">
              <Icon name="Users" size={16} className="mr-1 text-muted-foreground" />
              <span className="text-muted-foreground">{event?.attendees}+ attending</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-semibold text-foreground">
              {formatPrice(event?.price)}
            </div>
            {event?.originalPrice && event?.originalPrice > event?.price && (
              <div className="text-xs text-muted-foreground line-through">
                ${event?.originalPrice}
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <Button
            variant="outline"
            onClick={() => onViewDetails(event)}
            className="flex-1"
            iconName="Eye"
            iconPosition="left"
          >
            View Details
          </Button>
          <Button
            variant="default"
            onClick={() => onBookTicket(event)}
            className="flex-1 bg-conversion hover:bg-conversion/90 text-conversion-foreground"
            iconName="Ticket"
            iconPosition="left"
          >
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
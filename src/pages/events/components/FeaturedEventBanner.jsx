import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FeaturedEventBanner = ({ event, onViewDetails, onBookTicket, className = '' }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const calculateDaysLeft = (dateString) => {
    const eventDate = new Date(dateString);
    const today = new Date();
    const diffTime = eventDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysLeft = calculateDaysLeft(event?.startDate);

  return (
    <div className={`relative bg-gradient-cultural rounded-2xl overflow-hidden shadow-depth ${className}`}>
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src={event?.image}
          alt={event?.imageAlt}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent"></div>
      </div>
      {/* Content */}
      <div className="relative z-10 p-8 lg:p-12">
        <div className="max-w-4xl">
          {/* Featured Badge */}
          <div className="flex items-center mb-4">
            <div className="bg-warning text-warning-foreground px-4 py-2 rounded-full text-sm font-medium flex items-center">
              <Icon name="Star" size={16} className="mr-2" />
              Featured Event
            </div>
            <div className="ml-4 bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm font-medium">
              {event?.category}
            </div>
          </div>

          {/* Event Title */}
          <h1 className="text-4xl lg:text-5xl font-headline font-bold text-white mb-4 leading-tight">
            {event?.title}
          </h1>

          {/* Event Details */}
          <div className="flex flex-wrap items-center gap-6 mb-6 text-white/90">
            <div className="flex items-center">
              <Icon name="Calendar" size={20} className="mr-2" />
              <span className="text-lg">{formatDate(event?.startDate)}</span>
            </div>
            <div className="flex items-center">
              <Icon name="MapPin" size={20} className="mr-2" />
              <span className="text-lg">{event?.location}</span>
            </div>
            <div className="flex items-center">
              <Icon name="Clock" size={20} className="mr-2" />
              <span className="text-lg">{event?.duration}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-xl text-white/90 mb-6 max-w-2xl leading-relaxed">
            {event?.description}
          </p>

          {/* Cultural Context */}
          {event?.culturalSignificance && (
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-6 max-w-2xl">
              <div className="flex items-center mb-2">
                <Icon name="BookOpen" size={18} className="mr-2 text-secondary" />
                <span className="text-white font-medium">Cultural Significance</span>
              </div>
              <p className="text-white/90 text-sm">
                {event?.culturalSignificance}
              </p>
            </div>
          )}

          {/* Stats and Price */}
          <div className="flex flex-wrap items-center gap-8 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">{event?.attendees}+</div>
              <div className="text-white/80 text-sm">Attending</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary">
                {event?.price === 0 ? 'Free' : `$${event?.price}`}
              </div>
              <div className="text-white/80 text-sm">Starting Price</div>
            </div>
            {daysLeft > 0 && (
              <div className="text-center">
                <div className="text-3xl font-bold text-conversion">{daysLeft}</div>
                <div className="text-white/80 text-sm">Days Left</div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            <Button
              variant="default"
              size="lg"
              onClick={() => onBookTicket(event)}
              className="bg-conversion hover:bg-conversion/90 text-conversion-foreground px-8"
              iconName="Ticket"
              iconPosition="left"
            >
              Book Tickets Now
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => onViewDetails(event)}
              className="border-white text-white hover:bg-white hover:text-primary px-8"
              iconName="Eye"
              iconPosition="left"
            >
              View Details
            </Button>
          </div>
        </div>
      </div>
      {/* Decorative Elements */}
      <div className="absolute top-8 right-8 opacity-20">
        <Icon name="Sparkles" size={48} color="white" />
      </div>
      <div className="absolute bottom-8 right-16 opacity-10">
        <Icon name="Music" size={32} color="white" />
      </div>
    </div>
  );
};

export default FeaturedEventBanner;
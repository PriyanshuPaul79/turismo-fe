import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const TravelHistoryCard = ({ trips, onViewTrip, onViewAll }) => {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  const formatTripDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric'
    });
  };

  const getTripDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-subtle">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="Camera" size={20} className="text-accent" />
          </div>
          <div>
            <h3 className="font-headline font-semibold text-lg">Travel Memories</h3>
            <p className="text-muted-foreground text-sm">{trips?.length} trips completed</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex bg-muted rounded-lg p-1">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="xs"
              onClick={() => setViewMode('grid')}
            >
              <Icon name="Grid3X3" size={14} />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="xs"
              onClick={() => setViewMode('list')}
            >
              <Icon name="List" size={14} />
            </Button>
          </div>
          {trips?.length > 0 && (
            <Button variant="ghost" size="sm" onClick={onViewAll}>
              View All
            </Button>
          )}
        </div>
      </div>
      {trips?.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
            <Icon name="Camera" size={24} className="text-muted-foreground" />
          </div>
          <p className="text-muted-foreground text-sm">
            Your travel memories will appear here
          </p>
        </div>
      ) : (
        <>
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {trips?.slice(0, 6)?.map((trip) => (
                <div
                  key={trip?.id}
                  onClick={() => onViewTrip(trip)}
                  className="group cursor-pointer"
                >
                  <div className="relative overflow-hidden rounded-lg mb-2">
                    <Image
                      src={trip?.coverImage}
                      alt={trip?.coverImageAlt}
                      className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-2 left-2 right-2">
                        <div className="flex items-center gap-1 text-white text-xs">
                          <Icon name="Camera" size={12} />
                          <span>{trip?.photoCount} photos</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <h4 className="font-medium text-sm group-hover:text-primary transition-colors">
                    {trip?.destination}
                  </h4>
                  <p className="text-muted-foreground text-xs">
                    {formatTripDate(trip?.startDate)} • {getTripDuration(trip?.startDate, trip?.endDate)} days
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {trips?.slice(0, 4)?.map((trip) => (
                <div
                  key={trip?.id}
                  onClick={() => onViewTrip(trip)}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                >
                  <Image
                    src={trip?.coverImage}
                    alt={trip?.coverImageAlt}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium">{trip?.destination}</h4>
                    <p className="text-muted-foreground text-sm">
                      {formatTripDate(trip?.startDate)} • {getTripDuration(trip?.startDate, trip?.endDate)} days
                    </p>
                    <div className="flex items-center gap-4 mt-1">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Icon name="Camera" size={12} />
                        <span>{trip?.photoCount}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Icon name="Star" size={12} />
                        <span>{trip?.rating}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Icon name="MapPin" size={12} />
                        <span>{trip?.placesVisited}</span>
                      </div>
                    </div>
                  </div>
                  <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TravelHistoryCard;
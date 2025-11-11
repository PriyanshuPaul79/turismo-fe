import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const UpcomingTripsCard = ({ trips, onViewTrip, onPlanNew }) => {
  const calculateDaysUntil = (date) => {
    const today = new Date();
    const tripDate = new Date(date);
    const diffTime = tripDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getCountdownText = (days) => {
    if (days < 0) return 'Trip completed';
    if (days === 0) return 'Today!';
    if (days === 1) return 'Tomorrow';
    return `${days} days to go`;
  };

  const getProgressPercentage = (checklist) => {
    const completed = checklist?.filter(item => item?.completed)?.length;
    return Math.round((completed / checklist?.length) * 100);
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-subtle">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-conversion/10 rounded-lg flex items-center justify-center">
            <Icon name="Calendar" size={20} className="text-conversion" />
          </div>
          <div>
            <h3 className="font-headline font-semibold text-lg">Upcoming Trips</h3>
            <p className="text-muted-foreground text-sm">{trips?.length} planned</p>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={onPlanNew}>
          <Icon name="Plus" size={16} className="mr-1" />
          Plan New
        </Button>
      </div>
      {trips?.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
            <Icon name="MapPin" size={24} className="text-muted-foreground" />
          </div>
          <p className="text-muted-foreground text-sm mb-4">
            No upcoming trips planned yet
          </p>
          <Button variant="default" onClick={onPlanNew}>
            Start Planning Your Next Adventure
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {trips?.map((trip) => {
            const daysUntil = calculateDaysUntil(trip?.startDate);
            const progress = getProgressPercentage(trip?.checklist);
            
            return (
              <div
                key={trip?.id}
                className="border border-border rounded-lg p-4 hover:shadow-subtle transition-shadow cursor-pointer"
                onClick={() => onViewTrip(trip)}
              >
                <div className="flex items-start gap-4">
                  <Image
                    src={trip?.image}
                    alt={trip?.imageAlt}
                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium text-lg">{trip?.destination}</h4>
                        <p className="text-muted-foreground text-sm">
                          {trip?.startDate} - {trip?.endDate}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className={`text-sm font-medium ${
                          daysUntil <= 7 ? 'text-conversion' : 'text-primary'
                        }`}>
                          {getCountdownText(daysUntil)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {trip?.duration} days
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-muted-foreground">
                          Trip Preparation
                        </span>
                        <span className="text-xs font-medium">{progress}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-success h-2 rounded-full transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="xs"
                        onClick={(e) => {
                          e?.stopPropagation();
                          onViewTrip(trip);
                        }}
                      >
                        <Icon name="Eye" size={14} className="mr-1" />
                        View Details
                      </Button>
                      <Button
                        variant="ghost"
                        size="xs"
                        onClick={(e) => {
                          e?.stopPropagation();
                          // Handle checklist action
                        }}
                      >
                        <Icon name="CheckSquare" size={14} className="mr-1" />
                        Checklist
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default UpcomingTripsCard;
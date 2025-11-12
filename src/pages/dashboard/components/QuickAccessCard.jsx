import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const QuickAccessCard = ({ title, items, type, onViewAll, onItemClick }) => {
  const getIcon = () => {
    switch (type) {
      case 'destinations': return 'MapPin';
      case 'hotels': return 'Building';
      case 'itineraries': return 'Route';
      default: return 'Heart';
    }
  };

  const getEmptyMessage = () => {
    switch (type) {
      case 'destinations': return 'Start exploring destinations to save your favorites';
      case 'hotels': return 'Save hotels you love for future trips';
      case 'itineraries': return 'Create your first travel itinerary';
      default: return 'No saved items yet';
    }
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-subtle">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Icon name={getIcon()} size={20} className="text-primary" />
          <h3 className="font-headline font-semibold text-base text-foreground">{title}</h3>
        </div>
        {items?.length > 0 && (
          <button
            onClick={onViewAll}
            className="text-sm text-primary hover:text-primary/80 font-medium transition-colors flex items-center gap-1"
          >
            View All
            <Icon name="ArrowRight" size={14} />
          </button>
        )}
      </div>
      {items?.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
            <Icon name={getIcon()} size={24} className="text-muted-foreground" />
          </div>
          <p className="text-muted-foreground text-sm">{getEmptyMessage()}</p>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-xs text-muted-foreground mb-3">{items?.length} saved</p>
          {items?.slice(0, 3)?.map((item) => (
            <div
              key={item?.id}
              onClick={() => onItemClick(item)}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors group"
            >
              <div className="relative flex-shrink-0">
                <Image
                  src={item?.image}
                  alt={item?.imageAlt}
                  className="w-14 h-14 rounded-lg object-cover"
                />
                {item?.isNew && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-conversion rounded-full border-2 border-white"></div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm text-foreground truncate mb-0.5">
                  {item?.name}
                </h4>
                <p className="text-xs text-muted-foreground truncate">
                  {item?.location || item?.description}
                </p>
              </div>
              {item?.rating && (
                <div className="flex items-center gap-1 flex-shrink-0">
                  <Icon name="Star" size={12} className="text-warning fill-current" />
                  <span className="text-xs font-medium text-foreground">{item?.rating}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuickAccessCard;
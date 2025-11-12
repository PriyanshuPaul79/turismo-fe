import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RecommendationsCard = ({ recommendations, onViewDestination, onRefresh }) => {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All', icon: 'Sparkles' },
    { id: 'destinations', label: 'Places', icon: 'MapPin' },
    { id: 'experiences', label: 'Experiences', icon: 'Camera' },
    { id: 'hotels', label: 'Hotels', icon: 'Building' }
  ];

  const filteredRecommendations = activeCategory === 'all' 
    ? recommendations 
    : recommendations?.filter(rec => rec?.category === activeCategory);

  const getReasonIcon = (reason) => {
    switch (reason) {
      case 'similar_trips': return 'TrendingUp';
      case 'seasonal': return 'Calendar';
      case 'budget_match': return 'DollarSign';
      case 'interests': return 'Heart';
      default: return 'Sparkles';
    }
  };

  const getReasonText = (reason) => {
    switch (reason) {
      case 'similar_trips': return 'Based on your travel history';
      case 'seasonal': return 'Perfect for this season';
      case 'budget_match': return 'Matches your budget';
      case 'interests': return 'Matches your interests';
      default: return 'AI recommended';
    }
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-subtle">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
            <Icon name="Sparkles" size={20} className="text-secondary" />
          </div>
          <div>
            <h3 className="font-headline font-semibold text-lg">AI Recommendations</h3>
            <p className="text-muted-foreground text-sm">Personalized for you</p>
          </div>
        </div>
        
        <Button variant="ghost" size="sm" onClick={onRefresh}>
          <Icon name="RefreshCw" size={16} className="mr-1" />
          Refresh
        </Button>
      </div>
      {/* Category Filters */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
        {categories?.map((category) => (
          <Button
            key={category?.id}
            variant={activeCategory === category?.id ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveCategory(category?.id)}
            className="flex-shrink-0"
          >
            <Icon name={category?.icon} size={14} className="mr-1" />
            {category?.label}
          </Button>
        ))}
      </div>
      {filteredRecommendations?.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
            <Icon name="Sparkles" size={24} className="text-muted-foreground" />
          </div>
          <p className="text-muted-foreground text-sm">
            No recommendations available for this category
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredRecommendations?.slice(0, 4)?.map((recommendation) => (
            <div
              key={recommendation?.id}
              onClick={() => onViewDestination(recommendation)}
              className="group border border-border rounded-lg p-4 hover:shadow-subtle cursor-pointer transition-all duration-200"
            >
              <div className="flex gap-3">
                <div className="relative flex-shrink-0">
                  <Image
                    src={recommendation?.image}
                    alt={recommendation?.imageAlt}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-secondary rounded-full flex items-center justify-center">
                    <Icon name="Sparkles" size={12} color="white" />
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium group-hover:text-primary transition-colors">
                    {recommendation?.title}
                  </h4>
                  <p className="text-muted-foreground text-sm mb-2 line-clamp-2">
                    {recommendation?.description}
                  </p>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1">
                      <Icon name="Star" size={12} className="text-warning fill-current" />
                      <span className="text-xs font-medium">{recommendation?.rating}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">•</div>
                    <div className="text-xs text-muted-foreground">
                      {recommendation?.price}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1 text-xs text-secondary">
                    <Icon name={getReasonIcon(recommendation?.reason)} size={12} />
                    <span>{getReasonText(recommendation?.reason)}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                <div className="flex items-center gap-2">
                  {recommendation?.tags?.slice(0, 2)?.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-muted rounded-full text-xs text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <span>View Details</span>
                  <Icon name="ArrowRight" size={12} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecommendationsCard;
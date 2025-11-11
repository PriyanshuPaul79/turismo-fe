import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const TrendingSidebar = ({ onDestinationClick, onSearchClick }) => {
  const trendingDestinations = [
  {
    id: 'trend-1',
    name: 'Santorini, Greece',
    image: "https://images.unsplash.com/photo-1662121783914-9ee843f21504",
    imageAlt: 'White-washed buildings with blue domes overlooking the Aegean Sea in Santorini',
    trend: '+25%',
    searches: '12.5K searches',
    reason: 'Perfect weather season'
  },
  {
    id: 'trend-2',
    name: 'Kyoto, Japan',
    image: "https://images.unsplash.com/photo-1560197858-956527661f58",
    imageAlt: 'Traditional Japanese temple with cherry blossoms and pagoda architecture in Kyoto',
    trend: '+18%',
    searches: '9.8K searches',
    reason: 'Cherry blossom season'
  },
  {
    id: 'trend-3',
    name: 'Machu Picchu, Peru',
    image: "https://images.unsplash.com/photo-1725197890952-15459a8ae10f",
    imageAlt: 'Ancient Incan ruins of Machu Picchu with terraced stone structures on mountain peaks',
    trend: '+22%',
    searches: '8.2K searches',
    reason: 'Dry season begins'
  },
  {
    id: 'trend-4',
    name: 'Bali, Indonesia',
    image: "https://images.unsplash.com/photo-1544503376-8112e05e9196",
    imageAlt: 'Lush green rice terraces with traditional Balinese irrigation system in tropical landscape',
    trend: '+15%',
    searches: '15.3K searches',
    reason: 'Cultural festivals'
  }];


  const recentSearches = [
  'Northern Lights Iceland',
  'Safari Kenya',
  'Maldives Resorts',
  'Swiss Alps Skiing',
  'Thailand Islands'];


  const quickFilters = [
  { name: 'Beach Destinations', icon: 'Waves', count: '2.1K' },
  { name: 'Mountain Adventures', icon: 'Mountain', count: '1.8K' },
  { name: 'Cultural Sites', icon: 'Landmark', count: '3.2K' },
  { name: 'City Breaks', icon: 'Building2', count: '4.5K' },
  { name: 'Wildlife & Nature', icon: 'Trees', count: '1.6K' }];


  const handleTrendingClick = (destination) => {
    onDestinationClick(destination);
  };

  const handleRecentSearchClick = (search) => {
    onSearchClick(search);
  };

  const handleQuickFilterClick = (filter) => {
    onSearchClick(filter?.name);
  };

  return (
    <div className="space-y-6">
      {/* Trending Destinations */}
      <div className="bg-card rounded-lg border border-border shadow-subtle p-4">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="TrendingUp" size={20} className="text-primary" />
          <h3 className="font-semibold text-card-foreground">Trending Now</h3>
        </div>
        
        <div className="space-y-3">
          {trendingDestinations?.map((destination, index) =>
          <button
            key={destination?.id}
            onClick={() => handleTrendingClick(destination)}
            className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-muted transition-colors text-left">

              <div className="relative">
                <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                  src={destination?.image}
                  alt={destination?.imageAlt}
                  className="w-full h-full object-cover" />

                </div>
                <div className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded-full font-medium">
                  #{index + 1}
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-card-foreground text-sm truncate">
                    {destination?.name}
                  </h4>
                  <span className="text-green-600 text-xs font-medium flex-shrink-0">
                    {destination?.trend}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {destination?.searches}
                </p>
                <p className="text-xs text-muted-foreground">
                  {destination?.reason}
                </p>
              </div>
            </button>
          )}
        </div>
        
        <Button
          variant="outline"
          size="sm"
          fullWidth
          className="mt-4"
          onClick={() => onSearchClick('trending destinations')}>

          View All Trending
          <Icon name="ArrowRight" size={14} className="ml-2" />
        </Button>
      </div>
      {/* Recent Searches */}
      <div className="bg-card rounded-lg border border-border shadow-subtle p-4">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Clock" size={20} className="text-primary" />
          <h3 className="font-semibold text-card-foreground">Recent Searches</h3>
        </div>
        
        <div className="space-y-2">
          {recentSearches?.map((search, index) =>
          <button
            key={index}
            onClick={() => handleRecentSearchClick(search)}
            className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-muted transition-colors text-left">

              <span className="text-sm text-card-foreground">{search}</span>
              <Icon name="ArrowUpRight" size={14} className="text-muted-foreground" />
            </button>
          )}
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          fullWidth
          className="mt-3 text-muted-foreground">

          <Icon name="Trash2" size={14} className="mr-2" />
          Clear History
        </Button>
      </div>
      {/* Quick Filters */}
      <div className="bg-card rounded-lg border border-border shadow-subtle p-4">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Filter" size={20} className="text-primary" />
          <h3 className="font-semibold text-card-foreground">Quick Filters</h3>
        </div>
        
        <div className="space-y-2">
          {quickFilters?.map((filter, index) =>
          <button
            key={index}
            onClick={() => handleQuickFilterClick(filter)}
            className="w-full flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted transition-colors text-left">

              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name={filter?.icon} size={16} className="text-primary" />
                </div>
                <span className="text-sm font-medium text-card-foreground">
                  {filter?.name}
                </span>
              </div>
              <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                {filter?.count}
              </span>
            </button>
          )}
        </div>
      </div>
      {/* AI Recommendations */}
      <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg border border-primary/20 p-4">
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="Sparkles" size={20} className="text-primary" />
          <h3 className="font-semibold text-card-foreground">AI Recommendations</h3>
        </div>
        
        <p className="text-sm text-muted-foreground mb-4">
          Based on your search history and preferences, we think you might love these destinations.
        </p>
        
        <Button
          variant="default"
          size="sm"
          fullWidth
          className="bg-primary hover:bg-primary/90"
          onClick={() => onSearchClick('AI recommendations')}>

          <Icon name="Wand2" size={14} className="mr-2" />
          Get Personalized Suggestions
        </Button>
      </div>
    </div>);

};

export default TrendingSidebar;
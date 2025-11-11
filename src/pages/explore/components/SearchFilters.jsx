import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const SearchFilters = ({ filters, onFiltersChange, onClearFilters }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const destinationTypes = [
    { value: 'city', label: 'City Break' },
    { value: 'beach', label: 'Beach Resort' },
    { value: 'mountain', label: 'Mountain Adventure' },
    { value: 'cultural', label: 'Cultural Heritage' },
    { value: 'nature', label: 'Nature & Wildlife' },
    { value: 'adventure', label: 'Adventure Sports' }
  ];

  const budgetRanges = [
    { value: 'budget', label: 'Budget ($0-$500)' },
    { value: 'mid', label: 'Mid-range ($500-$1500)' },
    { value: 'luxury', label: 'Luxury ($1500-$5000)' },
    { value: 'ultra', label: 'Ultra Luxury ($5000+)' }
  ];

  const climatePreferences = [
    { value: 'tropical', label: 'Tropical' },
    { value: 'temperate', label: 'Temperate' },
    { value: 'arid', label: 'Desert/Arid' },
    { value: 'cold', label: 'Cold/Alpine' },
    { value: 'mediterranean', label: 'Mediterranean' }
  ];

  const activities = [
    'Sightseeing', 'Food & Dining', 'Shopping', 'Museums', 'Nightlife',
    'Outdoor Activities', 'Water Sports', 'Cultural Experiences', 'Photography',
    'Wellness & Spa', 'Adventure Sports', 'Wildlife Viewing'
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const handleActivityToggle = (activity) => {
    const currentActivities = filters?.activities || [];
    const updatedActivities = currentActivities?.includes(activity)
      ? currentActivities?.filter(a => a !== activity)
      : [...currentActivities, activity];
    handleFilterChange('activities', updatedActivities);
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-subtle">
      {/* Filter Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={20} className="text-primary" />
          <h3 className="font-semibold text-card-foreground">Filters</h3>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            Clear All
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
            className="lg:hidden"
          >
            <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={20} />
          </Button>
        </div>
      </div>
      {/* Filter Content */}
      <div className={`${isExpanded ? 'block' : 'hidden'} lg:block`}>
        <div className="p-4 space-y-6">
          {/* Date Range */}
          <div className="space-y-3">
            <h4 className="font-medium text-card-foreground">Travel Dates</h4>
            <div className="grid grid-cols-2 gap-3">
              <Input
                type="date"
                label="Check-in"
                value={filters?.checkIn || ''}
                onChange={(e) => handleFilterChange('checkIn', e?.target?.value)}
                className="text-sm"
              />
              <Input
                type="date"
                label="Check-out"
                value={filters?.checkOut || ''}
                onChange={(e) => handleFilterChange('checkOut', e?.target?.value)}
                className="text-sm"
              />
            </div>
          </div>

          {/* Destination Type */}
          <div className="space-y-3">
            <Select
              label="Destination Type"
              options={destinationTypes}
              value={filters?.destinationType || ''}
              onChange={(value) => handleFilterChange('destinationType', value)}
              placeholder="Select destination type"
            />
          </div>

          {/* Budget Range */}
          <div className="space-y-3">
            <Select
              label="Budget Range"
              options={budgetRanges}
              value={filters?.budget || ''}
              onChange={(value) => handleFilterChange('budget', value)}
              placeholder="Select budget range"
            />
          </div>

          {/* Climate Preference */}
          <div className="space-y-3">
            <Select
              label="Climate Preference"
              options={climatePreferences}
              value={filters?.climate || ''}
              onChange={(value) => handleFilterChange('climate', value)}
              placeholder="Select climate type"
            />
          </div>

          {/* Group Size */}
          <div className="space-y-3">
            <Input
              type="number"
              label="Group Size"
              placeholder="Number of travelers"
              value={filters?.groupSize || ''}
              onChange={(e) => handleFilterChange('groupSize', e?.target?.value)}
              min="1"
              max="20"
            />
          </div>

          {/* Activities */}
          <div className="space-y-3">
            <h4 className="font-medium text-card-foreground">Preferred Activities</h4>
            <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
              {activities?.map((activity) => (
                <Checkbox
                  key={activity}
                  label={activity}
                  checked={(filters?.activities || [])?.includes(activity)}
                  onChange={() => handleActivityToggle(activity)}
                  size="sm"
                />
              ))}
            </div>
          </div>

          {/* Rating Filter */}
          <div className="space-y-3">
            <h4 className="font-medium text-card-foreground">Minimum Rating</h4>
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5]?.map((rating) => (
                <button
                  key={rating}
                  onClick={() => handleFilterChange('minRating', rating)}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm transition-colors ${
                    filters?.minRating === rating
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  <Icon name="Star" size={16} />
                  <span>{rating}+</span>
                </button>
              ))}
            </div>
          </div>

          {/* Apply Filters Button */}
          <div className="pt-4 border-t border-border">
            <Button
              variant="default"
              fullWidth
              className="bg-primary hover:bg-primary/90"
            >
              <Icon name="Search" size={18} className="mr-2" />
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
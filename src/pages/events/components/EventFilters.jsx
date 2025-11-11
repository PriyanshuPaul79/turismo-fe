import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const EventFilters = ({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  isFilterActive,
  className = '' 
}) => {
  const categoryOptions = [
    { value: '', label: 'All Categories' },
    { value: 'Festival', label: 'Festivals' },
    { value: 'Cultural', label: 'Cultural Events' },
    { value: 'Music', label: 'Music & Concerts' },
    { value: 'Art', label: 'Art & Exhibition' },
    { value: 'Food', label: 'Food & Culinary' },
    { value: 'Religious', label: 'Religious Events' },
    { value: 'Sports', label: 'Sports Events' }
  ];

  const locationOptions = [
    { value: '', label: 'All Locations' },
    { value: 'New York', label: 'New York, USA' },
    { value: 'Paris', label: 'Paris, France' },
    { value: 'Tokyo', label: 'Tokyo, Japan' },
    { value: 'Mumbai', label: 'Mumbai, India' },
    { value: 'London', label: 'London, UK' },
    { value: 'Barcelona', label: 'Barcelona, Spain' },
    { value: 'Rio de Janeiro', label: 'Rio de Janeiro, Brazil' },
    { value: 'Bangkok', label: 'Bangkok, Thailand' }
  ];

  const priceOptions = [
    { value: '', label: 'Any Price' },
    { value: 'free', label: 'Free Events' },
    { value: '0-50', label: 'Under $50' },
    { value: '50-100', label: '$50 - $100' },
    { value: '100-200', label: '$100 - $200' },
    { value: '200+', label: 'Above $200' }
  ];

  const durationOptions = [
    { value: '', label: 'Any Duration' },
    { value: '1-day', label: 'Single Day' },
    { value: '2-3-days', label: '2-3 Days' },
    { value: '4-7-days', label: '4-7 Days' },
    { value: '1-week+', label: 'Week or More' }
  ];

  return (
    <div className={`bg-card rounded-xl shadow-subtle p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-headline font-semibold text-foreground flex items-center">
          <Icon name="Filter" size={20} className="mr-2" />
          Filter Events
        </h3>
        {isFilterActive && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            iconName="X"
            iconPosition="left"
          >
            Clear All
          </Button>
        )}
      </div>
      <div className="space-y-4">
        {/* Search */}
        <div>
          <Input
            type="search"
            placeholder="Search events, festivals, or keywords..."
            value={filters?.search || ''}
            onChange={(e) => onFilterChange('search', e?.target?.value)}
            className="w-full"
          />
        </div>

        {/* Date Range */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="date"
            label="Start Date"
            value={filters?.startDate || ''}
            onChange={(e) => onFilterChange('startDate', e?.target?.value)}
          />
          <Input
            type="date"
            label="End Date"
            value={filters?.endDate || ''}
            onChange={(e) => onFilterChange('endDate', e?.target?.value)}
          />
        </div>

        {/* Category and Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Category"
            options={categoryOptions}
            value={filters?.category || ''}
            onChange={(value) => onFilterChange('category', value)}
          />
          <Select
            label="Location"
            options={locationOptions}
            value={filters?.location || ''}
            onChange={(value) => onFilterChange('location', value)}
            searchable
          />
        </div>

        {/* Price and Duration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Price Range"
            options={priceOptions}
            value={filters?.price || ''}
            onChange={(value) => onFilterChange('price', value)}
          />
          <Select
            label="Duration"
            options={durationOptions}
            value={filters?.duration || ''}
            onChange={(value) => onFilterChange('duration', value)}
          />
        </div>

        {/* Additional Filters */}
        <div className="border-t border-border pt-4">
          <h4 className="text-sm font-medium text-foreground mb-3">Additional Options</h4>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={filters?.featuredOnly || false}
                onChange={(e) => onFilterChange('featuredOnly', e?.target?.checked)}
                className="mr-3 rounded border-border"
              />
              <span className="text-sm text-foreground">Featured events only</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={filters?.freeOnly || false}
                onChange={(e) => onFilterChange('freeOnly', e?.target?.checked)}
                className="mr-3 rounded border-border"
              />
              <span className="text-sm text-foreground">Free events only</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={filters?.availableTickets || false}
                onChange={(e) => onFilterChange('availableTickets', e?.target?.checked)}
                className="mr-3 rounded border-border"
              />
              <span className="text-sm text-foreground">Available tickets only</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventFilters;
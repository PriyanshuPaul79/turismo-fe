import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Image from '../../../components/AppImage';

const ActivityLibrary = ({ onAddActivity, destination }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');

  const categories = [
  { value: 'all', label: 'All Categories' },
  { value: 'attractions', label: 'Attractions' },
  { value: 'restaurants', label: 'Restaurants' },
  { value: 'activities', label: 'Activities' },
  { value: 'shopping', label: 'Shopping' },
  { value: 'nightlife', label: 'Nightlife' },
  { value: 'culture', label: 'Culture' }];


  const priceRanges = [
  { value: 'all', label: 'All Prices' },
  { value: 'free', label: 'Free' },
  { value: 'budget', label: '$ Budget' },
  { value: 'moderate', label: '$$ Moderate' },
  { value: 'expensive', label: '$$$ Premium' }];


  const mockActivities = [
  {
    id: 'act-1',
    title: 'Central Park Walking Tour',
    category: 'attractions',
    description: 'Explore the iconic Central Park with a guided walking tour covering major landmarks and hidden gems.',
    image: "https://images.unsplash.com/photo-1596848705890-25930b9a96db",
    imageAlt: 'Aerial view of Central Park with green trees and walking paths in New York City',
    duration: '2 hours',
    price: 25,
    priceRange: 'budget',
    rating: 4.8,
    reviews: 1247,
    type: 'attraction',
    coordinates: { lat: 40.7829, lng: -73.9654 },
    tags: ['outdoor', 'walking', 'nature', 'sightseeing']
  },
  {
    id: 'act-2',
    title: 'Metropolitan Museum of Art',
    category: 'culture',
    description: 'World-renowned art museum featuring collections spanning 5,000 years of art from around the globe.',
    image: "https://images.unsplash.com/photo-1678696171258-9d313e6123cb",
    imageAlt: 'Grand entrance hall of Metropolitan Museum with classical columns and visitors',
    duration: '3 hours',
    price: 30,
    priceRange: 'moderate',
    rating: 4.9,
    reviews: 2156,
    type: 'attraction',
    coordinates: { lat: 40.7794, lng: -73.9632 },
    tags: ['art', 'culture', 'museum', 'indoor']
  },
  {
    id: 'act-3',
    title: 'Brooklyn Bridge Walk',
    category: 'attractions',
    description: 'Scenic walk across the historic Brooklyn Bridge with stunning views of Manhattan skyline.',
    image: "https://images.unsplash.com/photo-1675028060011-596240eba659",
    imageAlt: 'Brooklyn Bridge walkway with Manhattan skyline and East River in background',
    duration: '1.5 hours',
    price: 0,
    priceRange: 'free',
    rating: 4.7,
    reviews: 892,
    type: 'attraction',
    coordinates: { lat: 40.7061, lng: -73.9969 },
    tags: ['walking', 'views', 'bridge', 'free']
  },
  {
    id: 'act-4',
    title: 'Katz\'s Delicatessen',
    category: 'restaurants',
    description: 'Legendary Jewish deli serving authentic pastrami sandwiches since 1888.',
    image: "https://images.unsplash.com/photo-1574737273449-3538c56cce40",
    imageAlt: 'Classic deli interior with hanging salamis and busy counter service',
    duration: '1 hour',
    price: 18,
    priceRange: 'budget',
    rating: 4.6,
    reviews: 3421,
    type: 'restaurant',
    coordinates: { lat: 40.7223, lng: -73.9873 },
    tags: ['deli', 'historic', 'pastrami', 'lunch']
  },
  {
    id: 'act-5',
    title: 'Broadway Show',
    category: 'nightlife',
    description: 'Experience world-class theater with a Broadway musical in the heart of Times Square.',
    image: "https://images.unsplash.com/photo-1631565148136-11c990503df4",
    imageAlt: 'Broadway theater interior with red velvet seats and ornate stage',
    duration: '2.5 hours',
    price: 120,
    priceRange: 'expensive',
    rating: 4.9,
    reviews: 567,
    type: 'activity',
    coordinates: { lat: 40.7580, lng: -73.9855 },
    tags: ['theater', 'musical', 'evening', 'entertainment']
  },
  {
    id: 'act-6',
    title: 'High Line Park',
    category: 'attractions',
    description: 'Elevated linear park built on former railway tracks with gardens and city views.',
    image: "https://images.unsplash.com/photo-1414758394455-cc6c748cf747",
    imageAlt: 'Elevated walkway of High Line park with plants and city buildings on both sides',
    duration: '1 hour',
    price: 0,
    priceRange: 'free',
    rating: 4.8,
    reviews: 1834,
    type: 'attraction',
    coordinates: { lat: 40.7480, lng: -74.0048 },
    tags: ['park', 'walking', 'views', 'free']
  }];


  const filteredActivities = mockActivities?.filter((activity) => {
    const matchesSearch = activity?.title?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    activity?.description?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    activity?.tags?.some((tag) => tag?.toLowerCase()?.includes(searchTerm?.toLowerCase()));

    const matchesCategory = selectedCategory === 'all' || activity?.category === selectedCategory;
    const matchesPriceRange = selectedPriceRange === 'all' || activity?.priceRange === selectedPriceRange;

    return matchesSearch && matchesCategory && matchesPriceRange;
  });

  const handleAddToItinerary = (activity) => {
    const itineraryActivity = {
      id: `activity-${Date.now()}`,
      title: activity?.title,
      time: "10:00 AM",
      duration: activity?.duration,
      type: activity?.type,
      location: activity?.title,
      cost: activity?.price,
      notes: activity?.description,
      coordinates: activity?.coordinates,
      image: activity?.image,
      imageAlt: activity?.imageAlt
    };

    onAddActivity(itineraryActivity);
  };

  const getPriceDisplay = (activity) => {
    if (activity?.price === 0) return 'Free';
    return `$${activity?.price}`;
  };

  const getCategoryIcon = (category) => {
    const icons = {
      attractions: 'MapPin',
      restaurants: 'Utensils',
      activities: 'Activity',
      shopping: 'ShoppingBag',
      nightlife: 'Music',
      culture: 'Palette'
    };
    return icons?.[category] || 'Star';
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-subtle">
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Activity Library</h3>
        
        {/* Search and Filters */}
        <div className="space-y-4">
          <Input
            type="search"
            placeholder="Search activities, attractions, restaurants..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
            className="w-full" />

          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Category"
              options={categories}
              value={selectedCategory}
              onChange={setSelectedCategory} />

            <Select
              label="Price Range"
              options={priceRanges}
              value={selectedPriceRange}
              onChange={setSelectedPriceRange} />

          </div>
        </div>
      </div>
      <div className="p-6">
        {/* Results Count */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">
            {filteredActivities?.length} activities found
          </p>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Icon name="Filter" size={16} className="mr-2" />
              More Filters
            </Button>
          </div>
        </div>

        {/* Activity Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredActivities?.map((activity) =>
          <div
            key={activity?.id}
            className="bg-background border border-border rounded-lg overflow-hidden hover:shadow-floating transition-all duration-200">

              <div className="relative">
                <Image
                src={activity?.image}
                alt={activity?.imageAlt}
                className="w-full h-48 object-cover" />

                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-background/90 text-foreground">
                    <Icon name={getCategoryIcon(activity?.category)} size={12} className="mr-1" />
                    {categories?.find((c) => c?.value === activity?.category)?.label}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary text-primary-foreground">
                    {getPriceDisplay(activity)}
                  </span>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-foreground line-clamp-1">
                    {activity?.title}
                  </h4>
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground ml-2">
                    <Icon name="Star" size={14} className="text-yellow-500" />
                    <span>{activity?.rating}</span>
                    <span>({activity?.reviews})</span>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {activity?.description}
                </p>
                
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span className="flex items-center">
                      <Icon name="Clock" size={14} className="mr-1" />
                      {activity?.duration}
                    </span>
                  </div>
                </div>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {activity?.tags?.slice(0, 3)?.map((tag) =>
                <span
                  key={tag}
                  className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-muted text-muted-foreground">

                      {tag}
                    </span>
                )}
                  {activity?.tags?.length > 3 &&
                <span className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-muted text-muted-foreground">
                      +{activity?.tags?.length - 3}
                    </span>
                }
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                  variant="default"
                  size="sm"
                  onClick={() => handleAddToItinerary(activity)}
                  className="flex-1"
                  iconName="Plus"
                  iconPosition="left">

                    Add to Trip
                  </Button>
                  <Button
                  variant="outline"
                  size="icon"
                  className="flex-shrink-0">

                    <Icon name="Heart" size={16} />
                  </Button>
                  <Button
                  variant="outline"
                  size="icon"
                  className="flex-shrink-0">

                    <Icon name="ExternalLink" size={16} />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {filteredActivities?.length === 0 &&
        <div className="text-center py-12">
            <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-4" />
            <h4 className="text-lg font-medium text-foreground mb-2">No activities found</h4>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search terms or filters to find more activities.
            </p>
            <Button variant="outline" onClick={() => {
            setSearchTerm('');
            setSelectedCategory('all');
            setSelectedPriceRange('all');
          }}>
              Clear Filters
            </Button>
          </div>
        }
      </div>
    </div>);

};

export default ActivityLibrary;
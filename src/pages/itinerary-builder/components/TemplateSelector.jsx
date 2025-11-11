import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const TemplateSelector = ({ onSelectTemplate, onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDuration, setSelectedDuration] = useState('all');

  const categories = [
  { id: 'all', label: 'All Templates', icon: 'Grid3x3' },
  { id: 'adventure', label: 'Adventure', icon: 'Mountain' },
  { id: 'cultural', label: 'Cultural', icon: 'Palette' },
  { id: 'relaxation', label: 'Relaxation', icon: 'Waves' },
  { id: 'family', label: 'Family', icon: 'Users' },
  { id: 'romantic', label: 'Romantic', icon: 'Heart' },
  { id: 'business', label: 'Business', icon: 'Briefcase' }];


  const durations = [
  { id: 'all', label: 'Any Duration' },
  { id: 'weekend', label: '2-3 Days' },
  { id: 'week', label: '4-7 Days' },
  { id: 'extended', label: '8+ Days' }];


  const mockTemplates = [
  {
    id: 'template-1',
    title: 'NYC Cultural Explorer',
    category: 'cultural',
    duration: 'week',
    days: 5,
    description: 'Immerse yourself in New York\'s rich cultural scene with museums, galleries, and historic landmarks.',
    image: "https://images.unsplash.com/photo-1700675654221-d9c62be751c8",
    imageAlt: 'New York City skyline with Brooklyn Bridge and Manhattan buildings at sunset',
    activities: 15,
    budget: 1200,
    rating: 4.8,
    reviews: 234,
    tags: ['museums', 'art', 'history', 'walking'],
    highlights: ['Metropolitan Museum', 'Broadway Show', 'Central Park', 'Brooklyn Bridge']
  },
  {
    id: 'template-2',
    title: 'Weekend City Break',
    category: 'relaxation',
    duration: 'weekend',
    days: 3,
    description: 'Perfect for a quick city getaway with a mix of sightseeing and leisure activities.',
    image: "https://images.unsplash.com/photo-1591414846107-d8039a552467",
    imageAlt: 'Cozy city cafe with outdoor seating and people enjoying coffee',
    activities: 8,
    budget: 600,
    rating: 4.6,
    reviews: 156,
    tags: ['leisure', 'cafes', 'shopping', 'parks'],
    highlights: ['High Line Park', 'Local Markets', 'Rooftop Bars', 'Spa Day']
  },
  {
    id: 'template-3',
    title: 'Adventure Seeker\'s NYC',
    category: 'adventure',
    duration: 'week',
    days: 4,
    description: 'For thrill-seekers looking to experience NYC\'s more adventurous side.',
    image: "https://images.unsplash.com/photo-1733003083083-d4e4e3e048fc",
    imageAlt: 'Rock climbing wall in urban setting with city buildings in background',
    activities: 12,
    budget: 900,
    rating: 4.7,
    reviews: 89,
    tags: ['adventure', 'sports', 'outdoor', 'unique'],
    highlights: ['Rock Climbing', 'Kayaking', 'Bike Tours', 'Escape Rooms']
  },
  {
    id: 'template-4',
    title: 'Family Fun Week',
    category: 'family',
    duration: 'week',
    days: 6,
    description: 'Kid-friendly activities and attractions perfect for family vacations.',
    image: "https://images.unsplash.com/photo-1702814853992-f6b4628fcfae",
    imageAlt: 'Happy family with children walking through Central Park on sunny day',
    activities: 18,
    budget: 1500,
    rating: 4.9,
    reviews: 312,
    tags: ['family', 'kids', 'interactive', 'educational'],
    highlights: ['Children\'s Museum', 'Zoo Visit', 'Playground Tours', 'Interactive Shows']
  },
  {
    id: 'template-5',
    title: 'Romantic Getaway',
    category: 'romantic',
    duration: 'weekend',
    days: 3,
    description: 'Intimate experiences and romantic spots perfect for couples.',
    image: "https://images.unsplash.com/photo-1724785289853-2544e553f149",
    imageAlt: 'Romantic dinner setup with candles and city lights view from restaurant window',
    activities: 10,
    budget: 800,
    rating: 4.8,
    reviews: 178,
    tags: ['romantic', 'dining', 'sunset', 'intimate'],
    highlights: ['Fine Dining', 'Sunset Views', 'Couples Spa', 'Private Tours']
  },
  {
    id: 'template-6',
    title: 'Business Traveler Essentials',
    category: 'business',
    duration: 'weekend',
    days: 2,
    description: 'Efficient itinerary for business travelers with limited time.',
    image: "https://images.unsplash.com/photo-1713117408283-1cf3ae6bd86b",
    imageAlt: 'Modern business district with glass skyscrapers and professional atmosphere',
    activities: 6,
    budget: 400,
    rating: 4.5,
    reviews: 67,
    tags: ['business', 'efficient', 'networking', 'quick'],
    highlights: ['Business District', 'Networking Events', 'Quick Meals', 'Transport Hubs']
  }];


  const filteredTemplates = mockTemplates?.filter((template) => {
    const matchesCategory = selectedCategory === 'all' || template?.category === selectedCategory;
    const matchesDuration = selectedDuration === 'all' || template?.duration === selectedDuration;
    return matchesCategory && matchesDuration;
  });

  const handleSelectTemplate = (template) => {
    const itineraryFromTemplate = {
      id: `itinerary-${Date.now()}`,
      title: template?.title,
      destination: {
        name: 'New York City',
        country: 'United States',
        coordinates: { lat: 40.7128, lng: -74.0060 }
      },
      startDate: new Date()?.toISOString()?.split('T')?.[0],
      endDate: new Date(Date.now() + template.days * 24 * 60 * 60 * 1000)?.toISOString()?.split('T')?.[0],
      days: Array.from({ length: template?.days }, (_, index) => ({
        date: new Date(Date.now() + index * 24 * 60 * 60 * 1000)?.toLocaleDateString(),
        activities: []
      })),
      budget: {
        limit: template?.budget,
        expenses: []
      },
      collaborators: [],
      isTemplate: false,
      templateId: template?.id
    };

    onSelectTemplate(itineraryFromTemplate);
  };

  const getCategoryIcon = (categoryId) => {
    const category = categories?.find((cat) => cat?.id === categoryId);
    return category ? category?.icon : 'Grid3x3';
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg border border-border shadow-depth max-w-6xl w-full max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-foreground">Choose a Template</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}>

              <Icon name="X" size={20} />
            </Button>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-foreground">Category:</span>
              <div className="flex flex-wrap gap-1">
                {categories?.map((category) =>
                <Button
                  key={category?.id}
                  variant={selectedCategory === category?.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category?.id)}
                  iconName={category?.icon}
                  iconPosition="left">

                    {category?.label}
                  </Button>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-foreground">Duration:</span>
              <div className="flex flex-wrap gap-1">
                {durations?.map((duration) =>
                <Button
                  key={duration?.id}
                  variant={selectedDuration === duration?.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedDuration(duration?.id)}>

                    {duration?.label}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {/* Results Count */}
          <div className="mb-4">
            <p className="text-sm text-muted-foreground">
              {filteredTemplates?.length} templates found
            </p>
          </div>

          {/* Template Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates?.map((template) =>
            <div
              key={template?.id}
              className="bg-background border border-border rounded-lg overflow-hidden hover:shadow-floating transition-all duration-200">

                <div className="relative">
                  <Image
                  src={template?.image}
                  alt={template?.imageAlt}
                  className="w-full h-48 object-cover" />

                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-background/90 text-foreground">
                      <Icon name={getCategoryIcon(template?.category)} size={12} className="mr-1" />
                      {categories?.find((c) => c?.id === template?.category)?.label}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary text-primary-foreground">
                      {template?.days} Days
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-foreground line-clamp-1">
                      {template?.title}
                    </h3>
                    <div className="flex items-center space-x-1 text-sm text-muted-foreground ml-2">
                      <Icon name="Star" size={14} className="text-yellow-500" />
                      <span>{template?.rating}</span>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {template?.description}
                  </p>

                  <div className="grid grid-cols-3 gap-2 mb-3 text-center">
                    <div>
                      <div className="text-sm font-semibold text-foreground">{template?.activities}</div>
                      <div className="text-xs text-muted-foreground">Activities</div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground">${template?.budget}</div>
                      <div className="text-xs text-muted-foreground">Budget</div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground">{template?.reviews}</div>
                      <div className="text-xs text-muted-foreground">Reviews</div>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="mb-4">
                    <h4 className="text-xs font-medium text-foreground mb-2">Highlights:</h4>
                    <div className="flex flex-wrap gap-1">
                      {template?.highlights?.slice(0, 3)?.map((highlight, index) =>
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-muted text-muted-foreground">

                          {highlight}
                        </span>
                    )}
                      {template?.highlights?.length > 3 &&
                    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-muted text-muted-foreground">
                          +{template?.highlights?.length - 3}
                        </span>
                    }
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                    variant="default"
                    size="sm"
                    onClick={() => handleSelectTemplate(template)}
                    className="flex-1">

                      Use Template
                    </Button>
                    <Button
                    variant="outline"
                    size="icon">

                      <Icon name="Eye" size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {filteredTemplates?.length === 0 &&
          <div className="text-center py-12">
              <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No templates found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your filters to find more templates.
              </p>
              <Button
              variant="outline"
              onClick={() => {
                setSelectedCategory('all');
                setSelectedDuration('all');
              }}>

                Clear Filters
              </Button>
            </div>
          }
        </div>
      </div>
    </div>);

};

export default TemplateSelector;
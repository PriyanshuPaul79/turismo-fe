import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RelatedDestinations = () => {
  const relatedDestinations = [
  {
    id: 1,
    name: "Agra",
    state: "Uttar Pradesh",
    distance: "233 km",
    travelTime: "3-4 hours",
    rating: 4.7,
    reviewCount: 8420,
    image: "https://images.unsplash.com/photo-1660294119408-a0ddf71872e2",
    imageAlt: "White marble Taj Mahal with reflecting pools and cypress trees in foreground",
    highlights: ["Taj Mahal", "Agra Fort", "Fatehpur Sikri"],
    bestFor: ["History", "Architecture", "Photography"],
    priceRange: "₹2,500 - ₹8,000",
    description: "Home to the iconic Taj Mahal and rich Mughal heritage"
  },
  {
    id: 2,
    name: "Jaipur",
    state: "Rajasthan",
    distance: "280 km",
    travelTime: "4-5 hours",
    rating: 4.5,
    reviewCount: 12340,
    image: "https://images.unsplash.com/photo-1575188566830-ccc495d2f7af",
    imageAlt: "Pink sandstone Hawa Mahal palace with intricate latticed windows and balconies",
    highlights: ["Hawa Mahal", "Amber Fort", "City Palace"],
    bestFor: ["Culture", "Shopping", "Palaces"],
    priceRange: "₹3,000 - ₹12,000",
    description: "The Pink City known for its stunning palaces and vibrant culture"
  },
  {
    id: 3,
    name: "Rishikesh",
    state: "Uttarakhand",
    distance: "240 km",
    travelTime: "5-6 hours",
    rating: 4.4,
    reviewCount: 6780,
    image: "https://images.unsplash.com/photo-1696466832941-f67020866ed5",
    imageAlt: "Sacred Ganges river flowing through mountains with suspension bridge and temples",
    highlights: ["Ganga Aarti", "Adventure Sports", "Yoga Retreats"],
    bestFor: ["Spirituality", "Adventure", "Nature"],
    priceRange: "₹1,500 - ₹6,000",
    description: "Spiritual capital and adventure hub in the Himalayan foothills"
  },
  {
    id: 4,
    name: "Amritsar",
    state: "Punjab",
    distance: "450 km",
    travelTime: "6-7 hours",
    rating: 4.6,
    reviewCount: 9560,
    image: "https://images.unsplash.com/photo-1730620775699-cf6a9d789de5",
    imageAlt: "Golden Temple with golden dome reflecting in sacred pool surrounded by white marble",
    highlights: ["Golden Temple", "Wagah Border", "Jallianwala Bagh"],
    bestFor: ["Spirituality", "History", "Food"],
    priceRange: "₹2,000 - ₹7,500",
    description: "Sacred Sikh city famous for the Golden Temple and rich history"
  }];


  const similarPlaces = [
  {
    id: 1,
    name: "Mumbai",
    type: "Metropolitan City",
    similarity: "95%",
    image: "https://images.unsplash.com/photo-1545631078-a2b3fe500e2d",
    imageAlt: "Mumbai skyline with modern skyscrapers and colonial architecture along the waterfront",
    reasons: ["Urban Culture", "Historical Sites", "Street Food", "Diverse Population"]
  },
  {
    id: 2,
    name: "Kolkata",
    type: "Cultural Capital",
    similarity: "88%",
    image: "https://images.unsplash.com/photo-1683184839603-45e44c80ca8f",
    imageAlt: "Victorian architecture and colonial buildings lining busy Kolkata street with trams",
    reasons: ["Colonial Architecture", "Cultural Heritage", "Art Scene", "Literary History"]
  },
  {
    id: 3,
    name: "Hyderabad",
    type: "Historic City",
    similarity: "82%",
    image: "https://images.unsplash.com/photo-1681731777927-3fac20d54372",
    imageAlt: "Charminar monument with four minarets and arches in bustling old city market",
    reasons: ["Mughal Heritage", "Food Culture", "Modern Development", "Tech Hub"]
  }];


  return (
    <div className="space-y-8">
      {/* Related Destinations */}
      <div className="bg-card rounded-lg shadow-subtle p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-headline font-semibold text-foreground mb-2">
              Nearby Destinations
            </h3>
            <p className="text-muted-foreground">
              Perfect for extending your journey from Delhi
            </p>
          </div>
          <Button variant="outline">
            <Icon name="Map" size={16} className="mr-2" />
            View on Map
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {relatedDestinations?.map((destination) =>
          <div
            key={destination?.id}
            className="border border-border rounded-lg p-4 hover:shadow-subtle transition-all duration-200 cursor-pointer group">

              <div className="flex space-x-4">
                <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                  src={destination?.image}
                  alt={destination?.imageAlt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200" />

                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-foreground">{destination?.name}</h4>
                      <p className="text-sm text-muted-foreground">{destination?.state}</p>
                    </div>
                    <div className="flex items-center space-x-1 text-sm">
                      <Icon name="Star" size={14} className="fill-yellow-400 text-yellow-400" />
                      <span className="text-muted-foreground">{destination?.rating}</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {destination?.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground mb-3">
                    <div className="flex items-center space-x-1">
                      <Icon name="MapPin" size={12} />
                      <span>{destination?.distance}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Clock" size={12} />
                      <span>{destination?.travelTime}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="IndianRupee" size={12} />
                      <span>{destination?.priceRange}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="MessageSquare" size={12} />
                      <span>{destination?.reviewCount} reviews</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {destination?.bestFor?.slice(0, 2)?.map((tag, index) =>
                  <span
                    key={index}
                    className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">

                        {tag}
                      </span>
                  )}
                  </div>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex items-center justify-between">
                  <div className="text-xs text-muted-foreground">
                    <span className="font-medium">Top attractions:</span> {destination?.highlights?.join(", ")}
                  </div>
                  <Button variant="ghost" size="sm" className="text-primary hover:text-primary">
                    <Icon name="ArrowRight" size={14} />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Similar Places */}
      <div className="bg-card rounded-lg shadow-subtle p-6">
        <div className="mb-6">
          <h3 className="text-xl font-headline font-semibold text-foreground mb-2">
            Similar Destinations
          </h3>
          <p className="text-muted-foreground">
            Cities with similar culture and experiences
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {similarPlaces?.map((place) =>
          <div
            key={place?.id}
            className="border border-border rounded-lg p-4 hover:shadow-subtle transition-all duration-200 cursor-pointer group">

              <div className="w-full h-32 rounded-lg overflow-hidden mb-4">
                <Image
                src={place?.image}
                alt={place?.imageAlt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200" />

              </div>
              
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-semibold text-foreground">{place?.name}</h4>
                  <p className="text-sm text-muted-foreground">{place?.type}</p>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="TrendingUp" size={14} className="text-success" />
                  <span className="text-sm text-success font-medium">{place?.similarity}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <h5 className="text-sm font-medium text-foreground">Similar because of:</h5>
                <div className="flex flex-wrap gap-1">
                  {place?.reasons?.map((reason, index) =>
                <span
                  key={index}
                  className="px-2 py-0.5 bg-secondary/10 text-secondary text-xs rounded-full">

                      {reason}
                    </span>
                )}
                </div>
              </div>
              
              <div className="mt-4 pt-3 border-t border-border">
                <Button variant="ghost" size="sm" fullWidth className="text-primary hover:text-primary">
                  <span>Explore {place?.name}</span>
                  <Icon name="ArrowRight" size={14} className="ml-2" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Travel Planning CTA */}
      <div className="bg-gradient-cultural rounded-lg p-6 text-white">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-headline font-semibold mb-2">
              Plan Your Multi-City Journey
            </h3>
            <p className="text-white/90">
              Create a custom itinerary combining Delhi with nearby destinations
            </p>
          </div>
          <div className="flex space-x-3">
            <Button variant="secondary">
              <Icon name="Route" size={16} className="mr-2" />
              Build Itinerary
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
              <Icon name="Calendar" size={16} className="mr-2" />
              Check Dates
            </Button>
          </div>
        </div>
      </div>
    </div>);

};

export default RelatedDestinations;
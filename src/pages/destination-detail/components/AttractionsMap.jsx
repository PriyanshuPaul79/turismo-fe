import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const AttractionsMap = ({ destination }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedAttraction, setSelectedAttraction] = useState(null);

  const categories = [
  { id: 'all', name: 'All Attractions', icon: 'MapPin', count: 12 },
  { id: 'historical', name: 'Historical', icon: 'Castle', count: 4 },
  { id: 'cultural', name: 'Cultural', icon: 'Palette', count: 3 },
  { id: 'nature', name: 'Nature', icon: 'Trees', count: 3 },
  { id: 'entertainment', name: 'Entertainment', icon: 'Music', count: 2 }];


  const attractions = [
  {
    id: 1,
    name: "Red Fort",
    category: "historical",
    rating: 4.6,
    reviews: 15420,
    distance: "2.1 km",
    duration: "2-3 hours",
    price: "₹35",
    image: "https://images.unsplash.com/photo-1700158964288-5546c966377c",
    imageAlt: "Red sandstone walls and towers of the historic Red Fort against blue sky",
    description: "UNESCO World Heritage site and former Mughal imperial residence",
    coordinates: { lat: 28.6562, lng: 77.2410 },
    openHours: "9:30 AM - 4:30 PM",
    highlights: ["Mughal Architecture", "Light & Sound Show", "Museums"]
  },
  {
    id: 2,
    name: "India Gate",
    category: "historical",
    rating: 4.4,
    reviews: 8930,
    distance: "3.5 km",
    duration: "1-2 hours",
    price: "Free",
    image: "https://images.unsplash.com/photo-1600615237468-14076f10dce2",
    imageAlt: "Tall stone archway memorial monument India Gate with green lawns in foreground",
    description: "War memorial dedicated to Indian soldiers",
    coordinates: { lat: 28.6129, lng: 77.2295 },
    openHours: "24 hours",
    highlights: ["War Memorial", "Evening Illumination", "Rajpath Views"]
  },
  {
    id: 3,
    name: "Lotus Temple",
    category: "cultural",
    rating: 4.5,
    reviews: 12340,
    distance: "8.2 km",
    duration: "1-2 hours",
    price: "Free",
    image: "https://images.unsplash.com/photo-1652410386908-c23b8223962e",
    imageAlt: "White lotus-shaped modern temple with curved petals against clear sky",
    description: "Bahá\'í House of Worship known for its lotus-like architecture",
    coordinates: { lat: 28.5535, lng: 77.2588 },
    openHours: "9:00 AM - 7:00 PM",
    highlights: ["Unique Architecture", "Meditation", "Gardens"]
  },
  {
    id: 4,
    name: "Humayun\'s Tomb",
    category: "historical",
    rating: 4.3,
    reviews: 6780,
    distance: "5.1 km",
    duration: "2-3 hours",
    price: "₹40",
    image: "https://images.unsplash.com/photo-1686750316462-a3ee47f5f6fe",
    imageAlt: "Ornate Mughal tomb with red sandstone and white marble dome surrounded by gardens",
    description: "Magnificent Mughal tomb and UNESCO World Heritage site",
    coordinates: { lat: 28.5933, lng: 77.2507 },
    openHours: "6:00 AM - 6:00 PM",
    highlights: ["Mughal Gardens", "Architecture", "Photography"]
  },
  {
    id: 5,
    name: "Lodhi Gardens",
    category: "nature",
    rating: 4.2,
    reviews: 4560,
    distance: "4.8 km",
    duration: "2-4 hours",
    price: "Free",
    image: "https://images.unsplash.com/photo-1652447641562-f92263c19fa0",
    imageAlt: "Lush green park with ancient stone tombs and walking paths under trees",
    description: "Historic park with medieval tombs and beautiful gardens",
    coordinates: { lat: 28.5918, lng: 77.2219 },
    openHours: "5:00 AM - 8:00 PM",
    highlights: ["Morning Walks", "Historical Tombs", "Picnics"]
  },
  {
    id: 6,
    name: "National Museum",
    category: "cultural",
    rating: 4.1,
    reviews: 3240,
    distance: "3.2 km",
    duration: "3-4 hours",
    price: "₹20",
    image: "https://images.unsplash.com/photo-1666272114556-e3a7b37a49ad",
    imageAlt: "Classical museum building with columns and steps illuminated at night",
    description: "Premier museum showcasing India\'s cultural heritage",
    coordinates: { lat: 28.6118, lng: 77.2194 },
    openHours: "10:00 AM - 6:00 PM",
    highlights: ["Ancient Artifacts", "Sculptures", "Manuscripts"]
  }];


  const filteredAttractions = selectedCategory === 'all' ?
  attractions :
  attractions?.filter((attraction) => attraction?.category === selectedCategory);

  return (
    <div className="bg-card rounded-lg shadow-subtle overflow-hidden">
      <div className="p-6 border-b border-border">
        <h3 className="text-xl font-headline font-semibold text-foreground mb-4">
          Attractions & Places to Visit
        </h3>
        
        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {categories?.map((category) =>
          <button
            key={category?.id}
            onClick={() => setSelectedCategory(category?.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            selectedCategory === category?.id ?
            'bg-primary text-primary-foreground shadow-subtle' :
            'bg-muted hover:bg-muted/80 text-muted-foreground'}`
            }>

              <Icon name={category?.icon} size={16} />
              <span>{category?.name}</span>
              <span className="bg-black/10 px-2 py-0.5 rounded-full text-xs">
                {category?.count}
              </span>
            </button>
          )}
        </div>
      </div>
      <div className="grid lg:grid-cols-2 gap-0">
        {/* Map Section */}
        <div className="h-96 lg:h-[500px] relative bg-muted">
          <iframe
            width="100%"
            height="100%"
            loading="lazy"
            title={`${destination?.name} Attractions Map`}
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps?q=${destination?.coordinates?.lat},${destination?.coordinates?.lng}&z=13&output=embed`}
            className="w-full h-full" />

          
          {/* Map Overlay Controls */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-subtle">
              <div className="flex items-center space-x-2 text-sm">
                <Icon name="MapPin" size={16} className="text-primary" />
                <span className="font-medium">{filteredAttractions?.length} attractions</span>
              </div>
            </div>
            
            <Button
              variant="secondary"
              size="sm"
              className="bg-white/90 backdrop-blur-sm">

              <Icon name="Navigation" size={16} className="mr-2" />
              Get Directions
            </Button>
          </div>
        </div>

        {/* Attractions List */}
        <div className="h-96 lg:h-[500px] overflow-y-auto">
          <div className="p-4 space-y-4">
            {filteredAttractions?.map((attraction) =>
            <div
              key={attraction?.id}
              className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
              selectedAttraction?.id === attraction?.id ?
              'border-primary bg-primary/5' : 'border-border hover:border-primary/50 hover:shadow-subtle'}`
              }
              onClick={() => setSelectedAttraction(attraction)}>

                <div className="flex space-x-4">
                  <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                    src={attraction?.image}
                    alt={attraction?.imageAlt}
                    className="w-full h-full object-cover" />

                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-foreground truncate">
                        {attraction?.name}
                      </h4>
                      <div className="flex items-center space-x-1 text-sm text-muted-foreground ml-2">
                        <Icon name="Star" size={14} className="fill-yellow-400 text-yellow-400" />
                        <span>{attraction?.rating}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {attraction?.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Icon name="MapPin" size={12} />
                          <span>{attraction?.distance}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Icon name="Clock" size={12} />
                          <span>{attraction?.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Icon name="Ticket" size={12} />
                          <span>{attraction?.price}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Expanded Details */}
                {selectedAttraction?.id === attraction?.id &&
              <div className="mt-4 pt-4 border-t border-border">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <h5 className="text-sm font-medium text-foreground mb-1">Opening Hours</h5>
                        <p className="text-sm text-muted-foreground">{attraction?.openHours}</p>
                      </div>
                      <div>
                        <h5 className="text-sm font-medium text-foreground mb-1">Reviews</h5>
                        <p className="text-sm text-muted-foreground">{attraction?.reviews?.toLocaleString()} reviews</p>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h5 className="text-sm font-medium text-foreground mb-2">Highlights</h5>
                      <div className="flex flex-wrap gap-2">
                        {attraction?.highlights?.map((highlight, index) =>
                    <span
                      key={index}
                      className="px-2 py-1 bg-secondary/10 text-secondary text-xs rounded-full">

                            {highlight}
                          </span>
                    )}
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Icon name="BookOpen" size={14} className="mr-2" />
                        Learn More
                      </Button>
                      <Button variant="default" size="sm" className="flex-1">
                        <Icon name="Plus" size={14} className="mr-2" />
                        Add to Trip
                      </Button>
                    </div>
                  </div>
              }
              </div>
            )}
          </div>
        </div>
      </div>
    </div>);

};

export default AttractionsMap;
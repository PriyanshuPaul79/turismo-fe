import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const PersonalizedRecommendations = () => {
  const navigate = useNavigate();
  const [currentUser] = useState({ name: "Alex", preferences: ["beaches", "culture", "adventure"] });
  const [recommendations, setRecommendations] = useState([]);

  const mockRecommendations = [
  {
    id: 1,
    title: "Santorini, Greece",
    subtitle: "Perfect for sunset lovers",
    image: "https://images.unsplash.com/photo-1662121783914-9ee843f21504",
    alt: "White-washed buildings with blue domes overlooking the Aegean Sea during golden hour in Santorini",
    aiScore: 95,
    matchReason: "Based on your love for beaches and photography",
    highlights: ["Iconic sunsets", "Volcanic beaches", "Cycladic architecture"],
    price: "$1,200",
    duration: "5 days",
    category: "Romantic Getaway",
    trending: true
  },
  {
    id: 2,
    title: "Kyoto, Japan",
    subtitle: "Cultural immersion awaits",
    image: "https://images.unsplash.com/photo-1723489078672-72b701631d1f",
    alt: "Traditional red torii gates creating a tunnel pathway through forest at Fushimi Inari shrine",
    aiScore: 92,
    matchReason: "Perfect match for cultural exploration",
    highlights: ["Ancient temples", "Traditional gardens", "Geisha districts"],
    price: "$1,800",
    duration: "7 days",
    category: "Cultural Discovery",
    trending: false
  },
  {
    id: 3,
    title: "Queenstown, New Zealand",
    subtitle: "Adventure capital of the world",
    image: "https://images.unsplash.com/photo-1728293385974-9913da06237b",
    alt: "Dramatic mountain landscape reflected in pristine lake with adventure sports equipment visible",
    aiScore: 89,
    matchReason: "Matches your adventure-seeking spirit",
    highlights: ["Bungee jumping", "Scenic flights", "Wine tours"],
    price: "$2,100",
    duration: "6 days",
    category: "Adventure Sports",
    trending: true
  },
  {
    id: 4,
    title: "Bali, Indonesia",
    subtitle: "Tropical paradise with culture",
    image: "https://images.unsplash.com/photo-1484275013743-eb3eb8f37ad5",
    alt: "Lush green rice terraces cascading down hillsides with traditional Balinese temple in background",
    aiScore: 94,
    matchReason: "Combines beaches, culture, and relaxation",
    highlights: ["Rice terraces", "Beach clubs", "Hindu temples"],
    price: "$900",
    duration: "8 days",
    category: "Tropical Escape",
    trending: true
  }];


  useEffect(() => {
    // Simulate AI recommendation loading
    const timer = setTimeout(() => {
      setRecommendations(mockRecommendations);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleDestinationClick = (destination) => {
    navigate(`/destination-detail?id=${destination?.id}&name=${encodeURIComponent(destination?.title)}`);
  };

  const handleSaveDestination = (e, destinationId) => {
    e?.stopPropagation();
    // Mock save functionality
    console.log(`Saved destination ${destinationId}`);
  };

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Icon name="Sparkles" size={32} className="text-secondary mr-3" />
            <h2 className="text-4xl font-headline font-bold text-foreground">
              Curated Just for You, {currentUser?.name}
            </h2>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our AI has analyzed your preferences and travel history to recommend these perfect destinations
          </p>
          <div className="flex items-center justify-center mt-4 space-x-2">
            <Icon name="Brain" size={20} className="text-accent" />
            <span className="text-sm font-medium text-accent">AI-Powered Recommendations</span>
          </div>
        </div>

        {/* Recommendations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {recommendations?.map((destination) =>
          <div
            key={destination?.id}
            onClick={() => handleDestinationClick(destination)}
            className="group cursor-pointer bg-card rounded-2xl overflow-hidden shadow-subtle hover:shadow-floating transition-all duration-300 transform hover:-translate-y-2">

              {/* Image Container */}
              <div className="relative h-48 overflow-hidden">
                <Image
                src={destination?.image}
                alt={destination?.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />

                
                {/* Overlays */}
                <div className="absolute top-3 left-3 flex items-center space-x-2">
                  {destination?.trending &&
                <span className="bg-conversion text-conversion-foreground px-2 py-1 rounded-full text-xs font-medium">
                      Trending
                    </span>
                }
                  <span className="bg-success text-success-foreground px-2 py-1 rounded-full text-xs font-medium">
                    {destination?.aiScore}% Match
                  </span>
                </div>

                <button
                onClick={(e) => handleSaveDestination(e, destination?.id)}
                className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors duration-200">

                  <Icon name="Heart" size={16} className="text-muted-foreground hover:text-error" />
                </button>

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <span className="text-white text-sm font-medium bg-black/30 px-2 py-1 rounded">
                    {destination?.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="mb-3">
                  <h3 className="text-lg font-headline font-bold text-card-foreground mb-1">
                    {destination?.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {destination?.subtitle}
                  </p>
                </div>

                {/* AI Match Reason */}
                <div className="mb-4 p-3 bg-muted rounded-lg">
                  <div className="flex items-start space-x-2">
                    <Icon name="Brain" size={16} className="text-accent mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-muted-foreground">
                      {destination?.matchReason}
                    </p>
                  </div>
                </div>

                {/* Highlights */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {destination?.highlights?.slice(0, 3)?.map((highlight, index) =>
                  <span
                    key={index}
                    className="text-xs bg-secondary/20 text-secondary-foreground px-2 py-1 rounded-full">

                        {highlight}
                      </span>
                  )}
                  </div>
                </div>

                {/* Price and Duration */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Icon name="DollarSign" size={16} className="text-muted-foreground" />
                      <span className="text-sm font-medium text-card-foreground">
                        {destination?.price}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Clock" size={16} className="text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {destination?.duration}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <Button
                variant="outline"
                fullWidth
                className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-200"
                iconName="ArrowRight"
                iconPosition="right">

                  Explore Details
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button
            variant="default"
            onClick={() => navigate('/explore')}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
            iconName="Compass"
            iconPosition="left">

            Discover More Destinations
          </Button>
        </div>
      </div>
    </section>);

};

export default PersonalizedRecommendations;
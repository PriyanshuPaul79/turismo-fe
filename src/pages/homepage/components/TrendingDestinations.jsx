import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const TrendingDestinations = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const trendingDestinations = [
  {
    id: 1,
    name: "Dubai, UAE",
    country: "United Arab Emirates",
    image: "https://images.unsplash.com/photo-1617455156045-47312ebf06a1",
    alt: "Modern Dubai skyline with Burj Khalifa tower and luxury hotels reflected in water during sunset",
    trendScore: 98,
    bookings: "2,847",
    timeframe: "this week",
    highlights: ["Luxury shopping", "Desert safari", "Modern architecture"],
    season: "Perfect weather now",
    priceRange: "$$$",
    category: "Luxury",
    badge: "Hot Destination"
  },
  {
    id: 2,
    name: "Reykjavik, Iceland",
    country: "Iceland",
    image: "https://images.unsplash.com/photo-1537267150314-9d1c1fc323eb",
    alt: "Colorful Nordic houses along waterfront with snow-capped mountains in background during winter",
    trendScore: 94,
    bookings: "1,923",
    timeframe: "this week",
    highlights: ["Northern lights", "Blue lagoon", "Volcanic landscapes"],
    season: "Aurora season",
    priceRange: "$$",
    category: "Adventure",
    badge: "Seasonal Favorite"
  },
  {
    id: 3,
    name: "Marrakech, Morocco",
    country: "Morocco",
    image: "https://images.unsplash.com/photo-1675618102321-4ffd62940fce",
    alt: "Traditional Moroccan architecture with intricate geometric patterns and warm desert colors in medina",
    trendScore: 91,
    bookings: "1,654",
    timeframe: "this week",
    highlights: ["Souks & markets", "Riads", "Sahara tours"],
    season: "Ideal temperature",
    priceRange: "$",
    category: "Cultural",
    badge: "Rising Star"
  },
  {
    id: 4,
    name: "Tulum, Mexico",
    country: "Mexico",
    image: "https://images.unsplash.com/photo-1663533973344-31ce6f38dd6e",
    alt: "Ancient Mayan ruins perched on cliff overlooking turquoise Caribbean waters and white sand beach",
    trendScore: 89,
    bookings: "2,156",
    timeframe: "this week",
    highlights: ["Mayan ruins", "Cenotes", "Beach clubs"],
    season: "Dry season",
    priceRange: "$$",
    category: "Beach & Culture",
    badge: "Instagram Favorite"
  },
  {
    id: 5,
    name: "Seoul, South Korea",
    country: "South Korea",
    image: "https://images.unsplash.com/photo-1595685780879-e0193e44cb7f",
    alt: "Modern Seoul cityscape at night with illuminated skyscrapers and traditional palace in foreground",
    trendScore: 87,
    bookings: "1,789",
    timeframe: "this week",
    highlights: ["K-culture", "Street food", "Technology"],
    season: "Cherry blossom prep",
    priceRange: "$$",
    category: "Urban Culture",
    badge: "Trending Now"
  },
  {
    id: 6,
    name: "Lisbon, Portugal",
    country: "Portugal",
    image: "https://images.unsplash.com/photo-1714199544321-72f7e02893d2",
    alt: "Colorful Portuguese buildings on hillside with traditional yellow tram on cobblestone street",
    trendScore: 85,
    bookings: "1,432",
    timeframe: "this week",
    highlights: ["Historic trams", "Pastéis de nata", "Fado music"],
    season: "Mild weather",
    priceRange: "$",
    category: "Historic Charm",
    badge: "Hidden Gem"
  }];


  const itemsPerSlide = 3;
  const totalSlides = Math.ceil(trendingDestinations?.length / itemsPerSlide);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, totalSlides]);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    setIsAutoPlaying(false);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
    setIsAutoPlaying(false);
  };

  const handleDestinationClick = (destination) => {
    navigate(`/destination-detail?id=${destination?.id}&name=${encodeURIComponent(destination?.name)}`);
  };

  const getCurrentSlideDestinations = () => {
    const startIndex = currentSlide * itemsPerSlide;
    return trendingDestinations?.slice(startIndex, startIndex + itemsPerSlide);
  };

  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <div className="flex items-center mb-4">
              <Icon name="TrendingUp" size={32} className="text-conversion mr-3" />
              <h2 className="text-4xl font-headline font-bold text-foreground">
                Trending Destinations
              </h2>
            </div>
            <p className="text-xl text-muted-foreground">
              Discover where fellow travelers are heading this season
            </p>
            <div className="flex items-center mt-2 space-x-4">
              <div className="flex items-center space-x-2">
                <Icon name="Users" size={16} className="text-success" />
                <span className="text-sm text-success font-medium">
                  8,901 bookings this week
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={16} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Updated 2 hours ago
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="hidden md:flex items-center space-x-3">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrevSlide}
              className="w-12 h-12 rounded-full">

              <Icon name="ChevronLeft" size={20} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleNextSlide}
              className="w-12 h-12 rounded-full">

              <Icon name="ChevronRight" size={20} />
            </Button>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}>

            {Array.from({ length: totalSlides })?.map((_, slideIndex) =>
            <div key={slideIndex} className="w-full flex-shrink-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {trendingDestinations?.slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide)?.map((destination) =>
                <div
                  key={destination?.id}
                  onClick={() => handleDestinationClick(destination)}
                  className="group cursor-pointer bg-card rounded-2xl overflow-hidden shadow-subtle hover:shadow-floating transition-all duration-300 transform hover:-translate-y-1">

                        {/* Image Container */}
                        <div className="relative h-56 overflow-hidden">
                          <Image
                      src={destination?.image}
                      alt={destination?.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />

                          
                          {/* Trend Badge */}
                          <div className="absolute top-4 left-4">
                            <span className="bg-conversion text-conversion-foreground px-3 py-1 rounded-full text-xs font-bold">
                              #{destination?.trendScore}
                            </span>
                          </div>

                          {/* Category Badge */}
                          <div className="absolute top-4 right-4">
                            <span className="bg-white/90 backdrop-blur-sm text-foreground px-2 py-1 rounded-full text-xs font-medium">
                              {destination?.badge}
                            </span>
                          </div>

                          {/* Gradient Overlay */}
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent h-24"></div>
                          
                          {/* Booking Stats */}
                          <div className="absolute bottom-4 left-4 text-white">
                            <div className="flex items-center space-x-2">
                              <Icon name="Users" size={14} />
                              <span className="text-sm font-medium">
                                {destination?.bookings} bookings {destination?.timeframe}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                          <div className="mb-4">
                            <h3 className="text-xl font-headline font-bold text-card-foreground mb-1">
                              {destination?.name}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {destination?.country}
                            </p>
                          </div>

                          {/* Season & Price */}
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-2">
                              <Icon name="Sun" size={16} className="text-warning" />
                              <span className="text-sm font-medium text-warning">
                                {destination?.season}
                              </span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <span className="text-lg font-bold text-success">
                                {destination?.priceRange}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {destination?.category}
                              </span>
                            </div>
                          </div>

                          {/* Highlights */}
                          <div className="mb-4">
                            <div className="flex flex-wrap gap-2">
                              {destination?.highlights?.map((highlight, index) =>
                        <span
                          key={index}
                          className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">

                                  {highlight}
                                </span>
                        )}
                            </div>
                          </div>

                          {/* Action Button */}
                          <Button
                      variant="outline"
                      fullWidth
                      className="group-hover:bg-conversion group-hover:text-conversion-foreground group-hover:border-conversion transition-all duration-200"
                      iconName="TrendingUp"
                      iconPosition="right">

                            Join the Trend
                          </Button>
                        </div>
                      </div>
                )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: totalSlides })?.map((_, index) =>
          <button
            key={index}
            onClick={() => {
              setCurrentSlide(index);
              setIsAutoPlaying(false);
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
            index === currentSlide ?
            'bg-conversion shadow-lg' :
            'bg-muted-foreground/30 hover:bg-muted-foreground/50'}`
            } />

          )}
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden justify-center mt-6 space-x-4">
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrevSlide}
            className="w-12 h-12 rounded-full">

            <Icon name="ChevronLeft" size={20} />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleNextSlide}
            className="w-12 h-12 rounded-full">

            <Icon name="ChevronRight" size={20} />
          </Button>
        </div>

        {/* View All Button */}
        <div className="text-center mt-8">
          <Button
            variant="default"
            onClick={() => navigate('/explore?filter=trending')}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
            iconName="Compass"
            iconPosition="left">

            Explore All Trending Destinations
          </Button>
        </div>
      </div>
    </section>);

};

export default TrendingDestinations;
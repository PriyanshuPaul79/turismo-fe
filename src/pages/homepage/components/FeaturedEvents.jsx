import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const FeaturedEvents = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const eventCategories = [
  { id: 'all', name: 'All Events', icon: 'Calendar' },
  { id: 'festivals', name: 'Festivals', icon: 'Music' },
  { id: 'cultural', name: 'Cultural', icon: 'Users' },
  { id: 'seasonal', name: 'Seasonal', icon: 'Sun' },
  { id: 'adventure', name: 'Adventure', icon: 'Mountain' }];


  const featuredEvents = [
  {
    id: 1,
    title: "Holi Festival of Colors",
    location: "Mathura, India",
    date: "2025-03-14",
    endDate: "2025-03-15",
    image: "https://images.unsplash.com/photo-1617971932515-912d8463d605",
    alt: "Vibrant crowd celebrating Holi festival with colorful powder in the air and joyful faces",
    category: "festivals",
    type: "Cultural Festival",
    duration: "2 days",
    attendees: "50,000+",
    price: "Free",
    highlights: ["Color throwing", "Traditional music", "Street food"],
    culturalContext: "Ancient Hindu festival celebrating spring and love",
    bookingAvailable: true,
    featured: true
  },
  {
    id: 2,
    title: "Cherry Blossom Festival",
    location: "Tokyo, Japan",
    date: "2025-03-25",
    endDate: "2025-04-10",
    image: "https://images.unsplash.com/photo-1727417592257-e78bd4bdf269",
    alt: "Pink cherry blossom trees in full bloom with people having picnics underneath in Japanese park",
    category: "seasonal",
    type: "Seasonal Celebration",
    duration: "16 days",
    attendees: "2M+",
    price: "Free",
    highlights: ["Hanami picnics", "Night illuminations", "Traditional performances"],
    culturalContext: "Centuries-old tradition of appreciating fleeting beauty",
    bookingAvailable: false,
    featured: true
  },
  {
    id: 3,
    title: "Oktoberfest",
    location: "Munich, Germany",
    date: "2025-09-21",
    endDate: "2025-10-06",
    image: "https://images.unsplash.com/photo-1663059365551-ef41747f3c06",
    alt: "Traditional German beer hall with people in lederhosen and dirndls celebrating with large beer steins",
    category: "festivals",
    type: "Beer Festival",
    duration: "16 days",
    attendees: "6M+",
    price: "€25-45",
    highlights: ["Traditional beer", "Bavarian music", "Local cuisine"],
    culturalContext: "World\'s largest beer festival and folk celebration",
    bookingAvailable: true,
    featured: false
  },
  {
    id: 4,
    title: "Northern Lights Season",
    location: "Tromsø, Norway",
    date: "2024-11-01",
    endDate: "2025-03-31",
    image: "https://images.unsplash.com/photo-1723618214855-c0dfdc93c886",
    alt: "Green and purple aurora borealis dancing across star-filled night sky over snow-covered landscape",
    category: "seasonal",
    type: "Natural Phenomenon",
    duration: "5 months",
    attendees: "100,000+",
    price: "$150-300",
    highlights: ["Aurora viewing", "Dog sledding", "Ice hotels"],
    culturalContext: "Indigenous Sami culture and Arctic traditions",
    bookingAvailable: true,
    featured: true
  },
  {
    id: 5,
    title: "Diwali Festival of Lights",
    location: "Jaipur, India",
    date: "2025-10-20",
    endDate: "2025-10-24",
    image: "https://images.unsplash.com/photo-1563647501208-fed5465b2735",
    alt: "Ornate Indian palace illuminated with thousands of oil lamps and colorful lights during Diwali celebration",
    category: "cultural",
    type: "Religious Festival",
    duration: "5 days",
    attendees: "200,000+",
    price: "Free",
    highlights: ["Light displays", "Fireworks", "Traditional sweets"],
    culturalContext: "Hindu festival symbolizing victory of light over darkness",
    bookingAvailable: true,
    featured: false
  },
  {
    id: 6,
    title: "Everest Base Camp Trek Season",
    location: "Nepal Himalayas",
    date: "2025-03-01",
    endDate: "2025-05-31",
    image: "https://images.unsplash.com/photo-1587001667907-8d0b44c898cb",
    alt: "Dramatic mountain peaks of Everest range with trekkers on trail and prayer flags in foreground",
    category: "adventure",
    type: "Trekking Season",
    duration: "3 months",
    attendees: "35,000+",
    price: "$1,200-3,000",
    highlights: ["Mountain views", "Sherpa culture", "Base camp"],
    culturalContext: "Sacred mountains in Buddhist and Hindu traditions",
    bookingAvailable: true,
    featured: true
  }];


  const filteredEvents = selectedCategory === 'all' ?
  featuredEvents :
  featuredEvents?.filter((event) => event?.category === selectedCategory);

  const handleEventClick = (event) => {
    navigate(`/events?id=${event?.id}&name=${encodeURIComponent(event?.title)}`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const isUpcoming = (dateString) => {
    const eventDate = new Date(dateString);
    const now = new Date();
    return eventDate > now;
  };

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Icon name="Calendar" size={32} className="text-accent mr-3" />
            <h2 className="text-4xl font-headline font-bold text-foreground">
              Featured Events & Festivals
            </h2>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Immerse yourself in authentic cultural experiences and seasonal celebrations around the world
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {eventCategories?.map((category) =>
          <Button
            key={category?.id}
            variant={selectedCategory === category?.id ? "default" : "outline"}
            onClick={() => setSelectedCategory(category?.id)}
            className={`${
            selectedCategory === category?.id ?
            'bg-accent text-accent-foreground' :
            'hover:bg-accent/10'} transition-all duration-200`
            }
            iconName={category?.icon}
            iconPosition="left">

              {category?.name}
            </Button>
          )}
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredEvents?.map((event) =>
          <div
            key={event?.id}
            onClick={() => handleEventClick(event)}
            className="group cursor-pointer bg-card rounded-2xl overflow-hidden shadow-subtle hover:shadow-floating transition-all duration-300 transform hover:-translate-y-2">

              {/* Image Container */}
              <div className="relative h-56 overflow-hidden">
                <Image
                src={event?.image}
                alt={event?.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />

                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col space-y-2">
                  {event?.featured &&
                <span className="bg-conversion text-conversion-foreground px-3 py-1 rounded-full text-xs font-bold">
                      Featured
                    </span>
                }
                  {isUpcoming(event?.date) &&
                <span className="bg-success text-success-foreground px-3 py-1 rounded-full text-xs font-medium">
                      Upcoming
                    </span>
                }
                </div>

                {/* Price Badge */}
                <div className="absolute top-4 right-4">
                  <span className="bg-white/90 backdrop-blur-sm text-foreground px-3 py-1 rounded-full text-sm font-bold">
                    {event?.price}
                  </span>
                </div>

                {/* Gradient Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent h-32"></div>
                
                {/* Event Type */}
                <div className="absolute bottom-4 left-4 text-white">
                  <span className="text-sm font-medium bg-black/50 px-2 py-1 rounded">
                    {event?.type}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-headline font-bold text-card-foreground mb-2">
                    {event?.title}
                  </h3>
                  <div className="flex items-center space-x-2 text-muted-foreground mb-2">
                    <Icon name="MapPin" size={16} />
                    <span className="text-sm">{event?.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Icon name="Calendar" size={16} />
                    <span className="text-sm">
                      {formatDate(event?.date)}
                      {event?.endDate && event?.endDate !== event?.date &&
                    ` - ${formatDate(event?.endDate)}`
                    }
                    </span>
                  </div>
                </div>

                {/* Cultural Context */}
                <div className="mb-4 p-3 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground italic">
                    {event?.culturalContext}
                  </p>
                </div>

                {/* Event Stats */}
                <div className="flex items-center justify-between mb-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={14} className="text-muted-foreground" />
                    <span className="text-muted-foreground">{event?.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Users" size={14} className="text-muted-foreground" />
                    <span className="text-muted-foreground">{event?.attendees}</span>
                  </div>
                </div>

                {/* Highlights */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {event?.highlights?.map((highlight, index) =>
                  <span
                    key={index}
                    className="text-xs bg-secondary/20 text-secondary-foreground px-2 py-1 rounded-full">

                        {highlight}
                      </span>
                  )}
                  </div>
                </div>

                {/* Action Button */}
                <Button
                variant={event?.bookingAvailable ? "default" : "outline"}
                fullWidth
                className={`${
                event?.bookingAvailable ?
                'bg-accent hover:bg-accent/90 text-accent-foreground' :
                'group-hover:bg-muted'} transition-all duration-200`
                }
                iconName={event?.bookingAvailable ? "Ticket" : "Info"}
                iconPosition="right">

                  {event?.bookingAvailable ? "Book Experience" : "Learn More"}
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* View All Events Button */}
        <div className="text-center">
          <Button
            variant="default"
            onClick={() => navigate('/events')}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
            iconName="Calendar"
            iconPosition="left">

            Explore All Events & Festivals
          </Button>
        </div>
      </div>
    </section>);

};

export default FeaturedEvents;
import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import EventCard from './components/EventCard';
import EventFilters from './components/EventFilters';
import FeaturedEventBanner from './components/FeaturedEventBanner';
import EventCalendar from './components/EventCalendar';
import CulturalInsights from './components/CulturalInsights';

const EventsPage = () => {
  const [filters, setFilters] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid', 'list', 'calendar'
  const [filteredEvents, setFilteredEvents] = useState([]);

  // Mock events data
  const mockEvents = [
  {
    id: 1,
    title: "Diwali Festival of Lights",
    description: "Experience the grandest celebration of lights, colors, and joy as Mumbai comes alive with traditional festivities, street food, and cultural performances.",
    image: "https://images.unsplash.com/photo-1637384999273-68131490b4c3",
    imageAlt: "Colorful Diwali celebration with traditional oil lamps and decorative rangoli patterns in vibrant colors",
    category: "Festival",
    location: "Mumbai, India",
    startDate: "2024-11-12",
    endDate: "2024-11-16",
    duration: "5 days",
    price: 0,
    originalPrice: null,
    attendees: 50000,
    featured: true,
    culturalSignificance: "Diwali symbolizes the victory of light over darkness and good over evil. It's one of the most important Hindu festivals, celebrated with oil lamps, fireworks, and family gatherings."
  },
  {
    id: 2,
    title: "Sakura Cherry Blossom Festival",
    description: "Witness the breathtaking beauty of cherry blossoms in full bloom while enjoying traditional Japanese tea ceremonies, music, and cultural performances.",
    image: "https://images.unsplash.com/photo-1677916010462-ecebe385b293",
    imageAlt: "Pink cherry blossom trees in full bloom with traditional Japanese pagoda in background during spring",
    category: "Cultural",
    location: "Tokyo, Japan",
    startDate: "2024-03-25",
    endDate: "2024-04-10",
    duration: "16 days",
    price: 25,
    originalPrice: 35,
    attendees: 75000,
    featured: false,
    culturalSignificance: "Cherry blossom viewing (hanami) is a centuries-old Japanese tradition that celebrates the fleeting beauty of life and the arrival of spring."
  },
  {
    id: 3,
    title: "Coachella Valley Music Festival",
    description: "The ultimate music and arts festival featuring world-renowned artists, immersive art installations, and unforgettable desert vibes.",
    image: "https://images.unsplash.com/photo-1710803047598-81c06a72f66d",
    imageAlt: "Large outdoor music festival stage with colorful lights and crowd of people dancing at sunset",
    category: "Music",
    location: "California, USA",
    startDate: "2024-04-12",
    endDate: "2024-04-21",
    duration: "2 weekends",
    price: 429,
    originalPrice: 499,
    attendees: 125000,
    featured: true,
    culturalSignificance: "Coachella has become a cultural phenomenon that influences fashion, music trends, and social media culture worldwide."
  },
  {
    id: 4,
    title: "Rio Carnival",
    description: "Join the world's biggest carnival celebration with spectacular parades, samba dancing, elaborate costumes, and infectious Brazilian energy.",
    image: "https://images.unsplash.com/photo-1682786635650-050d4d590ac0",
    imageAlt: "Vibrant Rio Carnival parade with dancers in colorful feathered costumes and elaborate headdresses",
    category: "Festival",
    location: "Rio de Janeiro, Brazil",
    startDate: "2024-02-09",
    endDate: "2024-02-14",
    duration: "6 days",
    price: 150,
    originalPrice: 200,
    attendees: 200000,
    featured: true,
    culturalSignificance: "Rio Carnival is a celebration of Brazilian culture, African heritage, and Catholic traditions, showcasing the country's diversity and creativity."
  },
  {
    id: 5,
    title: "Oktoberfest Munich",
    description: "Experience authentic Bavarian culture with traditional beer, hearty food, folk music, and centuries-old German traditions.",
    image: "https://images.unsplash.com/photo-1663059365551-ef41747f3c06",
    imageAlt: "Traditional German beer hall with people in lederhosen and dirndls celebrating Oktoberfest with large beer steins",
    category: "Cultural",
    location: "Munich, Germany",
    startDate: "2024-09-21",
    endDate: "2024-10-06",
    duration: "16 days",
    price: 0,
    originalPrice: null,
    attendees: 60000,
    featured: false,
    culturalSignificance: "Oktoberfest celebrates Bavarian culture and traditions, originally started as a royal wedding celebration in 1810."
  },
  {
    id: 6,
    title: "Holi Festival of Colors",
    description: "Participate in the joyous celebration of spring with vibrant colored powders, music, dancing, and traditional sweets.",
    image: "https://images.unsplash.com/photo-1560646008-be52fd7862df",
    imageAlt: "People celebrating Holi festival throwing colorful powder in the air creating rainbow clouds of color",
    category: "Festival",
    location: "New Delhi, India",
    startDate: "2024-03-08",
    endDate: "2024-03-09",
    duration: "2 days",
    price: 15,
    originalPrice: 25,
    attendees: 30000,
    featured: false,
    culturalSignificance: "Holi celebrates the arrival of spring, the triumph of good over evil, and brings people together regardless of social barriers."
  }];


  // Mock cultural insights data
  const mockCulturalInsights = [
  {
    id: 1,
    title: "Understanding Festival Etiquette in India",
    description: "Learn the proper customs and traditions when participating in Indian festivals. From dress codes to religious practices, discover how to respectfully engage with local celebrations.",
    image: "https://images.unsplash.com/photo-1672026635874-bafecace0276",
    imageAlt: "Traditional Indian festival celebration with people in colorful traditional clothing performing rituals",
    type: "Etiquette",
    readTime: 5,
    keyPoints: ["Dress modestly", "Remove shoes at temples", "Participate respectfully", "Ask before photographing"],
    author: {
      name: "Priya Sharma",
      title: "Cultural Expert",
      avatar: "https://images.unsplash.com/photo-1619734174708-709be4bd4153",
      avatarAlt: "Professional headshot of Indian woman with long black hair wearing traditional jewelry"
    }
  },
  {
    id: 2,
    title: "The History Behind Cherry Blossom Viewing",
    description: "Discover the ancient Japanese tradition of hanami and its deep cultural significance in Japanese society, from imperial courts to modern celebrations.",
    image: "https://images.unsplash.com/photo-1687730825818-2c8045147326",
    imageAlt: "Traditional Japanese garden with cherry blossoms and wooden bridge over peaceful pond",
    type: "History",
    readTime: 7,
    keyPoints: ["Imperial tradition", "Seasonal awareness", "Community gathering", "Aesthetic appreciation"],
    author: {
      name: "Hiroshi Tanaka",
      title: "Japanese Historian",
      avatar: "https://images.unsplash.com/photo-1652150641770-613fff9a7339",
      avatarAlt: "Professional headshot of Japanese man with short black hair wearing traditional kimono"
    }
  },
  {
    id: 3,
    title: "Carnival Traditions Across Latin America",
    description: "Explore how carnival celebrations vary across different Latin American countries, each with unique customs, music, and cultural expressions.",
    image: "https://images.unsplash.com/photo-1586008952500-10707a1213d1",
    imageAlt: "Colorful Latin American carnival masks and costumes displayed in traditional market setting",
    type: "Tradition",
    readTime: 6,
    keyPoints: ["Regional variations", "Music styles", "Costume traditions", "Historical roots"],
    author: {
      name: "Carlos Rodriguez",
      title: "Cultural Anthropologist",
      avatar: "https://images.unsplash.com/photo-1707631588428-554c4d822796",
      avatarAlt: "Professional headshot of Hispanic man with beard wearing casual shirt and friendly smile"
    }
  }];


  useEffect(() => {
    setFilteredEvents(mockEvents);
  }, []);

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    applyFilters(newFilters);
  };

  const applyFilters = (currentFilters) => {
    let filtered = [...mockEvents];

    // Search filter
    if (currentFilters?.search) {
      const searchTerm = currentFilters?.search?.toLowerCase();
      filtered = filtered?.filter((event) =>
      event?.title?.toLowerCase()?.includes(searchTerm) ||
      event?.description?.toLowerCase()?.includes(searchTerm) ||
      event?.location?.toLowerCase()?.includes(searchTerm)
      );
    }

    // Category filter
    if (currentFilters?.category) {
      filtered = filtered?.filter((event) => event?.category === currentFilters?.category);
    }

    // Location filter
    if (currentFilters?.location) {
      filtered = filtered?.filter((event) => event?.location?.includes(currentFilters?.location));
    }

    // Date filters
    if (currentFilters?.startDate) {
      filtered = filtered?.filter((event) => new Date(event.startDate) >= new Date(currentFilters.startDate));
    }

    if (currentFilters?.endDate) {
      filtered = filtered?.filter((event) => new Date(event.startDate) <= new Date(currentFilters.endDate));
    }

    // Price filter
    if (currentFilters?.price) {
      if (currentFilters?.price === 'free') {
        filtered = filtered?.filter((event) => event?.price === 0);
      } else if (currentFilters?.price === '0-50') {
        filtered = filtered?.filter((event) => event?.price >= 0 && event?.price <= 50);
      } else if (currentFilters?.price === '50-100') {
        filtered = filtered?.filter((event) => event?.price > 50 && event?.price <= 100);
      } else if (currentFilters?.price === '100-200') {
        filtered = filtered?.filter((event) => event?.price > 100 && event?.price <= 200);
      } else if (currentFilters?.price === '200+') {
        filtered = filtered?.filter((event) => event?.price > 200);
      }
    }

    // Additional filters
    if (currentFilters?.featuredOnly) {
      filtered = filtered?.filter((event) => event?.featured);
    }

    if (currentFilters?.freeOnly) {
      filtered = filtered?.filter((event) => event?.price === 0);
    }

    setFilteredEvents(filtered);
  };

  const clearFilters = () => {
    setFilters({});
    setFilteredEvents(mockEvents);
  };

  const isFilterActive = Object.keys(filters)?.some((key) => filters?.[key]);

  const handleViewDetails = (event) => {
    console.log('View details for event:', event?.title);
    // Navigate to event detail page
  };

  const handleBookTicket = (event) => {
    console.log('Book ticket for event:', event?.title);
    // Navigate to booking page
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    // Filter events by selected date
    const dateString = date?.toISOString()?.split('T')?.[0];
    const eventsOnDate = mockEvents?.filter((event) => {
      const eventStart = new Date(event.startDate)?.toISOString()?.split('T')?.[0];
      const eventEnd = event?.endDate ? new Date(event.endDate)?.toISOString()?.split('T')?.[0] : eventStart;
      return dateString >= eventStart && dateString <= eventEnd;
    });
    setFilteredEvents(eventsOnDate);
  };

  const handleReadMore = (insight) => {
    console.log('Read more about insight:', insight?.title);
    // Navigate to full insight article
  };

  const featuredEvent = mockEvents?.find((event) => event?.featured);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        {/* Hero Section with Featured Event */}
        {featuredEvent &&
        <section className="px-4 lg:px-6 py-8">
            <div className="max-w-7xl mx-auto">
              <FeaturedEventBanner
              event={featuredEvent}
              onViewDetails={handleViewDetails}
              onBookTicket={handleBookTicket} />

            </div>
          </section>
        }

        {/* Page Header */}
        <section className="px-4 lg:px-6 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl lg:text-5xl font-headline font-bold text-foreground mb-4">
                Discover Cultural Events & Festivals
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Immerse yourself in authentic cultural experiences, traditional festivals, and vibrant celebrations from around the world.
              </p>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-foreground">View:</span>
                <div className="flex items-center bg-muted rounded-lg p-1">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    iconName="Grid3X3">

                    Grid
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    iconName="List">

                    List
                  </Button>
                  <Button
                    variant={viewMode === 'calendar' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('calendar')}
                    iconName="Calendar">

                    Calendar
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <span className="text-sm text-muted-foreground">
                  {filteredEvents?.length} events found
                </span>
                <Button
                  variant="outline"
                  iconName="Download"
                  iconPosition="left">

                  Export Calendar
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="px-4 lg:px-6 pb-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar */}
              <div className="lg:col-span-1 space-y-8">
                {/* Filters */}
                <EventFilters
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onClearFilters={clearFilters}
                  isFilterActive={isFilterActive} />


                {/* Calendar Widget */}
                {viewMode !== 'calendar' &&
                <EventCalendar
                  events={mockEvents}
                  onDateSelect={handleDateSelect}
                  selectedDate={selectedDate} />

                }

                {/* Cultural Insights */}
                <CulturalInsights
                  insights={mockCulturalInsights}
                  onReadMore={handleReadMore} />

              </div>

              {/* Main Content Area */}
              <div className="lg:col-span-3">
                {viewMode === 'calendar' ?
                <div className="bg-card rounded-xl shadow-subtle p-6">
                    <EventCalendar
                    events={mockEvents}
                    onDateSelect={handleDateSelect}
                    selectedDate={selectedDate}
                    className="bg-transparent shadow-none p-0" />

                    
                    {/* Events for Selected Date */}
                    {selectedDate &&
                  <div className="mt-8 pt-6 border-t border-border">
                        <h3 className="text-lg font-headline font-semibold text-foreground mb-4">
                          Events on {selectedDate?.toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                        </h3>
                        <div className="space-y-4">
                          {filteredEvents?.map((event) =>
                      <div key={event?.id} className="flex items-center space-x-4 p-4 bg-muted rounded-lg">
                              <div className="w-16 h-16 flex-shrink-0">
                                <img
                            src={event?.image}
                            alt={event?.imageAlt}
                            className="w-full h-full object-cover rounded-lg" />

                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium text-foreground">{event?.title}</h4>
                                <p className="text-sm text-muted-foreground">{event?.location}</p>
                              </div>
                              <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewDetails(event)}>

                                View
                              </Button>
                            </div>
                      )}
                        </div>
                      </div>
                  }
                  </div> :

                <div className={`${
                viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : 'space-y-6'}`
                }>
                    {filteredEvents?.map((event) =>
                  <EventCard
                    key={event?.id}
                    event={event}
                    onViewDetails={handleViewDetails}
                    onBookTicket={handleBookTicket}
                    className={viewMode === 'list' ? 'flex-row' : ''} />

                  )}
                  </div>
                }

                {/* No Results */}
                {filteredEvents?.length === 0 &&
                <div className="text-center py-16">
                    <Icon name="Calendar" size={64} className="mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-xl font-headline font-semibold text-foreground mb-2">
                      No events found
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Try adjusting your filters or search criteria to find more events.
                    </p>
                    <Button
                    variant="outline"
                    onClick={clearFilters}
                    iconName="RefreshCw"
                    iconPosition="left">

                      Clear Filters
                    </Button>
                  </div>
                }
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* Footer */}
      <footer className="bg-card border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center">
            <p className="text-muted-foreground">
              © {new Date()?.getFullYear()} Turismo. Discover the world's most authentic cultural experiences.
            </p>
          </div>
        </div>
      </footer>
    </div>);

};

export default EventsPage;
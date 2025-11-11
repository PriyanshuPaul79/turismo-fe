import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import SearchBar from './components/SearchBar';
import SearchFilters from './components/SearchFilters';
import InteractiveMap from './components/InteractiveMap';
import SearchResults from './components/SearchResults';
import TrendingSidebar from './components/TrendingSidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ExplorePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({});
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 40.7128, lng: -74.0060 });
  const [savedDestinations, setSavedDestinations] = useState([]);
  const [compareList, setCompareList] = useState([]);
  const [sortBy, setSortBy] = useState('relevance');
  const [currentPage, setCurrentPage] = useState(1);

  // Mock destinations data
  const mockDestinations = [
  {
    id: 'dest-1',
    name: 'Santorini, Greece',
    country: 'Greece',
    image: "https://images.unsplash.com/photo-1662121783914-9ee843f21504",
    imageAlt: 'White-washed buildings with blue domes overlooking the Aegean Sea in Santorini',
    description: 'Experience breathtaking sunsets, pristine beaches, and iconic blue-domed churches in this stunning Greek island paradise.',
    rating: 4.8,
    reviews: 2847,
    priceFrom: 1200,
    budget: 'luxury',
    duration: '5-7 days',
    climate: 'Mediterranean',
    highlights: ['Sunset Views', 'Wine Tasting', 'Beach Resorts', 'Photography'],
    lat: 36.3932,
    lng: 25.4615,
    activities: ['Sightseeing', 'Photography', 'Food & Dining', 'Wellness & Spa']
  },
  {
    id: 'dest-2',
    name: 'Kyoto, Japan',
    country: 'Japan',
    image: "https://images.unsplash.com/photo-1560197858-956527661f58",
    imageAlt: 'Traditional Japanese temple with cherry blossoms and pagoda architecture in Kyoto',
    description: 'Immerse yourself in ancient Japanese culture with traditional temples, serene gardens, and authentic tea ceremonies.',
    rating: 4.9,
    reviews: 3521,
    priceFrom: 800,
    budget: 'mid',
    duration: '4-6 days',
    climate: 'Temperate',
    highlights: ['Temples', 'Gardens', 'Tea Ceremony', 'Cherry Blossoms'],
    lat: 35.0116,
    lng: 135.7681,
    activities: ['Cultural Experiences', 'Sightseeing', 'Photography', 'Food & Dining']
  },
  {
    id: 'dest-3',
    name: 'Machu Picchu, Peru',
    country: 'Peru',
    image: "https://images.unsplash.com/photo-1725197890952-15459a8ae10f",
    imageAlt: 'Ancient Incan ruins of Machu Picchu with terraced stone structures on mountain peaks',
    description: 'Discover the mysterious ancient Incan citadel perched high in the Andes Mountains, a true wonder of the world.',
    rating: 4.7,
    reviews: 1892,
    priceFrom: 950,
    budget: 'mid',
    duration: '3-5 days',
    climate: 'Cold',
    highlights: ['Ancient Ruins', 'Hiking', 'Mountain Views', 'History'],
    lat: -13.1631,
    lng: -72.5450,
    activities: ['Adventure Sports', 'Cultural Experiences', 'Photography', 'Outdoor Activities']
  },
  {
    id: 'dest-4',
    name: 'Bali, Indonesia',
    country: 'Indonesia',
    image: "https://images.unsplash.com/photo-1544503376-8112e05e9196",
    imageAlt: 'Lush green rice terraces with traditional Balinese irrigation system in tropical landscape',
    description: 'Tropical paradise offering stunning rice terraces, pristine beaches, vibrant culture, and world-class wellness retreats.',
    rating: 4.6,
    reviews: 4156,
    priceFrom: 600,
    budget: 'budget',
    duration: '7-10 days',
    climate: 'Tropical',
    highlights: ['Rice Terraces', 'Beaches', 'Temples', 'Wellness'],
    lat: -8.3405,
    lng: 115.0920,
    activities: ['Wellness & Spa', 'Water Sports', 'Cultural Experiences', 'Food & Dining']
  },
  {
    id: 'dest-5',
    name: 'Paris, France',
    country: 'France',
    image: "https://images.unsplash.com/photo-1470664997694-a3ae95e2eacb",
    imageAlt: 'Eiffel Tower illuminated at night with Seine River and Parisian architecture in foreground',
    description: 'The City of Light enchants with iconic landmarks, world-class museums, exquisite cuisine, and romantic atmosphere.',
    rating: 4.5,
    reviews: 5672,
    priceFrom: 1100,
    budget: 'luxury',
    duration: '4-7 days',
    climate: 'Temperate',
    highlights: ['Eiffel Tower', 'Museums', 'Cuisine', 'Architecture'],
    lat: 48.8566,
    lng: 2.3522,
    activities: ['Museums', 'Food & Dining', 'Shopping', 'Sightseeing']
  },
  {
    id: 'dest-6',
    name: 'Dubai, UAE',
    country: 'United Arab Emirates',
    image: "https://images.unsplash.com/photo-1667389411830-7116ed6d590d",
    imageAlt: 'Modern Dubai skyline with Burj Khalifa and futuristic skyscrapers against desert backdrop',
    description: 'Ultra-modern metropolis featuring architectural marvels, luxury shopping, desert adventures, and world-class hospitality.',
    rating: 4.4,
    reviews: 3289,
    priceFrom: 1400,
    budget: 'ultra',
    duration: '3-5 days',
    climate: 'Arid',
    highlights: ['Skyscrapers', 'Shopping', 'Desert Safari', 'Luxury'],
    lat: 25.2048,
    lng: 55.2708,
    activities: ['Shopping', 'Adventure Sports', 'Sightseeing', 'Nightlife']
  }];


  useEffect(() => {
    // Initialize with all destinations
    setSearchResults(mockDestinations);
  }, []);

  const handleSearch = (query) => {
    setLoading(true);
    setSearchQuery(query);

    // Simulate API call
    setTimeout(() => {
      let filtered = mockDestinations;

      if (query) {
        filtered = mockDestinations?.filter((dest) =>
        dest?.name?.toLowerCase()?.includes(query?.toLowerCase()) ||
        dest?.country?.toLowerCase()?.includes(query?.toLowerCase()) ||
        dest?.description?.toLowerCase()?.includes(query?.toLowerCase()) ||
        dest?.highlights?.some((h) => h?.toLowerCase()?.includes(query?.toLowerCase()))
        );
      }

      // Apply filters
      if (filters?.destinationType) {
        // Simple filter logic - in real app would be more sophisticated
        filtered = filtered?.filter((dest) => {
          if (filters?.destinationType === 'beach' && dest?.highlights?.some((h) => h?.toLowerCase()?.includes('beach'))) return true;
          if (filters?.destinationType === 'cultural' && dest?.activities?.includes('Cultural Experiences')) return true;
          if (filters?.destinationType === 'city' && dest?.highlights?.some((h) => h?.toLowerCase()?.includes('city') || h?.toLowerCase()?.includes('architecture'))) return true;
          return filters?.destinationType === 'nature' && dest?.highlights?.some((h) => h?.toLowerCase()?.includes('nature') || h?.toLowerCase()?.includes('mountain'));
        });
      }

      if (filters?.budget) {
        filtered = filtered?.filter((dest) => dest?.budget === filters?.budget);
      }

      if (filters?.climate) {
        filtered = filtered?.filter((dest) => dest?.climate?.toLowerCase() === filters?.climate?.toLowerCase());
      }

      if (filters?.minRating) {
        filtered = filtered?.filter((dest) => dest?.rating >= filters?.minRating);
      }

      if (filters?.activities && filters?.activities?.length > 0) {
        filtered = filtered?.filter((dest) =>
        filters?.activities?.some((activity) => dest?.activities?.includes(activity))
        );
      }

      // Apply sorting
      switch (sortBy) {
        case 'price_low':
          filtered?.sort((a, b) => a?.priceFrom - b?.priceFrom);
          break;
        case 'price_high':
          filtered?.sort((a, b) => b?.priceFrom - a?.priceFrom);
          break;
        case 'rating':
          filtered?.sort((a, b) => b?.rating - a?.rating);
          break;
        case 'popularity':
          filtered?.sort((a, b) => b?.reviews - a?.reviews);
          break;
        default:
          // Keep original order for relevance
          break;
      }

      setSearchResults(filtered);
      setCurrentPage(1);
      setLoading(false);
    }, 1000);
  };

  const handleVoiceSearch = () => {
    // Voice search implementation would go here
    console.log('Voice search activated');
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    handleSearch(searchQuery);
  };

  const handleClearFilters = () => {
    setFilters({});
    handleSearch(searchQuery);
  };

  const handleSaveDestination = (destination) => {
    setSavedDestinations((prev) => {
      if (prev?.includes(destination?.id)) {
        return prev?.filter((id) => id !== destination?.id);
      } else {
        return [...prev, destination?.id];
      }
    });
  };

  const handleCompareDestination = (destination, action = 'toggle') => {
    if (action === 'clear') {
      setCompareList([]);
      return;
    }

    setCompareList((prev) => {
      const exists = prev?.find((item) => item?.id === destination?.id);
      if (exists) {
        return prev?.filter((item) => item?.id !== destination?.id);
      } else if (prev?.length < 3) {
        return [...prev, destination];
      } else {
        // Replace oldest if at limit
        return [...prev?.slice(1), destination];
      }
    });
  };

  const handleDestinationSelect = (destination) => {
    setSelectedDestination(destination);
  };

  const handleTrendingDestinationClick = (destination) => {
    setSearchQuery(destination?.name);
    handleSearch(destination?.name);
  };

  const handleTrendingSearchClick = (search) => {
    setSearchQuery(search);
    handleSearch(search);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Main Content */}
      <main className="pt-16">
        {/* Hero Search Section */}
        <section className="bg-gradient-hero text-white py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-8">
              <h1 className="text-4xl lg:text-5xl font-headline font-bold mb-4">
                Discover Your Next Adventure
              </h1>
              <p className="text-xl text-white/90 mb-8">
                Explore destinations worldwide with AI-powered recommendations and intelligent search
              </p>
              
              <SearchBar
                onSearch={handleSearch}
                onVoiceSearch={handleVoiceSearch}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery} />

            </div>
          </div>
        </section>

        {/* Main Explore Interface */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Sidebar */}
              <aside className="lg:w-80 flex-shrink-0">
                <div className="space-y-6">
                  {/* Filters */}
                  <SearchFilters
                    filters={filters}
                    onFiltersChange={handleFiltersChange}
                    onClearFilters={handleClearFilters} />

                  
                  {/* Trending Sidebar */}
                  <TrendingSidebar
                    onDestinationClick={handleTrendingDestinationClick}
                    onSearchClick={handleTrendingSearchClick} />

                </div>
              </aside>

              {/* Main Content Area */}
              <div className="flex-1 min-w-0">
                {/* View Toggle */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <h2 className="text-2xl font-semibold text-foreground">
                      Explore Destinations
                    </h2>
                    {searchQuery &&
                    <span className="text-muted-foreground">
                        for "{searchQuery}"
                      </span>
                    }
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant={showMap ? "outline" : "default"}
                      size="sm"
                      onClick={() => setShowMap(false)}>

                      <Icon name="Grid3X3" size={16} className="mr-2" />
                      Results
                    </Button>
                    <Button
                      variant={showMap ? "default" : "outline"}
                      size="sm"
                      onClick={() => setShowMap(true)}>

                      <Icon name="Map" size={16} className="mr-2" />
                      Map View
                    </Button>
                  </div>
                </div>

                {/* Content Display */}
                {showMap ?
                <InteractiveMap
                  destinations={searchResults}
                  selectedDestination={selectedDestination}
                  onDestinationSelect={handleDestinationSelect}
                  mapCenter={mapCenter}
                  onMapCenterChange={setMapCenter} /> :


                <SearchResults
                  results={searchResults}
                  loading={loading}
                  totalResults={searchResults?.length}
                  currentPage={currentPage}
                  onPageChange={setCurrentPage}
                  onSortChange={setSortBy}
                  sortBy={sortBy}
                  onSaveDestination={handleSaveDestination}
                  onCompareDestination={handleCompareDestination}
                  onViewDestination={(dest) => window.location.href = `/destination-detail?id=${dest?.id}`}
                  savedDestinations={savedDestinations}
                  compareList={compareList} />

                }
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* Footer */}
      <footer className="bg-card border-t border-border py-8 mt-16">
        <div className="container mx-auto px-4">
          <div className="text-center text-muted-foreground">
            <p>&copy; {new Date()?.getFullYear()} Turismo. All rights reserved.</p>
            <p className="text-sm mt-2">Intelligent Wanderlust - Discover the world with AI-powered travel insights</p>
          </div>
        </div>
      </footer>
    </div>);

};

export default ExplorePage;
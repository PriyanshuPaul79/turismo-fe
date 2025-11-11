import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import HeroGallery from './components/HeroGallery';
import WeatherWidget from './components/WeatherWidget';
import AttractionsMap from './components/AttractionsMap';
import LocalInsights from './components/LocalInsights';
import CommunityReviews from './components/CommunityReviews';
import RelatedDestinations from './components/RelatedDestinations';
import TransportationInfo from './components/TransportationInfo';

const DestinationDetail = () => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');

  // Mock destination data
  const destination = {
    id: 1,
    name: "Delhi",
    location: "National Capital Territory, India",
    rating: 4.5,
    reviewCount: 15420,
    coordinates: { lat: 28.6139, lng: 77.2090 },
    gallery: [
    {
      url: "https://images.unsplash.com/photo-1700158964288-5546c966377c",
      alt: "Red Fort\'s massive red sandstone walls and Mughal architecture with tourists walking through the entrance gate"
    },
    {
      url: "https://images.unsplash.com/photo-1724776192633-c472e34c8353",
      alt: "India Gate war memorial monument standing tall against blue sky with green lawns and people in foreground"
    },
    {
      url: "https://images.unsplash.com/photo-1693154599237-456c210de0ad",
      alt: "Lotus Temple\'s white marble petals forming lotus shape against clear sky with manicured gardens"
    },
    {
      url: "https://images.unsplash.com/photo-1598021672966-20e42f7794fa",
      alt: "Humayun's Tomb with red sandstone and white marble dome surrounded by Persian-style gardens"
    },
    {
      url: "https://images.unsplash.com/photo-1589819677571-6cdbc583bb94",
      alt: "Bustling narrow streets of Old Delhi with traditional architecture, shops, and people walking"
    }],

    description: `Delhi, India's vibrant capital, is a mesmerizing blend of ancient heritage and modern dynamism. This historic city has been the seat of power for numerous empires and continues to be the political heart of India. From the majestic Red Fort to the contemporary Lotus Temple, Delhi offers an incredible journey through time.\n\nThe city is divided into Old Delhi and New Delhi, each with its distinct character. Old Delhi, with its narrow lanes and bustling bazaars, preserves the essence of Mughal era, while New Delhi showcases British colonial architecture and modern urban planning. The contrast creates a unique urban tapestry that captivates millions of visitors annually.`,
    highlights: [
    "UNESCO World Heritage Sites",
    "Mughal Architecture",
    "Street Food Paradise",
    "Cultural Diversity",
    "Modern Infrastructure",
    "Shopping Destinations"],

    bestTimeToVisit: "October to March",
    languages: ["Hindi", "English", "Punjabi", "Urdu"],
    currency: "Indian Rupee (₹)",
    timeZone: "IST (UTC +5:30)"
  };

  const navigationSections = [
  { id: 'overview', name: 'Overview', icon: 'Info' },
  { id: 'attractions', name: 'Attractions', icon: 'MapPin' },
  { id: 'weather', name: 'Weather', icon: 'Sun' },
  { id: 'insights', name: 'Local Insights', icon: 'Lightbulb' },
  { id: 'reviews', name: 'Reviews', icon: 'MessageSquare' },
  { id: 'transportation', name: 'Transportation', icon: 'Car' },
  { id: 'related', name: 'Related', icon: 'Route' }];


  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Hero Section */}
      <div className="pt-16">
        <HeroGallery destination={destination} />
      </div>
      {/* Sticky Navigation */}
      <div className="sticky top-16 z-40 bg-background/95 backdrop-blur-md border-b border-border shadow-subtle">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between py-4">
            <div className="flex space-x-1 overflow-x-auto scrollbar-hide">
              {navigationSections?.map((section) =>
              <button
                key={section?.id}
                onClick={() => scrollToSection(section?.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                activeSection === section?.id ?
                'bg-primary text-primary-foreground shadow-subtle' :
                'text-muted-foreground hover:text-foreground hover:bg-muted'}`
                }>

                  <Icon name={section?.icon} size={16} />
                  <span>{section?.name}</span>
                </button>
              )}
            </div>
            
            <div className="flex items-center space-x-3 ml-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={isBookmarked ? 'text-red-500' : 'text-muted-foreground'}>

                <Icon name={isBookmarked ? "Heart" : "Heart"} size={20} className={isBookmarked ? "fill-current" : ""} />
              </Button>
              
              <Button variant="ghost" size="icon">
                <Icon name="Share2" size={20} />
              </Button>
              
              <Button variant="default" className="bg-conversion hover:bg-conversion/90 text-conversion-foreground">
                <Icon name="Plus" size={16} className="mr-2" />
                Add to Trip
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview Section */}
            <section id="overview" className="bg-card rounded-lg shadow-subtle p-6">
              <h2 className="text-2xl font-headline font-bold text-foreground mb-4">
                About {destination?.name}
              </h2>
              
              <div className="prose prose-gray max-w-none mb-6">
                <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                  {destination?.description}
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Highlights</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {destination?.highlights?.map((highlight, index) =>
                    <div key={index} className="flex items-center space-x-2">
                        <Icon name="Check" size={16} className="text-success flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{highlight}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Quick Facts</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Icon name="Calendar" size={16} className="text-primary" />
                      <span className="text-sm text-muted-foreground">Best Time: {destination?.bestTimeToVisit}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="Globe" size={16} className="text-primary" />
                      <span className="text-sm text-muted-foreground">Languages: {destination?.languages?.join(", ")}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="IndianRupee" size={16} className="text-primary" />
                      <span className="text-sm text-muted-foreground">Currency: {destination?.currency}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="Clock" size={16} className="text-primary" />
                      <span className="text-sm text-muted-foreground">Time Zone: {destination?.timeZone}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <Button variant="default">
                  <Icon name="MapPin" size={16} className="mr-2" />
                  Plan Your Visit
                </Button>
                <Button variant="outline">
                  <Icon name="Download" size={16} className="mr-2" />
                  Download Guide
                </Button>
                <Button variant="outline">
                  <Icon name="Camera" size={16} className="mr-2" />
                  Virtual Tour
                </Button>
              </div>
            </section>

            {/* Attractions Section */}
            <section id="attractions">
              <AttractionsMap destination={destination} />
            </section>

            {/* Local Insights Section */}
            <section id="insights">
              <LocalInsights destination={destination} />
            </section>

            {/* Reviews Section */}
            <section id="reviews">
              <CommunityReviews destination={destination} />
            </section>

            {/* Transportation Section */}
            <section id="transportation">
              <TransportationInfo destination={destination} />
            </section>

            {/* Related Destinations Section */}
            <section id="related">
              <RelatedDestinations />
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Weather Widget */}
            <section id="weather">
              <WeatherWidget destination={destination} />
            </section>

            {/* Quick Actions */}
            <div className="bg-card rounded-lg shadow-subtle p-6">
              <h3 className="font-semibold text-foreground mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button variant="outline" fullWidth>
                  <Icon name="Hotel" size={16} className="mr-2" />
                  Find Hotels
                </Button>
                <Button variant="outline" fullWidth>
                  <Icon name="Plane" size={16} className="mr-2" />
                  Book Flights
                </Button>
                <Button variant="outline" fullWidth>
                  <Icon name="Car" size={16} className="mr-2" />
                  Rent a Car
                </Button>
                <Button variant="outline" fullWidth>
                  <Icon name="Calendar" size={16} className="mr-2" />
                  Check Events
                </Button>
              </div>
            </div>

            {/* Travel Tips */}
            <div className="bg-card rounded-lg shadow-subtle p-6">
              <h3 className="font-semibold text-foreground mb-4">Travel Tips</h3>
              <div className="space-y-4">
                <div className="flex space-x-3">
                  <Icon name="Shield" size={16} className="text-success mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-medium text-foreground">Safety First</h4>
                    <p className="text-xs text-muted-foreground">Keep copies of important documents and stay aware of your surroundings.</p>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <Icon name="Droplets" size={16} className="text-blue-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-medium text-foreground">Stay Hydrated</h4>
                    <p className="text-xs text-muted-foreground">Carry bottled water, especially during summer months.</p>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <Icon name="CreditCard" size={16} className="text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-medium text-foreground">Payment Methods</h4>
                    <p className="text-xs text-muted-foreground">Cards are widely accepted, but carry cash for street vendors.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Contacts */}
            <div className="bg-card rounded-lg shadow-subtle p-6">
              <h3 className="font-semibold text-foreground mb-4">Emergency Contacts</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Police</span>
                  <span className="text-sm font-medium text-foreground">100</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Fire</span>
                  <span className="text-sm font-medium text-foreground">101</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Ambulance</span>
                  <span className="text-sm font-medium text-foreground">102</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Tourist Helpline</span>
                  <span className="text-sm font-medium text-foreground">1363</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer CTA */}
      <div className="bg-gradient-cultural text-white py-12">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 text-center">
          <h2 className="text-3xl font-headline font-bold mb-4">
            Ready to Explore {destination?.name}?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Start planning your perfect trip with our AI-powered itinerary builder and local insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg">
              <Icon name="Route" size={20} className="mr-2" />
              Build Itinerary
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
              <Icon name="Calendar" size={20} className="mr-2" />
              Check Availability
            </Button>
          </div>
        </div>
      </div>
    </div>);

};

export default DestinationDetail;
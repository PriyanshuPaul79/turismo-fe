import React, { useEffect } from 'react';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import PersonalizedRecommendations from './components/PersonalizedRecommendations';
import TrendingDestinations from './components/TrendingDestinations';
import FeaturedEvents from './components/FeaturedEvents';
import TrustIndicators from './components/TrustIndicators';
import QuickActions from './components/QuickActions';

const Homepage = () => {
  useEffect(() => {
    // Set page title
    document.title = 'Turismo - Intelligent Wanderlust | AI-Powered Travel Planning';
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription?.setAttribute('content', 'Discover your next adventure with Turismo\'s AI-powered travel platform. Get personalized recommendations, plan perfect itineraries, and explore trending destinations worldwide.');
    }

    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />
      {/* Main Content */}
      <main className="pt-16">
        {/* Hero Section */}
        <HeroSection />
        
        {/* Personalized Recommendations */}
        <PersonalizedRecommendations />
        
        {/* Trending Destinations */}
        <TrendingDestinations />
        
        {/* Featured Events */}
        <FeaturedEvents />
        
        {/* Quick Actions */}
        <QuickActions />
        
        {/* Trust Indicators */}
        <TrustIndicators />
      </main>
      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-cultural rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">T</span>
                </div>
                <div>
                  <h3 className="text-2xl font-headline font-bold">Turismo</h3>
                  <p className="text-sm opacity-80 font-accent">Intelligent Wanderlust</p>
                </div>
              </div>
              <p className="text-primary-foreground/80 mb-4 max-w-md">
                AI-powered travel planning that transforms your wanderlust into unforgettable journeys. 
                Discover, plan, and experience the world like never before.
              </p>
              <div className="flex space-x-4">
                <button className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-200">
                  <span className="text-sm font-bold">f</span>
                </button>
                <button className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-200">
                  <span className="text-sm font-bold">t</span>
                </button>
                <button className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-200">
                  <span className="text-sm font-bold">in</span>
                </button>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h4 className="font-headline font-bold mb-4">Explore</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/explore" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-200">Destinations</a></li>
                <li><a href="/events" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-200">Events & Festivals</a></li>
                <li><a href="/itinerary-builder" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-200">Plan Your Trip</a></li>
                <li><a href="/dashboard" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-200">My Dashboard</a></li>
              </ul>
            </div>
            
            {/* Support */}
            <div>
              <h4 className="font-headline font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/help" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-200">Help Center</a></li>
                <li><a href="/contact" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-200">Contact Us</a></li>
                <li><a href="/privacy" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-200">Privacy Policy</a></li>
                <li><a href="/terms" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-200">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          {/* Bottom Bar */}
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between">
            <p className="text-primary-foreground/60 text-sm">
              © {new Date()?.getFullYear()} Turismo. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <span className="text-primary-foreground/60 text-sm">Made with ❤️ for travelers</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
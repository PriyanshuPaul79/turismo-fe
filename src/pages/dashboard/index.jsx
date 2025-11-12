import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import WelcomeSection from './components/WelcomeSection.jsx';
import QuickAccessCard from './components/QuickAccessCard';
import UpcomingTripsCard from './components/UpcomingTripsCard';
import TravelHistoryCard from './components/TravelHistoryCard';
import RecommendationsCard from './components/RecommendationsCard';
import PreferencesCard from './components/PreferencesCard.jsx';
import LoyaltyCard from './components/LoyaltyCard';
import NotificationCenter from './components/NotificationCenter';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [notifications, setNotifications] = useState([]);
  const [preferences, setPreferences] = useState({});

  // Mock user data
  const userData = {
    id: 1,
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@email.com",
    avatar: "https://images.unsplash.com/photo-1700561791890-a15d45b9c79d",
    avatarAlt: "Professional headshot of woman with shoulder-length brown hair wearing white blazer",
    level: "Adventurer",
    points: 2450,
    memberSince: "2022"
  };

  const userStats = [
  { value: "12", label: "Trips Completed" },
  { value: "8", label: "Countries Visited" },
  { value: "2.4k", label: "Points Earned" },
  { value: "4.9", label: "Avg Rating" }];


  // Mock saved destinations
  const savedDestinations = [
  {
    id: 1,
    name: "Santorini, Greece",
    location: "Cyclades Islands",
    image: "https://images.unsplash.com/photo-1662121783914-9ee843f21504",
    imageAlt: "White-washed buildings with blue domes overlooking azure Aegean Sea in Santorini",
    rating: 4.8,
    isNew: true
  },
  {
    id: 2,
    name: "Kyoto, Japan",
    location: "Kansai Region",
    image: "https://images.unsplash.com/photo-1597761051062-4c5c56793273",
    imageAlt: "Traditional Japanese temple with red torii gate surrounded by cherry blossoms",
    rating: 4.9
  },
  {
    id: 3,
    name: "Banff National Park",
    location: "Alberta, Canada",
    image: "https://images.unsplash.com/photo-1719237873482-d79f39485b16",
    imageAlt: "Pristine mountain lake reflecting snow-capped peaks in Canadian Rockies",
    rating: 4.7
  }];


  // Mock saved hotels
  const savedHotels = [
  {
    id: 1,
    name: "The Ritz-Carlton",
    location: "Paris, France",
    image: "https://images.unsplash.com/photo-1607550449989-e0f78408ac4b",
    imageAlt: "Elegant hotel lobby with marble columns and crystal chandelier",
    rating: 4.9,
    description: "Luxury hotel in the heart of Paris"
  },
  {
    id: 2,
    name: "Aman Tokyo",
    location: "Tokyo, Japan",
    image: "https://images.unsplash.com/photo-1619292585355-ab0e3fd509fe",
    imageAlt: "Modern minimalist hotel room with floor-to-ceiling windows overlooking Tokyo skyline",
    rating: 4.8,
    description: "Contemporary luxury in Otemachi"
  }];


  // Mock saved itineraries
  const savedItineraries = [
  {
    id: 1,
    name: "European Grand Tour",
    location: "Multi-city Europe",
    image: "https://images.unsplash.com/photo-1580752643497-042b1aa7d567",
    imageAlt: "Aerial view of European city with historic architecture and winding river",
    description: "14-day journey through 5 countries"
  },
  {
    id: 2,
    name: "Southeast Asia Adventure",
    location: "Thailand, Vietnam, Cambodia",
    image: "https://images.unsplash.com/photo-1724396419953-8492b7b52cf2",
    imageAlt: "Traditional Asian temple complex with golden spires against sunset sky",
    description: "21-day cultural exploration"
  }];


  // Mock upcoming trips
  const upcomingTrips = [
  {
    id: 1,
    destination: "Bali, Indonesia",
    startDate: "2024-12-15",
    endDate: "2024-12-22",
    duration: 7,
    image: "https://images.unsplash.com/photo-1710104434456-d1fefd0fd482",
    imageAlt: "Tropical beach with palm trees and traditional Indonesian boat at sunset",
    checklist: [
    { id: 1, task: "Book flights", completed: true },
    { id: 2, task: "Reserve hotel", completed: true },
    { id: 3, task: "Get travel insurance", completed: false },
    { id: 4, task: "Pack luggage", completed: false },
    { id: 5, task: "Check passport validity", completed: true }]

  },
  {
    id: 2,
    destination: "Iceland Road Trip",
    startDate: "2025-02-10",
    endDate: "2025-02-17",
    duration: 7,
    image: "https://images.unsplash.com/photo-1721633616585-3f6c10c491fe",
    imageAlt: "Dramatic Icelandic landscape with Northern Lights dancing over snow-covered mountains",
    checklist: [
    { id: 1, task: "Rent 4WD vehicle", completed: false },
    { id: 2, task: "Book accommodations", completed: true },
    { id: 3, task: "Plan route", completed: false },
    { id: 4, task: "Winter gear shopping", completed: false }]

  }];


  // Mock travel history
  const travelHistory = [
  {
    id: 1,
    destination: "Tokyo, Japan",
    startDate: "2024-09-15",
    endDate: "2024-09-22",
    coverImage: "https://images.unsplash.com/photo-1726656900126-5e77eafff82c",
    coverImageAlt: "Bustling Tokyo street at night with neon signs and traditional architecture",
    photoCount: 127,
    rating: 5.0,
    placesVisited: 12
  },
  {
    id: 2,
    destination: "Swiss Alps",
    startDate: "2024-07-10",
    endDate: "2024-07-17",
    coverImage: "https://images.unsplash.com/photo-1662987494568-3ab48448ca09",
    coverImageAlt: "Majestic Swiss Alpine peaks with pristine snow and mountain railway",
    photoCount: 89,
    rating: 4.8,
    placesVisited: 8
  },
  {
    id: 3,
    destination: "Morocco",
    startDate: "2024-04-20",
    endDate: "2024-04-30",
    coverImage: "https://images.unsplash.com/photo-1724762119864-aa773c221c1c",
    coverImageAlt: "Vibrant Moroccan marketplace with colorful textiles and traditional architecture",
    photoCount: 156,
    rating: 4.9,
    placesVisited: 15
  }];


  // Mock AI recommendations
  const aiRecommendations = [
  {
    id: 1,
    title: "Northern Lights in Norway",
    description: "Experience the magical Aurora Borealis in Tromsø during peak season with clear skies and optimal viewing conditions.",
    image: "https://images.unsplash.com/photo-1453889031080-078633fb4692",
    imageAlt: "Spectacular Northern Lights display over Norwegian fjord with snow-covered mountains",
    category: "destinations",
    rating: 4.9,
    price: "From $2,400",
    reason: "seasonal",
    tags: ["Winter", "Nature", "Photography"]
  },
  {
    id: 2,
    title: "Luxury Safari in Kenya",
    description: "Witness the Great Migration in Maasai Mara with exclusive lodge accommodations and expert guides.",
    image: "https://images.unsplash.com/photo-1594491837233-a5afa79dfa76",
    imageAlt: "African safari scene with elephants walking across savanna at golden hour",
    category: "experiences",
    rating: 4.8,
    price: "From $3,200",
    reason: "interests",
    tags: ["Wildlife", "Luxury", "Adventure"]
  },
  {
    id: 3,
    title: "Boutique Hotel in Tuscany",
    description: "Charming countryside retreat with vineyard views, cooking classes, and wine tastings in the heart of Chianti.",
    image: "https://images.unsplash.com/photo-1665052467166-d113d5a8df53",
    imageAlt: "Rustic Tuscan villa surrounded by rolling hills and vineyard rows at sunset",
    category: "hotels",
    rating: 4.7,
    price: "From $180/night",
    reason: "budget_match",
    tags: ["Wine", "Culinary", "Romance"]
  },
  {
    id: 4,
    title: "Cultural Tour of India",
    description: "Immerse yourself in India's rich heritage with guided tours of palaces, temples, and vibrant markets.",
    image: "https://images.unsplash.com/photo-1626148862174-633cd079665f",
    imageAlt: "Ornate Indian palace with intricate architecture and colorful gardens",
    category: "destinations",
    rating: 4.6,
    price: "From $1,800",
    reason: "similar_trips",
    tags: ["Culture", "History", "Spiritual"]
  }];


  // Mock user preferences
  const userPreferences = {
    budget: 'mid-range',
    travelStyles: ['cultural', 'adventure', 'food'],
    accommodationTypes: ['hotel', 'boutique'],
    notifications: {
      email: true,
      push: true,
      sms: false
    },
    language: 'en',
    currency: 'USD'
  };

  // Mock loyalty data
  const loyaltyData = {
    level: "Adventurer",
    currentPoints: 2450,
    nextLevel: "Wanderer",
    nextLevelPoints: 5000,
    memberSince: "2022",
    tripsCompleted: 12,
    countriesVisited: 8,
    availableRewards: [
    {
      id: 1,
      title: "Free Airport Lounge Access",
      points: 500,
      icon: "Plane"
    },
    {
      id: 2,
      title: "Hotel Upgrade Voucher",
      points: 750,
      icon: "Building"
    }],

    benefits: [
    "Priority booking",
    "Free cancellation",
    "24/7 support",
    "Exclusive deals"]

  };

  // Mock notifications
  const mockNotifications = [
  {
    id: 1,
    type: 'booking',
    title: 'Booking Confirmed',
    message: 'Your trip to Bali has been confirmed. Check your email for details.',
    timestamp: new Date(Date.now() - 300000),
    read: false,
    actionButton: {
      text: 'View Booking',
      onClick: () => console.log('View booking')
    }
  },
  {
    id: 2,
    type: 'recommendation',
    title: 'New Destination Recommendation',
    message: 'Based on your recent trips, we think you\'ll love Northern Norway for Aurora viewing.',
    timestamp: new Date(Date.now() - 3600000),
    read: false
  },
  {
    id: 3,
    type: 'deal',
    title: 'Limited Time Offer',
    message: '30% off luxury hotels in Southeast Asia. Book before December 31st.',
    timestamp: new Date(Date.now() - 7200000),
    read: true
  },
  {
    id: 4,
    type: 'reminder',
    title: 'Trip Reminder',
    message: 'Your Bali trip is in 15 days. Don\'t forget to check your travel documents.',
    timestamp: new Date(Date.now() - 86400000),
    read: true
  }];


  useEffect(() => {
    setNotifications(mockNotifications);
    setPreferences(userPreferences);
  }, []);

  const handleViewAll = (type) => {
    console.log(`View all ${type}`);
    // Navigate to respective pages
  };

  const handleItemClick = (item) => {
    console.log('Item clicked:', item);
    // Navigate to item detail page
  };

  const handleViewTrip = (trip) => {
    console.log('View trip:', trip);
    // Navigate to trip details
  };

  const handlePlanNew = () => {
    console.log('Plan new trip');
    window.location.href = '/itinerary-builder';
  };

  const handleViewDestination = (destination) => {
    console.log('View destination:', destination);
    window.location.href = '/destination-detail';
  };

  const handleRefreshRecommendations = () => {
    console.log('Refresh recommendations');
    // Refresh AI recommendations
  };

  const handleUpdatePreferences = (newPreferences) => {
    setPreferences(newPreferences);
    console.log('Preferences updated:', newPreferences);
  };

  const handleViewRewards = () => {
    console.log('View rewards');
    // Navigate to rewards page
  };

  const handleClaimReward = (reward) => {
    console.log('Claim reward:', reward);
    // Handle reward claiming
  };

  const handleMarkAsRead = (notificationId) => {
    setNotifications((prev) =>
    prev?.map((notification) =>
    notification?.id === notificationId ?
    { ...notification, read: true } :
    notification
    )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) =>
    prev?.map((notification) => ({ ...notification, read: true }))
    );
  };

  const handleDeleteNotification = (notificationId) => {
    setNotifications((prev) =>
    prev?.filter((notification) => notification?.id !== notificationId)
    );
  };

  const tabs = [
  { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
  { id: 'trips', label: 'My Trips', icon: 'MapPin' },
  { id: 'preferences', label: 'Preferences', icon: 'Settings' },
  { id: 'notifications', label: 'Notifications', icon: 'Bell' }];


  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <WelcomeSection user={userData} stats={userStats} />
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            {tabs?.map((tab) =>
            <Button
              key={tab?.id}
              variant={activeTab === tab?.id ? 'default' : 'ghost'}
              onClick={() => setActiveTab(tab?.id)}
              className="flex-shrink-0">

                <Icon name={tab?.icon} size={16} className="mr-2" />
                {tab?.label}
                {tab?.id === 'notifications' && notifications?.filter((n) => !n?.read)?.length > 0 &&
              <span className="ml-2 px-1.5 py-0.5 bg-conversion text-conversion-foreground rounded-full text-xs">
                    {notifications?.filter((n) => !n?.read)?.length}
                  </span>
              }
              </Button>
            )}
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' &&
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-6">
                {/* Quick Access Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <QuickAccessCard
                  title="Saved Destinations"
                  items={savedDestinations}
                  type="destinations"
                  onViewAll={() => handleViewAll('destinations')}
                  onItemClick={handleItemClick} />

                  <QuickAccessCard
                  title="Saved Hotels"
                  items={savedHotels}
                  type="hotels"
                  onViewAll={() => handleViewAll('hotels')}
                  onItemClick={handleItemClick} />

                  <QuickAccessCard
                  title="My Itineraries"
                  items={savedItineraries}
                  type="itineraries"
                  onViewAll={() => handleViewAll('itineraries')}
                  onItemClick={handleItemClick} />

                </div>

                {/* Upcoming Trips */}
                <UpcomingTripsCard
                trips={upcomingTrips}
                onViewTrip={handleViewTrip}
                onPlanNew={handlePlanNew} />


                {/* AI Recommendations */}
                <RecommendationsCard
                recommendations={aiRecommendations}
                onViewDestination={handleViewDestination}
                onRefresh={handleRefreshRecommendations} />

              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Loyalty Card */}
                <LoyaltyCard
                loyaltyData={loyaltyData}
                onViewRewards={handleViewRewards}
                onClaimReward={handleClaimReward} />


                {/* Travel History */}
                <TravelHistoryCard
                trips={travelHistory}
                onViewTrip={handleViewTrip}
                onViewAll={() => handleViewAll('history')} />

              </div>
            </div>
          }

          {activeTab === 'trips' &&
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <UpcomingTripsCard
              trips={upcomingTrips}
              onViewTrip={handleViewTrip}
              onPlanNew={handlePlanNew} />

              <TravelHistoryCard
              trips={travelHistory}
              onViewTrip={handleViewTrip}
              onViewAll={() => handleViewAll('history')} />

            </div>
          }

          {activeTab === 'preferences' &&
          <div className="max-w-4xl">
              <PreferencesCard
              preferences={preferences}
              onUpdatePreferences={handleUpdatePreferences} />

            </div>
          }

          {activeTab === 'notifications' &&
          <div className="max-w-4xl">
              <NotificationCenter
              notifications={notifications}
              onMarkAsRead={handleMarkAsRead}
              onMarkAllAsRead={handleMarkAllAsRead}
              onDeleteNotification={handleDeleteNotification} />

            </div>
          }
        </div>
      </main>
    </div>);

};

export default Dashboard;
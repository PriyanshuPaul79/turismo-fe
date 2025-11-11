import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = () => {
  const navigate = useNavigate();
  const [hoveredAction, setHoveredAction] = useState(null);

  const quickActions = [
    {
      id: 1,
      title: "Plan Your Trip",
      description: "Create personalized itineraries with AI assistance",
      icon: "MapPin",
      route: "/itinerary-builder",
      color: "bg-conversion",
      hoverColor: "hover:bg-conversion/90",
      textColor: "text-conversion-foreground",
      features: ["AI-powered suggestions", "Drag & drop planning", "Collaborative sharing"],
      estimatedTime: "5 minutes to start"
    },
    {
      id: 2,
      title: "Explore Destinations",
      description: "Discover amazing places with intelligent search",
      icon: "Compass",
      route: "/explore",
      color: "bg-primary",
      hoverColor: "hover:bg-primary/90",
      textColor: "text-primary-foreground",
      features: ["Smart filters", "Map integration", "Local insights"],
      estimatedTime: "Browse instantly"
    },
    {
      id: 3,
      title: "Find Events",
      description: "Experience authentic cultural celebrations",
      icon: "Calendar",
      route: "/events",
      color: "bg-accent",
      hoverColor: "hover:bg-accent/90",
      textColor: "text-accent-foreground",
      features: ["Cultural context", "Seasonal events", "Booking integration"],
      estimatedTime: "Discover now"
    },
    {
      id: 4,
      title: "My Dashboard",
      description: "Manage your trips and preferences",
      icon: "LayoutDashboard",
      route: "/dashboard",
      color: "bg-secondary",
      hoverColor: "hover:bg-secondary/90",
      textColor: "text-secondary-foreground",
      features: ["Trip history", "Saved favorites", "Personal recommendations"],
      estimatedTime: "Quick access"
    }
  ];

  const handleActionClick = (action) => {
    navigate(action?.route);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-headline font-bold text-foreground mb-4">
            Start Your Journey
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to plan, discover, and experience amazing travels
          </p>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {quickActions?.map((action) => (
            <div
              key={action?.id}
              onMouseEnter={() => setHoveredAction(action?.id)}
              onMouseLeave={() => setHoveredAction(null)}
              onClick={() => handleActionClick(action)}
              className="group cursor-pointer bg-card rounded-2xl overflow-hidden shadow-subtle hover:shadow-floating transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Header with Icon */}
              <div className={`${action?.color} ${action?.hoverColor} p-6 transition-colors duration-300`}>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center`}>
                    <Icon 
                      name={action?.icon} 
                      size={24} 
                      color="white"
                      className="group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <Icon 
                    name="ArrowRight" 
                    size={20} 
                    color="white"
                    className={`transform transition-transform duration-300 ${
                      hoveredAction === action?.id ? 'translate-x-1' : ''
                    }`}
                  />
                </div>
                
                <h3 className={`text-xl font-headline font-bold ${action?.textColor} mb-2`}>
                  {action?.title}
                </h3>
                <p className={`${action?.textColor} opacity-90 text-sm`}>
                  {action?.description}
                </p>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Features List */}
                <div className="mb-4">
                  <ul className="space-y-2">
                    {action?.features?.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2 text-sm text-card-foreground">
                        <Icon name="Check" size={16} className="text-success flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Estimated Time */}
                <div className="flex items-center space-x-2 mb-4">
                  <Icon name="Clock" size={16} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {action?.estimatedTime}
                  </span>
                </div>

                {/* Action Button */}
                <Button
                  variant="outline"
                  fullWidth
                  className={`group-hover:${action?.color?.replace('bg-', 'bg-')} group-hover:${action?.textColor?.replace('text-', 'text-')} group-hover:border-transparent transition-all duration-200`}
                >
                  Get Started
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Popular Shortcuts */}
        <div className="bg-card rounded-2xl p-8 shadow-subtle">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-headline font-bold text-card-foreground mb-2">
              Popular Shortcuts
            </h3>
            <p className="text-muted-foreground">
              Quick access to frequently used features
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { name: "Beach Destinations", icon: "Waves", route: "/explore?category=beach" },
              { name: "Mountain Adventures", icon: "Mountain", route: "/explore?category=mountain" },
              { name: "Cultural Tours", icon: "Camera", route: "/explore?category=cultural" },
              { name: "City Breaks", icon: "Building", route: "/explore?category=city" },
              { name: "Food & Wine", icon: "UtensilsCrossed", route: "/explore?category=food" },
              { name: "Wellness Retreats", icon: "Heart", route: "/explore?category=wellness" }
            ]?.map((shortcut, index) => (
              <button
                key={index}
                onClick={() => navigate(shortcut?.route)}
                className="flex flex-col items-center space-y-3 p-4 rounded-xl hover:bg-muted transition-colors duration-200 group"
              >
                <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-200">
                  <Icon name={shortcut?.icon} size={24} />
                </div>
                <span className="text-sm font-medium text-card-foreground text-center">
                  {shortcut?.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Help Section */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-2 text-muted-foreground mb-4">
            <Icon name="HelpCircle" size={20} />
            <span>Need help getting started?</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
            <Button
              variant="outline"
              onClick={() => navigate('/help')}
              iconName="BookOpen"
              iconPosition="left"
            >
              View Travel Guide
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate('/help')}
              iconName="MessageCircle"
              iconPosition="left"
            >
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickActions;
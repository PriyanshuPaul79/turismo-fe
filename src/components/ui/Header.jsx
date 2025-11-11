import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = ({ className = '' }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { name: 'Explore', path: '/explore', icon: 'Compass' },
    { name: 'Events', path: '/events', icon: 'Calendar' },
    { name: 'Plan Trip', path: '/itinerary-builder', icon: 'MapPin' },
    { name: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard' }
  ];

  const secondaryItems = [
    { name: 'Help', path: '/help', icon: 'HelpCircle' },
    { name: 'Settings', path: '/settings', icon: 'Settings' }
  ];

  const isActivePath = (path) => {
    return location?.pathname === path || location?.pathname?.startsWith(path + '/');
  };

  const handleNavigation = (path) => {
    window.location.href = path;
    setIsMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/95 backdrop-blur-md shadow-floating border-b border-border' 
          : 'bg-transparent'
      } ${className}`}
    >
      <div className="w-full">
        <div className="flex items-center justify-between h-16 px-4 lg:px-6">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => handleNavigation('/homepage')}
              className="flex items-center space-x-3 group"
            >
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-cultural rounded-lg flex items-center justify-center shadow-subtle group-hover:shadow-floating transition-all duration-300">
                  <Icon 
                    name="Compass" 
                    size={24} 
                    color="white" 
                    className="group-hover:rotate-12 transition-transform duration-300"
                  />
                </div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-2xl font-headline font-bold text-gradient-primary">
                  Turismo
                </h1>
                <p className="text-xs text-muted-foreground font-accent -mt-1">
                  Intelligent Wanderlust
                </p>
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground shadow-subtle'
                    : 'text-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <Icon name={item?.icon} size={18} />
                <span>{item?.name}</span>
              </button>
            ))}
            
            {/* More Menu */}
            <div className="relative group">
              <button className="flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium text-foreground hover:bg-muted transition-all duration-200">
                <Icon name="MoreHorizontal" size={18} />
                <span>More</span>
              </button>
              
              {/* Dropdown */}
              <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-floating opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2">
                  {secondaryItems?.map((item) => (
                    <button
                      key={item?.path}
                      onClick={() => handleNavigation(item?.path)}
                      className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-colors duration-150"
                    >
                      <Icon name={item?.icon} size={16} />
                      <span>{item?.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          {/* CTA and Mobile Menu */}
          <div className="flex items-center space-x-3">
            {/* Search Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleNavigation('/explore')}
              className="hidden sm:flex"
            >
              <Icon name="Search" size={20} />
            </Button>

            {/* Primary CTA */}
            <Button
              variant="default"
              onClick={() => handleNavigation('/itinerary-builder')}
              className="hidden sm:flex bg-conversion hover:bg-conversion/90 text-conversion-foreground"
            >
              Start Planning
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden"
            >
              <Icon name={isMenuOpen ? "X" : "Menu"} size={24} />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden bg-background border-t border-border shadow-floating">
            <div className="px-4 py-4 space-y-2">
              {navigationItems?.map((item) => (
                <button
                  key={item?.path}
                  onClick={() => handleNavigation(item?.path)}
                  className={`flex items-center space-x-3 w-full px-4 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActivePath(item?.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={item?.icon} size={20} />
                  <span>{item?.name}</span>
                </button>
              ))}
              
              <div className="border-t border-border pt-2 mt-4">
                {secondaryItems?.map((item) => (
                  <button
                    key={item?.path}
                    onClick={() => handleNavigation(item?.path)}
                    className="flex items-center space-x-3 w-full px-4 py-3 rounded-md text-sm font-medium text-foreground hover:bg-muted transition-all duration-200"
                  >
                    <Icon name={item?.icon} size={20} />
                    <span>{item?.name}</span>
                  </button>
                ))}
              </div>
              
              {/* Mobile CTA */}
              <div className="pt-4 border-t border-border">
                <Button
                  variant="default"
                  fullWidth
                  onClick={() => handleNavigation('/itinerary-builder')}
                  className="bg-conversion hover:bg-conversion/90 text-conversion-foreground"
                >
                  <Icon name="MapPin" size={20} className="mr-2" />
                  Start Planning Your Trip
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
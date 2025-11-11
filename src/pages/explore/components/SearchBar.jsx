import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const SearchBar = ({ onSearch, onVoiceSearch, searchQuery, setSearchQuery }) => {
  const [isListening, setIsListening] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);

  const popularSearches = [
    "Paris, France",
    "Tokyo, Japan", 
    "Bali, Indonesia",
    "New York City, USA",
    "Rome, Italy",
    "Barcelona, Spain",
    "Dubai, UAE",
    "London, UK"
  ];

  const recentSearches = [
    "Santorini, Greece",
    "Kyoto, Japan",
    "Machu Picchu, Peru",
    "Iceland Northern Lights"
  ];

  useEffect(() => {
    if (searchQuery?.length > 2) {
      const filtered = popularSearches?.filter(place =>
        place?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
      setSuggestions(filtered?.slice(0, 5));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  const handleSearch = (query = searchQuery) => {
    if (query?.trim()) {
      onSearch(query);
      setShowSuggestions(false);
      inputRef?.current?.blur();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    handleSearch(suggestion);
  };

  const handleVoiceSearch = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        const transcript = event?.results?.[0]?.[0]?.transcript;
        setSearchQuery(transcript);
        handleSearch(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition?.start();
    } else {
      onVoiceSearch?.();
    }
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Main Search Bar */}
      <div className="relative">
        <div className="flex items-center bg-background border border-border rounded-lg shadow-subtle overflow-hidden">
          <div className="flex-1 relative">
            <Icon 
              name="Search" 
              size={20} 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
            />
            <input
              ref={inputRef}
              type="text"
              placeholder="Where would you like to go? (e.g., Paris, Beach destinations, Cultural sites)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e?.target?.value)}
              onKeyPress={handleKeyPress}
              onFocus={() => setShowSuggestions(searchQuery?.length > 2)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              className="w-full pl-12 pr-4 py-4 text-foreground placeholder-muted-foreground bg-transparent border-none outline-none text-lg"
            />
          </div>
          
          <div className="flex items-center space-x-2 px-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleVoiceSearch}
              className={`${isListening ? 'text-red-500 animate-pulse' : 'text-muted-foreground hover:text-foreground'}`}
              title="Voice Search"
            >
              <Icon name={isListening ? "MicOff" : "Mic"} size={20} />
            </Button>
            
            <Button
              variant="default"
              onClick={() => handleSearch()}
              className="bg-primary hover:bg-primary/90 px-6"
            >
              <Icon name="Search" size={18} className="mr-2" />
              Search
            </Button>
          </div>
        </div>

        {/* Search Suggestions Dropdown */}
        {showSuggestions && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-floating z-50 max-h-80 overflow-y-auto">
            {suggestions?.length > 0 && (
              <div className="p-2">
                <div className="px-3 py-2 text-sm font-medium text-muted-foreground">
                  Suggestions
                </div>
                {suggestions?.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-muted rounded-md transition-colors"
                  >
                    <Icon name="MapPin" size={16} className="text-muted-foreground" />
                    <span className="text-popover-foreground">{suggestion}</span>
                  </button>
                ))}
              </div>
            )}
            
            {searchQuery?.length <= 2 && (
              <>
                {/* Recent Searches */}
                <div className="p-2 border-b border-border">
                  <div className="px-3 py-2 text-sm font-medium text-muted-foreground">
                    Recent Searches
                  </div>
                  {recentSearches?.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(search)}
                      className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-muted rounded-md transition-colors"
                    >
                      <Icon name="Clock" size={16} className="text-muted-foreground" />
                      <span className="text-popover-foreground">{search}</span>
                    </button>
                  ))}
                </div>
                
                {/* Popular Destinations */}
                <div className="p-2">
                  <div className="px-3 py-2 text-sm font-medium text-muted-foreground">
                    Popular Destinations
                  </div>
                  {popularSearches?.slice(0, 4)?.map((destination, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(destination)}
                      className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-muted rounded-md transition-colors"
                    >
                      <Icon name="TrendingUp" size={16} className="text-muted-foreground" />
                      <span className="text-popover-foreground">{destination}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
      {/* Quick Search Tags */}
      <div className="flex flex-wrap gap-2 mt-4">
        <span className="text-sm text-muted-foreground">Popular:</span>
        {popularSearches?.slice(0, 6)?.map((tag, index) => (
          <button
            key={index}
            onClick={() => handleSuggestionClick(tag)}
            className="px-3 py-1 text-sm bg-muted text-muted-foreground rounded-full hover:bg-muted/80 transition-colors"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
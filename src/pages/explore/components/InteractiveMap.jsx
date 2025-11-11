import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const InteractiveMap = ({ destinations, selectedDestination, onDestinationSelect, mapCenter, onMapCenterChange }) => {
  const [mapStyle, setMapStyle] = useState('roadmap');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [clusteredDestinations, setClusteredDestinations] = useState([]);

  const mapStyles = [
    { value: 'roadmap', label: 'Road', icon: 'Map' },
    { value: 'satellite', label: 'Satellite', icon: 'Satellite' },
    { value: 'hybrid', label: 'Hybrid', icon: 'Layers' },
    { value: 'terrain', label: 'Terrain', icon: 'Mountain' }
  ];

  // Mock clustering logic - in real app would use proper clustering algorithm
  useEffect(() => {
    const clustered = destinations?.map((dest, index) => ({
      ...dest,
      clusterId: Math.floor(index / 3), // Simple clustering
      clusterSize: destinations?.filter((_, i) => Math.floor(i / 3) === Math.floor(index / 3))?.length
    }));
    setClusteredDestinations(clustered);
  }, [destinations]);

  const handleDestinationClick = (destination) => {
    onDestinationSelect(destination);
    onMapCenterChange({ lat: destination?.lat, lng: destination?.lng });
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const mapUrl = `https://www.google.com/maps?q=${mapCenter?.lat},${mapCenter?.lng}&z=10&t=${mapStyle}&output=embed`;

  return (
    <div className={`bg-card rounded-lg border border-border shadow-subtle overflow-hidden ${
      isFullscreen ? 'fixed inset-4 z-50' : 'h-96 lg:h-[500px]'
    }`}>
      {/* Map Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-card">
        <div className="flex items-center space-x-2">
          <Icon name="Map" size={20} className="text-primary" />
          <h3 className="font-semibold text-card-foreground">Interactive Map</h3>
          <span className="text-sm text-muted-foreground">
            ({destinations?.length} destinations)
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Map Style Selector */}
          <div className="hidden sm:flex items-center space-x-1 bg-muted rounded-md p-1">
            {mapStyles?.map((style) => (
              <button
                key={style?.value}
                onClick={() => setMapStyle(style?.value)}
                className={`flex items-center space-x-1 px-2 py-1 rounded text-xs transition-colors ${
                  mapStyle === style?.value
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={style?.icon} size={14} />
                <span className="hidden md:inline">{style?.label}</span>
              </button>
            ))}
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleFullscreen}
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          >
            <Icon name={isFullscreen ? "Minimize2" : "Maximize2"} size={18} />
          </Button>
        </div>
      </div>
      {/* Map Container */}
      <div className="relative h-full">
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="Interactive Destination Map"
          referrerPolicy="no-referrer-when-downgrade"
          src={mapUrl}
          className="w-full h-full"
        />
        
        {/* Map Overlays */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Destination Markers Overlay */}
          <div className="relative w-full h-full">
            {clusteredDestinations?.map((destination, index) => (
              <div
                key={destination?.id}
                className="absolute pointer-events-auto"
                style={{
                  left: `${20 + (index % 5) * 15}%`,
                  top: `${20 + Math.floor(index / 5) * 20}%`
                }}
              >
                <button
                  onClick={() => handleDestinationClick(destination)}
                  className={`flex items-center justify-center w-8 h-8 rounded-full shadow-floating transition-all duration-200 hover:scale-110 ${
                    selectedDestination?.id === destination?.id
                      ? 'bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2'
                      : 'bg-background text-foreground hover:bg-muted'
                  }`}
                  title={destination?.name}
                >
                  {destination?.clusterSize > 1 ? (
                    <span className="text-xs font-bold">{destination?.clusterSize}</span>
                  ) : (
                    <Icon name="MapPin" size={16} />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Map Controls */}
        <div className="absolute bottom-4 left-4 flex flex-col space-y-2">
          <Button
            variant="secondary"
            size="icon"
            onClick={() => onMapCenterChange({ lat: mapCenter?.lat + 0.1, lng: mapCenter?.lng })}
            className="bg-background/90 backdrop-blur-sm"
            title="Pan North"
          >
            <Icon name="ChevronUp" size={18} />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            onClick={() => onMapCenterChange({ lat: mapCenter?.lat - 0.1, lng: mapCenter?.lng })}
            className="bg-background/90 backdrop-blur-sm"
            title="Pan South"
          >
            <Icon name="ChevronDown" size={18} />
          </Button>
        </div>

        <div className="absolute bottom-4 right-4 flex space-x-2">
          <Button
            variant="secondary"
            size="icon"
            onClick={() => onMapCenterChange({ lat: mapCenter?.lat, lng: mapCenter?.lng - 0.1 })}
            className="bg-background/90 backdrop-blur-sm"
            title="Pan West"
          >
            <Icon name="ChevronLeft" size={18} />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            onClick={() => onMapCenterChange({ lat: mapCenter?.lat, lng: mapCenter?.lng + 0.1 })}
            className="bg-background/90 backdrop-blur-sm"
            title="Pan East"
          >
            <Icon name="ChevronRight" size={18} />
          </Button>
        </div>

        {/* Selected Destination Info */}
        {selectedDestination && (
          <div className="absolute top-4 left-4 bg-background/95 backdrop-blur-sm rounded-lg border border-border shadow-floating p-3 max-w-xs">
            <div className="flex items-start space-x-3">
              <div className="w-12 h-12 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={selectedDestination?.image}
                  alt={selectedDestination?.imageAlt}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-foreground truncate">
                  {selectedDestination?.name}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {selectedDestination?.country}
                </p>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="flex items-center">
                    <Icon name="Star" size={14} className="text-yellow-500 fill-current" />
                    <span className="text-sm font-medium ml-1">
                      {selectedDestination?.rating}
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ({selectedDestination?.reviews} reviews)
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InteractiveMap;
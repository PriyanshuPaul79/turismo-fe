import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MapVisualization = ({ itinerary, selectedDay, onLocationSelect }) => {
  const [mapCenter, setMapCenter] = useState({ lat: 40.7128, lng: -74.0060 });
  const [zoom, setZoom] = useState(12);
  const [viewMode, setViewMode] = useState('satellite'); // satellite, roadmap, hybrid, terrain

  useEffect(() => {
    if (itinerary?.destination?.coordinates) {
      setMapCenter(itinerary?.destination?.coordinates);
    }
  }, [itinerary?.destination]);

  const getCurrentDayActivities = () => {
    if (selectedDay >= 0 && selectedDay < itinerary?.days?.length) {
      return itinerary?.days?.[selectedDay]?.activities;
    }
    return [];
  };

  const getAllLocations = () => {
    const locations = [];
    itinerary?.days?.forEach((day, dayIndex) => {
      day?.activities?.forEach((activity, activityIndex) => {
        if (activity?.coordinates) {
          locations?.push({
            ...activity,
            dayIndex,
            activityIndex,
            coordinates: activity?.coordinates
          });
        }
      });
    });
    return locations;
  };

  const generateMapUrl = () => {
    const activities = getCurrentDayActivities();
    const markers = activities?.filter(activity => activity?.coordinates)?.map((activity, index) => 
        `markers=color:red%7Clabel:${index + 1}%7C${activity?.coordinates?.lat},${activity?.coordinates?.lng}`
      )?.join('&');

    const path = activities?.filter(activity => activity?.coordinates)?.map(activity => `${activity?.coordinates?.lat},${activity?.coordinates?.lng}`)?.join('%7C');

    let url = `https://www.google.com/maps/embed/v1/view?key=demo&center=${mapCenter?.lat},${mapCenter?.lng}&zoom=${zoom}&maptype=${viewMode}`;
    
    if (markers) {
      url += `&${markers}`;
    }
    
    if (path && activities?.length > 1) {
      url += `&path=color:0x0000ff%7Cweight:3%7C${path}`;
    }

    return url;
  };

  const mockActivities = getCurrentDayActivities()?.length > 0 ? getCurrentDayActivities() : [
    {
      id: 'demo-1',
      title: 'Central Park',
      coordinates: { lat: 40.7829, lng: -73.9654 },
      time: '9:00 AM',
      type: 'attraction'
    },
    {
      id: 'demo-2',
      title: 'Metropolitan Museum',
      coordinates: { lat: 40.7794, lng: -73.9632 },
      time: '11:00 AM',
      type: 'attraction'
    },
    {
      id: 'demo-3',
      title: 'Times Square',
      coordinates: { lat: 40.7580, lng: -73.9855 },
      time: '2:00 PM',
      type: 'attraction'
    }
  ];

  const calculateDistance = (coord1, coord2) => {
    const R = 3959; // Earth's radius in miles
    const dLat = (coord2?.lat - coord1?.lat) * Math.PI / 180;
    const dLon = (coord2?.lng - coord1?.lng) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(coord1?.lat * Math.PI / 180) * Math.cos(coord2?.lat * Math.PI / 180) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const getTotalDistance = () => {
    const activities = mockActivities?.filter(a => a?.coordinates);
    if (activities?.length < 2) return 0;
    
    let total = 0;
    for (let i = 0; i < activities?.length - 1; i++) {
      total += calculateDistance(activities?.[i]?.coordinates, activities?.[i + 1]?.coordinates);
    }
    return total?.toFixed(1);
  };

  const getEstimatedTravelTime = () => {
    const distance = parseFloat(getTotalDistance());
    const avgSpeed = 25; // mph in city
    const hours = distance / avgSpeed;
    const minutes = Math.round(hours * 60);
    return minutes;
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-subtle">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Route Visualization</h3>
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === 'roadmap' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('roadmap')}
            >
              Map
            </Button>
            <Button
              variant={viewMode === 'satellite' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('satellite')}
            >
              Satellite
            </Button>
          </div>
        </div>

        {/* Route Stats */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center p-3 bg-muted rounded-lg">
            <div className="text-2xl font-bold text-primary">{mockActivities?.length}</div>
            <div className="text-sm text-muted-foreground">Stops</div>
          </div>
          <div className="text-center p-3 bg-muted rounded-lg">
            <div className="text-2xl font-bold text-primary">{getTotalDistance()}</div>
            <div className="text-sm text-muted-foreground">Miles</div>
          </div>
          <div className="text-center p-3 bg-muted rounded-lg">
            <div className="text-2xl font-bold text-primary">{getEstimatedTravelTime()}</div>
            <div className="text-sm text-muted-foreground">Min Travel</div>
          </div>
        </div>
      </div>
      <div className="p-6">
        {/* Interactive Map */}
        <div className="relative mb-6">
          <div className="w-full h-96 rounded-lg overflow-hidden border border-border">
            <iframe
              width="100%"
              height="100%"
              loading="lazy"
              title="Itinerary Route Map"
              referrerPolicy="no-referrer-when-downgrade"
              src={generateMapUrl()}
              className="w-full h-full"
            />
          </div>
          
          {/* Map Controls */}
          <div className="absolute top-4 right-4 flex flex-col space-y-2">
            <Button
              variant="secondary"
              size="icon"
              onClick={() => setZoom(Math.min(zoom + 1, 20))}
              className="bg-background/90 backdrop-blur-sm"
            >
              <Icon name="Plus" size={16} />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              onClick={() => setZoom(Math.max(zoom - 1, 1))}
              className="bg-background/90 backdrop-blur-sm"
            >
              <Icon name="Minus" size={16} />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              onClick={() => {
                setMapCenter({ lat: 40.7128, lng: -74.0060 });
                setZoom(12);
              }}
              className="bg-background/90 backdrop-blur-sm"
            >
              <Icon name="RotateCcw" size={16} />
            </Button>
          </div>
        </div>

        {/* Activity List with Map Integration */}
        <div className="space-y-3">
          <h4 className="font-medium text-foreground mb-3">Day {selectedDay + 1} Route</h4>
          {mockActivities?.map((activity, index) => (
            <div
              key={activity?.id}
              className="flex items-center space-x-4 p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors cursor-pointer"
              onClick={() => onLocationSelect && onLocationSelect(activity)}
            >
              <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <h5 className="font-medium text-foreground truncate">{activity?.title}</h5>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span className="flex items-center">
                    <Icon name="Clock" size={14} className="mr-1" />
                    {activity?.time}
                  </span>
                  {index > 0 && (
                    <span className="flex items-center">
                      <Icon name="Navigation" size={14} className="mr-1" />
                      {calculateDistance(
                        mockActivities?.[index - 1]?.coordinates,
                        activity?.coordinates
                      )?.toFixed(1)} mi
                    </span>
                  )}
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e?.stopPropagation();
                  if (activity?.coordinates) {
                    setMapCenter(activity?.coordinates);
                    setZoom(15);
                  }
                }}
              >
                <Icon name="MapPin" size={16} />
              </Button>
            </div>
          ))}
        </div>

        {/* Route Optimization */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="Route" size={20} className="text-blue-600 mt-0.5" />
            <div>
              <h5 className="font-medium text-blue-900">Route Optimization</h5>
              <p className="text-sm text-blue-700 mt-1">
                Current route covers {getTotalDistance()} miles with an estimated {getEstimatedTravelTime()} minutes of travel time.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-2 border-blue-300 text-blue-700 hover:bg-blue-100"
              >
                Optimize Route
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapVisualization;
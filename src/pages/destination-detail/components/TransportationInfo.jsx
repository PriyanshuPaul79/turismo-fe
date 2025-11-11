import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TransportationInfo = ({ destination }) => {
  const [selectedTransport, setSelectedTransport] = useState('air');

  const transportOptions = [
    { id: 'air', name: 'By Air', icon: 'Plane' },
    { id: 'train', name: 'By Train', icon: 'Train' },
    { id: 'road', name: 'By Road', icon: 'Car' },
    { id: 'local', name: 'Local Transport', icon: 'Bus' }
  ];

  const airportInfo = {
    name: "Indira Gandhi International Airport (DEL)",
    distance: "16 km from city center",
    terminals: 3,
    airlines: 85,
    connections: [
      { city: "Mumbai", duration: "2h 15m", frequency: "Every 30 mins", price: "₹4,500 - ₹15,000" },
      { city: "Bangalore", duration: "2h 45m", frequency: "Every 45 mins", price: "₹5,200 - ₹18,000" },
      { city: "Chennai", duration: "2h 30m", frequency: "Every hour", price: "₹4,800 - ₹16,500" },
      { city: "Kolkata", duration: "2h 10m", frequency: "Every 2 hours", price: "₹4,200 - ₹14,000" }
    ],
    facilities: ["Free WiFi", "Lounges", "Duty Free", "Food Courts", "Currency Exchange", "Car Rental"]
  };

  const trainInfo = {
    stations: [
      { name: "New Delhi Railway Station", code: "NDLS", distance: "6 km", type: "Main Terminal" },
      { name: "Delhi Junction", code: "DLI", distance: "8 km", type: "Major Junction" },
      { name: "Hazrat Nizamuddin", code: "NZM", distance: "12 km", type: "Premium Trains" }
    ],
    connections: [
      { city: "Mumbai", duration: "15h 50m", trains: "Rajdhani Express", price: "₹1,500 - ₹8,000" },
      { city: "Kolkata", duration: "17h 20m", trains: "Howrah Rajdhani", price: "₹1,800 - ₹9,500" },
      { city: "Chennai", duration: "28h 15m", trains: "Tamil Nadu Express", price: "₹1,200 - ₹6,500" },
      { city: "Jaipur", duration: "4h 30m", trains: "Shatabdi Express", price: "₹800 - ₹2,500" }
    ]
  };

  const roadInfo = {
    highways: [
      { name: "NH-1 (Grand Trunk Road)", destinations: "Amritsar, Chandigarh", condition: "Excellent" },
      { name: "NH-2 (Delhi-Kolkata Highway)", destinations: "Agra, Kanpur, Allahabad", condition: "Good" },
      { name: "NH-8 (Delhi-Mumbai Highway)", destinations: "Gurgaon, Jaipur, Udaipur", condition: "Excellent" },
      { name: "NH-24 (Delhi-Lucknow Highway)", destinations: "Ghaziabad, Bareilly", condition: "Good" }
    ],
    busServices: [
      { operator: "Delhi Transport Corporation", type: "Government", routes: "State & Interstate" },
      { operator: "Redbus", type: "Private", routes: "Pan India" },
      { operator: "UPSRTC", type: "State", routes: "Uttar Pradesh" },
      { operator: "Haryana Roadways", type: "State", routes: "Haryana & Punjab" }
    ]
  };

  const localTransport = {
    metro: {
      lines: 12,
      stations: 286,
      coverage: "348 km",
      fare: "₹10 - ₹60",
      timings: "5:00 AM - 11:30 PM",
      features: ["Air Conditioned", "Security Checks", "Women\'s Coach", "Disabled Friendly"]
    },
    buses: {
      fleet: "6,500+ buses",
      routes: "630+ routes",
      types: ["AC Buses", "CNG Buses", "Electric Buses", "Low Floor Buses"],
      fare: "₹5 - ₹25"
    },
    taxis: {
      services: ["Uber", "Ola", "Meru Cabs", "Auto Rickshaws"],
      availability: "24/7",
      features: ["GPS Tracking", "Digital Payments", "AC Vehicles", "Safety Features"]
    }
  };

  const renderTransportContent = () => {
    switch (selectedTransport) {
      case 'air':
        return (
          <div className="space-y-6">
            <div className="bg-muted rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Plane" size={24} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{airportInfo?.name}</h4>
                  <p className="text-sm text-muted-foreground">{airportInfo?.distance}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{airportInfo?.terminals}</div>
                  <div className="text-sm text-muted-foreground">Terminals</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{airportInfo?.airlines}</div>
                  <div className="text-sm text-muted-foreground">Airlines</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">24/7</div>
                  <div className="text-sm text-muted-foreground">Operations</div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {airportInfo?.facilities?.map((facility, index) => (
                  <span key={index} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                    {facility}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h5 className="font-medium text-foreground mb-4">Popular Flight Connections</h5>
              <div className="space-y-3">
                {airportInfo?.connections?.map((connection, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Icon name="MapPin" size={16} className="text-muted-foreground" />
                      <div>
                        <div className="font-medium text-foreground">{connection?.city}</div>
                        <div className="text-sm text-muted-foreground">{connection?.frequency}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-foreground">{connection?.duration}</div>
                      <div className="text-sm text-muted-foreground">{connection?.price}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'train':
        return (
          <div className="space-y-6">
            <div>
              <h5 className="font-medium text-foreground mb-4">Major Railway Stations</h5>
              <div className="grid gap-3">
                {trainInfo?.stations?.map((station, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Icon name="Train" size={16} className="text-primary" />
                      <div>
                        <div className="font-medium text-foreground">{station?.name}</div>
                        <div className="text-sm text-muted-foreground">{station?.type}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-foreground">{station?.code}</div>
                      <div className="text-sm text-muted-foreground">{station?.distance}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h5 className="font-medium text-foreground mb-4">Popular Train Routes</h5>
              <div className="space-y-3">
                {trainInfo?.connections?.map((connection, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Icon name="MapPin" size={16} className="text-muted-foreground" />
                      <div>
                        <div className="font-medium text-foreground">{connection?.city}</div>
                        <div className="text-sm text-muted-foreground">{connection?.trains}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-foreground">{connection?.duration}</div>
                      <div className="text-sm text-muted-foreground">{connection?.price}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'road':
        return (
          <div className="space-y-6">
            <div>
              <h5 className="font-medium text-foreground mb-4">Major Highways</h5>
              <div className="space-y-3">
                {roadInfo?.highways?.map((highway, index) => (
                  <div key={index} className="p-3 border border-border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium text-foreground">{highway?.name}</div>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        highway?.condition === 'Excellent' ?'bg-success/10 text-success' :'bg-warning/10 text-warning'
                      }`}>
                        {highway?.condition}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Connects to: {highway?.destinations}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h5 className="font-medium text-foreground mb-4">Bus Services</h5>
              <div className="grid md:grid-cols-2 gap-3">
                {roadInfo?.busServices?.map((service, index) => (
                  <div key={index} className="p-3 border border-border rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon name="Bus" size={16} className="text-primary" />
                      <div className="font-medium text-foreground">{service?.operator}</div>
                    </div>
                    <div className="text-sm text-muted-foreground mb-1">{service?.type}</div>
                    <div className="text-sm text-muted-foreground">{service?.routes}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'local':
        return (
          <div className="space-y-6">
            <div className="bg-muted rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Train" size={24} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Delhi Metro</h4>
                  <p className="text-sm text-muted-foreground">World-class rapid transit system</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-xl font-bold text-primary">{localTransport?.metro?.lines}</div>
                  <div className="text-sm text-muted-foreground">Lines</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-primary">{localTransport?.metro?.stations}</div>
                  <div className="text-sm text-muted-foreground">Stations</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-primary">{localTransport?.metro?.coverage}</div>
                  <div className="text-sm text-muted-foreground">Coverage</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-primary">{localTransport?.metro?.fare}</div>
                  <div className="text-sm text-muted-foreground">Fare Range</div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {localTransport?.metro?.features?.map((feature, index) => (
                  <span key={index} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                    {feature}
                  </span>
                ))}
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-muted rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <Icon name="Bus" size={20} className="text-secondary" />
                  <h5 className="font-medium text-foreground">City Buses</h5>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div>Fleet: {localTransport?.buses?.fleet}</div>
                  <div>Routes: {localTransport?.buses?.routes}</div>
                  <div>Fare: {localTransport?.buses?.fare}</div>
                </div>
                <div className="flex flex-wrap gap-1 mt-3">
                  {localTransport?.buses?.types?.map((type, index) => (
                    <span key={index} className="px-2 py-1 bg-secondary/10 text-secondary text-xs rounded-full">
                      {type}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="bg-muted rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <Icon name="Car" size={20} className="text-accent" />
                  <h5 className="font-medium text-foreground">Taxis & Cabs</h5>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground mb-3">
                  <div>Availability: {localTransport?.taxis?.availability}</div>
                  <div>Services: {localTransport?.taxis?.services?.join(", ")}</div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {localTransport?.taxis?.features?.map((feature, index) => (
                    <span key={index} className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-card rounded-lg shadow-subtle">
      <div className="p-6 border-b border-border">
        <h3 className="text-xl font-headline font-semibold text-foreground mb-4">
          Transportation & Connectivity
        </h3>
        
        {/* Transport Mode Tabs */}
        <div className="flex flex-wrap gap-2">
          {transportOptions?.map((option) => (
            <button
              key={option?.id}
              onClick={() => setSelectedTransport(option?.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                selectedTransport === option?.id
                  ? 'bg-primary text-primary-foreground shadow-subtle'
                  : 'bg-muted hover:bg-muted/80 text-muted-foreground'
              }`}
            >
              <Icon name={option?.icon} size={16} />
              <span>{option?.name}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="p-6">
        {renderTransportContent()}
        
        {/* Quick Actions */}
        <div className="mt-6 pt-6 border-t border-border">
          <div className="flex flex-wrap gap-3">
            <Button variant="default">
              <Icon name="Calendar" size={16} className="mr-2" />
              Book Transportation
            </Button>
            <Button variant="outline">
              <Icon name="Map" size={16} className="mr-2" />
              View Routes
            </Button>
            <Button variant="outline">
              <Icon name="Clock" size={16} className="mr-2" />
              Check Schedules
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransportationInfo;
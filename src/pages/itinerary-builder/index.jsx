import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import TemplateSelector from './components/TemplateSelector';
import ItineraryTimeline from './components/ItineraryTimeline';
import ActivityLibrary from './components/ActivityLibrary';
import BudgetTracker from './components/BudgetTracker';
import MapVisualization from './components/MapVisualization';
import CollaborationPanel from './components/CollaborationPanel';

const ItineraryBuilder = () => {
  const [itinerary, setItinerary] = useState({
    id: null,
    title: 'My New Trip',
    destination: '',
    startDate: '',
    endDate: '',
    days: []
  });
  const [activeTab, setActiveTab] = useState('timeline');
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);
  const [budget, setBudget] = useState({
    total: 0,
    allocated: 0,
    remaining: 0,
    breakdown: {}
  });

  useEffect(() => {
    // Initialize with a default 3-day itinerary if empty
    if (itinerary.days.length === 0) {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const dayAfter = new Date(tomorrow);
      dayAfter.setDate(dayAfter.getDate() + 1);

      setItinerary({
        ...itinerary,
        startDate: today.toISOString().split('T')[0],
        endDate: dayAfter.toISOString().split('T')[0],
        days: [
          {
            date: today.toISOString().split('T')[0],
            activities: []
          },
          {
            date: tomorrow.toISOString().split('T')[0],
            activities: []
          },
          {
            date: dayAfter.toISOString().split('T')[0],
            activities: []
          }
        ]
      });
    }
  }, []);

  const handleUpdateItinerary = (updatedItinerary) => {
    setItinerary(updatedItinerary);
  };

  const handleTemplateSelect = (template) => {
    setItinerary(template);
    setShowTemplateSelector(false);
  };

  const handleSaveItinerary = () => {
    console.log('Saving itinerary:', itinerary);
    // Save logic would go here
  };

  const handleExportItinerary = () => {
    console.log('Exporting itinerary:', itinerary);
    // Export logic would go here
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        {/* Header Section */}
        <div className="bg-gradient-hero text-white py-8">
          <div className="max-w-7xl mx-auto px-4 lg:px-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl lg:text-4xl font-headline font-bold mb-2">
                  Itinerary Builder
                </h1>
                <p className="text-white/90">
                  Plan your perfect trip with AI-powered suggestions
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setShowTemplateSelector(true)}
                  className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20"
                >
                  <Icon name="FileText" size={18} className="mr-2" />
                  Templates
                </Button>
                <Button
                  variant="outline"
                  onClick={handleSaveItinerary}
                  className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20"
                >
                  <Icon name="Save" size={18} className="mr-2" />
                  Save
                </Button>
                <Button
                  variant="default"
                  onClick={handleExportItinerary}
                  className="bg-conversion hover:bg-conversion/90 text-conversion-foreground"
                >
                  <Icon name="Download" size={18} className="mr-2" />
                  Export
                </Button>
              </div>
            </div>

            {/* Trip Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">
                  Trip Title
                </label>
                <input
                  type="text"
                  value={itinerary.title}
                  onChange={(e) => setItinerary({ ...itinerary, title: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
                  placeholder="Enter trip title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">
                  Destination
                </label>
                <input
                  type="text"
                  value={itinerary.destination}
                  onChange={(e) => setItinerary({ ...itinerary, destination: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
                  placeholder="Where are you going?"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={itinerary.startDate}
                    onChange={(e) => setItinerary({ ...itinerary, startDate: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={itinerary.endDate}
                    onChange={(e) => setItinerary({ ...itinerary, endDate: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
          {/* Tab Navigation */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {[
              { id: 'timeline', label: 'Timeline', icon: 'Calendar' },
              { id: 'activities', label: 'Activities', icon: 'MapPin' },
              { id: 'map', label: 'Map', icon: 'Map' },
              { id: 'budget', label: 'Budget', icon: 'DollarSign' },
              { id: 'collaborate', label: 'Collaborate', icon: 'Users' }
            ].map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? 'default' : 'ghost'}
                onClick={() => setActiveTab(tab.id)}
                className="flex-shrink-0"
              >
                <Icon name={tab.icon} size={16} className="mr-2" />
                {tab.label}
              </Button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content Area */}
            <div className="lg:col-span-2">
              {activeTab === 'timeline' && (
                <ItineraryTimeline
                  itinerary={itinerary}
                  onUpdateItinerary={handleUpdateItinerary}
                />
              )}
              {activeTab === 'activities' && (
                <ActivityLibrary
                  destination={itinerary.destination}
                  onAddActivity={(activity) => {
                    const updatedItinerary = { ...itinerary };
                    if (updatedItinerary.days.length > 0) {
                      updatedItinerary.days[0].activities.push(activity);
                      setItinerary(updatedItinerary);
                    }
                  }}
                />
              )}
              {activeTab === 'map' && (
                <MapVisualization
                  itinerary={itinerary}
                />
              )}
              {activeTab === 'budget' && (
                <BudgetTracker
                  itinerary={itinerary}
                  budget={budget}
                  onBudgetChange={setBudget}
                />
              )}
              {activeTab === 'collaborate' && (
                <CollaborationPanel
                  itinerary={itinerary}
                />
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {activeTab === 'timeline' && (
                <div className="bg-card rounded-lg shadow-subtle p-6">
                  <h3 className="font-semibold text-foreground mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      fullWidth
                      onClick={() => {
                        const newDay = {
                          date: new Date().toISOString().split('T')[0],
                          activities: []
                        };
                        setItinerary({
                          ...itinerary,
                          days: [...itinerary.days, newDay]
                        });
                      }}
                    >
                      <Icon name="Plus" size={16} className="mr-2" />
                      Add Day
                    </Button>
                    <Button variant="outline" fullWidth>
                      <Icon name="Sparkles" size={16} className="mr-2" />
                      AI Suggestions
                    </Button>
                    <Button variant="outline" fullWidth>
                      <Icon name="RefreshCw" size={16} className="mr-2" />
                      Optimize Route
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Template Selector Modal */}
      {showTemplateSelector && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-lg shadow-floating max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-headline font-bold text-foreground">
                  Choose a Template
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowTemplateSelector(false)}
                >
                  <Icon name="X" size={20} />
                </Button>
              </div>
              <TemplateSelector
                onSelect={handleTemplateSelect}
                onClose={() => setShowTemplateSelector(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItineraryBuilder;


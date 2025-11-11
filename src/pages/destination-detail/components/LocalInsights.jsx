import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const LocalInsights = ({ destination }) => {
  const [activeTab, setActiveTab] = useState('hidden-gems');

  const tabs = [
  { id: 'hidden-gems', name: 'Hidden Gems', icon: 'Gem' },
  { id: 'local-tips', name: 'Local Tips', icon: 'Lightbulb' },
  { id: 'cultural-etiquette', name: 'Cultural Etiquette', icon: 'Users' },
  { id: 'food-guide', name: 'Food Guide', icon: 'UtensilsCrossed' }];


  const hiddenGems = [
  {
    id: 1,
    name: "Agrasen ki Baoli",
    type: "Historical Stepwell",
    description: "A mysterious 14th-century stepwell hidden in the heart of Connaught Place. This architectural marvel offers a peaceful escape from the city\'s chaos.",
    image: "https://images.unsplash.com/photo-1456511548622-454da0ecd163",
    imageAlt: "Ancient stone stepwell with geometric patterns and multiple levels descending into darkness",
    tips: "Visit early morning for the best photography light and fewer crowds",
    difficulty: "Easy",
    timeNeeded: "30-45 minutes"
  },
  {
    id: 2,
    name: "Hauz Khas Village",
    type: "Bohemian Quarter",
    description: "A trendy neighborhood combining medieval ruins with contemporary cafes, art galleries, and boutique shops.",
    image: "https://images.unsplash.com/photo-1520491848845-be525a70332f",
    imageAlt: "Narrow cobblestone streets with colorful cafes and ancient stone structures in background",
    tips: "Perfect for evening strolls and rooftop dining experiences",
    difficulty: "Easy",
    timeNeeded: "2-3 hours"
  },
  {
    id: 3,
    name: "Mehrauli Archaeological Park",
    type: "Heritage Park",
    description: "Sprawling park containing over 100 historically significant monuments spanning 1,000 years of Delhi's history.",
    image: "https://images.unsplash.com/photo-1550475465-701327740531",
    imageAlt: "Ancient ruins and tombs scattered across green parkland with walking paths",
    tips: "Carry water and wear comfortable shoes for extensive walking",
    difficulty: "Moderate",
    timeNeeded: "3-4 hours"
  }];


  const localTips = [
  {
    category: "Transportation",
    icon: "Car",
    tips: [
    "Use Delhi Metro for fastest travel during peak hours",
    "Auto-rickshaws are convenient but negotiate fare beforehand",
    "Uber and Ola are reliable for door-to-door service",
    "Avoid traveling during 8-10 AM and 6-8 PM rush hours"]

  },
  {
    category: "Shopping",
    icon: "ShoppingBag",
    tips: [
    "Bargaining is expected in local markets like Chandni Chowk",
    "Fixed prices in malls and branded stores",
    "Carry cash for street vendors and small shops",
    "Best shopping areas: Connaught Place, Khan Market, Karol Bagh"]

  },
  {
    category: "Safety",
    icon: "Shield",
    tips: [
    "Keep copies of important documents separately",
    "Use official taxi services from airports",
    "Stay hydrated and carry bottled water",
    "Respect local customs, especially at religious sites"]

  },
  {
    category: "Money",
    icon: "CreditCard",
    tips: [
    "ATMs are widely available throughout the city",
    "Most restaurants and shops accept cards",
    "Keep small denominations for tips and street food",
    "Currency exchange available at banks and authorized dealers"]

  }];


  const culturalEtiquette = [
  {
    title: "Religious Sites",
    icon: "Church",
    guidelines: [
    "Remove shoes before entering temples and mosques",
    "Dress modestly - cover shoulders and knees",
    "Photography may be restricted in certain areas",
    "Maintain silence and respect ongoing prayers"]

  },
  {
    title: "Social Interactions",
    icon: "Handshake",
    guidelines: [
    "Namaste greeting with palms together is appreciated",
    "Use right hand for eating and greeting",
    "Respect personal space and cultural differences",
    "Learn basic Hindi phrases - locals appreciate the effort"]

  },
  {
    title: "Dining Customs",
    icon: "UtensilsCrossed",
    guidelines: [
    "Wash hands before and after meals",
    "Eating with hands is common and acceptable",
    "Try local specialties but be cautious with spice levels",
    "Tipping 10% is customary in restaurants"]

  }];


  const foodGuide = [
  {
    category: "Street Food",
    icon: "Truck",
    items: [
    { name: "Chaat", description: "Savory snacks with tangy chutneys", price: "₹30-80" },
    { name: "Paranthas", description: "Stuffed flatbreads from Paranthe Wali Gali", price: "₹50-120" },
    { name: "Kulfi", description: "Traditional Indian ice cream", price: "₹40-100" },
    { name: "Jalebi", description: "Sweet spiral-shaped dessert", price: "₹60-150" }]

  },
  {
    category: "Regional Specialties",
    icon: "ChefHat",
    items: [
    { name: "Butter Chicken", description: "Creamy tomato-based curry", price: "₹300-500" },
    { name: "Biryani", description: "Fragrant rice dish with meat/vegetables", price: "₹250-450" },
    { name: "Dal Makhani", description: "Rich black lentil curry", price: "₹200-350" },
    { name: "Naan", description: "Leavened bread baked in tandoor", price: "₹50-120" }]

  }];


  const renderTabContent = () => {
    switch (activeTab) {
      case 'hidden-gems':
        return (
          <div className="space-y-6">
            {hiddenGems?.map((gem) =>
            <div key={gem?.id} className="bg-muted rounded-lg p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="w-full lg:w-48 h-32 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                    src={gem?.image}
                    alt={gem?.imageAlt}
                    className="w-full h-full object-cover" />

                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="text-lg font-semibold text-foreground">{gem?.name}</h4>
                        <p className="text-sm text-secondary font-medium">{gem?.type}</p>
                      </div>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Icon name="Clock" size={12} />
                          <span>{gem?.timeNeeded}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Icon name="TrendingUp" size={12} />
                          <span>{gem?.difficulty}</span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mb-4">{gem?.description}</p>
                    
                    <div className="bg-primary/10 rounded-lg p-3">
                      <div className="flex items-start space-x-2">
                        <Icon name="Lightbulb" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <h5 className="text-sm font-medium text-foreground mb-1">Local Tip</h5>
                          <p className="text-sm text-muted-foreground">{gem?.tips}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>);


      case 'local-tips':
        return (
          <div className="grid md:grid-cols-2 gap-6">
            {localTips?.map((category, index) =>
            <div key={index} className="bg-muted rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name={category?.icon} size={20} className="text-primary" />
                  </div>
                  <h4 className="text-lg font-semibold text-foreground">{category?.category}</h4>
                </div>
                
                <ul className="space-y-3">
                  {category?.tips?.map((tip, tipIndex) =>
                <li key={tipIndex} className="flex items-start space-x-3">
                      <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{tip}</span>
                    </li>
                )}
                </ul>
              </div>
            )}
          </div>);


      case 'cultural-etiquette':
        return (
          <div className="space-y-6">
            {culturalEtiquette?.map((section, index) =>
            <div key={index} className="bg-muted rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                    <Icon name={section?.icon} size={20} className="text-secondary" />
                  </div>
                  <h4 className="text-lg font-semibold text-foreground">{section?.title}</h4>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {section?.guidelines?.map((guideline, guideIndex) =>
                <div key={guideIndex} className="flex items-start space-x-3">
                      <Icon name="Info" size={16} className="text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{guideline}</span>
                    </div>
                )}
                </div>
              </div>
            )}
          </div>);


      case 'food-guide':
        return (
          <div className="space-y-6">
            {foodGuide?.map((category, index) =>
            <div key={index} className="bg-muted rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Icon name={category?.icon} size={20} className="text-accent" />
                  </div>
                  <h4 className="text-lg font-semibold text-foreground">{category?.category}</h4>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {category?.items?.map((item, itemIndex) =>
                <div key={itemIndex} className="bg-background rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-medium text-foreground">{item?.name}</h5>
                        <span className="text-sm font-medium text-primary">{item?.price}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{item?.description}</p>
                    </div>
                )}
                </div>
              </div>
            )}
          </div>);


      default:
        return null;
    }
  };

  return (
    <div className="bg-card rounded-lg shadow-subtle">
      <div className="p-6 border-b border-border">
        <h3 className="text-xl font-headline font-semibold text-foreground mb-4">
          Local Insights & Hidden Gems
        </h3>
        
        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2">
          {tabs?.map((tab) =>
          <button
            key={tab?.id}
            onClick={() => setActiveTab(tab?.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            activeTab === tab?.id ?
            'bg-primary text-primary-foreground shadow-subtle' :
            'bg-muted hover:bg-muted/80 text-muted-foreground'}`
            }>

              <Icon name={tab?.icon} size={16} />
              <span>{tab?.name}</span>
            </button>
          )}
        </div>
      </div>
      <div className="p-6">
        {renderTabContent()}
      </div>
    </div>);

};

export default LocalInsights;
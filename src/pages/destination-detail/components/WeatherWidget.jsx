import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const WeatherWidget = ({ destination }) => {
  const [selectedMonth, setSelectedMonth] = useState(new Date()?.getMonth());

  const weatherData = [
    { month: "Jan", temp: "22°C", condition: "Sunny", icon: "Sun", rainfall: "Low", description: "Perfect for outdoor activities" },
    { month: "Feb", temp: "24°C", condition: "Partly Cloudy", icon: "CloudSun", rainfall: "Low", description: "Ideal weather conditions" },
    { month: "Mar", temp: "26°C", condition: "Sunny", icon: "Sun", rainfall: "Medium", description: "Great for sightseeing" },
    { month: "Apr", temp: "28°C", condition: "Hot", icon: "Sun", rainfall: "Low", description: "Hot but comfortable" },
    { month: "May", temp: "30°C", condition: "Very Hot", icon: "Sun", rainfall: "High", description: "Pre-monsoon heat" },
    { month: "Jun", temp: "27°C", condition: "Rainy", icon: "CloudRain", rainfall: "Very High", description: "Monsoon season begins" },
    { month: "Jul", temp: "25°C", condition: "Heavy Rain", icon: "CloudRain", rainfall: "Very High", description: "Peak monsoon period" },
    { month: "Aug", temp: "25°C", condition: "Rainy", icon: "CloudRain", rainfall: "High", description: "Monsoon continues" },
    { month: "Sep", temp: "26°C", condition: "Partly Cloudy", icon: "CloudSun", rainfall: "Medium", description: "Post-monsoon freshness" },
    { month: "Oct", temp: "28°C", condition: "Pleasant", icon: "Sun", rainfall: "Low", description: "Excellent travel weather" },
    { month: "Nov", temp: "25°C", condition: "Cool", icon: "CloudSun", rainfall: "Very Low", description: "Perfect temperature" },
    { month: "Dec", temp: "23°C", condition: "Cool", icon: "CloudSun", rainfall: "Very Low", description: "Cool and comfortable" }
  ];

  const currentWeather = weatherData?.[selectedMonth];
  const bestMonths = [1, 2, 9, 10, 11]; // Feb, Mar, Oct, Nov, Dec

  return (
    <div className="bg-card rounded-lg p-6 shadow-subtle">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-headline font-semibold text-foreground">
          Weather & Best Time to Visit
        </h3>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Thermometer" size={16} />
          <span>Current: 26°C</span>
        </div>
      </div>
      {/* Current Weather Display */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-subtle">
              <Icon name={currentWeather?.icon} size={32} className="text-primary" />
            </div>
            <div>
              <h4 className="text-2xl font-bold text-foreground">{currentWeather?.temp}</h4>
              <p className="text-muted-foreground">{currentWeather?.condition}</p>
              <p className="text-sm text-muted-foreground">{currentWeather?.description}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Droplets" size={16} className="text-blue-500" />
              <span className="text-sm text-muted-foreground">Rainfall: {currentWeather?.rainfall}</span>
            </div>
            <div className="text-sm text-muted-foreground">
              {weatherData?.[selectedMonth]?.month} Weather
            </div>
          </div>
        </div>
      </div>
      {/* Monthly Weather Grid */}
      <div className="grid grid-cols-6 lg:grid-cols-12 gap-2 mb-6">
        {weatherData?.map((month, index) => (
          <button
            key={index}
            onClick={() => setSelectedMonth(index)}
            className={`p-2 rounded-lg text-center transition-all duration-200 ${
              selectedMonth === index
                ? 'bg-primary text-primary-foreground shadow-subtle'
                : bestMonths?.includes(index)
                ? 'bg-success/10 text-success hover:bg-success/20' :'bg-muted hover:bg-muted/80 text-muted-foreground'
            }`}
          >
            <div className="text-xs font-medium">{month?.month}</div>
            <div className="text-xs mt-1">{month?.temp}</div>
          </button>
        ))}
      </div>
      {/* Best Time Recommendations */}
      <div className="space-y-4">
        <h4 className="font-semibold text-foreground">Travel Recommendations</h4>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-success/10 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="ThumbsUp" size={16} className="text-success" />
              <span className="font-medium text-success">Best Time</span>
            </div>
            <p className="text-sm text-muted-foreground">
              October to March offers pleasant weather with comfortable temperatures and minimal rainfall.
            </p>
          </div>
          
          <div className="bg-warning/10 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="AlertTriangle" size={16} className="text-warning" />
              <span className="font-medium text-warning">Avoid</span>
            </div>
            <p className="text-sm text-muted-foreground">
              June to August experiences heavy monsoon rains which may affect outdoor activities.
            </p>
          </div>
        </div>

        {/* Seasonal Activities */}
        <div className="bg-muted rounded-lg p-4">
          <h5 className="font-medium text-foreground mb-3">Seasonal Highlights</h5>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Icon name="Sun" size={14} className="text-yellow-500" />
              <span><strong>Winter (Dec-Feb):</strong> Perfect for heritage walks and outdoor exploration</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Flower" size={14} className="text-pink-500" />
              <span><strong>Spring (Mar-May):</strong> Blooming gardens and cultural festivals</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="CloudRain" size={14} className="text-blue-500" />
              <span><strong>Monsoon (Jun-Sep):</strong> Lush landscapes but limited outdoor activities</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
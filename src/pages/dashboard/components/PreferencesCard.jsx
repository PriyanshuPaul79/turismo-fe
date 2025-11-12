import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const PreferencesCard = ({ preferences, onUpdatePreferences }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(preferences);

  const budgetOptions = [
    { value: 'budget', label: 'Budget ($0-$100/day)' },
    { value: 'mid-range', label: 'Mid-range ($100-$300/day)' },
    { value: 'luxury', label: 'Luxury ($300+/day)' }
  ];

  const travelStyleOptions = [
    { value: 'adventure', label: 'Adventure & Outdoor' },
    { value: 'cultural', label: 'Cultural & Historical' },
    { value: 'relaxation', label: 'Relaxation & Wellness' },
    { value: 'urban', label: 'Urban & City Life' },
    { value: 'nature', label: 'Nature & Wildlife' },
    { value: 'food', label: 'Food & Culinary' }
  ];

  const accommodationOptions = [
    { value: 'hotel', label: 'Hotels' },
    { value: 'resort', label: 'Resorts' },
    { value: 'hostel', label: 'Hostels' },
    { value: 'apartment', label: 'Apartments' },
    { value: 'boutique', label: 'Boutique Hotels' }
  ];

  const handleSave = () => {
    onUpdatePreferences(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(preferences);
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayChange = (field, value, checked) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked 
        ? [...prev?.[field], value]
        : prev?.[field]?.filter(item => item !== value)
    }));
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-subtle">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Settings" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="font-headline font-semibold text-lg">Travel Preferences</h3>
            <p className="text-muted-foreground text-sm">Customize your experience</p>
          </div>
        </div>
        
        {!isEditing ? (
          <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
            <Icon name="Edit" size={16} className="mr-1" />
            Edit
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="default" size="sm" onClick={handleSave}>
              <Icon name="Check" size={16} className="mr-1" />
              Save
            </Button>
          </div>
        )}
      </div>
      <div className="space-y-6">
        {/* Budget Preference */}
        <div>
          <label className="block text-sm font-medium mb-2">Budget Range</label>
          {isEditing ? (
            <Select
              options={budgetOptions}
              value={formData?.budget}
              onChange={(value) => handleInputChange('budget', value)}
              placeholder="Select budget range"
            />
          ) : (
            <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
              <Icon name="DollarSign" size={16} className="text-muted-foreground" />
              <span className="capitalize">
                {budgetOptions?.find(opt => opt?.value === preferences?.budget)?.label}
              </span>
            </div>
          )}
        </div>

        {/* Travel Styles */}
        <div>
          <label className="block text-sm font-medium mb-2">Travel Interests</label>
          {isEditing ? (
            <div className="grid grid-cols-2 gap-2">
              {travelStyleOptions?.map((option) => (
                <Checkbox
                  key={option?.value}
                  label={option?.label}
                  checked={formData?.travelStyles?.includes(option?.value)}
                  onChange={(e) => handleArrayChange('travelStyles', option?.value, e?.target?.checked)}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {preferences?.travelStyles?.map((style) => {
                const option = travelStyleOptions?.find(opt => opt?.value === style);
                return (
                  <span
                    key={style}
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                  >
                    {option?.label}
                  </span>
                );
              })}
            </div>
          )}
        </div>

        {/* Accommodation Preferences */}
        <div>
          <label className="block text-sm font-medium mb-2">Accommodation Types</label>
          {isEditing ? (
            <div className="grid grid-cols-2 gap-2">
              {accommodationOptions?.map((option) => (
                <Checkbox
                  key={option?.value}
                  label={option?.label}
                  checked={formData?.accommodationTypes?.includes(option?.value)}
                  onChange={(e) => handleArrayChange('accommodationTypes', option?.value, e?.target?.checked)}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {preferences?.accommodationTypes?.map((type) => {
                const option = accommodationOptions?.find(opt => opt?.value === type);
                return (
                  <span
                    key={type}
                    className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm"
                  >
                    {option?.label}
                  </span>
                );
              })}
            </div>
          )}
        </div>

        {/* Notification Settings */}
        <div>
          <label className="block text-sm font-medium mb-3">Notifications</label>
          <div className="space-y-3">
            <Checkbox
              label="Email notifications for deals and recommendations"
              checked={isEditing ? formData?.notifications?.email : preferences?.notifications?.email}
              onChange={(e) => isEditing && handleInputChange('notifications', {
                ...formData?.notifications,
                email: e?.target?.checked
              })}
              disabled={!isEditing}
            />
            <Checkbox
              label="Push notifications for trip reminders"
              checked={isEditing ? formData?.notifications?.push : preferences?.notifications?.push}
              onChange={(e) => isEditing && handleInputChange('notifications', {
                ...formData?.notifications,
                push: e?.target?.checked
              })}
              disabled={!isEditing}
            />
            <Checkbox
              label="SMS alerts for booking confirmations"
              checked={isEditing ? formData?.notifications?.sms : preferences?.notifications?.sms}
              onChange={(e) => isEditing && handleInputChange('notifications', {
                ...formData?.notifications,
                sms: e?.target?.checked
              })}
              disabled={!isEditing}
            />
          </div>
        </div>

        {/* Language & Currency */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Language</label>
            {isEditing ? (
              <Select
                options={[
                  { value: 'en', label: 'English' },
                  { value: 'es', label: 'Spanish' },
                  { value: 'fr', label: 'French' },
                  { value: 'de', label: 'German' }
                ]}
                value={formData?.language}
                onChange={(value) => handleInputChange('language', value)}
              />
            ) : (
              <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                <Icon name="Globe" size={16} className="text-muted-foreground" />
                <span className="capitalize">{preferences?.language}</span>
              </div>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Currency</label>
            {isEditing ? (
              <Select
                options={[
                  { value: 'USD', label: 'USD ($)' },
                  { value: 'EUR', label: 'EUR (€)' },
                  { value: 'GBP', label: 'GBP (£)' },
                  { value: 'JPY', label: 'JPY (¥)' }
                ]}
                value={formData?.currency}
                onChange={(value) => handleInputChange('currency', value)}
              />
            ) : (
              <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                <Icon name="DollarSign" size={16} className="text-muted-foreground" />
                <span>{preferences?.currency}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreferencesCard;
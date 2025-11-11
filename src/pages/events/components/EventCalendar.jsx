import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EventCalendar = ({ events, onDateSelect, selectedDate, className = '' }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (date) => {
    const year = date?.getFullYear();
    const month = date?.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay?.getDate();
    const startingDayOfWeek = firstDay?.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days?.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days?.push(new Date(year, month, day));
    }

    return days;
  };

  const getEventsForDate = (date) => {
    if (!date) return [];
    const dateString = date?.toISOString()?.split('T')?.[0];
    return events?.filter(event => {
      const eventStart = new Date(event.startDate)?.toISOString()?.split('T')?.[0];
      const eventEnd = event?.endDate ? new Date(event.endDate)?.toISOString()?.split('T')?.[0] : eventStart;
      return dateString >= eventStart && dateString <= eventEnd;
    });
  };

  const navigateMonth = (direction) => {
    const newMonth = new Date(currentMonth);
    newMonth?.setMonth(currentMonth?.getMonth() + direction);
    setCurrentMonth(newMonth);
  };

  const isToday = (date) => {
    if (!date) return false;
    const today = new Date();
    return date?.toDateString() === today?.toDateString();
  };

  const isSelected = (date) => {
    if (!date || !selectedDate) return false;
    return date?.toDateString() === selectedDate?.toDateString();
  };

  const days = getDaysInMonth(currentMonth);

  return (
    <div className={`bg-card rounded-xl shadow-subtle p-6 ${className}`}>
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-headline font-semibold text-foreground">
          {monthNames?.[currentMonth?.getMonth()]} {currentMonth?.getFullYear()}
        </h3>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigateMonth(-1)}
          >
            <Icon name="ChevronLeft" size={20} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigateMonth(1)}
          >
            <Icon name="ChevronRight" size={20} />
          </Button>
        </div>
      </div>
      {/* Days of Week Header */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {daysOfWeek?.map(day => (
          <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
            {day}
          </div>
        ))}
      </div>
      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {days?.map((date, index) => {
          const dayEvents = getEventsForDate(date);
          const hasEvents = dayEvents?.length > 0;

          return (
            <div key={index} className="aspect-square">
              {date ? (
                <button
                  onClick={() => onDateSelect(date)}
                  className={`w-full h-full flex flex-col items-center justify-center text-sm rounded-lg transition-all duration-200 relative ${
                    isSelected(date)
                      ? 'bg-primary text-primary-foreground shadow-subtle'
                      : isToday(date)
                      ? 'bg-secondary text-secondary-foreground'
                      : hasEvents
                      ? 'bg-accent/10 text-foreground hover:bg-accent/20'
                      : 'text-foreground hover:bg-muted'
                  }`}
                >
                  <span className="font-medium">{date?.getDate()}</span>
                  {hasEvents && (
                    <div className="flex space-x-1 mt-1">
                      {dayEvents?.slice(0, 3)?.map((event, eventIndex) => (
                        <div
                          key={eventIndex}
                          className={`w-1.5 h-1.5 rounded-full ${
                            event?.category === 'Festival' ? 'bg-accent' :
                            event?.category === 'Cultural' ? 'bg-secondary' :
                            event?.category === 'Music'? 'bg-conversion' : 'bg-primary'
                          }`}
                        />
                      ))}
                      {dayEvents?.length > 3 && (
                        <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
                      )}
                    </div>
                  )}
                </button>
              ) : (
                <div className="w-full h-full" />
              )}
            </div>
          );
        })}
      </div>
      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-border">
        <h4 className="text-sm font-medium text-foreground mb-3">Event Categories</h4>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-accent mr-2" />
            <span className="text-muted-foreground">Festivals</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-secondary mr-2" />
            <span className="text-muted-foreground">Cultural</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-conversion mr-2" />
            <span className="text-muted-foreground">Music</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-primary mr-2" />
            <span className="text-muted-foreground">Other</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCalendar;
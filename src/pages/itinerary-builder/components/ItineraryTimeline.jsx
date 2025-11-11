import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ItineraryTimeline = ({ itinerary, onUpdateItinerary }) => {
  const [selectedDay, setSelectedDay] = useState(0);

  const handleDragEnd = (result) => {
    if (!result?.destination) return;

    const { source, destination } = result;
    const dayIndex = parseInt(source?.droppableId?.split('-')?.[1]);
    const newDayIndex = parseInt(destination?.droppableId?.split('-')?.[1]);

    const updatedItinerary = { ...itinerary };
    const sourceDay = updatedItinerary?.days?.[dayIndex];
    const [movedActivity] = sourceDay?.activities?.splice(source?.index, 1);

    if (dayIndex === newDayIndex) {
      sourceDay?.activities?.splice(destination?.index, 0, movedActivity);
    } else {
      updatedItinerary?.days?.[newDayIndex]?.activities?.splice(destination?.index, 0, movedActivity);
    }

    onUpdateItinerary(updatedItinerary);
  };

  const addActivity = (dayIndex) => {
    const newActivity = {
      id: `activity-${Date.now()}`,
      title: "New Activity",
      time: "10:00 AM",
      duration: "2 hours",
      type: "attraction",
      location: "Location",
      cost: 0,
      notes: ""
    };

    const updatedItinerary = { ...itinerary };
    updatedItinerary?.days?.[dayIndex]?.activities?.push(newActivity);
    onUpdateItinerary(updatedItinerary);
  };

  const removeActivity = (dayIndex, activityIndex) => {
    const updatedItinerary = { ...itinerary };
    updatedItinerary?.days?.[dayIndex]?.activities?.splice(activityIndex, 1);
    onUpdateItinerary(updatedItinerary);
  };

  const getActivityIcon = (type) => {
    const icons = {
      attraction: 'MapPin',
      restaurant: 'Utensils',
      hotel: 'Bed',
      transport: 'Car',
      activity: 'Activity',
      shopping: 'ShoppingBag'
    };
    return icons?.[type] || 'MapPin';
  };

  const getActivityColor = (type) => {
    const colors = {
      attraction: 'bg-blue-100 text-blue-700 border-blue-200',
      restaurant: 'bg-orange-100 text-orange-700 border-orange-200',
      hotel: 'bg-purple-100 text-purple-700 border-purple-200',
      transport: 'bg-green-100 text-green-700 border-green-200',
      activity: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      shopping: 'bg-pink-100 text-pink-700 border-pink-200'
    };
    return colors?.[type] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-subtle">
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Trip Timeline</h3>
        
        {/* Day Tabs */}
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {itinerary?.days?.map((day, index) => (
            <button
              key={index}
              onClick={() => setSelectedDay(index)}
              className={`flex-shrink-0 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedDay === index
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              Day {index + 1}
              <span className="block text-xs opacity-75">
                {day?.date}
              </span>
            </button>
          ))}
        </div>
      </div>
      <div className="p-6">
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="space-y-6">
            {itinerary?.days?.map((day, dayIndex) => (
              <div
                key={dayIndex}
                className={`${selectedDay === dayIndex ? 'block' : 'hidden'}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-foreground">
                      Day {dayIndex + 1} - {day?.date}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {day?.activities?.length} activities planned
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addActivity(dayIndex)}
                    iconName="Plus"
                    iconPosition="left"
                  >
                    Add Activity
                  </Button>
                </div>

                <Droppable droppableId={`day-${dayIndex}`}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided?.innerRef}
                      {...provided?.droppableProps}
                      className={`space-y-3 min-h-[200px] p-4 rounded-lg border-2 border-dashed transition-colors ${
                        snapshot?.isDraggingOver
                          ? 'border-primary bg-primary/5' :'border-border bg-muted/20'
                      }`}
                    >
                      {day?.activities?.map((activity, activityIndex) => (
                        <Draggable
                          key={activity?.id}
                          draggableId={activity?.id}
                          index={activityIndex}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided?.innerRef}
                              {...provided?.draggableProps}
                              {...provided?.dragHandleProps}
                              className={`bg-background border rounded-lg p-4 transition-all ${
                                snapshot?.isDragging
                                  ? 'shadow-depth rotate-2'
                                  : 'shadow-subtle hover:shadow-floating'
                              } ${getActivityColor(activity?.type)}`}
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex items-start space-x-3 flex-1">
                                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-background flex items-center justify-center">
                                    <Icon
                                      name={getActivityIcon(activity?.type)}
                                      size={16}
                                    />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <h5 className="font-medium text-foreground truncate">
                                      {activity?.title}
                                    </h5>
                                    <div className="flex items-center space-x-4 mt-1 text-sm text-muted-foreground">
                                      <span className="flex items-center">
                                        <Icon name="Clock" size={14} className="mr-1" />
                                        {activity?.time}
                                      </span>
                                      <span className="flex items-center">
                                        <Icon name="Timer" size={14} className="mr-1" />
                                        {activity?.duration}
                                      </span>
                                      <span className="flex items-center">
                                        <Icon name="MapPin" size={14} className="mr-1" />
                                        {activity?.location}
                                      </span>
                                    </div>
                                    {activity?.cost > 0 && (
                                      <div className="mt-2 text-sm font-medium text-foreground">
                                        ${activity?.cost}
                                      </div>
                                    )}
                                    {activity?.notes && (
                                      <p className="mt-2 text-sm text-muted-foreground">
                                        {activity?.notes}
                                      </p>
                                    )}
                                  </div>
                                </div>
                                <div className="flex items-center space-x-2 ml-4">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeActivity(dayIndex, activityIndex)}
                                    className="text-muted-foreground hover:text-destructive"
                                  >
                                    <Icon name="Trash2" size={16} />
                                  </Button>
                                  <div className="cursor-grab active:cursor-grabbing">
                                    <Icon name="GripVertical" size={16} className="text-muted-foreground" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided?.placeholder}
                      
                      {day?.activities?.length === 0 && (
                        <div className="text-center py-8 text-muted-foreground">
                          <Icon name="Calendar" size={48} className="mx-auto mb-2 opacity-50" />
                          <p>No activities planned for this day</p>
                          <p className="text-sm">Drag activities here or click "Add Activity"</p>
                        </div>
                      )}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </div>
        </DragDropContext>
      </div>
    </div>
  );
};

export default ItineraryTimeline;
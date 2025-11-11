import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationCenter = ({ notifications, onMarkAsRead, onMarkAllAsRead, onDeleteNotification }) => {
  const [filter, setFilter] = useState('all'); // 'all', 'unread', 'bookings', 'recommendations'

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'booking': return 'Calendar';
      case 'recommendation': return 'Sparkles';
      case 'deal': return 'Tag';
      case 'reminder': return 'Clock';
      case 'social': return 'Users';
      default: return 'Bell';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'booking': return 'text-success';
      case 'recommendation': return 'text-secondary';
      case 'deal': return 'text-conversion';
      case 'reminder': return 'text-warning';
      case 'social': return 'text-primary';
      default: return 'text-muted-foreground';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const filteredNotifications = notifications?.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification?.read;
    return notification?.type === filter;
  });

  const unreadCount = notifications?.filter(n => !n?.read)?.length;

  const filterOptions = [
    { id: 'all', label: 'All', count: notifications?.length },
    { id: 'unread', label: 'Unread', count: unreadCount },
    { id: 'booking', label: 'Bookings', count: notifications?.filter(n => n?.type === 'booking')?.length },
    { id: 'recommendation', label: 'Recommendations', count: notifications?.filter(n => n?.type === 'recommendation')?.length }
  ];

  return (
    <div className="bg-card rounded-lg p-6 shadow-subtle">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center relative">
            <Icon name="Bell" size={20} className="text-primary" />
            {unreadCount > 0 && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-conversion rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-white">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              </div>
            )}
          </div>
          <div>
            <h3 className="font-headline font-semibold text-lg">Notifications</h3>
            <p className="text-muted-foreground text-sm">
              {unreadCount} unread messages
            </p>
          </div>
        </div>
        
        {unreadCount > 0 && (
          <Button variant="ghost" size="sm" onClick={onMarkAllAsRead}>
            <Icon name="CheckCheck" size={16} className="mr-1" />
            Mark All Read
          </Button>
        )}
      </div>
      {/* Filter Tabs */}
      <div className="flex gap-1 mb-4 overflow-x-auto">
        {filterOptions?.map((option) => (
          <Button
            key={option?.id}
            variant={filter === option?.id ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setFilter(option?.id)}
            className="flex-shrink-0"
          >
            {option?.label}
            {option?.count > 0 && (
              <span className={`ml-1 px-1.5 py-0.5 rounded-full text-xs ${
                filter === option?.id 
                  ? 'bg-primary-foreground/20 text-primary-foreground' 
                  : 'bg-muted text-muted-foreground'
              }`}>
                {option?.count}
              </span>
            )}
          </Button>
        ))}
      </div>
      {/* Notifications List */}
      {filteredNotifications?.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
            <Icon name="Bell" size={24} className="text-muted-foreground" />
          </div>
          <p className="text-muted-foreground text-sm">
            {filter === 'unread' ? 'No unread notifications' : 'No notifications yet'}
          </p>
        </div>
      ) : (
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {filteredNotifications?.map((notification) => (
            <div
              key={notification?.id}
              className={`flex items-start gap-3 p-3 rounded-lg border transition-colors ${
                notification?.read 
                  ? 'bg-background border-border' :'bg-primary/5 border-primary/20'
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                notification?.read ? 'bg-muted' : 'bg-primary/10'
              }`}>
                <Icon 
                  name={getNotificationIcon(notification?.type)} 
                  size={16} 
                  className={getNotificationColor(notification?.type)}
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className={`font-medium text-sm ${
                      notification?.read ? 'text-muted-foreground' : 'text-foreground'
                    }`}>
                      {notification?.title}
                    </h4>
                    <p className="text-muted-foreground text-xs mt-1 line-clamp-2">
                      {notification?.message}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <span className="text-xs text-muted-foreground">
                      {formatTimeAgo(notification?.timestamp)}
                    </span>
                    <div className="flex gap-1">
                      {!notification?.read && (
                        <Button
                          variant="ghost"
                          size="xs"
                          onClick={() => onMarkAsRead(notification?.id)}
                        >
                          <Icon name="Check" size={12} />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="xs"
                        onClick={() => onDeleteNotification(notification?.id)}
                      >
                        <Icon name="X" size={12} />
                      </Button>
                    </div>
                  </div>
                </div>
                
                {notification?.actionButton && (
                  <div className="mt-2">
                    <Button
                      variant="outline"
                      size="xs"
                      onClick={notification?.actionButton?.onClick}
                    >
                      {notification?.actionButton?.text}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;
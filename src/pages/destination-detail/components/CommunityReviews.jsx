import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CommunityReviews = ({ destination }) => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  const filters = [
  { id: 'all', name: 'All Reviews', count: 156 },
  { id: 'photos', name: 'With Photos', count: 89 },
  { id: 'recent', name: 'Recent', count: 23 },
  { id: 'helpful', name: 'Most Helpful', count: 45 }];


  const reviews = [
  {
    id: 1,
    user: {
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1684262855358-88f296a2cfc2",
      avatarAlt: "Professional headshot of blonde woman in blue blazer smiling at camera",
      level: "Explorer",
      badge: "Verified Traveler",
      reviewCount: 47,
      countries: 23
    },
    rating: 5,
    title: "Absolutely magical experience in Delhi!",
    content: `Delhi exceeded all my expectations! The blend of ancient history and modern culture is incredible. The Red Fort was breathtaking, and the street food in Chandni Chowk was an adventure in itself.\n\nThe locals were incredibly welcoming and helped us navigate the city. Don't miss the sunset at India Gate - it's truly spectacular. The metro system made getting around so easy.`,
    date: "2 days ago",
    helpful: 24,
    photos: [
    {
      url: "https://images.unsplash.com/photo-1700158964288-5546c966377c",
      alt: "Red Fort\'s massive red sandstone walls and entrance gate during golden hour"
    },
    {
      url: "https://images.unsplash.com/photo-1703083664356-a15a04d42e4c",
      alt: "India Gate monument illuminated at sunset with people walking on lawns"
    },
    {
      url: "https://images.unsplash.com/photo-1687612325570-aba81479f3cd",
      alt: "Colorful street food stall with various Indian snacks and sweets displayed"
    }],

    tags: ["Solo Travel", "Photography", "Street Food", "History"],
    verified: true
  },
  {
    id: 2,
    user: {
      name: "Raj Patel",
      avatar: "https://images.unsplash.com/photo-1542393881816-df51684879df",
      avatarAlt: "Professional headshot of Indian man with beard in white shirt smiling",
      level: "Local Expert",
      badge: "Delhi Insider",
      reviewCount: 128,
      countries: 8
    },
    rating: 4,
    title: "Great for first-time visitors",
    content: `As a Delhi native, I often take friends and family around the city. The historical sites are well-maintained and the new tourist facilities have really improved the experience.\n\nI'd recommend getting a guide for the historical monuments - the stories behind them are fascinating. The weather can be challenging in summer, so plan accordingly.`,
    date: "1 week ago",
    helpful: 18,
    photos: [
    {
      url: "https://images.unsplash.com/photo-1700025253359-a05155350675",
      alt: "Lotus Temple\'s white marble petals against clear blue sky with gardens"
    }],

    tags: ["Local Guide", "History", "Family Friendly"],
    verified: true
  },
  {
    id: 3,
    user: {
      name: "Emma Chen",
      avatar: "https://images.unsplash.com/photo-1668049221564-862149a48e10",
      avatarAlt: "Asian woman with long black hair in casual sweater smiling outdoors",
      level: "Adventurer",
      badge: "Photo Enthusiast",
      reviewCount: 34,
      countries: 15
    },
    rating: 5,
    title: "Photographer\'s paradise",
    content: `Delhi is incredible for photography! Every corner tells a story. The contrast between old and new Delhi is striking. Spent hours in the narrow lanes of Old Delhi capturing the essence of the city.\n\nThe golden hour at historical monuments is magical. Highly recommend visiting Agrasen ki Baoli - it's a hidden gem that most tourists miss.`,
    date: "2 weeks ago",
    helpful: 31,
    photos: [
    {
      url: "https://images.unsplash.com/photo-1648131993845-5708acac1ff9",
      alt: "Ancient stepwell with geometric stone architecture and dramatic shadows"
    },
    {
      url: "https://images.unsplash.com/photo-1641697548718-36b7b218c8bb",
      alt: "Narrow cobblestone street in Old Delhi with traditional architecture and shops"
    }],

    tags: ["Photography", "Architecture", "Hidden Gems"],
    verified: true
  },
  {
    id: 4,
    user: {
      name: "Michael Rodriguez",
      avatar: "https://images.unsplash.com/photo-1695830209166-161b6297541d",
      avatarAlt: "Hispanic man with short dark hair in navy polo shirt smiling",
      level: "Explorer",
      badge: "Culture Seeker",
      reviewCount: 19,
      countries: 12
    },
    rating: 4,
    title: "Rich cultural experience",
    content: `The cultural diversity in Delhi is amazing. From the Mughal architecture to modern art galleries, there's something for everyone. The food scene is outstanding - both street food and fine dining.\n\nPublic transport is efficient, though it can get crowded during peak hours. The people are friendly and most speak English, which made communication easy.`,
    date: "3 weeks ago",
    helpful: 15,
    photos: [],
    tags: ["Culture", "Food", "Public Transport"],
    verified: false
  }];


  const ratingDistribution = [
  { stars: 5, count: 89, percentage: 57 },
  { stars: 4, count: 45, percentage: 29 },
  { stars: 3, count: 15, percentage: 10 },
  { stars: 2, count: 5, percentage: 3 },
  { stars: 1, count: 2, percentage: 1 }];


  const filteredReviews = reviews?.filter((review) => {
    switch (selectedFilter) {
      case 'photos':
        return review?.photos?.length > 0;
      case 'recent':
        return review?.date?.includes('day') || review?.date?.includes('week');
      case 'helpful':
        return review?.helpful > 20;
      default:
        return true;
    }
  });

  return (
    <div className="bg-card rounded-lg shadow-subtle">
      <div className="p-6 border-b border-border">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div>
            <h3 className="text-xl font-headline font-semibold text-foreground mb-2">
              Community Reviews
            </h3>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5]?.map((star) =>
                  <Icon
                    key={star}
                    name="Star"
                    size={16}
                    className="fill-yellow-400 text-yellow-400" />

                  )}
                </div>
                <span className="text-lg font-semibold text-foreground">{destination?.rating}</span>
                <span className="text-muted-foreground">({destination?.reviewCount} reviews)</span>
              </div>
            </div>
          </div>
          
          <Button variant="outline">
            <Icon name="PenTool" size={16} className="mr-2" />
            Write Review
          </Button>
        </div>

        {/* Rating Distribution */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <h4 className="font-medium text-foreground mb-3">Rating Breakdown</h4>
            <div className="space-y-2">
              {ratingDistribution?.map((rating) =>
              <div key={rating?.stars} className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1 w-12">
                    <span className="text-sm text-muted-foreground">{rating?.stars}</span>
                    <Icon name="Star" size={12} className="fill-yellow-400 text-yellow-400" />
                  </div>
                  <div className="flex-1 bg-muted rounded-full h-2">
                    <div
                    className="bg-yellow-400 h-2 rounded-full"
                    style={{ width: `${rating?.percentage}%` }} />

                  </div>
                  <span className="text-sm text-muted-foreground w-8">{rating?.count}</span>
                </div>
              )}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-foreground mb-3">Review Highlights</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Historical Sites</span>
                <div className="flex items-center space-x-1">
                  <Icon name="TrendingUp" size={12} className="text-success" />
                  <span className="text-sm text-success">95% positive</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Food & Dining</span>
                <div className="flex items-center space-x-1">
                  <Icon name="TrendingUp" size={12} className="text-success" />
                  <span className="text-sm text-success">92% positive</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Transportation</span>
                <div className="flex items-center space-x-1">
                  <Icon name="TrendingUp" size={12} className="text-success" />
                  <span className="text-sm text-success">88% positive</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-4">
          {filters?.map((filter) =>
          <button
            key={filter?.id}
            onClick={() => setSelectedFilter(filter?.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            selectedFilter === filter?.id ?
            'bg-primary text-primary-foreground shadow-subtle' :
            'bg-muted hover:bg-muted/80 text-muted-foreground'}`
            }>

              <span>{filter?.name}</span>
              <span className="bg-black/10 px-2 py-0.5 rounded-full text-xs">
                {filter?.count}
              </span>
            </button>
          )}
        </div>

        {/* Sort Options */}
        <div className="flex items-center space-x-4">
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e?.target?.value)}
            className="text-sm border border-border rounded px-3 py-1 bg-background text-foreground">

            <option value="recent">Most Recent</option>
            <option value="helpful">Most Helpful</option>
            <option value="rating">Highest Rating</option>
            <option value="photos">With Photos</option>
          </select>
        </div>
      </div>
      {/* Reviews List */}
      <div className="divide-y divide-border">
        {filteredReviews?.map((review) =>
        <div key={review?.id} className="p-6">
            <div className="flex space-x-4">
              <div className="flex-shrink-0">
                <div className="relative">
                  <Image
                  src={review?.user?.avatar}
                  alt={review?.user?.avatarAlt}
                  className="w-12 h-12 rounded-full object-cover" />

                  {review?.verified &&
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-success rounded-full flex items-center justify-center">
                      <Icon name="Check" size={12} color="white" />
                    </div>
                }
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold text-foreground">{review?.user?.name}</h4>
                      <span className="px-2 py-0.5 bg-secondary/10 text-secondary text-xs rounded-full">
                        {review?.user?.level}
                      </span>
                      {review?.user?.badge &&
                    <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">
                          {review?.user?.badge}
                        </span>
                    }
                    </div>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span>{review?.user?.reviewCount} reviews</span>
                      <span>{review?.user?.countries} countries</span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center space-x-1 mb-1">
                      {[1, 2, 3, 4, 5]?.map((star) =>
                    <Icon
                      key={star}
                      name="Star"
                      size={14}
                      className={star <= review?.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} />

                    )}
                    </div>
                    <span className="text-xs text-muted-foreground">{review?.date}</span>
                  </div>
                </div>
                
                <h5 className="font-medium text-foreground mb-3">{review?.title}</h5>
                
                <div className="text-muted-foreground mb-4 whitespace-pre-line">
                  {review?.content}
                </div>
                
                {/* Review Photos */}
                {review?.photos?.length > 0 &&
              <div className="flex space-x-2 mb-4 overflow-x-auto">
                    {review?.photos?.map((photo, index) =>
                <div key={index} className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden">
                        <Image
                    src={photo?.url}
                    alt={photo?.alt}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-200 cursor-pointer" />

                      </div>
                )}
                  </div>
              }
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {review?.tags?.map((tag, index) =>
                <span
                  key={index}
                  className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full">

                      {tag}
                    </span>
                )}
                </div>
                
                {/* Review Actions */}
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <Icon name="ThumbsUp" size={16} />
                    <span>Helpful ({review?.helpful})</span>
                  </button>
                  <button className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <Icon name="MessageCircle" size={16} />
                    <span>Reply</span>
                  </button>
                  <button className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <Icon name="Share2" size={16} />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Load More */}
      <div className="p-6 border-t border-border text-center">
        <Button variant="outline" className="w-full sm:w-auto">
          <Icon name="MoreHorizontal" size={16} className="mr-2" />
          Load More Reviews
        </Button>
      </div>
    </div>);

};

export default CommunityReviews;
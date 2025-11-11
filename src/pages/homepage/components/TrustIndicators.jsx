import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TrustIndicators = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [liveStats, setLiveStats] = useState({
    bookings: 2847,
    travelers: 156789,
    destinations: 2340
  });

  const trustBadges = [
  {
    id: 1,
    name: "SSL Secured",
    icon: "Shield",
    description: "256-bit encryption",
    color: "text-success"
  },
  {
    id: 2,
    name: "Payment Protected",
    icon: "CreditCard",
    description: "Secure transactions",
    color: "text-primary"
  },
  {
    id: 3,
    name: "24/7 Support",
    icon: "Headphones",
    description: "Always here to help",
    color: "text-accent"
  },
  {
    id: 4,
    name: "Verified Reviews",
    icon: "CheckCircle",
    description: "Authentic feedback",
    color: "text-success"
  }];


  const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    location: "San Francisco, CA",
    avatar: "https://images.unsplash.com/photo-1646041805292-fd77781436f9",
    avatarAlt: "Professional headshot of Asian woman with shoulder-length black hair wearing navy blazer",
    rating: 5,
    text: `Turismo's AI recommendations were spot-on! It suggested hidden gems in Kyoto that I never would have found on my own. The itinerary builder made planning effortless.`,
    tripDestination: "Japan",
    verified: true,
    helpfulVotes: 127
  },
  {
    id: 2,
    name: "Marcus Johnson",
    location: "London, UK",
    avatar: "https://images.unsplash.com/photo-1585066047759-3438c34cf676",
    avatarAlt: "Professional headshot of Black man with short beard wearing gray suit and glasses",
    rating: 5,
    text: `The cultural context provided for each destination was incredible. I felt prepared and respectful when visiting local communities in Morocco. Truly transformative travel.`,
    tripDestination: "Morocco",
    verified: true,
    helpfulVotes: 89
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    location: "Barcelona, Spain",
    avatar: "https://images.unsplash.com/photo-1665023024202-4c8671802bf6",
    avatarAlt: "Professional headshot of Hispanic woman with curly brown hair wearing white blouse",
    rating: 5,
    text: `As a solo female traveler, the safety information and local insights gave me confidence to explore Iceland independently. The community reviews were invaluable.`,
    tripDestination: "Iceland",
    verified: true,
    helpfulVotes: 203
  }];


  const achievements = [
  {
    id: 1,
    title: "Best Travel Platform 2024",
    organization: "Travel Tech Awards",
    icon: "Award",
    year: "2024"
  },
  {
    id: 2,
    title: "Customer Choice Award",
    organization: "TripAdvisor",
    icon: "Star",
    year: "2024"
  },
  {
    id: 3,
    title: "Innovation in AI Travel",
    organization: "Tech Innovation Summit",
    icon: "Zap",
    year: "2024"
  }];


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials?.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Simulate live stats updates
    const statsInterval = setInterval(() => {
      setLiveStats((prev) => ({
        bookings: prev?.bookings + Math.floor(Math.random() * 3),
        travelers: prev?.travelers + Math.floor(Math.random() * 5),
        destinations: prev?.destinations + (Math.random() > 0.9 ? 1 : 0)
      }));
    }, 3000);

    return () => clearInterval(statsInterval);
  }, []);

  const renderStars = (rating) => {
    return Array.from({ length: 5 })?.map((_, index) =>
    <Icon
      key={index}
      name="Star"
      size={16}
      className={index < rating ? "text-warning fill-current" : "text-muted-foreground"} />

    );
  };

  return (
    <section className="py-16 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Live Statistics */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-headline font-bold text-foreground mb-8">
            Trusted by Travelers Worldwide
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="text-4xl font-bold text-conversion mb-2">
                {liveStats?.bookings?.toLocaleString()}+
              </div>
              <div className="text-muted-foreground">
                Bookings This Month
              </div>
              <div className="flex items-center justify-center mt-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse mr-2"></div>
                <span className="text-xs text-success">Live</span>
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">
                {liveStats?.travelers?.toLocaleString()}+
              </div>
              <div className="text-muted-foreground">
                Happy Travelers
              </div>
              <div className="flex items-center justify-center mt-2">
                <Icon name="Users" size={16} className="text-primary mr-1" />
                <span className="text-xs text-primary">Growing Daily</span>
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold text-accent mb-2">
                {liveStats?.destinations?.toLocaleString()}+
              </div>
              <div className="text-muted-foreground">
                Destinations Covered
              </div>
              <div className="flex items-center justify-center mt-2">
                <Icon name="Globe" size={16} className="text-accent mr-1" />
                <span className="text-xs text-accent">Expanding</span>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {trustBadges?.map((badge) =>
          <div
            key={badge?.id}
            className="text-center p-6 bg-card rounded-xl shadow-subtle hover:shadow-floating transition-all duration-300">

              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                  <Icon name={badge?.icon} size={32} className={badge?.color} />
                </div>
              </div>
              <h3 className="font-headline font-bold text-card-foreground mb-2">
                {badge?.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {badge?.description}
              </p>
            </div>
          )}
        </div>

        {/* Customer Testimonials */}
        <div className="mb-16">
          <h3 className="text-2xl font-headline font-bold text-center text-foreground mb-8">
            What Our Travelers Say
          </h3>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-card rounded-2xl p-8 shadow-subtle">
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <Image
                    src={testimonials?.[currentTestimonial]?.avatar}
                    alt={testimonials?.[currentTestimonial]?.avatarAlt}
                    className="w-20 h-20 rounded-full object-cover" />

                </div>
                
                {/* Content */}
                <div className="flex-1 text-center md:text-left">
                  {/* Rating */}
                  <div className="flex justify-center md:justify-start space-x-1 mb-4">
                    {renderStars(testimonials?.[currentTestimonial]?.rating)}
                  </div>
                  
                  {/* Testimonial Text */}
                  <blockquote className="text-lg text-card-foreground mb-4 italic">
                    "{testimonials?.[currentTestimonial]?.text}"
                  </blockquote>
                  
                  {/* Author Info */}
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <div className="flex items-center justify-center md:justify-start space-x-2 mb-2">
                        <span className="font-headline font-bold text-card-foreground">
                          {testimonials?.[currentTestimonial]?.name}
                        </span>
                        {testimonials?.[currentTestimonial]?.verified &&
                        <Icon name="CheckCircle" size={16} className="text-success" />
                        }
                      </div>
                      <div className="text-sm text-muted-foreground mb-2">
                        {testimonials?.[currentTestimonial]?.location}
                      </div>
                      <div className="text-sm text-accent">
                        Traveled to {testimonials?.[currentTestimonial]?.tripDestination}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-center md:justify-end space-x-2 mt-4 md:mt-0">
                      <Icon name="ThumbsUp" size={16} className="text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {testimonials?.[currentTestimonial]?.helpfulVotes} found helpful
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Testimonial Indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials?.map((_, index) =>
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentTestimonial ?
                'bg-primary shadow-lg' :
                'bg-muted-foreground/30 hover:bg-muted-foreground/50'}`
                } />

              )}
            </div>
          </div>
        </div>

        {/* Awards and Recognition */}
        <div className="text-center">
          <h3 className="text-2xl font-headline font-bold text-foreground mb-8">
            Awards & Recognition
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {achievements?.map((achievement) =>
            <div
              key={achievement?.id}
              className="bg-card rounded-xl p-6 shadow-subtle hover:shadow-floating transition-all duration-300">

                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-cultural rounded-full flex items-center justify-center">
                    <Icon name={achievement?.icon} size={32} color="white" />
                  </div>
                </div>
                <h4 className="font-headline font-bold text-card-foreground mb-2">
                  {achievement?.title}
                </h4>
                <p className="text-sm text-muted-foreground mb-2">
                  {achievement?.organization}
                </p>
                <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium">
                  {achievement?.year}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>);

};

export default TrustIndicators;
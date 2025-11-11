import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CulturalInsights = ({ insights, onReadMore, className = '' }) => {
  return (
    <div className={`bg-card rounded-xl shadow-subtle p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-headline font-semibold text-foreground flex items-center">
          <Icon name="BookOpen" size={24} className="mr-3 text-accent" />
          Cultural Insights
        </h3>
        <Button
          variant="ghost"
          size="sm"
          iconName="ExternalLink"
          iconPosition="right"
        >
          View All
        </Button>
      </div>
      <div className="space-y-6">
        {insights?.map((insight) => (
          <div key={insight?.id} className="border-b border-border last:border-b-0 pb-6 last:pb-0">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Insight Image */}
              <div className="lg:w-32 lg:h-24 w-full h-48 flex-shrink-0">
                <Image
                  src={insight?.image}
                  alt={insight?.imageAlt}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

              {/* Insight Content */}
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium mr-3 ${
                    insight?.type === 'Tradition' ? 'bg-accent/10 text-accent' :
                    insight?.type === 'Etiquette' ? 'bg-secondary/10 text-secondary' :
                    insight?.type === 'History'? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
                  }`}>
                    {insight?.type}
                  </span>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Icon name="Clock" size={12} className="mr-1" />
                    <span>{insight?.readTime} min read</span>
                  </div>
                </div>

                <h4 className="text-lg font-headline font-semibold text-foreground mb-2">
                  {insight?.title}
                </h4>

                <p className="text-muted-foreground text-sm mb-3 line-clamp-3">
                  {insight?.description}
                </p>

                {/* Key Points */}
                {insight?.keyPoints && insight?.keyPoints?.length > 0 && (
                  <div className="mb-3">
                    <div className="flex flex-wrap gap-2">
                      {insight?.keyPoints?.slice(0, 3)?.map((point, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-1 bg-muted rounded-md text-xs text-muted-foreground"
                        >
                          <Icon name="Check" size={12} className="mr-1" />
                          {point}
                        </span>
                      ))}
                      {insight?.keyPoints?.length > 3 && (
                        <span className="inline-flex items-center px-2 py-1 bg-muted rounded-md text-xs text-muted-foreground">
                          +{insight?.keyPoints?.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Author and Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Image
                      src={insight?.author?.avatar}
                      alt={insight?.author?.avatarAlt}
                      className="w-6 h-6 rounded-full mr-2"
                    />
                    <div>
                      <span className="text-xs font-medium text-foreground">{insight?.author?.name}</span>
                      <span className="text-xs text-muted-foreground ml-2">{insight?.author?.title}</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onReadMore(insight)}
                    iconName="ArrowRight"
                    iconPosition="right"
                  >
                    Read More
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Cultural Tips Section */}
      <div className="mt-8 pt-6 border-t border-border">
        <h4 className="text-lg font-headline font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Lightbulb" size={20} className="mr-2 text-warning" />
          Quick Cultural Tips
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              icon: 'HandHeart',
              title: 'Respectful Greetings',
              tip: 'Learn basic greetings in the local language to show respect and connect with locals.'
            },
            {
              icon: 'Camera',
              title: 'Photography Etiquette',
              tip: 'Always ask permission before photographing people or religious sites.'
            },
            {
              icon: 'Gift',
              title: 'Gift Giving',
              tip: 'Research local customs around gift-giving to avoid cultural misunderstandings.'
            },
            {
              icon: 'Utensils',
              title: 'Dining Customs',
              tip: 'Observe local dining etiquette and try traditional foods with an open mind.'
            }
          ]?.map((tip, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-muted rounded-lg">
              <Icon name={tip?.icon} size={20} className="text-accent flex-shrink-0 mt-0.5" />
              <div>
                <h5 className="text-sm font-medium text-foreground mb-1">{tip?.title}</h5>
                <p className="text-xs text-muted-foreground">{tip?.tip}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CulturalInsights;
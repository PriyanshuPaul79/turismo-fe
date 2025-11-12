import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const CulturalInsights = ({ insights, onReadMore, className = '' }) => {
  return (
    <div className={`bg-card rounded-xl shadow-subtle p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-headline font-semibold text-foreground">
          Cultural Insights
        </h3>
        <button
          onClick={() => onReadMore && onReadMore({ viewAll: true })}
          className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
        >
          View All
        </button>
      </div>
      <div className="space-y-6">
        {insights?.map((insight) => (
          <div key={insight?.id} className="border-b border-border last:border-b-0 pb-6 last:pb-0">
            <div className="flex flex-col gap-4">
              {/* Insight Image */}
              <div className="w-full h-40 flex-shrink-0 overflow-hidden rounded-lg">
                <Image
                  src={insight?.image}
                  alt={insight?.imageAlt}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Insight Content */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    insight?.type === 'Tradition' ? 'bg-accent/10 text-accent' :
                    insight?.type === 'Etiquette' ? 'bg-secondary/10 text-secondary' :
                    insight?.type === 'History' ? 'bg-primary/10 text-primary' : 
                    'bg-muted text-muted-foreground'
                  }`}>
                    {insight?.type}
                  </span>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Icon name="Clock" size={12} className="mr-1.5" />
                    <span>{insight?.readTime} min read</span>
                  </div>
                </div>

                <h4 className="text-base font-headline font-semibold text-foreground mb-2 leading-tight">
                  {insight?.title}
                </h4>

                <p className="text-sm text-muted-foreground mb-3 line-clamp-2 leading-relaxed">
                  {insight?.description}
                </p>

                {/* Key Points */}
                {insight?.keyPoints && insight?.keyPoints?.length > 0 && (
                  <div className="mb-4">
                    <div className="space-y-1.5">
                      {insight?.keyPoints?.slice(0, 3)?.map((point, index) => (
                        <div
                          key={index}
                          className="flex items-center text-xs text-muted-foreground"
                        >
                          <Icon name="Check" size={14} className="mr-2 text-success flex-shrink-0" />
                          <span>{point}</span>
                        </div>
                      ))}
                      {insight?.keyPoints?.length > 3 && (
                        <div className="flex items-center text-xs text-muted-foreground">
                          <span className="ml-6">+{insight?.keyPoints?.length - 3} more</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Author */}
                <div className="flex items-center gap-2 pt-2">
                  <Image
                    src={insight?.author?.avatar}
                    alt={insight?.author?.avatarAlt}
                    className="w-7 h-7 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium text-foreground truncate">
                      {insight?.author?.name}
                    </div>
                    <div className="text-xs text-muted-foreground truncate">
                      {insight?.author?.title}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CulturalInsights;
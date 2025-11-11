import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LoyaltyCard = ({ loyaltyData, onViewRewards, onClaimReward }) => {
  const getProgressPercentage = () => {
    return Math.min((loyaltyData?.currentPoints / loyaltyData?.nextLevelPoints) * 100, 100);
  };

  const getLevelIcon = (level) => {
    switch (level) {
      case 'Explorer': return 'Compass';
      case 'Adventurer': return 'Mountain';
      case 'Wanderer': return 'Globe';
      case 'Legend': return 'Crown';
      default: return 'Award';
    }
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'Explorer': return 'text-blue-600';
      case 'Adventurer': return 'text-green-600';
      case 'Wanderer': return 'text-purple-600';
      case 'Legend': return 'text-yellow-600';
      default: return 'text-primary';
    }
  };

  return (
    <div className="bg-gradient-to-br from-primary to-primary/80 rounded-xl p-6 text-white shadow-floating">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <Icon 
              name={getLevelIcon(loyaltyData?.level)} 
              size={24} 
              className="text-white" 
            />
          </div>
          <div>
            <h3 className="font-headline font-bold text-xl">
              {loyaltyData?.level} Status
            </h3>
            <p className="text-white/80 text-sm">
              Member since {loyaltyData?.memberSince}
            </p>
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onViewRewards}
          className="text-white border-white/20 hover:bg-white/10"
        >
          <Icon name="Gift" size={16} className="mr-1" />
          Rewards
        </Button>
      </div>
      {/* Points Display */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-white/80 text-sm">Current Points</span>
          <span className="font-bold text-lg">
            {loyaltyData?.currentPoints?.toLocaleString()}
          </span>
        </div>
        
        {loyaltyData?.level !== 'Legend' && (
          <>
            <div className="w-full bg-white/20 rounded-full h-2 mb-2">
              <div
                className="bg-white h-2 rounded-full transition-all duration-500"
                style={{ width: `${getProgressPercentage()}%` }}
              ></div>
            </div>
            <p className="text-white/70 text-xs">
              {loyaltyData?.nextLevelPoints - loyaltyData?.currentPoints} points to {loyaltyData?.nextLevel}
            </p>
          </>
        )}
      </div>
      {/* Benefits */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center">
          <div className="text-2xl font-bold">{loyaltyData?.tripsCompleted}</div>
          <div className="text-white/70 text-xs">Trips Completed</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold">{loyaltyData?.countriesVisited}</div>
          <div className="text-white/70 text-xs">Countries Visited</div>
        </div>
      </div>
      {/* Available Rewards */}
      {loyaltyData?.availableRewards?.length > 0 && (
        <div className="border-t border-white/20 pt-4">
          <h4 className="font-medium mb-2 flex items-center gap-2">
            <Icon name="Gift" size={16} />
            Available Rewards ({loyaltyData?.availableRewards?.length})
          </h4>
          <div className="space-y-2">
            {loyaltyData?.availableRewards?.slice(0, 2)?.map((reward) => (
              <div
                key={reward?.id}
                className="flex items-center justify-between p-2 bg-white/10 rounded-lg"
              >
                <div className="flex items-center gap-2">
                  <Icon name={reward?.icon} size={16} />
                  <div>
                    <div className="text-sm font-medium">{reward?.title}</div>
                    <div className="text-xs text-white/70">{reward?.points} points</div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="xs"
                  onClick={() => onClaimReward(reward)}
                  className="text-white border-white/20 hover:bg-white/10"
                >
                  Claim
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Level Benefits */}
      <div className="border-t border-white/20 pt-4 mt-4">
        <h4 className="font-medium mb-2">Your Benefits</h4>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {loyaltyData?.benefits?.map((benefit, index) => (
            <div key={index} className="flex items-center gap-1">
              <Icon name="Check" size={12} />
              <span className="text-white/80">{benefit}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoyaltyCard;
import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const WelcomeSection = ({ user, stats }) => {
  return (
    <div className="bg-gradient-hero rounded-xl p-6 lg:p-8 text-white shadow-floating">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        {/* Welcome Content */}
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative">
              <Image
                src={user?.avatar}
                alt={user?.avatarAlt}
                className="w-16 h-16 rounded-full border-3 border-white/20 object-cover"
              />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full border-2 border-white flex items-center justify-center">
                <Icon name="Check" size={12} color="white" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-headline font-bold">
                Welcome back, {user?.firstName}!
              </h1>
              <p className="text-white/80 text-sm lg:text-base">
                Ready for your next adventure? Let's explore together.
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats?.map((stat, index) => (
              <div key={index} className="text-center lg:text-left">
                <div className="text-2xl lg:text-3xl font-bold font-headline">
                  {stat?.value}
                </div>
                <div className="text-white/70 text-xs lg:text-sm">
                  {stat?.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievement Badge */}
        <div className="flex-shrink-0">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
            <Icon name="Award" size={32} className="mx-auto mb-2 text-secondary" />
            <div className="text-sm font-medium">Explorer Level</div>
            <div className="text-xs text-white/70">
              {user?.level} • {user?.points} points
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;
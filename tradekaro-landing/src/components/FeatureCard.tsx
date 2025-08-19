import React from 'react';
import { FeatureCardProps } from '../types';

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col items-center card-hover bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white border-opacity-20 hover:bg-opacity-20 group">
      <div className="text-4xl mb-4 group-hover:animate-float transition-all duration-300">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-gray-900 text-center mb-2 group-hover:text-brand-teal transition-colors duration-300">
        {title}
      </h3>
      <p className="text-sm text-gray-700 text-center leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;

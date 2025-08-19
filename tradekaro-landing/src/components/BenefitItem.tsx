import React from 'react';
import { BenefitItemProps } from '../types';

const BenefitItem: React.FC<BenefitItemProps> = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col items-center text-center group hover:scale-105 transition-all duration-300 p-4 rounded-xl hover:bg-white hover:bg-opacity-10 hover:backdrop-blur-sm">
      <div className="text-3xl mb-3 group-hover:animate-pulse">
        {icon}
      </div>
      <p className="text-sm font-semibold text-gray-900 group-hover:text-brand-teal transition-colors duration-300">
        <span className="block font-bold">{title.split(' ')[0]}</span>
        {title.split(' ').slice(1).join(' ')}
      </p>
    </div>
  );
};

export default BenefitItem;

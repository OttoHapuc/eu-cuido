import Icon from '@/components/atoms/Icon';
import React from 'react';
import { FeatureCardProps } from './type';

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col gap-4">
       <Icon icon={icon}/>
      <h3 className="text-xl font-semibold text-text-color">{title}</h3>
      <p className="text-text-color">{description}</p>
    </div>
  );
};

export default FeatureCard;
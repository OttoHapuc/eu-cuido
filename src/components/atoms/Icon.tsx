import React from 'react';

interface IconProps {
  icon: React.ReactNode;
  size?: string;
  color?: string;
}

const Icon: React.FC<IconProps> = ({ icon, size = 'text-2xl', color = 'text-gray-700'}) => {
  return <span className={`inline-flex ${size} ${color}`}>{icon}</span>
}

export default Icon
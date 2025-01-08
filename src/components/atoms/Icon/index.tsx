import React from 'react';
import { IconProps } from './type';

const Icon: React.FC<IconProps> = ({ icon, className}) => {
  return <span className={className}>{icon}</span>
}

export default Icon
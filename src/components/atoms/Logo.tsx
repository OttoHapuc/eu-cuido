import React from 'react';
import Link from 'next/link';

interface LogoProps {
  size?: string;
  color?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 'text-2xl', color = 'text-gray-800' }) => {
  return (
    <Link href="/" className={`font-bold ${size} ${color}`}>
      Eu Cuido
    </Link>
  );
};

export default Logo;
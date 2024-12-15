import React from 'react';
import Logo from '@/components/atoms/Logo';
import AuthButtons from '@/components/molecules/AuthButtons';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white border-b border-gray-200 py-4 px-6 flex justify-between items-center">
      <Logo />
      <AuthButtons />
    </nav>
  );
};

export default Navbar;
import React from 'react';
import HeroSection from '@/components/molecules/HeroSection';
import FeaturesSection from '@/components/organisms/FeaturesSection';
import Footer from '@/components/organisms/Footer';

const HomePage: React.FC = () => {
return (
 <>
   <HeroSection />
   <FeaturesSection />
   <Footer />
 </>
);
};

export default HomePage;
import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import FeaturedSection from '../components/FeaturedSection';
import Footer from '../components/Footer';
import WelcomeSection from '../components/WelcomeSection';
import AboutSection from '../components/AboutSection';
import HollywoodNewsSection from '../components/HollywoodNewsSection';

const Home = () => {
  return (
    <>
      <Header />
      <HeroSection />
      <main>
        <WelcomeSection />
      </main>
      <FeaturedSection endpoint="movie" title="Featured Movies" />
      <FeaturedSection endpoint="tvshow" title="Featured TV Shows" />
      <AboutSection />
      <HollywoodNewsSection />
      <Footer />
    </>
  );
};

export default Home;

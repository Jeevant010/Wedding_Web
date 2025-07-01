import React from 'react';
import HeroCarousel from '../components/HeroCarousel';
import AnimatedText from '../components/AnimatedText';
import WatchTrailerSection from '../components/WatchTrailerSection';
import TestimonialSection from '../components/TestimonialSection';
import PromotionSection from '../components/PromotionSection';
import MusicSection from '../components/MusicSection';
import '../styles/HomePage.css';

const HomePage = () => {
    return (
        <div className='homepage'>
            <HeroCarousel />
            <AnimatedText />
            <WatchTrailerSection />
            <MusicSection />
            <TestimonialSection />
            <PromotionSection />
        </div>
    );
};

export default HomePage;
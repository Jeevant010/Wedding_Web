import React from 'react'
import HeroCarousel from '../components/HeroCarousel'
import AnimatedText from '../components/AnimatedText'
import WatchTrailerSection from '../components/WatchTrailerSection'
import MusicSection from '../components/MusicSection'
import '../styles/HomePage.css'

const HomePage = () => {
    return (
        <div className='homepage'>
            <HeroCarousel />
            <AnimatedText />
            <WatchTrailerSection />
            <MusicSection />
        </div>
    );
};

export default HomePage;
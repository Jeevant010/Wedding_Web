import React, { useState, useEffect, useRef } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import '../styles/HeroCarousel.css';

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);

  // Wedding data
  const weddings = [
    {
      id: 1,
      title: "NIKKI & VISHAL",
      location: "LONDON",
      date: "JUNE 2024",
      description: "After nearly giving up on love, I found it when I least expected it—while filming a wedding in Kent, England. There, I met Nikki, the bride's sister, and unknowingly began a new chapter of my life. Filming her family's stories allowed me to glimpse her...",
      video: "/videos/wedding-1.mp4",
      poster: "/images/wedding-1-poster.jpg" // Added poster property
    },
    {
      id: 2,
      title: "AAYUSH & SUMAN",
      location: "MEXICO",
      date: "NOVEMBER 2024",
      description: "Two souls, one fearless love, dancing beyond tradition in Mexico's golden light. Aayush and Suman's union speaks the heart's universal language—tender, brave, true. Guided by Aashish Sewing, and heartfelt vows, their story unfolds through...",
      video: "/videos/wedding-2.mp4",
      poster: "/images/wedding-2-poster.jpg"
    },
    {
      id: 3,
      title: "PRIYA & JAMES",
      location: "BALI",
      date: "SEPTEMBER 2024",
      description: "In the heart of Bali's lush landscapes, Priya and James exchanged vows surrounded by nature's symphony. Their love story transcends cultures and continents, creating a beautiful tapestry of traditions and modern romance...",
      video: "/videos/wedding-3.mp4",
      poster: "/images/wedding-3-poster.jpg"
    }
  ];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % weddings.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + weddings.length) % weddings.length);

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % weddings.length);
    }, 10000);
    return () => clearInterval(timer);
  }, [weddings.length]);

  // Handle video playback
  useEffect(() => {
    if (!videoRef.current) return;

    const playVideo = async () => {
      try {
        videoRef.current.currentTime = 0;
        await videoRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.log("Video play failed:", error);
        setIsPlaying(false);
      }
    };

    playVideo();

    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
      }
    };
  }, [currentSlide]);

  const togglePlayback = () => {
    if (!videoRef.current) return;
    
    if (videoRef.current.paused) {
      videoRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(console.error);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleVideoError = (e) => {
    console.error("Video loading error:", e);
    setIsPlaying(false);
  };

  const currentWedding = weddings[currentSlide];

  return (
    <div className="hero-carousel">
      <div className="carousel-container">
        {/* Navigation buttons */}
        <button className="carousel-nav prev" onClick={prevSlide}>
          <FiChevronLeft />
        </button>
        <button className="carousel-nav next" onClick={nextSlide}>
          <FiChevronRight />
        </button>
        
        {/* Background Video */}
        <div className="hero-background">
          <video
            ref={videoRef}
            key={currentWedding.id}
            className="hero-video"
            muted
            loop
            playsInline
            preload="metadata"
            poster={currentWedding.poster}
            onError={handleVideoError}
          >
            <source src={currentWedding.video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="hero-overlay"></div>
          
          {/* Content overlay */}
          <div className="hero-content">
            <div className="location-date">
              <span className="location">{currentWedding.location}</span>
              <span className="date">{currentWedding.date}</span>
            </div>
            
            <h1 className="wedding-title">{currentWedding.title}</h1>
            <p className="wedding-description">{currentWedding.description}</p>
            
            <button 
              onClick={togglePlayback}
              className="video-control mt-6 px-8 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-white hover:bg-white/30 transition-all duration-300 font-medium"
            >
              {isPlaying ? 'Pause Video' : 'Play Video'}
            </button>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="slide-indicators">
          {weddings.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel;
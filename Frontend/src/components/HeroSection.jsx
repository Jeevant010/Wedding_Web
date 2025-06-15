import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa6";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import "../styles/HeroSection.css";

const HeroSection = () => {
  const videos = [
    {
      src: "/videos/wedding-1.mp4",
    },
    {
      src: "/videos/wedding-2.mp4",
    },
    {
      src: "/videos/wedding-3.mp4",
    },
  ];

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRefs = useRef([]);

  const handleNextVideo = () => {
    const nextIndex = (currentVideoIndex + 1) % videos.length;
    setCurrentVideoIndex(nextIndex);
  };

  const handlePrevVideo = () => {
    const prevIndex = (currentVideoIndex - 1 + videos.length) % videos.length;
    setCurrentVideoIndex(prevIndex);
  };

  const scrollToNextSection = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    // Initialize refs array
    videoRefs.current = videoRefs.current.slice(0, videos.length);
    
    // Play the current video
    if (videoRefs.current[currentVideoIndex]) {
      videoRefs.current.forEach((videoRef, index) => {
        if (index === currentVideoIndex && videoRef) {
          videoRef.play().catch(error => {
            console.log("Autoplay prevented:", error);
          });
        } else if (videoRef) {
          videoRef.pause();
          videoRef.currentTime = 0;
        }
      });
    }
    
    // Auto-advance carousel every 5 seconds
    const intervalId = setInterval(() => {
      handleNextVideo();
    }, 5000);

    return () => clearInterval(intervalId);
  }, [currentVideoIndex]);

  return (
    <div className="hero-container">
      {videos.map((video, index) => (
        <div
          key={index}
          className={`video-slide ${index === currentVideoIndex ? "active" : ""}`}
        >
          <video
            ref={el => videoRefs.current[index] = el}
            className="video-background"
            autoPlay={index === currentVideoIndex}
            loop
            muted
            playsInline
            poster={video.poster}
          >
            <source src={video.src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      ))}
      
      <div className="overlay"></div>
      
      <div className="carousel-controls">
        <button className="carousel-arrow prev" onClick={handlePrevVideo}>
          <FaArrowLeft />
        </button>
        <div className="carousel-indicators">
          {videos.map((_, index) => (
            <div 
              key={index} 
              className={`carousel-dot ${index === currentVideoIndex ? "active" : ""}`}
              onClick={() => setCurrentVideoIndex(index)}
            ></div>
          ))}
        </div>
        <button className="carousel-arrow next" onClick={handleNextVideo}>
          <FaArrowRight />
        </button>
      </div>
      
      <div className="content-wrapper">
        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Capture Your Forever Moments
        </motion.h1>
        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          Professional wedding photography & cinematography to preserve your special day
        </motion.p>
      </div>
      
      <motion.div
        className="scroll-down"
        onClick={scrollToNextSection}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <span className="scroll-text">Scroll Down</span>
        <FaChevronDown />
      </motion.div>
    </div>
  );
};

export default HeroSection;
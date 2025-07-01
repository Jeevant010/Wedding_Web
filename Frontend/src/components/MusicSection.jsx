import React, { useState, useRef } from 'react';
import '../styles/MusicSection.css';

const MusicSection = () => {
  const [currentPlaying, setCurrentPlaying] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('default');
  const audioRef = useRef(null);
  const scrollContainerRef = useRef(null);

  // Music data - you can expand this based on your music files
  const musicTracks = [
    {
      id: 1,
      title: "Ik Onkar",
      subtitle: "The Wedding Version",
      artist: "by Harshdeep Kaur & Devender Pal Singh",
      audioFile: "/music/id1.mp3",
      theme: "ik-onkar",
      colors: {
        primary: "#8B0000",
        secondary: "#D2B48C",
        background: "linear-gradient(135deg, #8B0000 0%, #A0522D 50%, #D2B48C 100%)"
      }
    },
    {
      id: 2,
      title: "Vekheya Reprise",
      subtitle: "Reprise",
      artist: "By Vibha",
      audioFile: "/music/id2.mp3",
      theme: "vekheya",
      colors: {
        primary: "#B22222",
        secondary: "#FFD700",
        background: "linear-gradient(135deg, #B22222 0%, #DC143C 50%, #FFD700 100%)"
      }
    },
    {
      id: 3,
      title: "Sadiyaan",
      subtitle: "",
      artist: "By Neha Kharode",
      audioFile: "/music/id3.mp3",
      theme: "sadiyaan",
      colors: {
        primary: "#FF6B6B",
        secondary: "#4ECDC4",
        background: "linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 50%, #45B7D1 100%)"
      }
    },
    {
      id: 4,
      title: "Mangalyam",
      subtitle: "(Tamil)",
      artist: "By Suchiksha Rangarajan & Amrit Ramnath",
      audioFile: "/music/id4.mp3",
      theme: "mangalyam",
      colors: {
        primary: "#DAA520",
        secondary: "#8B4513",
        background: "linear-gradient(135deg, #DAA520 0%, #CD853F 50%, #8B4513 100%)"
      }
    },
    {
      id: 5,
      title: "Tu Mila",
      subtitle: "",
      artist: "By Riya Goley",
      audioFile: "/music/id5.mp3",
      theme: "tu-mila",
      colors: {
        primary: "#98D8E8",
        secondary: "#F7DC6F",
        background: "linear-gradient(135deg, #98D8E8 0%, #F7DC6F 50%, #85C1E9 100%)"
      }
    }
  ];

  const playMusic = (track) => {
    if (currentPlaying === track.id && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      if (audioRef.current) {
        audioRef.current.src = track.audioFile;
        audioRef.current.play();
        setIsPlaying(true);
        setCurrentPlaying(track.id);
        setCurrentTheme(track.theme);
      }
    }
  };

  const handleAudioEnd = () => {
    setIsPlaying(false);
    setCurrentPlaying(null);
    setCurrentTheme('default');
  };

  const scrollLeft = () => {
    scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  // Removing unused function to fix the linting error
  // If you need this function in the future, uncomment it
  // const getCurrentTrack = () => {
  //   return musicTracks.find(track => track.id === currentPlaying);
  // };

  return (
    <section className={`music-section ${currentTheme}`}>
      <audio ref={audioRef} onEnded={handleAudioEnd} />
      
      <div className="music-header">
        <div className="music-text-content">
          <p className="section-label">ORIGINAL COMPOSITIONS</p>
          <h2 className="music-title">
            CREATING MUSIC THAT<br />
            MAKES YOU <span className="highlight">FEEL.</span>
          </h2>
          <p className="music-description">
            The Wedding Filmer label creates music with a keen focus<br />
            on lyrics and background scores that set the sounds for<br />
            weddings across cultures.
          </p>
        </div>
        
        <div className="vinyl-container">
          <div className={`vinyl-disk ${isPlaying ? 'spinning' : ''}`}>
            <div className="vinyl-center">
              <div className="vinyl-label">
                <span className="logo">The Wedding Filmer</span>
              </div>
            </div>
            <div className="vinyl-grooves"></div>
          </div>
          <div className="vinyl-background-roses"></div>
        </div>
      </div>

      <div className="music-cards-container">
        <button className="scroll-btn scroll-left" onClick={scrollLeft}>
          &#8249;
        </button>
        
        <div className="music-cards-scroll" ref={scrollContainerRef}>
          {musicTracks.map((track) => (
            <div 
              key={track.id} 
              className={`music-card ${track.theme} ${currentPlaying === track.id ? 'active' : ''}`}
              onClick={() => playMusic(track)}
            >
              <div className="card-background"></div>
              <div className="card-content">
                <div className="play-button">
                  {currentPlaying === track.id && isPlaying ? '⏸️' : '▶️'}
                </div>
                <h3 className="track-title">{track.title}</h3>
                {track.subtitle && <p className="track-subtitle">{track.subtitle}</p>}
                <p className="track-artist">{track.artist}</p>
              </div>
            </div>
          ))}
        </div>

        <button className="scroll-btn scroll-right" onClick={scrollRight}>
          &#8250;
        </button>
      </div>
    </section>
  );
};

export default MusicSection;
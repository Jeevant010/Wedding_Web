// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiFilm, FiUsers, FiCamera, FiBook, FiMail, FiSearch, FiArrowRight, FiMenu, FiX } from 'react-icons/fi';
import '../styles/Navbar.css';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Navigation data with actual routes
  const navItems = [
    { path: '/', label: 'Home', icon: <FiHome /> },
    { path: '/films', label: 'Films', icon: <FiFilm /> },
    { path: '/about', label: 'About', icon: <FiUsers /> },
    { path: '/crew', label: 'Crew', icon: <FiUsers /> },
    { path: '/workshop', label: 'Workshop', icon: <FiCamera /> },
    { path: '/blog', label: 'Blog & Press', icon: <FiBook /> },
    { path: '/contact', label: 'Contact', icon: <FiMail /> }
  ];

  

  return (
    <>
      {/* Left Sidebar */}
      <div className={`left-sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="sidebar-content">
          {/* Mobile Close Button */}
          <button className="mobile-close-btn" onClick={closeMobileMenu}>
            <FiX />
          </button>
          
          {/* Logo */}
          <div className="logo-container">
            <div className="logo-text">
              <span className="logo-the">The</span>
              <span className="logo-wedding">Wedding</span>
              <span className="logo-filmer">Filmer</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="sidebar-nav">
            <ul>
              {navItems.map((item, index) => (
                <li key={index}>
                  <Link 
                    to={item.path} 
                    className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
                    onClick={closeMobileMenu}
                  >
                    <span className="nav-icon">{item.icon}</span>
                    <span className="nav-label">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Bottom section */}
          <div className="sidebar-bottom">
            <div className="sidebar-message">
              <p>We'd love to hear your story!</p>
            </div>
            <Link to="/contact" className="enquire-btn-sidebar">
              Enquire →
            </Link>
          </div>
        </div>
      </div>

      {/* Top Header */}
      <div className="top-header">
        {/* Mobile Menu Button */}
        <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
          <FiMenu />
        </button>
        
        <div className="search-container">
          <form onSubmit={handleSearch} className="search-form">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search a film here"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-button">
              <FiArrowRight className="search-arrow" />
            </button>
          </form>
        </div>
        
        <div className="header-buttons">
          <Link to="/faqs" className="header-btn faqs-btn">
            FAQs
          </Link>
          <Link to="/contact" className="header-btn enquire-btn">
            Enquire →
          </Link>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && <div className="mobile-overlay" onClick={closeMobileMenu}></div>}
      
      {/* Mobile Bottom Navigation */}
      <div className="mobile-bottom-nav">
        <button className="mobile-nav-btn menu-btn" onClick={toggleMobileMenu}>
          Menu
        </button>
        
        <div className="mobile-logo">
          <div className="mobile-logo-circle">
            <span className="mobile-logo-text">
              The<br/>Wedding<br/>Filmer
            </span>
          </div>
        </div>
        
        <Link to="/contact" className="mobile-nav-btn enquire-btn">
          Enquire
        </Link>
      </div>
    </>
  );
};

export default Navbar;
// src/components/WeddingFilmerSidebar.jsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiFilm, FiCamera, FiHeart, FiMail, FiPhone, FiMenu, FiX } from 'react-icons/fi';
import { FaVimeoV, FaInstagram, FaPinterestP } from 'react-icons/fa';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  // Determine active item based on current path
  const getActiveItem = () => {
    const path = location.pathname;
    if (path === '/') return 'Home';
    if (path === '/films') return 'Our Films';
    if (path === '/process') return 'Process';
    if (path === '/stories') return 'Love Stories';
    if (path === '/contact') return 'Contact';
    return '';
  };
  
  const [activeItem, setActiveItem] = useState(getActiveItem());

  const toggleSidebar = () => setIsOpen(!isOpen);
  
  const handleNavClick = (item) => {
    setActiveItem(item);
    setIsOpen(false);
  };

  // Navigation data with actual routes
  const navItems = [
    { path: '/', label: 'Home', icon: <FiHome /> },
    { path: '/films', label: 'Our Films', icon: <FiFilm /> },
    { path: '/process', label: 'Process', icon: <FiCamera /> },
    { path: '/stories', label: 'Love Stories', icon: <FiHeart /> },
    { path: '/contact', label: 'Contact', icon: <FiMail /> }
  ];

  // Social links data
  const socialLinks = [
    { url: 'https://vimeo.com', icon: <FaVimeoV size={16} />, name: 'Vimeo' },
    { url: 'https://instagram.com', icon: <FaInstagram size={16} />, name: 'Instagram' },
    { url: 'https://pinterest.com', icon: <FaPinterestP size={16} />, name: 'Pinterest' }
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button 
        className="sidebar-toggle"
        onClick={toggleSidebar}
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Sidebar Overlay (for mobile) */}
      <div 
        className={`sidebar-overlay ${isOpen ? 'open' : ''}`}
        onClick={toggleSidebar}
      ></div>

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-content">
          {/* Logo */}
          <div className="logo-container">
            <div className="logo">Wedding web Films</div>
            <div className="logo-subtitle">Capturing Timeless Love Stories</div>
          </div>

          {/* Navigation */}
          <nav className="sidebar-nav">
            <ul>
              {navItems.map((item, index) => (
                <li key={index}>
                  <Link 
                    to={item.path} 
                    className={`nav-item ${activeItem === item.label ? 'active' : ''}`}
                    onClick={() => handleNavClick(item.label)}
                  >
                    <span className="nav-icon">{item.icon}</span>
                    <span className="nav-label">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact Info */}
          <div className="contact-info">
            <div className="contact-item">
              <FiMail className="contact-icon" />
              <span>contact@weddingweb.com</span>
            </div>
            <div className="contact-item">
              <FiPhone className="contact-icon" />
              <span>+1 (555) 123-4567</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="social-links">
            {socialLinks.map((social, index) => (
              <a 
                key={index}
                href={social.url}
                className="social-icon"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="copyright">
            © {new Date().getFullYear()} Weddingweb Films
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
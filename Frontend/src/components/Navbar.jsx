// src/components/WeddingFilmerSidebar.jsx
import React, { useState } from 'react';
import { FiHome, FiFilm, FiCamera, FiHeart, FiMail, FiPhone, FiMenu, FiX } from 'react-icons/fi';
import { FaVimeoV, FaInstagram, FaPinterestP } from 'react-icons/fa';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('Home');

  const toggleSidebar = () => setIsOpen(!isOpen);
  
  const handleNavClick = (item) => {
    setActiveItem(item);
    setIsOpen(false);
  };

  // Navigation data
  const navItems = [
    { path: '#', label: 'Home', icon: <FiHome /> },
    { path: '#', label: 'Our Films', icon: <FiFilm /> },
    { path: '#', label: 'Process', icon: <FiCamera /> },
    { path: '#', label: 'Love Stories', icon: <FiHeart /> },
    { path: '#', label: 'Contact', icon: <FiMail /> }
  ];

  // Social links data
  const socialLinks = [
    { url: '#', icon: <FaVimeoV size={16} />, name: 'Vimeo' },
    { url: '#', icon: <FaInstagram size={16} />, name: 'Instagram' },
    { url: '#', icon: <FaPinterestP size={16} />, name: 'Pinterest' }
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
            <div className="logo">EverAfter Films</div>
            <div className="logo-subtitle">Capturing Timeless Love Stories</div>
          </div>

          {/* Navigation */}
          <nav className="sidebar-nav">
            <ul>
              {navItems.map((item, index) => (
                <li key={index}>
                  <a 
                    href={item.path} 
                    className={`nav-item ${activeItem === item.label ? 'active' : ''}`}
                    onClick={() => handleNavClick(item.label)}
                  >
                    <span className="nav-icon">{item.icon}</span>
                    <span className="nav-label">{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact Info */}
          <div className="contact-info">
            <div className="contact-item">
              <FiMail className="contact-icon" />
              <span>contact@everafterfilms.com</span>
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
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="copyright">
            © {new Date().getFullYear()} EverAfter Films
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Navbar.css';
import logo from '../assets/logo.png';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Active link class handler
  const getLinkClass = ({ isActive }) => {
    return isActive ? 'active' : '';
  };

  return (
    <nav className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <div className="logo-container">
          <NavLink to="/">
            <img src={logo} alt="The Wedding Filmer" className="logo" />
          </NavLink>
        </div>
        
        {/* Mobile menu button */}
        <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          <span className={menuOpen ? 'open' : ''}></span>
          <span className={menuOpen ? 'open' : ''}></span>
          <span className={menuOpen ? 'open' : ''}></span>
        </div>
        
        {/* Navigation Links */}
        <div className={`main-nav ${menuOpen ? 'active' : ''}`}>
          <ul className="nav-links">
            <li className="nav-item">
              <NavLink 
                to="/" 
                className={getLinkClass} 
                onClick={() => setMenuOpen(false)}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                to="/films" 
                className={getLinkClass} 
                onClick={() => setMenuOpen(false)}
              >
                Films
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                to="/gallery" 
                className={getLinkClass} 
                onClick={() => setMenuOpen(false)}
              >
                Gallery
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                to="/blog" 
                className={getLinkClass} 
                onClick={() => setMenuOpen(false)}
              >
                Blog
              </NavLink>
            </li>
            {/* <li className="nav-item">
              <NavLink 
                to="/contact" 
                className={getLinkClass} 
                onClick={() => setMenuOpen(false)}
              >
                Contact
              </NavLink>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
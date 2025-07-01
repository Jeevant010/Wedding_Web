// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiFilm, FiUsers, FiCamera, FiBook, FiMail, FiSearch, FiArrowRight, FiMenu, FiX } from 'react-icons/fi';

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
      <div className={`fixed left-0 top-0 w-50 h-screen bg-black z-[1000] flex flex-col transform transition-transform duration-300 ease-in-out ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}>
        <div className="flex flex-col h-full px-5 py-10 lg:py-10">
          {/* Mobile Close Button */}
          <button 
            className="absolute top-5 right-5 text-white text-2xl p-2 rounded hover:bg-white/10 transition-all lg:hidden z-[1001]"
            onClick={closeMobileMenu}
          >
            <FiX />
          </button>
          
          {/* Logo */}
          <div className="mb-15">
            <div className="flex flex-col items-center text-center">
              <span className="font-serif font-bold text-white text-lg uppercase tracking-wider leading-none">The</span>
              <span className="font-serif font-bold text-white text-3xl uppercase tracking-wide leading-none my-1">Wedding</span>
              <span className="font-serif font-bold text-white text-lg uppercase tracking-wider leading-none">Filmer</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1">
            <ul className="list-none p-0 m-0">
              {navItems.map((item, index) => (
                <li key={index} className="mb-2">
                  <Link 
                    to={item.path} 
                    className={`flex items-center px-4 py-3 text-gray-400 no-underline rounded-lg transition-all duration-300 text-sm font-normal hover:text-white hover:bg-white/5 ${
                      location.pathname === item.path ? 'text-primary bg-primary/10' : ''
                    }`}
                    onClick={closeMobileMenu}
                  >
                    <span className={`mr-3 text-base ${location.pathname === item.path ? 'text-primary' : ''}`}>
                      {item.icon}
                    </span>
                    <span className="text-sm">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Bottom section */}
          <div className="mt-auto text-center">
            <div className="mb-5">
              <p className="text-gray-300 text-sm leading-relaxed m-0">We'd love to hear your story!</p>
            </div>
            <Link 
              to="/contact" 
              className="inline-block bg-primary text-white px-5 py-2.5 rounded-full no-underline text-sm font-medium transition-all duration-300 hover:bg-primary-hover hover:-translate-y-0.5"
            >
              Enquire →
            </Link>
          </div>
        </div>
      </div>

      {/* Top Header */}
      <div className="fixed top-0 left-0 lg:left-50 right-0 h-20 bg-white/95 backdrop-blur-md border-b border-black/10 flex items-center justify-between px-10 lg:px-10 z-[999]">
        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden bg-none border-none text-2xl cursor-pointer p-2 rounded transition-all duration-300 text-gray-700 hover:bg-black/10"
          onClick={toggleMobileMenu}
        >
          <FiMenu />
        </button>
        
        <div className="flex-1 max-w-xl mr-10 lg:mr-10">
          <form onSubmit={handleSearch} className="relative w-full">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
            <input
              type="text"
              placeholder="Search a film here"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-3 px-12 border-none bg-white/95 backdrop-blur-md rounded-full text-sm outline-none transition-all duration-300 shadow-md focus:bg-white focus:shadow-xl placeholder:text-gray-500"
            />
            <button 
              type="submit" 
              className="absolute right-0.5 top-1/2 transform -translate-y-1/2 bg-pink-400 border-none rounded-full w-9 h-9 flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-primary-hover hover:scale-105"
            >
              <FiArrowRight className="text-white text-base" />
            </button>
          </form>
        </div>
        
        <div className="hidden lg:flex items-center gap-4">
          <Link 
            to="/faqs" 
            className="px-5 py-2.5 rounded-full no-underline text-sm font-medium transition-all duration-300 bg-black text-white hover:bg-gray-700"
          >
            FAQs
          </Link>
          <Link 
            to="/contact" 
            className="px-5 py-2.5 rounded-full no-underline text-sm font-medium transition-all duration-300 bg-primary text-white hover:bg-primary-hover hover:-translate-y-0.5"
          >
            Enquire →
          </Link>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[999] lg:hidden" 
          onClick={closeMobileMenu}
        ></div>
      )}
      
      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 h-20 bg-black z-[1000] flex items-center justify-between px-8 mx-2.5 my-2.5 rounded-[40px] overflow-hidden">
        <button 
          className="bg-white border-none rounded-full px-6 py-3 text-sm font-medium cursor-pointer transition-all duration-300 text-black flex items-center justify-center hover:bg-gray-100 hover:-translate-y-0.5"
          onClick={toggleMobileMenu}
        >
          Menu
        </button>
        
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-15 h-15 bg-white rounded-full flex items-center justify-center shadow-lg">
            <span className="font-serif text-[0.5rem] font-bold text-center leading-tight text-black uppercase tracking-wide">
              The<br/>Wedding<br/>Filmer
            </span>
          </div>
        </div>
        
        <Link 
          to="/contact" 
          className="bg-primary border-none rounded-full px-6 py-3 text-sm font-medium cursor-pointer transition-all duration-300 text-white flex items-center justify-center no-underline hover:bg-primary-hover hover:-translate-y-0.5"
        >
          Enquire
        </Link>
      </div>
    </>
  );
};

export default Navbar;
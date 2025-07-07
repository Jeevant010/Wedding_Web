import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FiHome, FiFilm, FiUsers, FiCamera, FiBook, FiMail, FiMenu, FiX } from 'react-icons/fi';

const navItems = [
  { path: '/', label: 'Home', icon: <FiHome /> },
  { path: '/films', label: 'Films', icon: <FiFilm /> },
  { path: '/about', label: 'About', icon: <FiUsers /> },
  { path: '/crew', label: 'Crew', icon: <FiUsers /> },
  { path: '/workshop', label: 'Workshop', icon: <FiCamera /> },
  { path: '/blog', label: 'Blog & Press', icon: <FiBook /> },
  { path: '/contact', label: 'Contact', icon: <FiMail /> }
];

export default function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobileMenu = () => setMobileOpen(false);

  // Sidebar navigation items
  const SidebarNav = (
    <nav className="flex-1 w-full flex flex-col gap-y-3 px-6 mt-4 ">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={closeMobileMenu}
            className={`flex items-center gap-3 px-6 py-4 w-full rounded-2xl transition-colors duration-200 ${
              isActive
                ? 'bg-white text-red-600 font-semibold shadow-lg'
                : 'text-white hover:bg-white/10'
            }`}
            style={isActive ? { boxShadow: '0 0 0 4px #fff, 0 2px 12px rgba(0,0,0,0.1)' } : {}}
          >
            <span className={`text-lg ${isActive ? 'text-red-600' : 'text-gray-400'}`}>{item.icon}</span>
            <span className={`text-sm ${isActive ? 'text-red-600' : 'text-gray-200'}`}>{item.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Hamburger Button (Mobile) */}
      <button
        className="lg:hidden fixed top-6 left-6 z-[110] bg-black text-white rounded-full p-2 shadow-md"
        onClick={() => setMobileOpen(true)}
        aria-label="Open menu"
      >
        <FiMenu size={28} />
      </button>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-68 bg-black flex-col items-center py-8 z-50">
        {/* Logo */}
        <div className="mb-10">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
            <span className="text-black text-sm font-bold">TWF</span>
          </div>
        </div>
        {SidebarNav}
        {/* Bottom CTA */}
        <div className="p-6 border-t border-gray-800 w-full mt-auto">
          <div className="text-center mb-4">
            <p className="text-gray-400 text-xs mb-3">We'd love to hear your story!</p>
            <button className="w-full bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
              Enquire →
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Drawer */}
      <div
        className={`fixed top-0 left-0 h-screen w-72 bg-black z-[200] flex flex-col items-center py-8 transition-transform duration-300 lg:hidden ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ boxShadow: mobileOpen ? '2px 0 16px rgba(0,0,0,0.2)' : 'none' }}
      >
        {/* Close Button */}
        <button
          className="absolute top-6 right-6 text-white bg-black rounded-full p-2"
          onClick={closeMobileMenu}
          aria-label="Close menu"
        >
          <FiX size={28} />
        </button>
        {/* Logo */}
        <div className="mb-10 mt-4">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
            <span className="text-black text-sm font-bold">TWF</span>
          </div>
        </div>
        {SidebarNav}
        {/* Bottom CTA */}
        <div className="p-6 border-t border-gray-800 w-full mt-auto">
          <div className="text-center mb-4">
            <p className="text-gray-400 text-xs mb-3">We'd love to hear your story!</p>
            <button className="w-full bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
              Enquire →
            </button>
          </div>
        </div>
      </div>

      {/* Overlay for Mobile Drawer */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[150] lg:hidden"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}
    </>
  );
}

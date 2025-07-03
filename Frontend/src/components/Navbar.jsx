// // src/components/Navbar.jsx
// import React, { useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { FiHome, FiFilm, FiUsers, FiCamera, FiBook, FiMail, FiSearch, FiArrowRight, FiMenu, FiX } from 'react-icons/fi';

// const Navbar = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const location = useLocation();

//   const handleSearch = (e) => {
//     e.preventDefault();
//     console.log('Searching for:', searchQuery);
//   };

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   const closeMobileMenu = () => {
//     setIsMobileMenuOpen(false);
//   };

//   // Navigation data with actual routes
//   const navItems = [
//     { path: '/', label: 'Home', icon: <FiHome /> },
//     { path: '/films', label: 'Films', icon: <FiFilm /> },
//     { path: '/about', label: 'About', icon: <FiUsers /> },
//     { path: '/crew', label: 'Crew', icon: <FiUsers /> },
//     { path: '/workshop', label: 'Workshop', icon: <FiCamera /> },
//     { path: '/blog', label: 'Blog & Press', icon: <FiBook /> },
//     { path: '/contact', label: 'Contact', icon: <FiMail /> }
//   ];

//   return (
//     <>
//       {/* Left Sidebar */}
//       <div className={`fixed left-0 top-0 w-50 h-screen bg-black z-[1000] flex flex-col transform transition-transform duration-300 ease-in-out ${
//         isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
//       } lg:translate-x-0`}>
//         <div className="flex flex-col h-full px-5 py-10 lg:py-10">
//           {/* Mobile Close Button */}
//           <button 
//             className="absolute top-5 right-5 text-white text-2xl p-2 rounded hover:bg-white/10 transition-all lg:hidden z-[1001]"
//             onClick={closeMobileMenu}
//           >
//             <FiX />
//           </button>
          
//           {/* Logo */}
//           <div className="mb-15">
//             <div className="flex flex-col items-center text-center">
//               <span className="font-serif font-bold text-white text-lg uppercase tracking-wider leading-none">The</span>
//               <span className="font-serif font-bold text-white text-3xl uppercase tracking-wide leading-none my-1">Wedding</span>
//               <span className="font-serif font-bold text-white text-lg uppercase tracking-wider leading-none">Filmer</span>
//             </div>
//           </div>

//           {/* Navigation */}
//           <nav className="flex-1">
//             <ul className="list-none p-0 m-0">
//               {navItems.map((item, index) => (
//                 <li key={index} className="mb-2">
//                   <Link 
//                     to={item.path} 
//                     className={`flex items-center px-4 py-3 text-gray-400 no-underline rounded-lg transition-all duration-300 text-sm font-normal hover:text-white hover:bg-white/5 ${
//                       location.pathname === item.path ? 'text-primary bg-primary/10' : ''
//                     }`}
//                     onClick={closeMobileMenu}
//                   >
//                     <span className={`mr-3 text-base ${location.pathname === item.path ? 'text-primary' : ''}`}>
//                       {item.icon}
//                     </span>
//                     <span className="text-sm">{item.label}</span>
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </nav>

//           {/* Bottom section */}
//           <div className="mt-auto text-center">
//             <div className="mb-5">
//               <p className="text-gray-300 text-sm leading-relaxed m-0">We'd love to hear your story!</p>
//             </div>
//             <Link 
//               to="/contact" 
//               className="inline-block bg-primary text-white px-5 py-2.5 rounded-full no-underline text-sm font-medium transition-all duration-300 hover:bg-primary-hover hover:-translate-y-0.5"
//             >
//               Enquire →
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* Top Header */}
//       <div className="fixed top-0 left-0 lg:left-50 right-0 h-20 bg-white/95 backdrop-blur-md border-b border-black/10 flex items-center justify-between px-10 lg:px-10 z-[999]">
//         {/* Mobile Menu Button */}
//         <button 
//           className="lg:hidden bg-none border-none text-2xl cursor-pointer p-2 rounded transition-all duration-300 text-gray-700 hover:bg-black/10"
//           onClick={toggleMobileMenu}
//         >
//           <FiMenu />
//         </button>
        
//         <div className="flex-1 max-w-xl mr-10 lg:mr-10">
//           <form onSubmit={handleSearch} className="relative w-full">
//             <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
//             <input
//               type="text"
//               placeholder="Search a film here"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full py-3 px-12 border-none bg-white/95 backdrop-blur-md rounded-full text-sm outline-none transition-all duration-300 shadow-md focus:bg-white focus:shadow-xl placeholder:text-gray-500"
//             />
//             <button 
//               type="submit" 
//               className="absolute right-0.5 top-1/2 transform -translate-y-1/2 bg-pink-400 border-none rounded-full w-9 h-9 flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-primary-hover hover:scale-105"
//             >
//               <FiArrowRight className="text-white text-base" />
//             </button>
//           </form>
//         </div>
        
//         <div className="hidden lg:flex items-center gap-4">
//           <Link 
//             to="/faqs" 
//             className="px-5 py-2.5 rounded-full no-underline text-sm font-medium transition-all duration-300 bg-black text-white hover:bg-gray-700"
//           >
//             FAQs
//           </Link>
//           <Link 
//             to="/contact" 
//             className="px-5 py-2.5 rounded-full no-underline text-sm font-medium transition-all duration-300 bg-primary text-white hover:bg-primary-hover hover:-translate-y-0.5"
//           >
//             Enquire →
//           </Link>
//         </div>
//       </div>

//       {/* Mobile Overlay */}
//       {isMobileMenuOpen && (
//         <div 
//           className="fixed inset-0 bg-black/50 z-[999] lg:hidden" 
//           onClick={closeMobileMenu}
//         ></div>
//       )}
      
//       {/* Mobile Bottom Navigation */}
//       <div className="lg:hidden fixed bottom-0 left-0 right-0 h-20 bg-black z-[1000] flex items-center justify-between px-8 mx-2.5 my-2.5 rounded-[40px] overflow-hidden">
//         <button 
//           className="bg-white border-none rounded-full px-6 py-3 text-sm font-medium cursor-pointer transition-all duration-300 text-black flex items-center justify-center hover:bg-gray-100 hover:-translate-y-0.5"
//           onClick={toggleMobileMenu}
//         >
//           Menu
//         </button>
        
//         <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
//           <div className="w-15 h-15 bg-white rounded-full flex items-center justify-center shadow-lg">
//             <span className="font-serif text-[0.5rem] font-bold text-center leading-tight text-black uppercase tracking-wide">
//               The<br/>Wedding<br/>Filmer
//             </span>
//           </div>
//         </div>
        
//         <Link 
//           to="/contact" 
//           className="bg-primary border-none rounded-full px-6 py-3 text-sm font-medium cursor-pointer transition-all duration-300 text-white flex items-center justify-center no-underline hover:bg-primary-hover hover:-translate-y-0.5"
//         >
//           Enquire
//         </Link>
//       </div>
//     </>
//   );
// };

// export default Navbar;


// /* TWFNavigation.jsx - Accurate Recreation */
// import React, { useState } from 'react';
// import { NavLink } from 'react-router-dom';

// export default function Navbar({ 
//   isOpen = false, 
//   onToggle = () => {},
//   currentPath = '/'
// }) {
//   const [menuOpen, setMenuOpen] = useState(isOpen);

//   const navigationItems = [
//     { label: 'Home', path: '/', icon: '🏠' },
//     { label: 'Films', path: '/films', icon: '🎬' },
//     { label: 'About Us', path: '/about-us', icon: '👥' },
//     { label: 'Crew', path: '/crew', icon: '🎭' },
//     { label: 'Workshop', path: '/workshop', icon: '🎓' },
//     { label: 'Blog & Press', path: '/blog', icon: '📰' },
//     { label: 'Contact', path: '/contact', icon: '📞' },
//     { label: 'FAQs', path: '/faqs', icon: '❓' },
//     { label: 'Enquire', path: '/enquire', icon: '💌' }
//   ];

//   const toggleMenu = () => {
//     setMenuOpen(!menuOpen);
//     onToggle(!menuOpen);
//   };

//   return (
//     <>
//       {/* Mobile Header with Hamburger */}
//       <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm">
//         <div className="flex items-center justify-between px-6 py-4">
//           {/* Logo */}
//           <div className="flex items-center">
//             <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
//               <span className="text-black text-xs font-bold">TWF</span>
//             </div>
//             <span className="ml-3 text-white text-sm font-light tracking-wider">
//               THE WEDDING FILMER
//             </span>
//           </div>

//           {/* Hamburger Menu Button */}
//           <button
//             onClick={toggleMenu}
//             className="flex flex-col items-center justify-center w-8 h-8 space-y-1 group"
//             aria-label="Toggle navigation menu"
//           >
//             <span className={`block w-6 h-0.5 bg-white transform transition-all duration-300 ${
//               menuOpen ? 'rotate-45 translate-y-2' : ''
//             }`} />
//             <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
//               menuOpen ? 'opacity-0' : ''
//             }`} />
//             <span className={`block w-6 h-0.5 bg-white transform transition-all duration-300 ${
//               menuOpen ? '-rotate-45 -translate-y-2' : ''
//             }`} />
//           </button>
//         </div>
//       </header>

//       {/* Side Navigation Panel */}
//       <aside className={`fixed inset-y-0 left-0 z-40 w-80 bg-black transform transition-transform duration-300 ease-in-out ${
//         menuOpen ? 'translate-x-0' : '-translate-x-full'
//       }`}>
        
//         {/* Navigation Header */}
//         <div className="px-6 py-8 border-b border-gray-800">
//           <div className="flex items-center">
//             <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
//               <span className="text-black text-sm font-bold">TWF</span>
//             </div>
//             <div className="ml-4">
//               <h2 className="text-white text-lg font-medium">The Wedding Filmer</h2>
//               <p className="text-gray-400 text-xs mt-1">Real Films Made By Real Filmmakers</p>
//             </div>
//           </div>
//         </div>

//         {/* Navigation Menu */}
//         <nav className="flex-1 px-6 py-8">
//           <ul className="space-y-2">
//             {navigationItems.map((item) => {
//               const isActive = currentPath === item.path;
//               return (
//                 <li key={item.path}>
//                   <NavLink
//                     to={item.path}
//                     onClick={() => setMenuOpen(false)}
//                     className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
//                       isActive 
//                         ? 'bg-white text-black' 
//                         : 'text-gray-300 hover:text-white hover:bg-gray-900'
//                     }`}
//                   >
//                     <span className="mr-3 text-lg">{item.icon}</span>
//                     <span className="tracking-wide">{item.label}</span>
//                   </NavLink>
//                 </li>
//               );
//             })}
//           </ul>
//         </nav>

//         {/* Footer Section */}
//         <div className="px-6 py-6 border-t border-gray-800">
//           <div className="text-center mb-4">
//             <p className="text-gray-400 text-xs mb-3">We'd love to hear your story!</p>
//             <button className="bg-red-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-red-700 transition-colors">
//               Enquire →
//             </button>
//           </div>
          
//           {/* Social Icons */}
//           <div className="flex justify-center space-x-4 mt-6">
//             <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
//               <span className="text-white text-xs font-bold">IG</span>
//             </div>
//             <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
//               <span className="text-white text-xs font-bold">YT</span>
//             </div>
//           </div>
//         </div>
//       </aside>

//       {/* Overlay */}
//       {menuOpen && (
//         <div 
//           className="fixed inset-0 bg-black/50 z-30"
//           onClick={() => setMenuOpen(false)}
//         />
//       )}
//     </>
//   );
// }


// /* PermanentSideNavbar.jsx - Always Visible Side Navigation */
// import React from 'react';
// import { NavLink } from 'react-router-dom';

// export default function Navbar({ 
//   currentPath = '/',
//   onNavigate = () => {}
// }) {
//   const navigationItems = [
//     { label: 'Home', path: '/' },
//     { label: 'Films', path: '/films' },
//     { label: 'About Us', path: '/about' },
//     { label: 'Crew', path: '/crew' },
//     { label: 'Workshop', path: '/workshop' },
//     { label: 'Blog & Press', path: '/blog' },
//     { label: 'Contact', path: '/contact' },
//     { label: 'FAQs', path: '/faqs' },
//   ];

//   return (
//     <aside className="fixed inset-y-0 left-0 z-50 w-80 bg-black shadow-2xl">
//       {/* Logo Section */}
//       <div className="flex items-center justify-center h-20 border-b border-gray-800">
//         <div className="flex items-center space-x-3">
//           <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
//             <span className="text-black text-sm font-bold">TWF</span>
//           </div>
//           <div className="text-white">
//             <div className="text-lg font-medium">The Wedding Filmer</div>
//             <div className="text-xs text-gray-400">Real Films Made By Real Filmmakers</div>
//           </div>
//         </div>
//       </div>

//       {/* Navigation Menu */}
//       <nav className="flex-1 py-8">
//         <ul className="space-y-1 px-4">
//           {navigationItems.map((item) => {
//             const isActive = currentPath === item.path;
//             return (
//               <li key={item.path}>
//                 <NavLink
//                   to={item.path}
//                   onClick={() => onNavigate(item.path)}
//                   className={`block px-4 py-3 text-sm font-medium transition-all duration-200 rounded-lg ${
//                     isActive 
//                       ? 'bg-white text-black font-semibold' 
//                       : 'text-gray-300 hover:text-white hover:bg-gray-900'
//                   }`}
//                 >
//                   {item.label}
//                 </NavLink>
//               </li>
//             );
//           })}
//         </ul>
//       </nav>

//       {/* Bottom Section */}
//       <div className="p-6 border-t border-gray-800">
//         <div className="text-center mb-4">
//           <p className="text-gray-400 text-xs mb-3">Ready to capture your story?</p>
//           <button className="w-full bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
//             Get Started →
//           </button>
//         </div>
//       </div>
//     </aside>
//   );
// }
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FiHome, FiFilm, FiUsers, FiCamera, FiBook, FiMail } from 'react-icons/fi';

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

  return (
    <aside className="fixed left-0 top-0 h-screen w-80 bg-black flex flex-col items-center py-8 z-50">
      {/* Logo */}
      <div className="mb-10">
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
          <span className="text-black text-sm font-bold">TWF</span>
        </div>
      </div>
      {/* Navigation */}
      <nav className="flex-1 w-full flex flex-col gap-y-3 px-4">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return isActive ? (
            // Active item: floats above, white, rounded-2xl, with shadow and gap
            <div
              key={item.path}
              className="relative z-10"
              style={{ marginBottom: '0.75rem', marginTop: '0.75rem' }} // gap above and below
            >
              <NavLink
                to={item.path}
                className="flex items-center gap-3 px-6 py-4 w-full bg-white rounded-2xl shadow-lg font-semibold text-red-600"
                style={{
                  boxShadow: '0 0 0 4px #fff, 0 2px 12px 0 rgba(0,0,0,0.10)'
                }}
              >
                <span className="text-lg text-red-600">{item.icon}</span>
                <span className="text-sm text-red-600">{item.label}</span>
              </NavLink>
            </div>
          ) : (
            // Inactive item: black, rounded-2xl, normal gap
            <div key={item.path}>
              <NavLink
                to={item.path}
                className="flex items-center gap-3 px-6 py-4 w-full text-white rounded-2xl hover:bg-white/10 transition"
              >
                <span className="text-lg text-gray-400">{item.icon}</span>
                <span className="text-sm text-gray-200">{item.label}</span>
              </NavLink>
            </div>
          );
        })}
      </nav>
      {/* Bottom Section */}
      <div className="p-6 border-t border-gray-800 w-full">
        <div className="text-center mb-4">
          <p className="text-gray-400 text-xs mb-3">We'd love to hear your story!</p>
          <button className="w-full bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
            Enquire →
          </button>
        </div>
      </div>
    </aside>
  );
}

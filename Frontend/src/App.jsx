import React from 'react'
import { BrowserRouter as Router, Routes, Route , useLocation } from 'react-router-dom'
import Footer from './components/Footer'
import HomePage from './pages/HomePage' 
import AboutPage from './pages/AboutPage' 
import ContactPage from './pages/ContactPage' 
import BlogPage from './pages/BlogPage'
import FilmPage from './pages/FilmPage'
import { useState } from 'react';
import AppMain from './AppMain';

function AppContent() {
  const location = useLocation();

  const aboutData = {
    companyName: "The Wedding Filmer",
    tagline: "based on a true story",
    founders: [
      {
        id: 1,
        name: "Vishal Punjabi",
        bio: "A Bollywood film-maker discovers small-format cameras.",
        facts: [
          { label: "Place of Birth", value: "GHANA" },
          { label: "D.O.B", value: "10th July 1980" },
          { label: "Currently", value: "Mumbai, India" }
        ],
        timeline: [
          { year: "2001", text: "Moved from Ghana to India" },
          { year: "2003", text: "Joined Red Chillies as Creative Director" },
          { year: "2007", text: "Mastered film-making techniques" },
          { year: "2009", text: "Filmed own wedding, went viral" }
        ]
      }
    ],
    celebrities: [
      { year: "2024", names: "RAKUL & JACKKY" },
      { year: "2024", names: "ALPANA & YASHRAJ" },
      { year: "2023", names: "SIDHARTH & KIARA" },
      { year: "2021", names: "VICKY & KATRINA" }
    ],
    originals: [
      { id: 1, title: "PEER VI TU", views: "7.1M+ VIEWS" },
      { id: 2, title: "WAHEGURU", views: "5.9M+ VIEWS" },
      { id: 3, title: "CHAL LE CHAL", views: "805K+ VIEWS" }
    ]
  };

  return (
    
    <AppMain currentPath={location.pathname}>
      <div className="app-container">
        <div className='w-1/2'>  
        </div> 
        <main className="lg:ml-50 pt-5 pb-24 lg:pb-0 min-h-screen rounded-full">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path='/films' element={<FilmPage />} />
            <Route path="/about" element={<AboutPage 
            {...aboutData}
            onContact={() => console.log('Contact clicked')}
            />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path='/blog' element={<BlogPage />} />
          </Routes>
        </main>
        <div className="lg:ml-50">
          <Footer />
        </div>
      </div>
    </AppMain>
  )
}
const App = () =>
 {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}


export default App;
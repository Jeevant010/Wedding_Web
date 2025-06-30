import './App.css'
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import HomePage from './pages/HomePage' 
import Navbar from './components/Navbar'
import AboutPage from './pages/AboutPage' 
import ContactPage from './pages/ContactPage' 
import BlogPage from './pages/BlogPage'
import FilmPage from './pages/FilmPage'
// import FeatureWeddings from './components/Featureweddings'
import './App.css' 
function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <div className="app-container">
      <button className="mobile-toggle" onClick={toggleSidebar}>
        {isSidebarOpen ? '✕' : '☰'}
      </button>
      <Navbar isOpen={isSidebarOpen} />
        {/* <HeroSection /> */}
        {/* <FeatureWeddings /> */}

        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path='/films' element={<FilmPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path='/blog' element={<BlogPage />} />
            
          </Routes>
        </main>
        {/* <ContactInfo /> */}
        {/* <Footer /> */}
      </div>
    </Router>
  )
}

export default App;
import './App.css'
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage' 
import Navbar from './components/Navbar'
import AboutPage from './pages/AboutPage' 
// import ContactPage from './pages/ContactPage' 
import GalleryPage from './pages/GalleryPage' 
import BlogPage from './pages/BlogPage'
import FilmPage from './pages/FilmPage'
// import FeatureWeddings from './components/Featureweddings'
import './App.css' 

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        {/* <HeroSection /> */}
        {/* <FeatureWeddings /> */}

        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            {/* <Route path="contact" element={<ContactPage />} /> */}
            <Route path='/gallery' element={<GalleryPage />} />
            <Route path='/blog' element={<BlogPage />} />
            <Route path='/films' element={<FilmPage />} />
            
          </Routes>
        </main>
        {/* <ContactInfo /> */}
        {/* <Footer /> */}
      </div>
    </Router>
  )
}

export default App;
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage' // Make sure this path is correct
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HeroSection from './components/HeroSection' // Make sure this path is correct
import ContactInfo from './components/ContactSection'
import FeatureWeddings from './components/Featureweddings'
import React from 'react'
import './App.css' 

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <HeroSection />
        <FeatureWeddings />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            
          </Routes>
        </main>
        <ContactInfo />
        <Footer />
      </div>
    </Router>
  )
}

export default App
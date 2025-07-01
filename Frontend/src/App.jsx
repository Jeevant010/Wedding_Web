import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage' 
import AboutPage from './pages/AboutPage' 
import ContactPage from './pages/ContactPage' 
import BlogPage from './pages/BlogPage'
import FilmPage from './pages/FilmPage'
import './App.css' 

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path='/films' element={<FilmPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path='/blog' element={<BlogPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App;
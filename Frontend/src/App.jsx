import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage' 
import AboutPage from './pages/AboutPage' 
import ContactPage from './pages/ContactPage' 
import BlogPage from './pages/BlogPage'
import FilmPage from './pages/FilmPage'

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="lg:ml-50 pt-20 pb-24 lg:pb-0 min-h-screen">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path='/films' element={<FilmPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path='/blog' element={<BlogPage />} />
          </Routes>
        </main>
        <div className="lg:ml-50">
          <Footer />
        </div>
      </div>
    </Router>
  )
}

export default App;
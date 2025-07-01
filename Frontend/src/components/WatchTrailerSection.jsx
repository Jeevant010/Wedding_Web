import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import '../styles/WatchTrailerSection.css';

const categories = ['Recents', 'Favourites', 'Classics', 'Celebrities', 'International'];

const WatchTrailerSection = () => {
    const [activeCategory, setActiveCategory] = useState('Recents');
    const [weddingFilms, setWeddingFilms] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_BASE_URL = import.meta.env.PROD 
        ? 'https://your-backend-url.vercel.app/api' 
        : 'http://localhost:9000/api';

    const fetchWeddingFilms = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_BASE_URL}/wedding-films/categories`);
            setWeddingFilms(response.data);
            setError(null);
        } catch (err) {
            console.error('Error fetching wedding films:', err);
            setError('Failed to load wedding films. Please try again later.');
            setWeddingFilms(Object.fromEntries(categories.map(cat => [cat, []])));
        } finally {
            setLoading(false);
        }
    }, [API_BASE_URL]);

    useEffect(() => {
        fetchWeddingFilms();
    }, [fetchWeddingFilms]);

    const handleCategoryChange = (category) => {
        setActiveCategory(category);
    };

    const renderLoadingState = () => (
        <section className="watch-trailer-section">
            <div className="container">
                <h2 className="section-title">WATCH A TRAILER</h2>
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Loading wedding films...</p>
                </div>
            </div>
        </section>
    );

    const renderErrorState = () => (
        <section className="watch-trailer-section">
            <div className="container">
                <h2 className="section-title">WATCH A TRAILER</h2>
                <div className="error-container">
                    <p className="error-message">{error}</p>
                    <button className="retry-button" onClick={fetchWeddingFilms}>
                        Try Again
                    </button>
                </div>
            </div>
        </section>
    );

    if (loading) return renderLoadingState();
    if (error) return renderErrorState();

    return (
        <section className="watch-trailer-section">
            <div className="container">
                <h2 className="section-title">WATCH A TRAILER</h2>
                
                <div className="categories-container">
                    {categories.map((category) => (
                        <button
                            key={category}
                            className={`category-btn ${activeCategory === category ? 'active' : ''}`}
                            onClick={() => handleCategoryChange(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                <div className="wedding-cards-grid">
                    {weddingFilms[activeCategory]?.length > 0 ? (
                        weddingFilms[activeCategory].map((film) => (
                            <div key={film._id} className="wedding-card">
                                <div className="card-image">
                                    <img src={film.image} alt={film.couple} />
                                    <div className="card-overlay">
                                        <div className="play-button">
                                            <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                                                <circle cx="30" cy="30" r="30" fill="rgba(255,255,255,0.9)"/>
                                                <path d="M24 18L40 30L24 42V18Z" fill="#000"/>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-content">
                                    <div className="card-meta">
                                        <span className="date">{film.date}</span>
                                        <span className="separator">—</span>
                                        <span className="location">{film.location}</span>
                                    </div>
                                    <h3 className="couple-names">{film.couple}</h3>
                                    {film.description && (
                                        <p className="film-description">{film.description}</p>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="no-films-message">
                            <p>No wedding films available in this category.</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default WatchTrailerSection;

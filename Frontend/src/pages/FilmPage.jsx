import React, { useState, useEffect } from 'react';

const FilmPage = () => {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/films');
        if (!response.ok) {
          throw new Error('Failed to fetch films');
        }
        const data = await response.json();
        setFilms(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFilms();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading films...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Title */}
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-light tracking-wider text-gray-800 mb-2">
              TWF FILMS
            </h1>
            <div className="w-24 h-px bg-gray-300 mx-auto"></div>
          </div>
        </div>
      </div>

      {/* Films Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-light tracking-wider text-gray-800">
            TRENDING NOW
          </h2>
          <button className="bg-black text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
            view all
          </button>
        </div>

        {/* Films Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {films.map((film) => (
            <div key={film.id} className="group cursor-pointer">
              {/* Film Thumbnail */}
              <div className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden mb-4">
                <img
                  src={film.thumbnail}
                  alt={film.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Play Button Overlay */}
                {film.isVideo && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300">
                    <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-6 h-6 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                )}
                
                {/* Film Title Overlay for featured films */}
                {film.subtitle && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <h3 className="text-2xl font-light tracking-wider mb-2">{film.subtitle}</h3>
                      <p className="text-lg tracking-widest">{film.title}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Film Info */}
              <div className="text-center">
                <div className="flex items-center justify-center text-sm text-gray-500 mb-2 tracking-wide">
                  <span>{film.date}</span>
                  <span className="mx-2">—</span>
                  <span>{film.location}</span>
                </div>
                <h3 className="text-xl font-light tracking-wider text-gray-800">
                  {film.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-16">
          <button className="bg-black text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
            Load More Films
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilmPage;
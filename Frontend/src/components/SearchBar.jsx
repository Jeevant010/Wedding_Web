import React, { useState } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
    console.log("Searching for:", searchQuery);
  };

  const clearSearch = () => {
    setSearchQuery('');
    if (onSearch) {
      onSearch('');
    }
  };

  return (
    <div className="w-full bg-gradient-to-b from-black/20 to-transparent py-6 px-4 relative z-50">
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSearch} className="relative">
          <div className={`relative transition-all duration-300 ${isSearchFocused ? 'transform scale-[1.02]' : ''}`}>
            <div className="relative">
              <FiSearch className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                placeholder="Search weddings, locations, couples..."
                className="w-full h-14 px-6 pl-14 pr-14 text-gray-800 placeholder-gray-500 bg-white/95 backdrop-blur-md border-2 border-white/30 rounded-2xl shadow-2xl focus:outline-none focus:ring-4 focus:ring-white/30 focus:border-white/50 focus:bg-white transition-all duration-300 text-lg font-medium"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
                >
                  <FiX className="w-5 h-5" />
                </button>
              )}
            </div>
            
            {/* Search suggestions or quick filters */}
            <div className="flex flex-wrap gap-2 mt-4 justify-center">
              {['London', 'Mexico', 'Bali', '2024', 'Traditional', 'Destination'].map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSearchQuery(tag)}
                  className="px-4 py-2 text-sm text-white/90 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full hover:bg-white/30 transition-all duration-300 hover:scale-105"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
import React, { useState, useEffect, useRef } from 'react';
import { FaSearch, FaTimes, FaSpinner } from 'react-icons/fa';
import axios from 'axios';
import '../styles/HeaderSection.css';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [searchCategory, setSearchCategory] = useState('all');
  const searchRef = useRef(null);

  // Categories for search filtering
  const categories = [
    { value: 'all', label: 'All' },
    { value: 'venues', label: 'Venues' },
    { value: 'photographers', label: 'Photographers' },
    { value: 'planners', label: 'Wedding Planners' },
    { value: 'decor', label: 'Decor' }
  ];

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Debounce function to limit API calls while typing
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };  // Fetch suggestions as user types
  const fetchSuggestions = async (query) => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    try {
      // Use the real API for suggestions
      const response = await axios.get(`http://localhost:9000/api/search/suggestions?q=${encodeURIComponent(query)}`);
      const data = response.data || [];
      setSuggestions(Array.isArray(data) ? data.slice(0, 5) : []);
      
      // Fallback to mock data if API fails or returns empty
      if (!data.length) {
        console.log('Using fallback suggestions');
        // Filter mock suggestions based on the query
        const mockSuggestions = [
          { id: 1, text: 'Wedding Venues in New York' },
          { id: 2, text: 'Wedding Photographers' },
          { id: 3, text: 'Wedding Planners near me' },
          { id: 4, text: 'Wedding Decor ideas' },
          { id: 5, text: 'Wedding Catering services' }
        ];
        
        const filtered = mockSuggestions
          .filter(item => item.text.toLowerCase().includes(query.toLowerCase()))
          .slice(0, 5);
          
        setSuggestions(filtered);
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]); // Reset on error
    }
  };

  // Debounced version of fetchSuggestions
  const debouncedFetchSuggestions = debounce(fetchSuggestions, 300);

  // Handle input change
  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedFetchSuggestions(query);
    setShowResults(true);
  };  // Handle search submission
  const handleSearch = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    setShowResults(true);
    
    try {
      // Use the real API for search results
      const response = await axios.get(
        `http://localhost:9000/api/search?q=${encodeURIComponent(searchQuery)}&category=${searchCategory}`
      );
      
      const data = response.data || [];
      setSearchResults(data);
      
      // Fallback to mock data if API fails or returns empty
      if (!data.length) {
        console.log('Using fallback search results');
        
        // Mock data for development fallback
        const mockResults = [
          {
            id: 1,
            title: 'Grand Royal Palace',
            description: 'A luxurious venue with magnificent gardens and spacious ballrooms perfect for your dream wedding.',
            category: 'venues',
            image: '/placeholder.png'
          },
          {
            id: 2,
            title: 'Elena Davis Photography',
            description: 'Award-winning wedding photographer capturing your special moments with a creative and artistic style.',
            category: 'photographers',
            image: '/placeholder.png'
          },
          {
            id: 3,
            title: 'Perfect Day Planners',
            description: 'Full-service wedding planning team specializing in luxury weddings and destination events.',
            category: 'planners',
            image: '/placeholder.png'
          }
        ];
        
        // Filter mock results based on query and category
        const filtered = mockResults
          .filter(item => {
            const matchesQuery = 
              item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              item.description.toLowerCase().includes(searchQuery.toLowerCase());
            
            const matchesCategory = searchCategory === 'all' || item.category === searchCategory;
            
            return matchesQuery && matchesCategory;
          });
        
        setSearchResults(filtered);
      }
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Clear search
  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setSuggestions([]);
    setShowResults(false);
  };
  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    // Make sure to check if suggestion.text exists, otherwise use suggestion itself
    setSearchQuery(suggestion.text || suggestion);
    setSuggestions([]);
    handleSearch({ preventDefault: () => {} });
  };

  return (
    <div className='header-container'>
      <div className='search-bar-container' ref={searchRef}>
        <form onSubmit={handleSearch} className='search-form'>
          <div className='search-input-wrapper'>
            <select 
              className='search-category-select'
              value={searchCategory}
              onChange={(e) => setSearchCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
            
            <div className='search-input-container'>
              <FaSearch className='search-icon' />
              <input
                type='text'
                placeholder='Search for wedding services...'
                value={searchQuery}
                onChange={handleInputChange}
                onFocus={() => setShowResults(true)}
                className='search-input'
              />
              {searchQuery && (
                <button 
                  type='button' 
                  onClick={clearSearch}
                  className='clear-button'
                >
                  <FaTimes />
                </button>
              )}
            </div>
            
            <button type='submit' className='search-button'>
              {isLoading ? <FaSpinner className='spinner' /> : 'Search'}
            </button>
          </div>
        </form>
        
        {showResults && (suggestions.length > 0 || searchResults.length > 0 || isLoading) && (
          <div className='search-results-container'>            {suggestions.length > 0 && (
              <div className='suggestions-list'>
                <h3>Suggestions</h3>
                <ul>
                  {suggestions.map((suggestion, index) => (
                    <li 
                      key={index} 
                      onClick={() => handleSuggestionClick(suggestion)}
                      className='suggestion-item'
                    >
                      <FaSearch className='suggestion-icon' />
                      <span>
                        {typeof suggestion === 'object' ? 
                          (suggestion.text || suggestion.title || JSON.stringify(suggestion)) : 
                          suggestion}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {isLoading && (
              <div className='search-loading'>
                <FaSpinner className='spinner' />
                <p>Searching...</p>
              </div>
            )}
            
            {!isLoading && searchResults.length > 0 && (
              <div className='search-results'>
                <h3>Results</h3>
                <ul className='results-list'>
                  {searchResults.map((result) => (
                    <li key={result.id} className='result-item'>
                      <div className='result-image'>
                        <img src={result.image || '/placeholder.png'} alt={result.title} />
                      </div>
                      <div className='result-info'>
                        <h4>{result.title}</h4>
                        <p>{result.description.substring(0, 100)}...</p>
                        <span className='result-category'>{result.category}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {!isLoading && searchQuery && searchResults.length === 0 && (
              <div className='no-results'>
                <p>No results found for "{searchQuery}"</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
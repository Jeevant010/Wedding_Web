import { useState, useEffect } from 'react';

const Hero = ({ onEnquireClick, onBookUsClick }) => (
  <section className="bg-white text-black py-24 rounded-3xl mx-4 sm:mx-8 shadow-md mt-8">
    <div className="max-w-4xl mx-auto text-center px-4">
      <h1 className="text-4xl md:text-6xl font-light mb-10 leading-tight">
        We'd love to<br />
        <span className="font-normal">hear your story!</span>
      </h1>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
        <button
          onClick={onEnquireClick}
          className="bg-black text-white px-8 py-3 text-lg font-semibold rounded-full shadow hover:bg-gray-800 transition"
        >
          Enquire
        </button>
        <button
          onClick={onBookUsClick}
          className="border border-black text-black px-8 py-3 text-lg font-semibold rounded-full hover:bg-black hover:text-white transition"
        >
          Book Us
        </button>
      </div>
    </div>
  </section>
);

const SlideTextButton = ({ onClick, children }) => (
  <button
    type="button"
    onClick={onClick}
    className="btn-slide-vertical px-5 py-2 rounded-3xl text-sm font-semibold focus:outline-none"
    tabIndex={0}
  >
    <span className="btn-text top">{children}</span>
    <span className="btn-text bottom">{children}</span>
  </button>
);


const FilmCard = ({ film, onFilmClick }) => (
  <div
    className="bg-white rounded-3xl shadow-lg min-w-[260px] max-w-xs w-[260px] mx-2 cursor-pointer group transition-transform duration-300 hover:scale-105 border border-gray-200"
    onClick={() => onFilmClick(film.id)}
  >
    <div className="relative">
      {film.featured && (
        <div className="absolute top-3 left-3 bg-black text-white px-3 py-1 text-xs font-bold uppercase rounded-full shadow">
          Featured
        </div>
      )}
      <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
        <span className="text-gray-500 text-base font-medium">Film Preview</span>
      </div>
      <div className="p-5 text-black">
        <div className="text-xs text-gray-500 mb-1">{film.date}</div>
        <div className="text-xs text-gray-500 mb-2">{film.location}</div>
        <div className="font-semibold text-lg">{film.couple}</div>
      </div>
    </div>
  </div>
);

const FilmCategory = ({ category, onFilmClick, onViewAllClick }) => (
  <section className="py-14 bg-white rounded-3xl mx-4 sm:mx-8 my-8 shadow-md">
    <div className="max-w-7xl mx-auto px-4">
      
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl md:text-3xl font-extralight text-black uppercase tracking-widest">
          {category.title}
        </h2>
        <SlideTextButton onClick={() => onViewAllClick(category.id)}>
          View All
        </SlideTextButton>
      </div>
      
      <div className="relative">
        <div
          className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory -mx-2 py-2"
          style={{
            WebkitOverflowScrolling: 'touch',
            scrollBehavior: 'smooth',
          }}
        >
          {category.films.map((film) => (
            <div key={film.id} className="snap-start">
              <FilmCard film={film} onFilmClick={onFilmClick} />
            </div>
          ))}
        </div>
        
        <div className="pointer-events-none absolute top-0 right-0 h-full w-12 bg-gradient-to-l from-white to-transparent" />
      </div>
    </div>
  </section>
);



const Films = ({
  onEnquireClick = () => console.log('Enquire clicked'),
  onBookUsClick = () => console.log('Book Us clicked'),
  onFilmClick = (filmId) => console.log('Film clicked:', filmId),
  onViewAllClick = (categoryId) => console.log('View all clicked:', categoryId)
}) => {
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        const response = await fetch('http://localhost:9000/api/films/portfolio');
        if (!response.ok) {
          throw new Error('Failed to fetch portfolio data');
        }
        const data = await response.json();
        setPortfolioData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolioData();
  }, []);

  if (loading) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (!portfolioData) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-xl">No data available</div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Hero onEnquireClick={onEnquireClick} onBookUsClick={onBookUsClick} />
      <main className="flex-1">
        {portfolioData.categories.map((category) => (
          <FilmCategory
            key={category.id}
            category={category}
            onFilmClick={onFilmClick}
            onViewAllClick={onViewAllClick}
          />
        ))}
      </main>
    </div>
  );
};

export default Films;

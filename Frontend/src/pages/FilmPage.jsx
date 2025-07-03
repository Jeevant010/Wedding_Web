const defaultPortfolioData = {
  categories: [
    {
      id: "all-weddings",
      title: "all weddings",
      films: [
        {id: 1, date: "Jun 2024", location: "United Kingdom", couple: "Nikki & Vishal", featured: true},
        {id: 2, date: "Jun 2024", location: "Europe", couple: "Dhrisha & Arun", featured: true},
        {id: 3, date: "Jun 2024", location: "Africa", couple: "Mahek & Jay", featured: true},
        {id: 4, date: "Feb 2024", location: "India", couple: "Alpana & Yashraj", featured: true},
        {id: 5, date: "Dec 2023", location: "North America", couple: "Simran & Vishal", featured: true},
        {id: 6, date: "Dec 2023", location: "India", couple: "Ridhi & Raj", featured: true},
        {id: 7, date: "Nov 2023", location: "Middle East", couple: "Sanaya & Aamir", featured: true},
        {id: 8, date: "Aug 2023", location: "India", couple: "Sriharshini & Sai Teja", featured: true}
      ]
    },
    {
      id: "twf-classics",
      title: "TWF Classics",
      films: [
        {id: 9, date: "Aug 2016", location: "United Kingdom", couple: "The Inseparables", featured: true},
        {id: 10, date: "Aug 2015", location: "India", couple: "All You Need Is Love", featured: true},
        {id: 11, date: "Jun 2015", location: "East Asia", couple: "Divine Intervention", featured: true},
        {id: 12, date: "Dec 2014", location: "India", couple: "A Walk To Remember", featured: true},
        {id: 13, date: "Jul 2014", location: "India", couple: "Monsoon Love", featured: true},
        {id: 14, date: "Apr 2014", location: "East Asia", couple: "Shooting Stars", featured: true},
        {id: 15, date: "Mar 2014", location: "India", couple: "Nurture", featured: true},
        {id: 16, date: "Jan 2014", location: "India", couple: "Faiz & Fajr", featured: true}
      ]
    },
    {
      id: "celebrity-weddings",
      title: "Celebrity weddings",
      films: [
        {id: 17, date: "Dec 2024", location: "India", couple: "PV Sindhu & Datta", featured: true},
        {id: 18, date: "Sep 2024", location: "India", couple: "Aditi & Siddharth", featured: true},
        {id: 19, date: "Jul 2024", location: "India", couple: "Radhika & Anant", featured: true},
        {id: 20, date: "Feb 2024", location: "India", couple: "Rakul & Jackky", featured: true},
        {id: 21, date: "Feb 2023", location: "India", couple: "Kiara & Sidharth", featured: true},
        {id: 22, date: "Jun 2022", location: "India", couple: "Nayanthara & Vignesh", featured: true},
        {id: 23, date: "Feb 2022", location: "India", couple: "Shibani & Farhan", featured: true},
        {id: 24, date: "Dec 2021", location: "India", couple: "Katrina & Vicky", featured: true}
      ]
    },
    {
      id: "international-weddings",
      title: "International weddings",
      films: [
        {id: 25, date: "Jun 2023", location: "United Kingdom", couple: "Zana & James", featured: true},
        {id: 26, date: "Jan 2023", location: "East Asia", couple: "Tuisha & Gaurav", featured: true},
        {id: 27, date: "Nov 2022", location: "East Asia", couple: "Milan Sai & Suraj", featured: true},
        {id: 28, date: "Oct 2022", location: "Europe", couple: "Karishma & Namir", featured: true},
        {id: 29, date: "Jul 2022", location: "Europe", couple: "Anita & Colm", featured: true},
        {id: 30, date: "May 2022", location: "Europe", couple: "Leena & Chirag", featured: true},
        {id: 31, date: "Oct 2021", location: "North America", couple: "Anjena & Vick", featured: true},
        {id: 32, date: "Sep 2021", location: "Europe", couple: "Manal & Nadim", featured: true}
      ]
    },
    {
      id: "palace-weddings",
      title: "Palace weddings",
      films: [
        {id: 33, date: "Dec 2022", location: "India", couple: "Mausam & Piyush", featured: true},
        {id: 34, date: "Aug 2022", location: "India", couple: "Arpita & Kunal", featured: true},
        {id: 35, date: "Apr 2022", location: "India", couple: "Chinmaya & Ankush", featured: true},
        {id: 36, date: "Jan 2022", location: "India", couple: "Saanchi & Shahaan", featured: true},
        {id: 37, date: "Mar 2021", location: "India", couple: "Sumedha & Harsh", featured: true},
        {id: 38, date: "Dec 2020", location: "India", couple: "Kanika & Ritik", featured: true},
        {id: 39, date: "Dec 2020", location: "India", couple: "Aishwarya & Avaneesh", featured: true},
        {id: 40, date: "Nov 2020", location: "India", couple: "Gopalika & Dhruv", featured: true}
      ]
    },
    {
      id: "beach-weddings",
      title: "Beach weddings",
      films: [
        {id: 41, date: "Dec 2022", location: "Middle East", couple: "Aashi & Vedant", featured: true},
        {id: 42, date: "Dec 2019", location: "Middle East", couple: "Roma & Jaskaran", featured: true},
        {id: 43, date: "Dec 2016", location: "Southeast Asia", couple: "Ishita & Danny", featured: true},
        {id: 44, date: "Sep 2014", location: "East Asia", couple: "Natasha & Kanishk", featured: true},
        {id: 45, date: "May 2014", location: "North America", couple: "Kiran & Sumir", featured: true}
      ]
    }
  ],
  navigation: ["Home", "Films", "About", "Crew", "Workshop", "Blog & Press", "Contact", "FAQs"],
  contact: {
    phone: "+91 98198 63229",
    email: "info@theweddingfilmer.co.in",
    address: "Astha Bunglow no.30, JP Rd, Aram Nagar Part 2, Versova, Andheri West, Mumbai, Maharashtra 400061"
  }
};

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
  portfolioData = defaultPortfolioData,
  onEnquireClick = () => console.log('Enquire clicked'),
  onBookUsClick = () => console.log('Book Us clicked'),
  onFilmClick = (filmId) => console.log('Film clicked:', filmId),
  onViewAllClick = (categoryId) => console.log('View all clicked:', categoryId)
}) => {
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

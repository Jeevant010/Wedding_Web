import React from 'react'
import '../styles/HeaderSection.css'
const Header = () => {
  return (
    <div className='header-container'>
      {/* create a Search Bar  */}
      <div className='search-bar '>
        <input type='text' placeholder='Search...' />
        <button type='submit'>Search</button>

      </div>

    </div>
  )
}

export default Header
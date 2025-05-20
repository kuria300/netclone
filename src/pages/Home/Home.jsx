import React from 'react'
import './Home.css'
import Navbar from '../../components/Navbar/Navbar'
import hero from '../../assets/hero_banner.jpg'
import hero_title from '../../assets/hero_title.png'
import play_icon from '../../assets/play_icon.png'
import info_icon from '../../assets/info_icon.png'
import TitleCards from '../../components/TitleCards/TitleCards'
import Footer from '../../components/Footer/Footer'
import { useState } from 'react'
import { Link } from 'react-router-dom';
const Home = () => {
  const [movies, setMovies] = useState([]);
  return (
    <div className='home'>
      <Navbar setMovies={setMovies} />

      {/* 🔍 Show only search results if search is active */}
      {movies.length > 0 ? (
        <div className="search-results-container full-page">
          <h2>Results</h2>
          <div className="search-row">
            {movies.map(movie => (
              <Link to={`/player/${movie.id}`} key={movie.id} className="movie-card">
                <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
                <p>{movie.title}</p>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <>
          {/* 🏠 Home UI when no search is active */}
          <div className='hero'>
            <img src={hero} alt='' className='banner-img' />
            <div className='hero-caption'>
              <img src={hero_title} alt='' className='caption-img' />
              <p>Discovering his ties to a secret ancient order, a young man 
                living in modern Istanbul embarks on a quest to save the city from an Immortal enemy.</p>
              <div className="home-btns">
                <button className='btn'><img src={play_icon} alt='' />Play</button>
                <button className='btn dark-btn'><img src={info_icon} alt='' />More Info</button>
              </div>
              <TitleCards />
            </div>
          </div>
          <div className="more-cards">
            <TitleCards title={"BlockBuster Movies"} category={"upcoming"} />
            <TitleCards title={"Only on Netflix"} category={"popular"} />
            <TitleCards title={"Upcoming"} category={"top_rated"} />
            <TitleCards title={"Top Picks for You"} category={"now_playing"} />
          </div>
          <Footer />
        </>
      )}
    </div>
  )
}

export default Home
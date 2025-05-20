import React, { useEffect, useRef } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { useState } from 'react';
import { Link } from 'react-router-dom';

const TitleCards = ({title, category}) => {

  const cardsRef = useRef();
  const [movies, setMovies]= useState([]);
  const [search, setSearch] = useState('')

  const handleWheel=(event)=>{
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY
  }
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.VITE_TMDB_ACCESS_TOKEN}`
    }
  };
  const fetchMovies= async()=>{
  try{
    const response= await fetch(`https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}?language=en-US&page=1`, options)
    const data= await response.json();
    setMovies(data.results);
  }catch(err){
    console.error('Error', err)
  }
  }
  
  useEffect(()=>{
  fetchMovies()
    cardsRef.current.addEventListener('wheel', handleWheel)
  }, [])
  return (
    <div className='titlecards'>
      <h2>{title ? title: "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {movies.map((movie)=>{
          return <Link to={`/player/${movie.id}`} className="card">
            <img src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`} alt=''/>
            <p>{movie.title}</p>
          </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCards
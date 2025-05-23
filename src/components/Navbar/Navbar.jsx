import React, { useEffect, useState ,useRef } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import search from '../../assets/search_icon.svg'
import bell from '../../assets/bell_icon.svg'
import profile from '../../assets/profile_img.png'
import caret from '../../assets/caret_icon.svg'
import { logout } from '../../firebase'
import { useDebounce } from 'react-use'



const Navbar = ({setMovies}) => {
  const navRef= useRef();
  const [Search, setSearch] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useDebounce(() => {
    setDebouncedSearch(Search);
  }, 1000, [Search]);  // Debouncing the search term
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`
    }
  };

  const fetchMovie= async(query='')=>{
  try{
    const response= await fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1`, options);
    const data = await response.json()
    //console.log(data);
    setMovies(data.results)
  }catch(err){
    console.error('Error', err)
  }
  }
  
  useEffect(()=>{
    if(debouncedSearch.trim()){
      fetchMovie(debouncedSearch)
    };
  }, [debouncedSearch])
  useEffect(()=>{
  
    const handleScroll=()=>{
      if(window.scrollY >= 80){
        navRef.current.classList.add('nav-dark')
      }else{
        navRef.current.classList.remove('nav-dark')
      }
  }
  window.addEventListener('scroll', handleScroll)
  //cleanup on component unmount
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
  },[])
  return (
    <div ref={navRef} className='navbar'>
      <div className='navbar-left'>
        <img src={logo} alt='' />
        <ul>
          <li>Home</li>
          <li>Tv Shows</li>
          <li>Movies</li> 
          <li>New & Popular</li>
          <li>My List</li>
          <li>Browse by Language</li>
        </ul>
      </div>
      <div className='navbar-right'>
      <img src={search} alt=''className='icons'  onClick={() => setIsSearchActive(!isSearchActive)}/>
        {isSearchActive && (
          <input
            type="text"
            placeholder="Search movies..."
            value={Search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
            autoFocus
          />
        )}
      <p>Kids</p>
      <img src={bell} alt='' className='icons' />
      <div className="navbar-profile">
      <img src={profile} alt='' className='profile' />
      <img src={caret} alt='' />
      <div className="dropdown">
        <p onClick={()=>logout()}>Sign Out</p>
      </div>
      </div>
      </div>
    </div>
  )
}

export default Navbar
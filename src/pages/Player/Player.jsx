import React, { useEffect, useRef, useState } from 'react'
import './Player.css'
import back_arrow from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'
import gsap from 'gsap';
const Player = () => {
  const {id} = useParams();
 const navigate= useNavigate()
 const imgRef= useRef()
  const [apiData, setApiData] = useState({
    name: "",
    key:"",
    type:"",
    published_at:""
  })
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NWNmMDkwYWI0M2M2YjhkODExOTUzMjdiMWM0NjZmOSIsIm5iZiI6MTc0NDQ1OTI1MS44Niwic3ViIjoiNjdmYTU1ZjNhMDRmNTMwYjVjOTk0ZTUzIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.1IT8V6vSxWXVud2vfNbcmnRkaNkjyLumynzQ_J0soxs'
    }
  };
  const fetchVideo= async()=>{
    try{
    const response= await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options);
    const data = await response.json()
    if (data.results && data.results.length > 0) {
      setApiData(data.results[0]);
    } else {
      setApiData(null);
    }
    }catch(err){
      console.error('Error', err)
    }
  }
 useEffect(()=>{
    fetchVideo()

    gsap.fromTo(imgRef.current, 
      { x: -50, opacity: 0 }, 
      { x: 0, opacity: 1, duration: 1, ease: 'power2.out' }
    );
 }, [])
  return (
    <div className='player'>
      <img src={back_arrow} onClick={()=>navigate('/')} ref={imgRef} alt=''/>
      <iframe width='90%' height='90%' src={`https://www.youtube.com/embed/${apiData.key}`} title='trailer'
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  )
}

export default Player
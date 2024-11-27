import React, { useEffect, useState } from 'react';
import Titles from './../Titles';
import { BsBookmarkStarFill, BsCaretLeft, BsCaretLeftFill, BsCaretRight, BsCaretRightFill } from 'react-icons/bs';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa'; 
import Rating from '../Stars';



function TopRated() {
  const [nextEl, setNextEl] = useState(null);
  const [prevEl, setPrevEl] = useState(null);
  const classNames = "hover:bg-dry transitions text-sm rounded w-8 h-8 flex-colo bg-subMain text-white";
  const [movies, setMovies] = useState([]);

  useEffect(() => {
      fetch('http://localhost:3000/movies')
          .then(response => response.json())
          .then(data => {
              // Map the data to match the format of Movies array
              const mappedMovies = data.map(movie => ({
                  name: movie.title,
                  desc: movie.plot,
                  titleImage: movie.poster,
                  image: movie.backdrop, // Assuming poster as the image
                  category: movie.genre.split(',').map(genre => genre.trim() + ' '), // Split genre string into an array with space
                  language: 'English', // Assuming language is always English for simplicity
                  year: movie.year,
                  time: movie.runtime,
                  video: movie.cdnPath, // Assuming cdnPath as the video link
                  rate: parseFloat(movie.imdbRatings), // Convert imdbRatings to float
                  reviews: 0, // You can set reviews to 0 or some default value
                  imdbid:movie.imdbId
              }));
              setMovies(mappedMovies);
          })
          .catch(error => console.error('Error fetching movies:', error));
  }, []);
  
  const [likedMovie, setLiked]=useState('');
  const user = JSON.parse(localStorage.getItem('user'));
 
  
  const handleLiked=(imdbid)=>{
     
      if(user==null){
          window.alert('Please Login For save Your favourite movies <3')
          window.location.assign('/login');

      }
      else{
          const Formdata = new FormData();
          Formdata.append('imdbid',imdbid)
          Formdata.append('userid',user.id)
          postLiked(Formdata);
          for (let pair of Formdata.entries()) {
              console.log(pair[0] + ': ' + pair[1]);
            }
      }
     
  }
  async function postLiked(formData) {
      try {
        const response = await fetch('http://localhost:8080/user/users/addtoliked', {
          method: 'POST',
          body: formData
        });
    
      } catch (error) {
        console.error('Error posting liked movie:', error);
      }
    }
  

  return (
    <div className="my-16 p-5">
      <Titles title="Top Rated" Icon={BsBookmarkStarFill} />
      <div className="mt-10 p-5">
        <Swiper navigation={{ nextEl, prevEl }} slidesPerView={4} spaceBetween={40}
          autoplay={true} speed={1000} loop={true} modules={[Navigation, Autoplay]}>
          {
            movies.map((movie, index) => (
              <SwiperSlide key={index}>
                <div className="p-4 h-rate hovered border border-border bg-dry rounded-lg overflow-hidden">
                  <img src={movie.titleImage} alt={movie.name} className="w-full h-full object-cover rounded-lg" />
                  <div className="px-4 hoveres gap-6 text-center absolute bg-black bg-opacity-70 top-0 left-0 right-0 bottom-0">
                    <button className="w-12 h-12 flex-colo transition hover:bg-subMain rounded-full bg-white bg-opacity-30 text-white"onClick={() => handleLiked(movie.imdbid)}>
                      <FaHeart />
                    </button>
                    <Link className="font-semibold text-xl trancuted line-clamp-2" to={`/movie/${movie.name}`}>
                      {movie.name}
                    </Link>
                    <div className="flex-rows gap-2 text-star">
                      <Rating value={movie.rate} />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))
          }
        </Swiper>
        <div className="w-full px-1 flex-rows gap-6 pt-12">
          <button className={classNames} ref={(node) => setPrevEl(node)}>
            <BsCaretLeftFill />
          </button>
          <button className={classNames} ref={(node) => setNextEl(node)}>
            <BsCaretRightFill/>
          </button>
        </div>

      </div>
    </div>
  );
}

export default TopRated;



/*import React from 'react'

function TopRated() {
  return (
    <div>TopRated</div>
  )
}

export default TopRated*/
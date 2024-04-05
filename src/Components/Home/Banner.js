import React, { useEffect, useState } from 'react';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import FlexMovieItems from '../FlexMovieItems';
import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';

function Banner() {
    const [movies, setMovies] = useState([]);
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
    
    useEffect(() => {
        fetch('http://localhost:8080/movie/Video/movies')
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
    return (
        <div className="relative w-full xl:h-96 lg:h-64 h-48"> 
            <Swiper
                direction="vertical"
                spaceBetween={0}
                slidesPerView={1}
                loop={true}
                speed={1000}
                modules={[Autoplay]}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                className="w-full h-full bg-dry"
            >
                {movies.map((movie, index) => (
                    <SwiperSlide key={index} className="relative rounded overflow-hidden">
                        <img src={movie.image} alt={movie.name} className="w-full h-full object-cover" />
                        <div className="absolute linear-bg xl:pl-52 sm:pl-32 pl-8 top-0 bottom-0 right-0 left-0 flex flex-col justify-center lg:gap-8 md:gap-5 gap-4">
                            <h1 className="xl:text-4xl truncate capitalize font-sans sm:text-2xl text-xl font-bold">
                                {movie.name}
                            </h1>
                            <div className="flex gap-5 items-center text-dryGray">
                                <FlexMovieItems movie={movie} />
                            </div>
                            <div className="flex gap-5 items-center">
                                <Link to={`/movie/${movie.name}`} className="bg-subMain hover:text-main transition text-white px-8 py-3 rounded font-medium sm:text-sm text-xs">
                                    Watch Now
                                </Link>
                                <button className="bg-white hover:text-subMain transition text-white px-4 py-3 rounded text-sm bg-opacity-30" onClick={() => handleLiked(movie.imdbid)}>
                                  <FaHeart />
                                </button>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default Banner
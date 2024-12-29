import React, { useEffect, useState } from 'react';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import FlexMovieItems from '../FlexMovieItems';
import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';

function Banner() {
    const [movies, setMovies] = useState([]);
    const [autoplayConfig, setAutoplayConfig] = useState({
        delay: 4000,
        disableOnInteraction: false,
    });
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLiked = (imdbid) => {
        if (user == null) {
            window.alert('Please Login to save your favorite movies <3');
            window.location.assign('/login');
        } else {
            const formData = new FormData();
            formData.append('imdbid', imdbid);
            formData.append('userid', user.id);
            postLiked(formData);
            for (let pair of formData.entries()) {
                console.log(pair[0] + ': ' + pair[1]);
            }
        }
    };

    async function postLiked(formData) {
        try {
            await fetch('https://backend.sriflix.tharupathir.live/user/users/addtoliked', {
                method: 'POST',
                body: formData,
            });
        } catch (error) {
            console.error('Error posting liked movie:', error);
        }
    }

    useEffect(() => {
        fetch('https://backend.sriflix.tharupathir.live/movies')
            .then((response) => response.json())
            .then((data) => {
                const mappedMovies = data.map((movie) => ({
                    name: movie.title,
                    desc: movie.plot,
                    titleImage: movie.poster,
                    image: movie.backdrop,
                    category: movie.genre.split(',').map((genre) => genre.trim() + ' '),
                    language: 'English',
                    year: movie.year,
                    time: movie.runtime,
                    video: movie.cdnPath,
                    rate: parseFloat(movie.imdbRatings),
                    reviews: 0,
                    imdbid: movie.imdbId,
                }));
                setMovies(mappedMovies);
            })
            .catch((error) => console.error('Error fetching movies:', error));
    }, []);

    return (
        <div className="relative w-full xl:h-96 lg:h-64 h-48">
            <Swiper
                key={`${movies.length}-${autoplayConfig.delay}`}
                direction="vertical"
                spaceBetween={0}
                slidesPerView={1}
                loop={movies.length > 1}
                speed={1000}
                modules={[Autoplay]}
                autoplay={autoplayConfig}
                className="w-full h-full bg-dry"
            >
                {movies.length === 0 ? (
                    <SwiperSlide>
                        <div className="w-full h-full flex items-center justify-center">
                            <p>Loading...</p>
                        </div>
                    </SwiperSlide>
                ) : (
                    movies.map((movie, index) => (
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
                                    <Link
                                        to={`/movie/${movie.name}`}
                                        className="bg-subMain hover:text-main transition text-white px-8 py-3 rounded font-medium sm:text-sm text-xs"
                                    >
                                        Watch Now
                                    </Link>
                                    <button
                                        className="bg-white hover:text-subMain transition text-white px-4 py-3 rounded text-sm bg-opacity-30"
                                        onClick={() => handleLiked(movie.imdbid)}
                                    >
                                        <FaHeart />
                                    </button>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))
                )}
            </Swiper>
        </div>
    );
}

export default Banner;

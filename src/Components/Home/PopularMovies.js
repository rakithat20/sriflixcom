import React, { useEffect, useState } from 'react';
import Titles from '../Titles';
import { BsCollectionFill } from 'react-icons/bs';
import Movie from '../Movie';
import { Movies } from '../../Data/MovieData';

function PopularMovies() {
  const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/movie/Video/toprated')
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
        <div className="my-16">
            <Titles title="Popular Movies" Icon={BsCollectionFill} />
            <div className="grid sm:mt-12 mt-6 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
                {
                  movies.slice(0, 8).map((movie) => (
                    <Movie key={movie.id} movie={movie} />
                  ))
                }
            </div>
        </div>
    );
}

export default PopularMovies;

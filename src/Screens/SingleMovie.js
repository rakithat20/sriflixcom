import React, { useEffect, useState } from 'react';
import Layout from '../Layout/Layout';
import { Movies } from '../Data/MovieData';
import { useParams } from 'react-router-dom';
import MovieInfo from '../Components/Single/MovieInfo';
import MovieCasts from '../Components/Single/MovieCasts';
import MovieRates from '../Components/Single/MovieRates';
import Titles from '../Components/Titles';
import { BsCollectionFill } from 'react-icons/bs';
import Movie from '../Components/Movie';

function SingleMovie() {
    const { id } = useParams();
    const [movie, setMovie] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:65315/sriflix/Video/search/${id}`)
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
                    imdbid: movie.imdbId
                }));
                setMovie(mappedMovies);
            })
            .catch(error => console.error('Error fetching movies:', error));
    }, []);

    // Check if movie[0] is defined before rendering MovieInfo and MovieRates
    if (!movie[0]) {
        return null; // Or you can return a loading indicator
    }

    return (
        <Layout>
            <MovieInfo movie={movie[0]} />
            <div className="container mx-auto min-h-screen px-2 my-6">
                <MovieCasts />
                <MovieRates movie={movie[0]} />
            </div>
        </Layout>
    )
}

export default SingleMovie;
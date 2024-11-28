import React, { useEffect, useState } from 'react';
import Layout from '../Layout/Layout';
import { Movies } from '../Data/MovieData';
import { useParams } from 'react-router-dom';
import MovieInfo from '../Components/Single/MovieInfo';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SingleMovie() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const foundMovie = Movies.find((m) => m.name === id);
        if (foundMovie) {
            setMovie(foundMovie);
        } else {
            fetch(`http://localhost:3000/movies/title/${id}`)
                .then(response => response.json())
                .then(data => {
                    if (data.length > 0) {
                        const mappedMovie = {
                            name: data[0].title,
                            desc: data[0].plot,
                            titleImage: data[0].poster,
                            image: data[0].backdrop,
                            category: data[0].genre.split(',').map(genre => genre.trim() + ' '),
                            language: 'English',
                            year: data[0].year,
                            time: data[0].runtime,
                            video: data[0].cdnPath,
                            rate: parseFloat(data[0].imdbRatings),
                            reviews: 0,
                            imdbid: data[0].imdbId
                        };
                        setMovie(mappedMovie);
                    } else {
                        console.error('Movie not found');
                    }
                })
                .catch(error => console.error('Error fetching movie:', error));
        }
    }, [id]);

    useEffect(() => {
        if (movie) {
            notify(); // Call notify when movie is loaded
        }
    }, [movie]);

    const notify = () => toast.warn('S3 Is down.will fix it right away :)', {
        position: "top-center",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        }) ;;
      

    if (!movie) {
        return null; 
    }

    return (
        <Layout>
            <MovieInfo movie={movie} />
            
            <ToastContainer/>


        </Layout>
    );
}

export default SingleMovie;

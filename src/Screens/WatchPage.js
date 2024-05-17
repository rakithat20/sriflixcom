import React, { useEffect, useState } from 'react';
import Layout from '../Layout/Layout';
import { useParams, Link } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import { FaCloudDownloadAlt, FaHeart, FaPlay } from 'react-icons/fa';

function WatchPage() {
    let { id } = useParams();
    const [movie, setMovie] = useState({});
    const [play, setPlay] = useState(false);

    useEffect(() => {
        fetch(`https://lobster-app-bxg93.ondigitalocean.app/movies/title/${id}`)
            .then(response => response.json())
            .then(data => {
                const mappedMovies = data.map(movie => ({
                    name: movie.title,
                    desc: movie.plot,
                    titleImage: movie.poster,
                    image: movie.backdrop,
                    category: movie.genre.split(',').map(genre => genre.trim() + ' '),
                    language: 'English',
                    year: movie.year,
                    time: movie.runtime,
                    video: 'https://'+movie.cdnpath,
                    rate: parseFloat(movie.imdbRatings),
                    reviews: 0,
                    imdbid: movie.imdbid
                }));
                setMovie(mappedMovies[0]);
            })
            .catch(error => console.error('Error fetching movies:', error));
    }, [id]);

    useEffect(() => {
        console.log(movie.video);
    }, [movie]);

    return (
        <Layout>
            <div className="container mx-auto bg-dry p-6 mb-12">
                <div className="flex-btn flex-wrap mb-6 gap-6 bg-main rounded border border-gray-800 p-6">
                    <Link to={movie?.name} className="md:text-xl text-sm flex gap-3 items-center font-bold text-dryGray">
                        <BiArrowBack /> {movie?.name}
                    </Link>
                    <div className="flex-btn sm:w-auto w-full gap-5">
                        <button className="bg-white hover:text-subMain transitions bg-opacity-30 text-white rounded px-4 py-3 text-sm">
                            <FaHeart />
                        </button>
                        <button className="bg-subMain flex-rows gap-2 hover:text-main transitions text-white rounded px-8 font-medium py-3 text-sm">
                            <FaCloudDownloadAlt /> Download
                        </button>
                    </div>
                </div>
                {play ? (
                    <video controls autoPlay={play} className="w-full h-full rounded">
                        <source src={movie.video} type="video/mp4" title={movie.name} />
                    </video>
                ) : (
                    <div className="w-full h-screen rounded-lg overflow-hidden relative">
                        <div className="absolute top-0 right-0 left-0 bottom-0 bg-main bg-opacity-30 flex-colo">
                            <button onClick={() => setPlay(true)} className="bg-white text-subMain flex-colo border border-subMain rounded-full w-20 h-20 font-medium text-xl">
                                <FaPlay />
                            </button>
                        </div>
                        <img src={movie.image} alt={movie?.name} className="w-full h-full object-cover rounded-lg" />
                    </div>
                )}
            </div>
        </Layout>
    );
}

export default WatchPage;

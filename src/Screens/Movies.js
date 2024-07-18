import React, { useEffect, useState } from "react";
import Filters from "../Components/Filters";
import Layout from "../Layout/Layout";
import Movie from "../Components/Movie";
import { CgSpinner } from "react-icons/cg";
import { useParams } from 'react-router-dom';

function MoviesPage() {
  const params = useParams();
  const search = params.search || '';
  const genre = params.genre || '';
  console.log('Genre:', genre);
  console.log('Genre:', genre);
  const maxPage = 3;
  const [page, setPage] = useState(maxPage);
  const [movies, setMovies] = useState([]);

  const fetchMovies = async () => {
    try {
      let url = 'https://zgg.tharupathir.live/movies';
  
      // If both search (title) and genre parameters are provided
      if (search !== '' && genre !== '') {
        url = `https://zgg.tharupathir.live/movie/Video/genreAndTitle/${search}/${genre}`;
      } else if (search !== '') { // If only search (title) parameter is provided
        url = `https://zgg.tharupathir.live/movies/title/${search}`;
      } else if (genre !== '') { // If only genre parameter is provided
        url = `https://zgg.tharupathir.live/movie/Video/genre/${genre}`;
      }
      const response = await fetch(url);
      const data = await response.json();

      const mappedMovies = data.map(movie => ({
        name: movie.title,
        desc: movie.plot,
        titleImage: movie.poster,
        image: movie.backdrop,
        category: movie.genre.split(',').map(genre => genre.trim() + ' '),
        language: 'English',
        year: movie.year,
        time: movie.runtime,
        video: movie.cdnPath,
        rate: parseFloat(movie.imdbRatings),
        reviews: 0,
        imdbid: movie.imdbid
      }));

      setMovies(mappedMovies);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [search, genre]);

  const handleLoadingMore = () => {
    setPage(page + maxPage);
  };

  return (
    <Layout>
      <div className="min-height-screen container mx-auto px-2 my-6">
        <Filters />
        <p className="text-lg font-medium my-6">
          Total <span className="font-bold text-subMain">{movies.length}</span>{" "}
          items found
        </p>
        <div className="grid sm:mt-10 mt-6 xl:grid-cols-4 2xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 gap-6">
          {movies.slice(0, page).map((movie, index) => (
            <Movie key={index} movie={movie} />
          ))}
        </div>
        <div className="w-full flex-colo md:my-20 my-10">
          <button
            onClick={handleLoadingMore}
            className="flex-rows gap-3 text-white py-3 px-8 rounded font-semibold border-2 border-subMain"
          >
            Loading More <CgSpinner className="animate-spin" />
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default MoviesPage;

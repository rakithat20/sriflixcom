import React, { useEffect, useState } from "react";
import Filters from "../Components/Filters";
import Layout from "../Layout/Layout";
import Movie from "../Components/Movie";
import { CgSpinner } from "react-icons/cg";

function MoviesPage() {
  const maxPage = 3;
  const [page, setPage] = useState(maxPage);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/movie/Video/movies")
      .then((response) => response.json())
      .then((data) => {
        // Map the data to match the format of Movies array
        const mappedMovies = data.map((movie) => ({
          name: movie.title,
          desc: movie.plot,
          titleImage: movie.poster,
          image: movie.backdrop, // Assuming poster as the image
          category: movie.genre.split(",").map((genre) => genre.trim() + " "), // Split genre string into an array with space
          language: "English", // Assuming language is always English for simplicity
          year: movie.year,
          time: movie.runtime,
          video: movie.cdnPath, // Assuming cdnPath as the video link
          rate: parseFloat(movie.imdbRatings), // Convert imdbRatings to float
          reviews: 0, // You can set reviews to 0 or some default value
          imdbid: movie.imdbId,
        }));
        setMovies(mappedMovies);
      })
      .catch((error) => console.error("Error fetching movies:", error));
  }, []);

  const handleLoadingMore = () => {
    setPage(page + maxPage);
  };

  return (
    <Layout>
      <div className="min-height-screen container mx-auto px-2 my-6">
        <Filters />
        <p className="text-lg font-medium my-6">
          Total{" "}
          <span className="font-bold text-subMain">{movies?.length}</span> items
          found
        </p>
        <div className="grid sm:mt-10 mt-6 xl:grid-cols-4 2xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 gap-6">
          {movies.slice(0, page)?.map((movie, index) => (
            <Movie key={index} movie={movie} />
          ))}
        </div>
        <div className="w-full flex-col md:my-20 my-10">
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

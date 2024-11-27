import React, { useEffect, useState } from "react";
import SideBar from "../SideBar";
import Table from "../../../Components/Table";


function MoviesList(){
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/movies')
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
                    video: movie.cdnPath, 
                    rate: parseFloat(movie.imdbRatings), 
                    reviews: 0, // You can set reviews to 0 or some default value
                    imdbid:movie.imdbid
                }));
                setMovies(mappedMovies);
            })
            .catch(error => console.error('Error fetching movies:', error));
    }, []);
    return(
        <SideBar>
            <div className="flex flex-col gap-6">
                <div className="flex-btn gap-2">
                <h2 className="text-xl font-bold">Movies List</h2>
                <button className="bg-main font-medium transition hover:bg-subMain border-subMain text-white py-3 px-6 rounded">
                    Delete All
                </button>
                </div>
                <Table data={movies} admin={true} />
            </div>
        </SideBar>
    )
}

export default MoviesList;
import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import Table from "../../Components/Table";
import { Movies } from "../../Data/MovieData";
import Movie from "../../Components/Movie";
function FavoriteMovie(){
    const user =  JSON.parse(localStorage.getItem('user'));
    let url;
    if(user===null){
        window.alert('Please login First')
        window.location.assign('/login')
    }
    else{
        
        let uid = user.id;
        url = `https://zgg.tharupathir.live/user/users/getliked/${uid}`;
    }
   
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch(url)
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
    return(
        <SideBar>
            <div className="flex flex-col gap-6">
                <div className="flex-btn gap-2">
                <h2 className="text-xl font-bold">Favorite Movies</h2>
                <button className="bg-main font-medium transition hover:bg-subMain border-subMain text-white py-3 px-6 rounded">
                    Delete All
                </button>
                </div>
                <Table data={movies} admin={false} />
            </div>
        </SideBar>
    )
}

export default FavoriteMovie;
import React, { useState, useEffect } from "react";
import SideBar from "../SideBar";
import { Input, Message, Select } from "../../../Components/UsedInputs";
import Uploder from "../../../Components/Uploder";
import { CategoriesData } from "../../../Data/CategoriesData";
import { ImUpload } from "react-icons/im";

function AddMovie(){
    const [title, setTitle] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [movieObj, setMovieObj] = useState(null);
    const [Backdrop, setBackdrop] = useState(null); // Initialize Backdrop state
    const imgUrl = "https://image.tmdb.org/t/p/original";
    const [selectedFile, setSelectedFile] = useState(null); 
    const [obj ,setObj] = useState(null);

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MmY2MTE4MmVkZWFjZjk1YWUwMzRlZDg3NjMxZjFlMCIsInN1YiI6IjY1ZGI1ZGQwY2FiZmU0MDE4NmQxN2ZiZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1GF_7q9Ycysy7POizcz3yYzD0cY-PQBFDgLClUvhBOc'
        }
    };

   

  

    const getSearchSuggestions = async (searchTerm) => {
        try {
            const response = await fetch(`https://www.omdbapi.com/?apikey=f92f28a9&s=${searchTerm}`);
            if (!response.ok) {
                throw new Error('Failed to fetch suggestions');
            }
            const data = await response.json();
            if (data.Search) {
                setSuggestions(data.Search.slice(0, 3)); // Limit suggestions to 3 and store entire object
            } else {
                setSuggestions([]);
            }
        } catch (error) {
            console.error('Error fetching search suggestions:', error);
        }
    };

    useEffect(() => {
        if (title && title.trim() !== "") {
            getSearchSuggestions(title);
        }
    }, [title]);

    const handleSuggestionClick = (suggestion) => {
        console.log(suggestion); // Log the entire suggestion object
        setTitle(suggestion.Title); // Update the title with suggestion title
        
        fetch(`https://www.omdbapi.com/?apikey=f92f28a9&i=${suggestion.imdbID}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch movie details');
                }
                return response.json();
            })
            .then(data => {
                console.log(data); // Log movie details from the first API call
                fetch(`https://api.themoviedb.org/3/find/${suggestion.imdbID}?external_source=imdb_id`, options)
                    .then(response => response.json())
                    .then(response => {
                        setMovieObj(response.movie_results[0]);
                        console.log(response.movie_results[0].backdrop_path); // Log movie details from the second API call
                        const postMovieObj ={
                            "Title": data.Title, // Use lowercase keys
                            "Year": data.Year,
                            "imdbID": data.imdbID,
                            "Poster": data.Poster,
                            "Released": data.Released,
                            "Runtime": data.Runtime,
                            "Genre": data.Genre,
                            "Actors": data.Actors,
                            "Plot": data.Plot,
                            "Country": data.Country,
                            "imdbRating": data.imdbRating,
                            "Backdrop": imgUrl + response.movie_results[0].backdrop_path
                        }
                        console.log(postMovieObj)
                        setObj(postMovieObj)
                        
                    })
                    .catch(error => console.error('Error fetching movie:', error));
            })
            .catch(error => console.error('Error fetching movie details:', error));
        setSuggestions([]);
    };
    const handlePublish = () => {
        if (!obj || !selectedFile) {
            console.error("Movie object or selected file is missing.");
            return;
        }
    
        console.log(obj);
        console.log(selectedFile.name);
    
        // Construct your form data to include postMovieObj and the selected file
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("data", JSON.stringify(obj)); // Use 'obj' instead of 'movieObj'
    
        // Post the form data to your backend endpoint
        fetch("http://localhost:3000/movies/upload", {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to publish movie.');
            }
            else{
                window.alert(title+'Added Successfully')
            }
            // Handle successful response
        })
        .catch(error => console.error('Error publishing movie:', error));
    };

    return (
        <SideBar>
            <div className="flex flex-col gap-6">
                <h2 className="text-xl font-bold">Create Movie</h2>
                <div className="w-full grid md:grid-cols-2 gap-6 relative"> {/* Add relative positioning */}
                    <Input
                        label="Movie Title"
                        placeholder="Start typing..."
                        type="text"
                        bg={true}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    {suggestions.length > 0 && (
                        <ul className="text-xl font-bold">
                            {suggestions.map((suggestion, index) => (
                                <li key={index} className="cursor-pointer py-2 px-4 bg-main hover:bg-gray-700 truncate text-dygray text-sm" onClick={() => handleSuggestionClick(suggestion)}> {/* Add truncate class */}
                                    {suggestion.Title}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                {/*Movie video*/}
                <div className="flex flex-col gap-2 w-full">
                    <label className="text-border font-semibold text-sm">
                        Movie Video
                    </label>
                    <Uploder setSelectedFile={setSelectedFile} />
                </div>
                <button className="bg-subMain w-full flex-rows gap-4 font-medium transitition hover:bg-dry border border-subMain text-white py-4 rounded" onClick={handlePublish}>
                    <ImUpload/>Publish Movie
                </button>
            </div> 
        </SideBar>
    );
}

export default AddMovie;

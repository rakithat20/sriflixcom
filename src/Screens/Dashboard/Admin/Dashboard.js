import React, { useEffect, useState } from "react";
import SideBar from "../SideBar";
import { FaRegListAlt, FaUser } from "react-icons/fa";
import { HiViewGridAdd } from "react-icons/hi";
import Table from "../../../Components/Table";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const [movies, setMovies] = useState([]);
    const [userCount, setUserCount] = useState(0);
    const [movieCount, setMovieCount] = useState(0);
    console.log(userCount)
    useEffect(() => {
        fetch('https://lobster-app-bxg93.ondigitalocean.app/users/count')
            .then(response => response.json())
            .then(data => setUserCount(data));
    }, []);

    useEffect(() => {
        fetch('https://zgg.tharupathir.live/movies/count')
            .then(response => response.json())
            .then(data => setMovieCount(data));
    }, []);

    useEffect(() => {
        fetch('https://zgg.tharupathir.live/movies')
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
                    imdbid: movie.imdbid
                }));
                setMovies(mappedMovies);
            })
            .catch(error => console.error('Error fetching movies:', error));
    }, []);

    const navigate = useNavigate();

    // useEffect(() => {
    //     const logged = getLoggedFromLocalStorage();
    //     if (!logged) {
    //         navigate('/login'); // Redirect to '/login' route
    //         alert("please Log in before accessing the dashboard");
    //     }
    // }, [navigate]);

    // const getLoggedFromLocalStorage = () => {
    //     const isLogged = localStorage.getItem('isLogged');
    //     return isLogged ? JSON.parse(isLogged) : true;
    // };

    const DashboardData = [
        {
            bg: "bg-orange-600",
            icon: HiViewGridAdd,
            title: "Total Movies",
            total: movieCount.toString()
        },
        {
            bg: "bg-green-600",
            icon: FaUser,
            title: "Total Users",
            total: userCount.result
        },
    ];

    return (
        <SideBar>
            <h2 className="text-xl font-bold">Dashboard</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                {DashboardData.map((data, index) => (
                    <div
                        key={index}
                        className="p-4 rounded bg-main border-border grid grid-cols-4 gap-2"
                    >
                        <div
                            className={`col-span-1 rounded-full h-12 w-12 flex-colo ${data.bg}`}
                        >
                            <data.icon />
                        </div>
                        <div className="col-span-3">
                            <h2>{data.title}</h2>
                            <p className="mt-2 font-bold">{data.total}</p>
                        </div>
                    </div>
                ))}
            </div>
            <h3 className="text-md font-medium my-6 text-border">Recent Movies</h3>
            <Table data={movies.slice(0, 5)} admin={true} />
        </SideBar>
    );
}

export default Dashboard;

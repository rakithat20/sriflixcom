import React from 'react'
import { Route, Routes } from 'react-router-dom';
import HomeScreen from './Screens/HomeScreen';
import AboutUs from './Screens/AboutUs';
import NotFound from './Screens/NotFound';
import ContactUs from './Screens/ContactUs';
import MoviesPage from './Screens/Movies';
import SingleMovie from './Screens/SingleMovie';
import WatchPage from './Screens/WatchPage';
import Login from './Screens/Login';
import Register from './Screens/Register';
import Profile from './Screens/Dashboard/Profile';
import Aos from 'aos';
import Password from './Screens/Dashboard/Password';
import FavoriteMovie from './Screens/Dashboard/FavoriteMovies';
import MoviesList from './Screens/Dashboard/Admin/MovieList';
import Dashboard from './Screens/Dashboard/Admin/Dashboard';
import Users2 from './Screens/Dashboard/Admin/Users';
import AddMovie from './Screens/Dashboard/Admin/AddMovies';


function App() {
  Aos.init();
  return (

    <Routes>
  <Route path="/" element={<HomeScreen />} />
  <Route path="/about-us" element={<AboutUs />} />
  <Route path="/contact-us" element={<ContactUs />} />
  <Route path="/movies" element={<MoviesPage />} />
  <Route path="/movies/:search" element={<MoviesPage />} />
  <Route path="/movies/:search/:genre" element={<MoviesPage />} />
  <Route path="/movie/:id" element={<SingleMovie />} />
  <Route path="/watch/:id" element={<WatchPage />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/profile" element={<Profile />} />
  <Route path="/password" element={<Password />} />
  <Route path="/favorites" element={<FavoriteMovie />} />
  <Route path="/movielist" element={<MoviesList />} />
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/users" element={<Users2 />} />
  <Route path="/addmovie" element={<AddMovie />} />


  
  <Route path="*" element={<NotFound />} />
</Routes>
  );
}

export default App
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaSearch, FaHeart } from "react-icons/fa";
import { CgUser } from "react-icons/cg";

function Navbar() {
  const hover = "hover:text-subMain transitions text-white";
  const Hover = ({isActive}) => (isActive ? 'text-subMain' : hover); 
  const [search, setSearch] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim() !== '') {
      window.location.href = `/movies/${search}`;
    } else {
      window.location.href = '/movies'; // Redirect to movies page if search query is empty
    }
  };

  return (
    <>
      <div className="bg-main shadow-md sticky top-0 z-20">
        <div className="container mx-auto py-6 px-2 lg:grid gap-10 grid-cols-7 justify-between items-center">
          <div className="col-span-1 lg:block hidden">
            <NavLink to="/">
              <img src="/images/logo.png" alt="logo" className="w-24 mx-auto" />
            </NavLink>
          </div>
          <div className="col-span-3">
            <form onSubmit={handleSearch} className="w-full text-sm bg-dryGray rounded flex-btn gap-4">
              <button type="submit" className="bg-subMain w-12 flex-colo h-12 rounded text-white">
                <FaSearch />
              </button>
              <input 
                type="search"
                placeholder="Search Movie Name From Here"
                className="font-medium placeholder:text-border text-sm w-11/12 h-12 bg-transparent border-none px-2 text-black"
                value={search} 
                onChange={(e) => setSearch(e.target.value)}
              />
            </form>
          </div>
          <div className="col-span-3 font-medium text-sm hidden xl:gap-14 2xl:gap-20 justify-between lg:flex xl:justify-end items-center">
            <NavLink to="/movies" className={Hover}>
              Movies
            </NavLink>
            <NavLink to="/about-us" className={Hover}>
              About Us
            </NavLink>
            <NavLink to="/contact-us" className={Hover}>
              Contact Us
            </NavLink>
            <NavLink to="/login" className={Hover}>
              <CgUser className="w-8 h-8"/>
            </NavLink>
            <NavLink to="/favorites" className={'${Hover} relative'}>
              <FaHeart className="w-6 h-6"/>
              <div className="w-5 h-5 flex-colo rounded-full text-xs bg-subMain text-white absolute -top-5 -right-1">
                3
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;

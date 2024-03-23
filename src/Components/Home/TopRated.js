import React, { useState } from 'react';
import Titles from './../Titles';
import { BsBookmarkStarFill, BsCaretLeft, BsCaretLeftFill, BsCaretRight, BsCaretRightFill } from 'react-icons/bs';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { Movies } from '../../Data/MovieData';
import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa'; 
import Rating from '../Stars';



function TopRated() {
  const [nextEl, setNextEl] = useState(null);
  const [prevEl, setPrevEl] = useState(null);
  const classNames = "hover:bg-dry transitions text-sm rounded w-8 h-8 flex-colo bg-subMain text-white";

  return (
    <div className="my-16 p-5">
      <Titles title="Top Rated" Icon={BsBookmarkStarFill} />
      <div className="mt-10 p-5">
        <Swiper navigation={{ nextEl, prevEl }} slidesPerView={4} spaceBetween={40}
          autoplay={true} speed={1000} loop={true} modules={[Navigation, Autoplay]}>
          {
            Movies.map((movie, index) => (
              <SwiperSlide key={index}>
                <div className="p-4 h-rate hovered border border-border bg-dry rounded-lg overflow-hidden">
                  <img src={`/images/movies/${movie.titleImage}`} alt={movie.name} className="w-full h-full object-cover rounded-lg" />
                  <div className="px-4 hoveres gap-6 text-center absolute bg-black bg-opacity-70 top-0 left-0 right-0 bottom-0">
                    <button className="w-12 h-12 flex-colo transition hover:bg-subMain rounded-full bg-white bg-opacity-30 text-white">
                      <FaHeart />
                    </button>
                    <Link className="font-semibold text-xl trancuted line-clamp-2" to={`/movie/${movie.name}`}>
                      {movie.name}
                    </Link>
                    <div className="flex-rows gap-2 text-star">
                      <Rating value={movie.rate} />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))
          }
        </Swiper>
        <div className="w-full px-1 flex-rows gap-6 pt-12">
          <button className={classNames} ref={(node) => setPrevEl(node)}>
            <BsCaretLeftFill />
          </button>
          <button className={classNames} ref={(node) => setNextEl(node)}>
            <BsCaretRightFill/>
          </button>
        </div>

      </div>
    </div>
  );
}

export default TopRated;



/*import React from 'react'

function TopRated() {
  return (
    <div>TopRated</div>
  )
}

export default TopRated*/
import React from 'react'
import Titles from '../Titles'
import { FaUserFriends } from 'react-icons/fa'
import {Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules';
import { UsersData } from '../../Data/MovieData'



function MovieCasts() {
  return (
    <div className="my-12">
      <Titles title="Casts" Icon={FaUserFriends} />
      <div className="mt-10">
        <Swiper autoplay={{
          delay: 1000,
          disableOnInteraction: false
        }} loop={true} speed={1000} modules={[Autoplay]} spaceBetween={30}
          breakpoints={{
            0: {
              slidesPerView: 1,
              
            },
            400: {
              slidesPerView: 2,
              
            },
            768: {
              slidesPerView: 3,
              
            },
            1024: {
              slidesPerView: 4,
              
            },
            1280: {
              slidesPerView: 5,
              spacebetween: 30,
            },
          }}
        >
          {
            UsersData.map((user, i) => (
              <SwiperSlide key={i}>
                <div className="w-full p-3 italic text-xs text-text rounded flex-colo bg-dry border border-gray-800">
                  <img src={`/images/movies/${user.image}`} alt={user.name} className="w-full h-64 object-cover rounded mb-4" />
                  <p>{user?.name}</p>
                </div>
              </SwiperSlide>
            ))
          }
        </Swiper>
      </div>
    </div>
  )
}

export default MovieCasts
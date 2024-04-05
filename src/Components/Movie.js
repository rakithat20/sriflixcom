import React, { useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Movie({ movie }) {

    const [likedMovie, setLiked]=useState('');
    const user = JSON.parse(localStorage.getItem('user'));
  
    
    const handleLiked=(imdbid)=>{
       
        if(user==null){
            window.alert('Please Login For save Your favourite movies <3')
            window.location.assign('/login');

        }
        else{
            const Formdata = new FormData();
            Formdata.append('imdbid',imdbid)
            Formdata.append('userid',user.id)
            postLiked(Formdata);
            for (let pair of Formdata.entries()) {
                console.log(pair[0] + ': ' + pair[1]);
              }
        }
       
    }
    async function postLiked(formData) {
        try {
          const response = await fetch('http://localhost:8080/user/users/addtoliked', {
            method: 'POST',
            body: formData
          });
      
        } catch (error) {
          console.error('Error posting liked movie:', error);
        }
      }

    return (
        <div className="border border-border p-1 hover:scale-95 transition relative rounded overflow-hidden">
            <Link to={`/movie/${movie.name}`} className="w-full">
                <img src={movie?.image} alt={movie?.name} className="w-full h-64 object-cover" />
            </Link>
            <div className="absolute flex-btn gap-2 bottom-0 right-0 left-0 bg-main bg-opacity-60 text-white px-4 py-3">
                <h3 className="font-semibold truncate">{movie?.name}</h3>
                    <button className="h-9 w-9 text-sm flex-colo transitions hover:bg-transparent border-2 border-subMain rounded-md bg-subMain text-white" onClick={() => handleLiked(movie.imdbid)}>
                        <FaHeart />
                    </button>
            </div>
        </div>
    );
}

export default Movie;

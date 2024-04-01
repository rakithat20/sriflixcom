import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
  return(

    <div className='flex-color gap-8 w-full min-h-screen text-white bg-main lg:py-20 py-10 px-6'>
      <img
          className='w-full h-96 object-contain'
          src='/images/404.svg'
          alt='notfound'
      />
      <center>
      <h1 className='lg:text-4xl font-bold'>Page Not Found</h1><br></br>
      
      <p className='font-medium text-border italic leading-6'>
        The page you looking for does not exist.You may have mistyped the URL
      </p>
      <br></br><br></br><br></br>
      <Link
        to="/"
        className='bg-subMain text-white font-medium py-3 px-4 rounded-md'
        >
          Go Back Home
        </Link>
        </center>
    </div>
        
  )

    
}

export default NotFound
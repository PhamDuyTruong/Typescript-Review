import React from 'react'
import { BiTime } from 'react-icons/bi'

const CardMovie = ({movie}) => {
    const {src, title, main, runtime} = movie
  return (
    <div className='card'>
        <img src={src} className="w-full"/>
        <div className='p-4 text-white'>
            <h4 className='text-2xl'>{title}</h4>
            <p>{main}</p>

        </div>  
        <div className='badge'>
            <BiTime />
            <p>{runtime}</p>
        </div>
    </div>
  )
}

export default CardMovie
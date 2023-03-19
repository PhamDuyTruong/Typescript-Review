import React from 'react'
import CardMovie from './CardMovie'
import { moviesData } from './movieData'

const Index = () => {
  return (
    <>
    <h3 className='border-b border-primary mt-12 mb-6 pb-4 text-3xl'>Trending</h3>
    <div className='grid grid-cols-2 md:grid-cols-4 gap-10 mb-2'>
        {moviesData.map((item, index) => (
            <CardMovie key={index} movie={item}/>
        ))}
    </div>
    <div className='flex justify-center'>
        <button className='btn hover:scale-125 transition ease-out duration-50'>Load more</button>
    </div>
    </>
  )
}

export default Index
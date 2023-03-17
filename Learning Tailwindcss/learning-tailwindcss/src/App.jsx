import { useState } from 'react'
import Nav from './components/Nav/Nav'
import AuthButtons from './components/AuthButtons'
import Header from './components/Header'
import Trending from './components/Trending'
import './App.css'

function App() {
  return (
    <div className="grid grid-cols-5">
      <Nav />
      <main className='px-12 py-6 col-span-4 bg-cyan-50'>
         <AuthButtons />
         <Header />
         <Trending />
      </main>
    </div>
  )
}

export default App

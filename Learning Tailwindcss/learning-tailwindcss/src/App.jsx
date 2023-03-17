import { useState } from 'react'
import Nav from './components/Nav/Nav'
import './App.css'

function App() {
  return (
    <div className="grid grid-cols-5">
      <Nav />
      <main className='col-span-4 bg-red-400'>
         Main Content
      </main>
    </div>
  )
}

export default App

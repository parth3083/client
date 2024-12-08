import React from 'react'
import { ModeToggle } from './ModeToggle'

function Navbar() {
  return (
      <nav className='w-full  h-12 px-2 flex items-center justify-between '>
          <h1 className='text-2xl font-semibold'>SearchX.</h1>
          <ModeToggle/>
    </nav>
  )
}

export default Navbar
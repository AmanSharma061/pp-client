import React from 'react'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

const Layout = () => {
  return (
    <>
      <div className='w-full  pb-8 box-border '>
        <Navbar />
       <div className='px-4'>
        <Toaster/>
       <Outlet />
       </div>
      </div>
    </>
  )
}

export default Layout

import React from 'react'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

const Layout = () => {
  return (
    <>
      <div className='w-full h-[100vh] pb-8 box-border bg-gray-100'>
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

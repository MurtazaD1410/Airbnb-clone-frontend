import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'

const Layout = () => {
  return (
    <div className=' flex flex-col min-h-screen '>
      <Header />
      <div className="max-w-[1240px] bg-gray-100 w-full min-h-[calc(100vh-88px)] mx-auto xxs:px-4 sm:px-7 p-2 ">
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
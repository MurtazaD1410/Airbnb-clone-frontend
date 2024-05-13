import { IconBrandAirbnb, IconMenu2, IconSearch } from '@tabler/icons-react'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import axios from 'axios'


const Header = () => {
  const navigate = useNavigate()
  const [googleLogout, setGoogleLogout] = useState(true)
  const { user, setUser } = useContext(UserContext)

  useEffect(() => {
    if (user) {
      if (user.googleId === undefined) {
        setGoogleLogout(false)
      }
    }
  }, [user])

  const logout = () => {
    axios.get('/user/logout')
    setUser(null)
    navigate('/')

  }

  const googleLogoutButton = () => {
    window.open('http://localhost:4000/auth/logout', '_self')
    setUser(null)
    navigate('/')
  }

  const [menu, setMenu] = useState(false)
  return (
    <div className="border-b">
      <header className='py-4 xxs:px-4 sm:px-7 p-2 max-w-[1240px] w-full mx-auto flex justify-between  items-center'>
        <Link to="/" className='flex items-center'>
          <IconBrandAirbnb size={45} strokeWidth={1.25} color="#3d91ff " />
          <p className='hidden md:block text-xl font-bold text-primary'>airbnb</p>
        </Link>
        <div className="sm:flex items-center bg-white border-gray-300 border w-fit rounded-full p-2 shadow-md shadow-gray-300  hidden ">
          <div className="px-4 border-r">Anywhere</div>
          <div className="px-4 border-r">Any week</div>
          <div className="px-4 ">Add guest</div>
          <button className="">
            <IconSearch size={35} strokeWidth={2.5} color="white" className='bg-primary rounded-full p-[6px]' />
          </button>
        </div>
        <div onClick={() => setMenu(!menu)} className=" flex items-center border border-gray-300 bg-white rounded-full p-[6px]  gap-1 h-fit relative">
          <div className="h-fit">
            <IconMenu2 size={30} strokeWidth={1.5} color="#484848" className='px-1 ' />
          </div>
          <div className="h-fit bg-secondary rounded-full border-[3px] border-secondary overflow-hidden ">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white relative top-1 ">
              <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
            </svg>


          </div>
          <div className={menu ? 'flex flex-col absolute right-0 top-14 w-44 bg-white shadow-lg rounded-xl py-2 border z-10' : 'hidden'}>
            {!user ?
              <ul className='flex flex-col '>
                <Link className='p-3' to={'/register'}>Sign Up</Link>

                <Link className='p-3' to={'/login'}>Log In</Link>



              </ul>
              : <ul className='flex flex-col '>
                <Link className='p-3' to={'/account'}>Account</Link>

                <p className='p-3 cursor-pointer' onClick={googleLogout ? googleLogoutButton : logout}>Logout</p>



              </ul>
            }

          </div>

        </div>
      </header>
    </div>
  )
}

export default Header
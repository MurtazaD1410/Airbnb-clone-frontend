import { IconBuildingCommunity, IconList, IconUser } from '@tabler/icons-react'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const UserNavbar = () => {
  const { pathname } = useLocation()
  let subpage = pathname.split('/')?.[2]
  if (subpage === undefined) {
    subpage = 'profile'
  }
  const linkClasses = (type = null) => {
    let classes = 'py-2 px-4 inline-flex items-center'
    if (type === subpage) {
      classes += ' bg-primary text-white rounded-lg font-medium'
    }
    return classes
  }
  return (
    <nav className='w-full flex justify-center my-8 gap-4'>
        <Link className={linkClasses('profile')} to='/account'>
          <IconUser size={20} className='mr-2' /> My Profile
        </Link>
        <Link className={linkClasses('bookings')} to='/account/bookings'>
          <IconList size={20} className='mr-2' /> My Bookings
        </Link>
        <Link className={linkClasses('places')} to='/account/places'>
          <IconBuildingCommunity size={20} className='mr-2' />
          My Accomodations
        </Link>
      </nav>
    
  )
}

export default UserNavbar
import React, { useContext, useEffect, useState } from 'react'
import { IconTrash } from '@tabler/icons-react';
import UserNavbar from '../components/UserNavbar'
import { UserContext } from '../context/UserContext'
import axios from 'axios'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'

const BookingsPage = () => {
  const [bookings, setBookings] = useState([])
  const { user} = useContext(UserContext)



  const fetchBookings = async () => {
    const { data } = await axios.get(`/booking/${user._id}`)
    setBookings(data)
  }

  useEffect(() => {

    fetchBookings()
  }, [user]);

  if (bookings.length === 0) {
    return (
      <div>
        <UserNavbar />
        <p className="text-lg text-secondary">No Bookings to Display</p>
      </div>
    )
  }

  

  const deleteBooking = async (e, id) => {
    axios.delete(`/booking/${id}`).then(() => {
      fetchBookings()
    })
  }

  return (
    <div>
      <UserNavbar />
      <div className='grid lg:grid-cols-2 gap-5 my-10'>
        {bookings.length > 0 && bookings.map(booking => (
          <div key={booking._id} className="bg-white shadow-md p-4 rounded-lg flex gap-5">
            <Link to={'/account/places/' + booking.place} className="flex gap-5 w-full">
              <div className="w-32 h-32   shrink-0 ">
                {booking.place.photos.length && (
                  <img src={booking.place.photos[0]} alt={booking.place.title} className=" object-cover text-gray-600 rounded-lg h-full w-full" />
                )}
              </div>
              <div className="w-full flex flex-col text-left space-y-2">
                <div className="">
                  <h1 className='text-base font-medium'>{booking.place.title}</h1>
                  <p className='text-sm text-gray-600'>{booking.place.address}</p>
                </div>
                <div className="">
                  <p className="text-gray-700">Check in date: {dayjs(booking.checkIn).format('DD MMM, YYYY')}</p>
                  <p className="text-gray-700">Check out date: {dayjs(booking.checkOut).format('DD MMM, YYYY')}</p>
                </div>
              </div>
            </Link>
            <button className="border-2 border-red-500 p-1 h-fit  rounded-lg text-red-500 font-medium">
              <IconTrash size={20} className='' onClick={e => deleteBooking(e, booking._id)} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BookingsPage
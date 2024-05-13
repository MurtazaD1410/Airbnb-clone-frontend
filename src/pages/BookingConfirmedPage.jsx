import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'

const BookingConfirmedPage = () => {

  // await axios.post('/booking/new', {

  //   place: place._id,
  //   owner: user._id,
  //   checkIn: startDate,
  //   checkOut: endDate,
  //   guests,
  //   bookingName: name,
  //   bookingEmail: email,
  //   price: total,
  // })

  return (
    <div className='h-[calc(100vh-102px)]'>
      <div className="">
        <div className="flex flex-col items-center justify-center h-full pt-28">
          <lord-icon
            src="https://cdn.lordicon.com/lupuorrc.json"
            trigger="loop"
            colors="primary:#484848,secondary:#3d91ff"
            style={{
              width: '150px',
              height: '150px',
            }} />

          <h1 className="text-4xl text-center py-4 font-bold">Booking Confirmed</h1>
          <p className="text-lg text-center text-gray-500">Your booking has been confirmed. Please check your email for further instructions.</p>
          <p className='text-secondary text-center '>Thank you for choosing <Link to={'/'} className="text-primary ">Airbnb</Link></p>
        </div>

      </div>
    </div>
  )
}

export default BookingConfirmedPage
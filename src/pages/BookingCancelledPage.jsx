import React from 'react'
import { IconThumbDown } from '@tabler/icons-react';

const BookingCancelledPage = () => {



  return (
    <div className='h-[calc(100vh-102px)]'>
      <div className="">
        <div className="flex flex-col items-center justify-center h-full pt-28">
          <lord-icon
            src="https://cdn.lordicon.com/hrqwmuhr.json"
            trigger="loop"
            colors="primary:#484848,secondary:#3d91ff"
            style={{
              width: '150px',
              height: '150px',
            }} />
          <h1 className="text-4xl text-center py-4 font-bold">Booking Cancelled</h1>
          <p className="text-lg text-center text-gray-500">Opps!!.. Something went wrong </p>
          <p className='text-secondary text-center '>Please try again in some time.</p>
        </div>

      </div>
    </div>
  )
}

export default BookingCancelledPage
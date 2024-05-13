import React from 'react'
import { Link } from 'react-router-dom'

const HomePropertyCard = ({ place }) => {
  const formatedPrice = new Intl.NumberFormat('en-IN').format(place.price)

  return (
    <Link to={'/account/places/' + place._id} className=' rounded-lg'>

      <div to={'/user'} className='relative'>
        <img src={place.photos[0]} alt="" className='w-full  aspect-square object-cover rounded-lg' />
        <object data="" className='w-fit h-fit' type="">
          <Link to={'/user'} state={{ id: place.owner }} >
            <div className="bg-gray-200 p-2 w-fit absolute bottom-2 left-2 rounded-md">
              <img src={place.owner.avatarUrl || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToplStyx8pu0DsUkR-zSI6hAAN-vzcrZF0HA&usqp=CAU'} alt="" className=' w-12 h-12 rounded-full object-cover' />
            </div>
          </Link>
        </object>
      </div>
      <div className='mt-3 flex flex-col space-y-1'>
        <h2 className='text-base font-semibold '>{place.address}</h2>
        <p className="text-gray-600 truncate">{place.title}</p>
        <p className="text-gray-600 text-[13px]">Check In: {place.checkIn} - Check Out: {place.checkOut}</p>
        <p className="text-base font-medium">₹{formatedPrice} <span className="font-normal">night</span></p>
      </div>

    </Link>
  )
}

export default HomePropertyCard
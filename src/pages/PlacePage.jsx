import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { IconPhoto, IconX, IconMapPinFilled, IconCheck } from '@tabler/icons-react';
import BookingWidget from '../components/BookingWidger';
import PerksPlace from '../components/PerksPlace';


const PlacePage = () => {
  const { id } = useParams()
  const [place, setPlace] = useState(null)
  const [showAllPhotos, setShowAllPhotos] = useState(false)

  useEffect(() => {
    const fetchPlace = async () => {
      const data = await axios.get(`/place/${id}`)
      setPlace(data.data)

    }
    fetchPlace()
  }, [id]);





  if (!place) return (<div>Loading...</div>)


  if (showAllPhotos) return (
    <div className=" my-10 ">
      <div className="flex space-x-32 justify-between items-center">
        <h2 className="font-semibold text-lg">All Photos for {place.title}</h2>
        <button onClick={() => { setShowAllPhotos(false) }} className="bg-gray-100 px-2 py-1 rounded-lg border border-black text-medium text-xs flex items-center ">
          <IconX strokeWidth={1} size={17} className='mr-2' />  Close</button>
      </div>
      <div className="">
        <div className='my-5 grid md:grid-cols-2 gap-3' >
          {place?.photos?.length > 0 && place?.photos?.map((photo) => (
            <img key={photo} className='w-full rounded-lg' src={photo} alt="" />
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className='my-7 '>
      <div className=" flex flex-col space-y-8">
        <div className="font-semibold text-2xl">
          <h2 className='mb-2'>{place.title}</h2>
          <div className="flex ">
            <IconMapPinFilled strokeWidth={1} size={17} className='mr-2 text-gray-600' />  <p className="text-sm font-medium text-gray-600 underline">{place.address}</p>

          </div>
        </div>

        {/* //~ Mobile View */}
        <div className=" sm:hidden grid-cols-1 grid-rows-2 gap-2 rounded-lg overflow-hidden relative">
          <div className="col-span-2 row-span-2">
            <img onClick={() => { setShowAllPhotos(true) }} src={place.photos[0]} className='w-full aspect-square object-cover cursor-pointer' alt="" />
          </div>
          <button onClick={() => { setShowAllPhotos(true) }} className="absolute bg-gray-100 px-2 py-1 rounded-lg bottom-2 right-2 border border-black text-medium text-xs flex items-center ">
            <IconPhoto strokeWidth={1} size={17} className='mr-2' />  See All Photos</button>
        </div>

        {/* //~ Laptop View */}
        <div className=" md:grid grid-cols-4 hidden  grid-rows-2 gap-2 rounded-lg overflow-hidden relative">
          <div className="col-span-2 row-span-2">
            <img onClick={() => { setShowAllPhotos(true) }} src={place.photos[0]} className='w-full aspect-square object-cover cursor-pointer' alt="" />
          </div>
          {place.photos.slice(1, 5).map((photo, index) => (
            <div className="col-span-1 row-span-1" key={index}>
              <img onClick={() => { setShowAllPhotos(true) }} src={photo} className='w-full aspect-square object-cover cursor-pointer' alt="" />
            </div>
          ))}
          <button onClick={() => { setShowAllPhotos(true) }} className="absolute bg-gray-100 px-2 py-1 rounded-lg bottom-2 right-2 border border-black text-medium text-xs flex items-center ">
            <IconPhoto strokeWidth={1} size={17} className='mr-2' />  See All Photos</button>
        </div>
        <div className=" hidden sm:grid md:hidden grid-cols-3 grid-rows-2 gap-2 rounded-lg overflow-hidden relative">
          <div className="col-span-2 row-span-2">
            <img onClick={() => { setShowAllPhotos(true) }} src={place.photos[0]} className='w-full aspect-square object-cover cursor-pointer' alt="" />
          </div>
          {place.photos.slice(1, 3).map((photo, index) => (
            <div className="col-span-1 row-span-1" key={index}>
              <img src={photo} className='w-full aspect-square object-cover' alt="" />
            </div>
          ))}
          <button onClick={() => { setShowAllPhotos(true) }} className="absolute bg-gray-100 px-2 py-1 rounded-lg bottom-2 right-2 border border-black text-medium text-xs flex items-center ">
            <IconPhoto strokeWidth={1} size={17} className='mr-2' />  See All Photos</button>
        </div>

        {/* //~ Tablet View */}
        <div className="flex flex-col md:flex-row gap-5">
          <div className="lg:col-span-3 h-fit flex flex-col space-y-10 ">
            <div className="flex space-x-2  items-center ">
              <p className="text-base">Property Hosted by </p><Link to={'/user'} className='flex items-center space-x-2' state={{ id: place.owner._id }} >
                <span className="font-semibold text-primary">{place.owner.name} </span>
                <img src={place.owner.avatarUrl || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToplStyx8pu0DsUkR-zSI6hAAN-vzcrZF0HA&usqp=CAU"} alt="" className='w-14 h-14 rounded-lg object-cover' />
              </Link>
            </div>
            <div className='w-full border-b border-gray-300'></div>
            <div className="flex flex-col justify-center space-y-4">
              <p className="text-3xl  text-secondary font-bold"><span className="text-primary">air</span>cover</p>
              <p className="">Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.</p>
            </div>
            <div className='w-full border-b border-gray-300'></div>
            <div className="flex flex-col justify-center space-y-4">
              <p className="text-2xl  text-secondary font-bold">Description</p>
              <p className="">{place.description}</p>
            </div>
            {/* display perks with icons */}
            <div className='w-full border-b border-gray-300'></div>
            <div className="flex flex-col justify-center space-y-1">
              <p className="text-secondary font-bold text-xl mb-3">House Rules</p>
              <p className="">Check-in after {place.checkIn}</p>
              <p className="">Check-out before {place.checkOut}</p>
              <p className="">{place.maxGuests} Guest maximum</p>
            </div>
            <div className='w-full border-b border-gray-300'></div>

            <PerksPlace place={place} />

          </div>
          <BookingWidget place={place} />

        </div>
        <div className="flex flex-col space-y-10">
          <div className='w-full border-b border-gray-300'></div>
          <div className="flex flex-col justify-center space-y-4">
            <p className="text-2xl  text-secondary font-bold">Extra information</p>
            <p className="">{place.extraInfo}</p>
          </div>
          <div className='w-full border-b border-gray-300'></div>
          <div className="flex flex-col justify-center space-y-4">
            <p className="text-2xl  text-secondary font-bold">From <span className="text-primary">Airbnb</span></p>
            <p className="">Airbnb is an online marketplace that connects travelers with hosts who rent out their properties, offering unique and authentic accommodations in over 220 countries and regions. With millions of listings available, Airbnb provides a cost-effective alternative to traditional hotels, allowing travelers to experience a new city or culture in a more immersive way. For hosts, Airbnb offers a way to earn extra income by renting out their properties on their own terms. Overall, Airbnb has revolutionized the way people travel and has become a global phenomenon in the sharing economy.</p>
          </div>
          <div className='w-full border-b border-gray-300'></div>
          <div className="flex flex-col justify-center space-y-4">
            <p className="text-2xl  text-secondary font-bold">Cancellation policy</p>
            <p className="">Before you book, make sure you're comfortable with this Host's cancellation policy. Keep in mind that Airbnb's Extenuating Circumstances policy doesn't cover cancellations due to illness or travel disruptions caused by COVID-19.</p>
          </div>
        </div>

      </div>
    </div>

  )
}

export default PlacePage
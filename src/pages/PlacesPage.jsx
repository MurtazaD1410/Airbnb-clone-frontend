import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { IconEdit, IconHomePlus, IconTrash } from '@tabler/icons-react';
import UserNavbar from '../components/UserNavbar';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

const PlacesPage = () => {
  const [places, setPlaces] = useState([])
  const { user } = useContext(UserContext)



  if (!user) {
    return (
      <div className="text-center mt-10">
        <h1 className="text-2xl font-medium">Loading..</h1>

      </div>
    )
  }

  const fetchPlaces = async () => {
    const { data } = await axios.get(`/place/user/${user._id}`)
    setPlaces(data)
  }

  useEffect(() => {

    fetchPlaces()
  }, [user]);

  const deletePlace = async (e, id) => {
    axios.delete(`/place/${id}`).then(() => {
      fetchPlaces()
    })
  }

  if (places.length === 0) {
    return (
      <div>
        <UserNavbar />
        <div className="text-center">
          <Link to='/account/places/new' className="bg-primary text-white rounded-lg font-medium py-2 px-4 inline-flex  items-center">
            <IconHomePlus size={20} className='mr-3' />Add New Accomodation</Link>
        </div>
        <p className="text-lg text-secondary">No Properties to Display</p>

      </div>
    )
  }



  return (
    <div>
      <UserNavbar />
      <div className="text-center ">
        <Link to='/account/places/new' className="bg-primary text-white rounded-lg font-medium py-2 px-4 inline-flex  items-center">
          <IconHomePlus size={20} className='mr-3' />Add New Accomodation</Link>
        <div className="grid lg:grid-cols-2 gap-5 my-10">
          {places.length > 0 && places.map(place => (
            // <UserPropertyCard place={place} key={place._id} />
            <div key={place._id} className="bg-white shadow-md p-4 rounded-lg flex gap-5">
              <Link to={'/account/places/' + place._id} className="flex gap-5 w-full">
                <div className="w-32 h-32   shrink-0 ">
                  {place.photos.length && (
                    <img src={place.photos[0]} alt={place.title} className=" object-cover text-gray-600 rounded-lg h-full w-full" />
                  )}
                </div>
                <div className="w-full text-left">
                  <h1 className='text-base font-medium'>{place.title}</h1>
                  <p className='text-sm text-gray-600'>{place.address}</p>
                </div>

              </Link>
              <div className=" flex flex-col text-right space-y-3">
                <Link to={`/account/places/edit/${place._id}`} className="border-2 border-blue-500 p-1  rounded-lg text-blue-500 font-medium">
                  <IconEdit size={20} className='' />
                </Link>
                <button className="border-2 border-red-500 p-1  rounded-lg text-red-500 font-medium">
                  <IconTrash size={20} className='' onClick={e => deletePlace(e, place._id)} />
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>


    </div>

  )
}

export default PlacesPage
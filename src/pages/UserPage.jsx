import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const UserPage = () => {
  const location = useLocation()
  const { id } = location.state
  const [places, setPlaces] = useState([])
  const [name, setName] = useState('')
  // console.log(id._id)



  const fetchPlaces = async () => {
    const { data } = await axios.get(`/place/user/${id}`)
    setPlaces(data)
  }

  useEffect(() => {

    fetchPlaces()
  }, []);


  useEffect(() => {
    if (places[0] === undefined) {
      setName('Loading...')
    } else {
      setName(places[0].owner.name)
    }
  }, [places])


  return (
    <>
      <p className="mt-8 text-2xl font-medium">Properties listed by the same host: <span className="text-primary font-semibold">{name}</span></p>
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


          </div>
        ))}
      </div>
    </>
  )
}

export default UserPage
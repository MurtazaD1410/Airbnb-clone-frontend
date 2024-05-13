import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext'
import axios from 'axios'
import HomePropertyCard from '../components/HomePropertyCard'
import { useLocation } from 'react-router-dom'




const IndexPage = () => {
  const {  user, login } = useContext(UserContext)
  const [places, setPlaces] = useState([])
  // const location = useLocation()
  

  useEffect(() => {
    const fetchAllPlaces = async () => {
      const { data } = await axios.get('/place')
      setPlaces(data)
    }
    fetchAllPlaces()
  }, []);

  useEffect(() => {
    if (!user) {
      login()
    }
  }, [])

  if (places.length === 0) return (
    <div>No Properties to Display</div>
  )

  return (
    <div className="flex flex-col xxs:grid xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 3xl:grid-cols-5 gap-8 my-10 ">
      {places.length > 0 && places.map(place => (
        <HomePropertyCard key={place._id} place={place} />
      ))}
    </div>
  )
}

export default IndexPage
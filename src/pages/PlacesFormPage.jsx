import { IconCloudUpload, IconTrash } from '@tabler/icons-react';
import React, { useContext, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import Perks from '../components/Perks';
import UserNavbar from '../components/UserNavbar';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import FileBase64 from 'react-file-base64';
import { useNavigate } from 'react-router-dom';
import CreateLoader from '../components/CreateLoader';


const PlacesFormPage = () => {
  const navigate = useNavigate()
  const { user } = useContext(UserContext)
  const [title, setTitle] = useState('')
  const [address, setAddress] = useState('')
  const [addedPhotos, setAddedPhotos] = useState([])
  const [photoLink, setPhotoLink] = useState('')
  const [description, setDescription] = useState('')
  const [perks, setPerks] = useState([])
  const [extraInfo, setExtraInfo] = useState('')
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [maxGuests, setMaxGuests] = useState('')
  const [price, setPrice] = useState('')
  const [loading, setLoading] = useState(false)


  function inputHeader(text) {
    return (
      <h2 className="mt-2">{text}</h2>
    )
  }

  function inputSubHeader(text) {
    return (
      <p className='text-gray-500 text-[10px] '>{text}</p>
    )
  }

  function preInput(header, subHeader) {
    return (
      <>
        {inputHeader(header)}
        {inputSubHeader(subHeader)}
      </>
    )
  }

  const addPhotoByLink = async (e) => {
    e.preventDefault()

    setAddedPhotos([...addedPhotos, photoLink || 'https://thumbs.dreamstime.com/b/dummy-neighbor-chat-23372551.jpg'])
    setPhotoLink('')
  }



  const handleImageUpload = (files) => {
    setAddedPhotos([...addedPhotos, ...files.map((file) => file.base64)]);
  };

  const addNewPlace = async (e) => {

    e.preventDefault()
    try {
      await axios.post('/place/new', {
        owner: user._id,
        // owner: user,
        title,
        address,
        price,
        photos: addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
      })

      setTitle('')
      setAddress('')
      setPrice('')
      setAddedPhotos([])
      setDescription('')
      setPerks([])
      setExtraInfo('')
      setCheckIn('')
      setCheckOut('')
      setMaxGuests('')
      navigate('/account/places')
    } catch (error) {
      toast.error('Check all Fields', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        theme: "colored",
      });
    }
  }



  return (
    <div className="">
      {loading && <CreateLoader />}
      <UserNavbar />
      <form action="" onSubmit={addNewPlace}>
        {preInput('Title', 'Home Sweet Home')}
        <input
          type="text"
          value={title} onChange={(e) => { setTitle(e.target.value) }} name="" placeholder='Title' id="" />

        <div className='flex space-x-3'>
          <div className='flex-1'>
            {preInput('Address', 'Where to Come')}
            <input
              type="text"
              value={address}
              onChange={(e) => { setAddress(e.target.value) }}
              placeholder='Address'
            />
          </div>
          <div className="flex-1">
            {preInput('Price', 'How Much Per Night (Number)')}
            <input
              type="text"
              value={price}
              onChange={(e) => { setPrice(e.target.value) }}
              placeholder='13000'
            />
          </div>
        </div>
        {preInput('Photos', 'Show Your Place (atleast 5)')}
        <div className='flex gap-2'>
          <input
            type="text"
            value={photoLink}
            onChange={(e) => { setPhotoLink(e.target.value) }}
            placeholder='Add using a link ....jpg'
          />
          <button onClick={addPhotoByLink} className='bg-primary text-white font-medium px-3 rounded-lg'>Add&nbsp;photo</button>
        </div>
        <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-2  mt-2 mb-3">
          {addedPhotos.length > 0 && addedPhotos.map((photo, index) => (

            <div className=' relative ' key={index}>
              <img className='aspect-square w-full rounded-lg h-full object-cover' src={addedPhotos[index]} alt="" />
              <button onClick={(e) => {
                e.preventDefault()
                setAddedPhotos(addedPhotos.filter((p) => p !== photo))
              }} className='absolute bottom-1 right-1 text-black rounded-md p-1 text-[10px] bg-gray-300 hover:text-primary'>
                <IconTrash size={15} />
              </button>

            </div>
          ))}
          <label className="border bg-transparent rounded-lg p-8 text-gray-500 flex items-center bg-white  flex-col justify-center aspect-square cursor-pointer">
            <div className="hidden">
              <FileBase64
                multiple={true}
                onDone={handleImageUpload}
              />
            </div>
            <IconCloudUpload size={20} className='mb-1' />
            Upload

          </label>
        </div>
        {preInput('Description', 'Describe Your Place')}
        <textarea
          value={description}
          onChange={(e) => { setDescription(e.target.value) }} className='outline-none'
          rows="7"
          placeholder='Description' />
        {preInput('Perks', 'What Do You Offer')}
        <Perks
          selected={perks}
          onChange={setPerks} />
        {preInput('Extra Information', 'House Rules and Conditions')}
        <textarea
          value={extraInfo}
          onChange={(e) => { setExtraInfo(e.target.value) }} className='outline-none'
          rows={3}
          placeholder='Rules and Regulations' />
        {preInput('Check In Time, Check Out Time & Maximum Guests Allowed', 'Add Check In and Out Time, Remember to have A Window for Cleaning the Room')}
        <div className="my-1 grid sm:grid-cols-3 gap-2">
          <div className="">
            <h3 className='text-[13px]'>Check In Time</h3>
            <input
              type="text"
              value={checkIn}
              onChange={(e) => { setCheckIn(e.target.value) }} placeholder='12:00 pm' />
          </div>
          <div className="">
            <h3 className='text-[13px]'>Check Out Time</h3>
            <input
              type="text"
              value={checkOut}
              onChange={(e) => { setCheckOut(e.target.value) }} placeholder='11:00 am' />
          </div>
          <div className="">
            <h3 className='text-[13px]'>Maximum Guests</h3>
            <input
              type="text"
              value={maxGuests}
              onChange={(e) => { setMaxGuests(e.target.value) }} placeholder='3-4' />
          </div>
        </div>
        <div className="mb-5 mt-2">
          <button className="primary">Save</button>
        </div>
      </form>
      <ToastContainer />
    </div>
  )
}

export default PlacesFormPage
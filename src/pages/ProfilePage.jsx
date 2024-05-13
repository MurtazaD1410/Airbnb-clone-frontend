import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext'
import { Navigate, useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import PlacesPage from './PlacesPage'
import UserNavbar from '../components/UserNavbar'
import { ToastContainer, toast } from 'react-toastify'
import FileBase64 from 'react-file-base64'
import RegisterLoader from '../components/RegisterLoader'


const ProfilePage = () => {
  const { ready, user, setUser } = useContext(UserContext)
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [photo, setPhoto] = useState('')
  const [googleLogout, setGoogleLogout] = useState(true)



  useEffect(() => {
    if (user) {
      if (user.googleId === undefined) {
        setGoogleLogout(false)
      }
      setName(user.name)
      setEmail(user.email)
      setPhoto(user.avatarUrl)
      console.log(photo)
    }
  }, [user])

  const logout = () => {
    axios.get('/user/logout')
    setUser(null)
    navigate('/')

  }

  const googleLogoutButton = () => {
    window.open('http://localhost:4000/auth/logout', '_self')
    setUser(null)
    navigate('/')

  }
  let { subpage } = useParams()
  if (subpage === undefined) {
    subpage = 'profile';
  }

  // if (!ready) {
  //   return <div>Loading...</div>
  // }

  if (!user) {
    return <Navigate to={'/login'} />
  }

  const update = async (e) => {
    setLoading(true)
    e.preventDefault()
    try {
      await axios.put(`/user/update/${user._id}`, {
        name,
        email,
        photo
      })
      setUser({
        ...user,
        name,
        email,
        avatarUrl: photo
      })
      setLoading(false)
      toast.success('Profile updated successfully', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        pauseOnHover: false,
        closeOnClick: true,
        theme: "colored",
      })
    } catch (err) {
      setLoading(false)
      toast.error(err.response.data, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        pauseOnHover: false,
        closeOnClick: true,
        theme: "colored",
      })
    }
  }

  const deleteAccount = async (e) => {
    e.preventDefault()
    let answer = window.confirm("Delete Account? This cannot be undone. All places created by you will be deleted.")
    if (answer) {
      await axios.delete(`/user/delete/${user._id}`)
      if (googleLogout) {
        window.open('http://localhost:4000/auth/logout', '_self')
        setUser(null)
      } else {
        axios.get('/user/logout')
        setUser(null)
      }
    }
  }




  return (
    <div>
      {loading && <RegisterLoader />}

      <UserNavbar />
      {subpage === 'profile' && (
        <div className="text-center">
          <h1 className='text-4xl font-medium '>My Profile</h1>
          <div className="text-base flex items-center flex-col space-y-7">
            <div className='mt-6 grow flex justify-center items-center'>


              <form action="" onSubmit={update} className='max-w-md mx-auto '>
                {/* //~ add profile image */}
                <div className="flex justify-center items-center mb-3">
                  <label className='w-fit  cursor-pointer'>
                    <div className="w-28 h-28 rounded-md bg-gray-200 flex justify-center items-center overflow-hidden">
                      <div className="hidden">
                        <FileBase64
                          id='photo'
                          multiple={false}
                          onDone={({ base64 }) => { setPhoto(base64) }} />
                      </div>

                      <img src={photo} alt="" className='object-cover h-full w-full ' />

                    </div>
                  </label>
                </div>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='John Doe' name="" id="" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder='your@email.com' name="" id="" />

                <div className="flex gap-2">
                  <button className='primary flex-1'>Update</button>
                  <button className=' primary flex-1' onClick={googleLogout ? googleLogoutButton : logout}>Logout</button>
                </div>
                <button className='bg-red-500 w-full p-2 text-white rounded-lg font-semibold my-1' onClick={deleteAccount}>Delete Account</button>
              </form>


              <ToastContainer />

            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProfilePage
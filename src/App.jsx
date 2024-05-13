import { Route, Routes } from 'react-router-dom';
import IndexPage from './pages/Indexpage';
import LoginPage from './pages/LoginPage';
import Layout from './Layout';
import RegisterPage from './pages/RegisterPage';
import axios from 'axios';
// import { UserContext } from './context/UserContext';
// import { useContext } from 'react';
import PlacePage from './pages/PlacePage';
import PlacesPage from './pages/PlacesPage';
import PlacesFormPage from './pages/PlacesFormPage';
import ProfilePage from './pages/ProfilePage';
import PlacesEditPage from './pages/PlacesEditPage';
import BookingConfirmedPage from './pages/BookingConfirmedPage';
import BookingsPage from './pages/BookingsPage';
import UserPage from './pages/UserPage';
import BookingCancelledPage from './pages/BookingCancelledPage';


axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;

function App() {
  // const { user } = useContext(UserContext)

  return (

    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<IndexPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/account' element={<ProfilePage />} />
        <Route path='/account/places' element={<PlacesPage />} />
        <Route path='/account/places/new' element={<PlacesFormPage />} />

        <Route path='/account/places/:id' element={<PlacePage />} />
        <Route path='/account/places/edit/:id' element={<PlacesEditPage />} />
        <Route path='/success' element={<BookingConfirmedPage />} />
        <Route path='/cancel' element={<BookingCancelledPage />} />
        <Route path='/account/bookings' element={<BookingsPage />} />
        <Route path='/user' element={<UserPage />} />

      </Route>
    </Routes>

  )
}

export default App

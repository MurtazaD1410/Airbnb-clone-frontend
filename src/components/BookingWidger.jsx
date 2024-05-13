import React, { useContext, useEffect, useState } from 'react';
import { DateRange } from 'react-date-range';
import { differenceInCalendarDays } from 'date-fns'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs'
import Loader from './Loader';

const BookingWidget = ({ place }) => {
  const { user } = useContext(UserContext)
  const navigate = useNavigate()
  const today = new Date();
  const defaultRanges = [
    {
      startDate: new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000),
      endDate: new Date(today.getTime() + 10 * 24 * 60 * 60 * 1000),
      key: 'default',
    },
  ];
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(defaultRanges[0].startDate);
  const [endDate, setEndDate] = useState(defaultRanges[0].endDate);
  const [guests, setGuests] = useState(1);
  const [sameUser, setSameUser] = useState(false);
  const [name, setName] = useState('');
  const [bookingData, setBookingData] = useState(null)
  const [email, setEmail] = useState('');
  const [disabledDates, setDisabledDates] = useState([]);

  useEffect(() => {
    if (user) {
      setName(user.name)
      setEmail(user.email)
    }
  }, [user])


  useEffect(() => {
    const fetchBooking = async () => {
      const data = await axios.get(`/booking/place/${place._id}`)
      setBookingData(data.data)
    }
    fetchBooking()
  }, [place._id]);

  // disable dates that have already been booked 
  useEffect(() => {
    if (bookingData && bookingData.length > 0) {
      const bookedDates = bookingData.map((booking) => ({
        startDate: new Date(booking.checkIn),
        endDate: new Date(booking.checkOut),
      }));
      setDisabledDates(bookedDates);
    }
  }, [bookingData]);


  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };

  if (guests > place.maxGuests) {

    toast.error('Max guests exceeded', {
      position: "top-center",
      autoClose: 1000,
      pauseOnHover: false,
      hideProgressBar: false,
      closeOnClick: true,
      theme: "colored",
    });
  }


  let numberOfNights = 0;
  if (startDate && endDate) {
    numberOfNights = differenceInCalendarDays(new Date(endDate), new Date(startDate))
  }

  const minDate = new Date();


  const formatedPrice = new Intl.NumberFormat('en-IN').format(place.price)

  const booking = Math.round(place.price * numberOfNights)
  const bookingPrice = new Intl.NumberFormat('en-IN').format(booking)

  const fee = Math.round((place.price * numberOfNights) * 6 / 100)
  const serviceFee = new Intl.NumberFormat('en-IN').format(fee)

  const total = booking + fee
  const totalPrice = new Intl.NumberFormat('en-IN').format(total)




  const createBooking = async () => {
    if (!user) {
      navigate('/login')
    }
    setLoading(true);




    try {

      // stripe payment

      axios.post('/payment', {


        id: place._id,
        price: place.price,
        title: place.title,
        days: numberOfNights,
        fee: fee,



      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
        .then(res => {
          console.log(res);
          if (res.status === 200) {
            return res.data;
          } else {
            return Promise.reject(res.data);
          }
        }).then(async ({ url }) => {
          setLoading(true);

          window.location = url;
        })
        .catch(e => {
          toast.error(e.message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            theme: "colored",
          });
        });

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


      await axios.post('/mail/success', {
        place: place.title,
        userName: name,
        userEmail: email,
        checkIn: dayjs(startDate).format('DD MMM YYYY'),
        checkOut: dayjs(endDate).format('DD MMM YYYY'),
        totalPrice,
      })




      // // ~ send mail after booking has been created


      // await axios.post('/mail/success', {
      //   place: place.title,
      //   userName: name,
      //   userEmail: email,
      //   checkIn: dayjs(startDate).format('DD MMM YYYY'),
      //   checkOut: dayjs(endDate).format('DD MMM YYYY'),
      //   totalPrice,
      // })
      setLoading(false)
    } catch (error) {
      // console.log(error);
      toast.error('Check all Fields', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        theme: "colored",
      });
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user) {
      if (place.owner._id === user._id) {
        setSameUser(true)
      }
    }
  }, [place, user])



  if (sameUser) {
    return (
      <div className="bg-white rounded-lg border lg:col-span-2 shadow-lg p-5 flex flex-col space-y-5  md:min-w-[375px] h-fit lg:min-w-[400px] md:sticky md:top-20">
        <p className="">Property has wrong info!! Dont worry</p>
        <Link to={`/account/places/edit/${place._id}`} className=''>
          <button className='primary'>
            Update Property
          </button>
        </Link>

      </div>
    )
  }


  return (
    <div className="">
      {loading && <Loader />}
      <div className="bg-white rounded-lg border lg:col-span-2 shadow-lg p-5 flex flex-col space-y-5  md:min-w-[375px] h-fit lg:w-[400px] md:sticky md:top-20">
        <div className="">
          <p className="font-semibold text-xl">₹{formatedPrice} <span className='text-sm font-normal'>night</span> </p>
        </div>
        <DateRange
          className='mx-auto border rounded-lg border-secondary overflow-hidden'
          onChange={handleSelect}
          minDate={minDate}
          ranges={[
            {
              startDate,
              endDate,
              key: 'selection',
            },
          ]}
        />
        {numberOfNights > 0 && user && (
          <div className="border border-secondary rounded-lg overflow-hidden ">
            <div className="flex">
              <div className="p-3 w-2/5 border-r border-secondary">
                <p className="">No. of guests</p>
                <input type="text" placeholder='1-2' value={guests} onChange={(e) => { setGuests(e.target.value) }} />
              </div>
              <div className="p-3 ">
                <p className="">Name</p>
                <input type="text" value={name} onChange={(e) => { setName(e.target.value) }} />
              </div>
            </div>
            <div className="border-b border-secondary"></div>
            <div className="p-3">
              <p className="">Email</p>
              <input type="text" value={email} onChange={(e) => { setEmail(e.target.value) }} />
            </div>
          </div>
        )}
        <button className='primary' onClick={createBooking}>
          Book Now
        </button>
        {numberOfNights > 0 && (
          <div className='flex-flex-col space-y-4'>
            <p className="text-sm text-gray-500 text-center">You won't be charged yet</p>
            <p className="flex justify-between">
              <span className="underline">₹{formatedPrice} x {numberOfNights} nights</span>
              <span>₹{bookingPrice}</span>
            </p>
            <p className="flex justify-between">
              <span className="underline">Airbnb service fee</span>
              <span>₹{serviceFee}</span>
            </p>
            <div className="border-b border-gray-400"></div>
            <p className="flex justify-between font-semibold">
              <span className="">Total before taxes</span>
              <span>₹{totalPrice}</span>
            </p>
          </div>
        )}
        <ToastContainer className='z-50' />
      </div>
    </div>
  );
};

export default BookingWidget;

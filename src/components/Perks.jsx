import { IconCar, IconDeviceTvOld, IconDoor, IconPaw, IconSnowflake, IconWifi } from '@tabler/icons-react'
import React from 'react'

const Perks = ({ selected, onChange }) => {
  const handleCbClick = (e) => {
  
    if (e.target.checked) {
      onChange([...selected, e.target.name])
    }
    else {
      onChange([...selected.filter((item) => item !== e.target.name)])
    }
    

  }


  return (
    <>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-6 mb-3">
        <label htmlFor="wifi" className="border p-4 flex items-center rounded-lg cursor-pointer bg-white ">
          <input type="checkbox" checked={selected.includes('wifi')} onChange={handleCbClick} name="wifi" id="wifi" className="accent-primary " />
          <IconWifi size={20} className='mx-2 text-secondary' />
          <span className=''>Wifi</span>
        </label>
        <label htmlFor="car" className="border p-4 flex items-center rounded-lg cursor-pointer bg-white">
          <input type="checkbox" checked={selected.includes('car')} onChange={handleCbClick} name="car" id="car" className="accent-primary " />
          <IconCar size={20} className='mx-2 text-secondary' />
          <span className=''>Free parking</span>
        </label>
        <label htmlFor="pets" className="border p-4 flex items-center rounded-lg cursor-pointer bg-white">
          <input type="checkbox" onChange={handleCbClick} name="pets" id="pets" checked={selected.includes('pets')} className="accent-primary " />
          <IconPaw size={20} className='mx-2 text-secondary' />
          <span className=''>Pets</span>
        </label>
        <label htmlFor="tv" className="border p-4 flex items-center rounded-lg cursor-pointer bg-white">
          <input type="checkbox" checked={selected.includes('tv')} onChange={handleCbClick} name="tv" id="tv" className="accent-primary " />
          <IconDeviceTvOld size={20} className='mx-2 text-secondary' />
          <span className=''>TV</span>
        </label>
        <label htmlFor="door" className="border p-4 flex items-center rounded-lg cursor-pointer bg-white">
          <input type="checkbox" onChange={handleCbClick} name="door" id="door" checked={selected.includes('door')} className="accent-primary " />
          <IconDoor size={20} className='mx-2 text-secondary' />
          <span className=''>Private entrance</span>
        </label>
        <label htmlFor="air" className="border p-4 flex items-center rounded-lg  cursor-pointer bg-white">
          <input type="checkbox" onChange={handleCbClick} name="air" id="air" checked={selected.includes('air')} className="accent-primary " />
          <IconSnowflake size={20} className='mx-2 text-secondary' />
          <span className=''>Air conditioning</span>
        </label>

      </div>
    </>
  )
}

export default Perks
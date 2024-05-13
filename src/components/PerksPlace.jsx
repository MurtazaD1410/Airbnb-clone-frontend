import React, { useEffect, useState } from 'react'
import { IconCar, IconCarOff, IconDeviceTvOld, IconDeviceTvOff, IconDoor, IconPaw, IconSnowflake, IconWifi, IconDoorOff, IconWifiOff, IconSnowflakeOff, IconPawOff } from '@tabler/icons-react'

const PerksPlace = ({ place }) => {
  const [wifi, setWifi] = useState(false)
  const [car, setCar] = useState(false)
  const [pets, setPets] = useState(false)
  const [tv, setTv] = useState(false)
  const [door, setDoor] = useState(false)
  const [air, setAir] = useState(false)

  useEffect(() => {
    if (place?.perks?.includes('wifi')) setWifi(true)
    if (place?.perks?.includes('car')) setCar(true)
    if (place?.perks?.includes('pets')) setPets(true)
    if (place?.perks?.includes('tv')) setTv(true)
    if (place?.perks?.includes('door')) setDoor(true)
    if (place?.perks?.includes('air')) setAir(true)
  }, [place.perks])


  return (
    <div>
      <p className="text-secondary font-bold text-xl mb-4">What this place offers</p>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {wifi ?
          <p className="flex mb-4 space-x-4 items-center">
            <IconWifi strokeWidth={1.75} size={28} className='mr-2 text-secondary' /> Wifi
          </p> : <p className="flex mb-4 items-center space-x-4 line-through decoration-secondary">
            <IconWifiOff strokeWidth={1.75} size={28} className='mr-2 text-secondary ' />Wifi
          </p>}
        {car ?
          <p className="flex mb-4 space-x-4 items-center">
            <IconCar strokeWidth={1.75} size={28} className='mr-2 text-secondary' /> Free parking on premises
          </p> : <p className="flex mb-4 items-center space-x-4 line-through decoration-secondary">
            <IconCarOff strokeWidth={1.75} size={28} className='mr-2 text-secondary ' />Free parking on premises
          </p>}
        {pets ?
          <p className="flex mb-4 space-x-4 items-center">
            <IconPaw strokeWidth={1.75} size={28} className='mr-2 text-secondary' /> Pet allowed
          </p> : <p className="flex mb-4 items-center space-x-4 line-through decoration-secondary">
            <IconPawOff strokeWidth={1.75} size={28} className='mr-2 text-secondary ' />Pet allowed
          </p>}
        {tv ?
          <p className="flex mb-4 space-x-4 items-center">
            <IconDeviceTvOld strokeWidth={1.75} size={28} className='mr-2 text-secondary' /> TV
          </p> : <p className="flex mb-4 items-center space-x-4 line-through decoration-secondary">
            <IconDeviceTvOff strokeWidth={1.75} size={28} className='mr-2 text-secondary ' />TV
          </p>}
        {door ?
          <p className="flex mb-4 space-x-4 items-center">
            <IconDoor strokeWidth={1.75} size={28} className='mr-2 text-secondary' /> Private entrance
          </p> : <p className="flex mb-4 items-center space-x-4 line-through decoration-secondary">
            <IconDoorOff strokeWidth={1.75} size={28} className='mr-2 text-secondary ' />Private entrance
          </p>}
        {air ?
          <p className="flex last:space-x-4 items-center">
            <IconSnowflake strokeWidth={1.75} size={28} className='mr-2 text-secondary' /> Air conditioning
          </p> : <p className="flex items-center space-x-4 line-through decoration-secondary">
            <IconSnowflakeOff strokeWidth={1.75} size={28} className='mr-2 text-secondary ' />Air conditioning
          </p>}
      </div>
    </div>
  )
}

export default PerksPlace
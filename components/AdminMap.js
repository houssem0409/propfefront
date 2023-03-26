import React, { useState, useEffect } from 'react'
import { useMemo } from 'react'
import { useRouter } from 'next/router'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api'
import axios from 'axios'
export default function adminmap({ props }) {
  const router = useRouter()
  const { id } = router.query
  const [thisStartupInfo, setThisStartupInfo] = useState()

  async function getStartup(idStartup) {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/startup/${idStartup}`
      )
      setThisStartupInfo(data)

      return data
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const { id } = router.query
    console.log(id)
    getStartup(id)
  }, [id])
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_MAP_API,
  })
  if (!isLoaded) return <div>Loading ...</div>

  return (
    <div className='container'>
      <MyMap props={thisStartupInfo} isMarkerShown />
    </div>
  )
}

function MyMap({ props }) {
  console.log(props)
  const [success, setSuccess] = useState(false)
  const [region, setRegion] = useState({
    latitude: props?.lat,
    longitude: props?.lng,
  })

  const showSuccess = () =>
    success && (
      <div class='alert alert-warning alert-dismissible fade show' role='alert'>
        <strong>Success!</strong> the location updated successfully.
        <button
          onClick={() => setSuccess(false)}
          type='button'
          class='btn-close'
          data-bs-dismiss='alert'
        ></button>
      </div>
    )

  useEffect(() => {
    setRegion({
      latitude: props?.lat,
      longitude: props?.lng,
    })
  }, [props])

  async function updateLoc() {
    try {
      const { data } = await axios.put(
        `http://localhost:8000/api/startup/location/${props?._id}`,
        { lat: String(region.latitude), lng: String(region.longitude) }
      )

      setSuccess(true)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      {showSuccess()}
      {console.log(region)}
      <GoogleMap
        zoom={10}
        center={{
          lat: parseFloat(region.latitude),
          lng: parseFloat(region.longitude),
        }}
        mapContainerStyle={{ height: '400px ', width: '600px' }}
      >
        <Marker
          position={{
            lat: parseFloat(region.latitude),
            lng: parseFloat(region.longitude),
          }}
          draggable={true}
          isMarkerShown
          onDragEnd={(e) => {
            setRegion({
              latitude: e.latLng.lat(),
              longitude: e.latLng.lng(),
            })

            console.log('Drag End', e.latLng.lat())
          }}
        />
      </GoogleMap>
      <button
        style={{ borderRadius: '20px', margin: '10px' }}
        className='btn btn-info'
        onClick={() => {
          updateLoc()
        }}
      >
        update location
      </button>
    </div>
  )
}

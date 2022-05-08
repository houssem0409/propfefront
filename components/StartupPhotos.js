import React from 'react'
import ShowPhoto from '../components/ShowPhoto'
import { useState, useEffect } from 'react'
import axios from 'axios'
export default function StartupPhotos({ props }) {
  const [photos, setPhotos] = useState()
  async function getPhotos() {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/startup/${props?._id}/photos`
      )
      setPhotos(data)
      console.log(data)

      return data
    } catch (error) {
      console.error(error)
    }
  }
  console.log(photos)
  useEffect(() => {
    getPhotos()
  })
  return (
    <div>
      <div class='card' style='width: 18rem;'></div>
    </div>
  )
}

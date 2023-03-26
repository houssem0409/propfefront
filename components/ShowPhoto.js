import React, { useEffect, useState } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import { PhotoForm } from './PhotoForm'
import axios from 'axios'

export default function ShowPhoto({ item, url }) {
  const [photos, setPhotos] = useState()
  async function getPhotos() {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/${url}/${item?._id}/photos`
      )
      setPhotos(data)

      return data
    } catch (error) {
      console.error(error)
    }
  }
  console.log(photos)
  useEffect(() => {
    getPhotos()
  }, [])
  return (
    <div
      className='col-12'
      style={{ backgroundColor: '#e8e8e8', height: '100%', width: '100%' }}
    >
      <Popup
        trigger={
          <button className='btn btn-success' style={{ margin: '10px' }}>
            <i className='bi bi-plus-circle'></i>
          </button>
        }
        position='right center'
      >
        <div
          className='col-12'
          style={{
            backgroundColor: 'white',
            height: '300px',
            position: 'relative',
          }}
        >
          <PhotoForm url={url} photoChanger={setPhotos} item={item} />
        </div>
      </Popup>

      <div className='row'>
        {photos?.map((p, i) => (
          <div className='col-4 mb-3'>
            <img
              src={`http://localhost:8000/api/photo/${url}/${p?._id}`}
              alt={photos?.title}
              className='mb-3'
              style={{
                maxHeight: '80%',
                maxWidth: '80%',
                margin: '10px',
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

import React from 'react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { FaStar } from 'react-icons/fa'
import iag from '../public/images/logos/Startup_Symbol.PNG'
import ShowImage from './ShowImage'
export default function Startup({ props }) {
  const [startupRatings, setStartupRatings] = useState()
  const router = useRouter()

  async function ratingByStartup(props) {
    try {
      const data = await axios.get(
        `http://localhost:8000/api/ratings/startup/${props?._id}`
      )
      setStartupRatings(data)
    } catch (err) {
      console.error(err)
    }
  }
  const moyRatings = () => {
    const s = 0

    startupRatings?.data?.map((sr, i) => {
      s = s + sr?.score
    })
    const moy = s / startupRatings?.data.length
    s = 0
    return moy
  }
  const moyenne = moyRatings()
  useEffect(() => {
    ratingByStartup(props)
    moyRatings()
  }, [setStartupRatings, props])
  return (
    <div
      key={props}
      className='card'
      style={{
        width: '18rem',
        marginTop: '20px',
        marginBottom: '10px',
        margin: '5px',
      }}
    >
      <ShowImage props={props} url='startup' />

      <div className='card-body'>
        <h5 className='card-title' style={{ color: 'black' }}>
          Description :
        </h5>
        <p className='card-text' style={{ color: 'black' }}>
          {props?.description?.substr(0, 60)} ...
        </p>
        <h5 className='card-title' style={{ color: 'black' }}>
          Country : {props?.country}
        </h5>

        <div className='row'>
          <div className='col-6'>
            <a
              className='card-link'
              onClick={() => router.push(`/startups/details/${props?._id}`)}
            >
              {props?.name}
            </a>
          </div>
          <div className='col-6'>
            <div
              style={{
                position: 'relative',
              }}
            >
              {moyenne > 0 && (
                <div
                  style={{
                    position: 'relative',
                  }}
                >
                  <FaStar size={60} color={'#ffc107'} />
                  <p
                    style={{
                      position: 'relative',
                      marginLeft: '20px',
                      marginBottom: '70px',
                    }}
                  >
                    {moyenne.toFixed(2)}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  )
}

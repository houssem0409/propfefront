import React from 'react'
import { FaStar } from 'react-icons/fa'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
export default function CardRatings() {
  const router = useRouter()
  const { id } = router.query
  const [startupRatings, setStartupRatings] = useState()
  async function ratingByStartup(id) {
    try {
      const data = await axios.get(
        `http://localhost:8000/api/ratings/startup/${id}`
      )
      setStartupRatings(data)
    } catch (err) {
      console.error(err)
    }
  }
  const moyRatings = () => {
    const s = 0

    if (startupRatings?.data.length > 1) {
      startupRatings?.data?.map((sr, i) => {
        s = s + sr?.score
      })
      const moy = s / startupRatings?.data.length
      s = 0
      return moy
    } else {
      return 0
    }
  }
  const moyenne = moyRatings()
  useEffect(() => {
    const { id } = router.query

    ratingByStartup(id)
  }, [setStartupRatings, id])
  return startupRatings?.data.length < 1 ? (
    <div style={{ marginLeft: '20px' }}>
      <h3>No Ratings yet </h3>
      <FaStar color='#e2e2e2' size={50} />
      <h4> Be the first </h4>
    </div>
  ) : (
    <div>
      <div style={{ position: 'center', marginLeft: '100px' }}>
        <FaStar size={40} color='yellow' />
        <h5 style={{ fontSize: '20px' }}>{moyenne.toFixed(2)} /5 </h5>
      </div>

      <h5 style={{ marginLeft: '80px', marginTop: '20px' }}>
        {' '}
        {startupRatings?.data.length} Reviews{' '}
      </h5>
    </div>
  )
}

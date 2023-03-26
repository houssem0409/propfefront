import React, { useEffect, useState } from 'react'
import Item from '../components/item'
import Startup from './Startup'
import Carousel from 'react-elastic-carousel'
import axios from 'axios'
import { useRouter } from 'next/router'

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
]

export default function RelatedStartups({ props }) {
  const router = useRouter()
  const { id } = router.query
  const [relatedStartups, setRelatedStartups] = useState()
  const [success, setSuccess] = useState()
  const [error, setError] = useState()

  async function getRelatedStartups(id) {
    try {
      const data = await axios.get(
        `http://localhost:8000/api/startups/related/${id}`
      )
      if (data) {
        setRelatedStartups(data)
        setSuccess(true)
      }
      setError(true)
    } catch (error) {
      console.log(error)
      setError(true)
    }
  }
  useEffect(() => {
    const { id } = router.query
    getRelatedStartups(id)
  }, [id])
  return (
    <div>
      <div>
        <h3 style={{ fontSize: '25px', fontFamily: 'monospace' }}>
          Related Startups
        </h3>
      </div>
      <Carousel breakPoints={breakPoints}>
        {relatedStartups?.data?.map((reltSt, e) => (
          <Startup key={e} props={reltSt} />
        ))}
      </Carousel>
    </div>
  )
}

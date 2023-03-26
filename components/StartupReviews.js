import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useRouter } from 'next/router'
import UserInfo from './UserInfo'
import Stars from '../components/stars'
import { cilOpacity } from '@coreui/icons'
export default function StartupReviews({ props }) {
  const [reviews, setReviews] = useState()
  const [success, setSussess] = useState()
  const [error, setError] = useState()
  const [backError, setBackError] = useState()
  const [limit, setLimit] = useState(4)
  const [skip, setSkip] = useState(0)
  const [size, setSize] = useState(0)
  const router = useRouter()
  const { id } = router.query
  async function getReviews(skip, limit, id) {
    try {
      const res = await axios.post(
        `http://localhost:8000/api/ratings/bysearch`,
        {
          id: id,
          limit: limit,
          skip: skip,
        }
      )
      setSussess(true)
      setReviews(res)
      setSize(res?.data.length)

      setError(true)
    } catch (error) {
      console.error(error)
      setBackError(error)
    }
  }

  const loadMore = () => {
    let toSkip = skip + limit
    setLimit(limit + limit)
    // console.log(newFilters)
    getReviews(0, limit, id)
  }

  const loadMoreButton = () => {
    return (
      <button
        onClick={loadMore}
        className='btn btn-warning mb-5'
        style={{ borderRadius: '20px', opacity: '2' }}
      >
        {' '}
        Load More
      </button>
    )
  }
  useEffect(() => {
    const { id } = router.query
    getReviews(0, 4, id)
  }, [id])

  return (
    <div
      style={{ marginTop: '80px', borderWidth: '20px', borderColor: 'black' }}
    >
      <h4 style={{ fontSize: '25px', fontFamily: 'monospace' }}>Reviews :</h4>
      {reviews?.data?.data?.map((review, e) => (
        <Row
          key={e}
          xs={1}
          md={4}
          style={{
            marginTop: '80px',
            width: '100%',
            height: '100%',
          }}
        >
          <Col
            className='row'
            md={3}
            style={{
              backgroundColor: 'white',
              height: '250px',
            }}
          >
            <UserInfo props={review?.user} />
          </Col>
          <Col
            className='row'
            md={6}
            style={{
              backgroundColor: '#F5F9EF',
              height: '250px',
            }}
          >
            <h5>Feedback :</h5>
            <p>{review?.feedback}</p>
          </Col>
          <Col
            md={3}
            style={{
              backgroundColor: 'white',
              height: '250px',
            }}
          >
            <Stars props={review?.score} />
          </Col>
        </Row>
      ))}
      <div>{loadMoreButton()}</div>
    </div>
  )
}

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Layout from '../../../components/Layout'
import { useRouter } from 'next/router'
import { EventForm } from '../../../components/EventForm'
import Authorization from '../../../components/Authorization'

function Update() {
  const router = useRouter()
  const [event, setEvent] = useState()
  const { id } = router.query
  async function getEvent(id) {
    try {
      const { data } = await axios.get(`http://localhost:8000/api/event/${id}`)
      setEvent(data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    const { id } = router.query

    getEvent(id)
  }, [id])
  return (
    <Layout>
      <div className='container' style={{ width: '70%', marginTop: '30px' }}>
        {' '}
        <h3
          style={{ fontSize: '20px', fontFamily: 'serif', marginLeft: '250px' }}
        >
          Edit Your Event
        </h3>
        <EventForm props={event} />
      </div>
    </Layout>
  )
}
export default Update

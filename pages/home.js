import Layout from '../components/Layout'
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../components/UserContext'
import { Card, Col, Row } from 'react-bootstrap'
import Startup from '../components/Startup'
import 'bootstrap-icons/font/bootstrap-icons.css'

import axios from 'axios'
import CardEvent from '../components/Event/CardEvent'
export default function Home() {
  const { user, setTokens, tokens, token } = useContext(UserContext)
  const [startups, setStartups] = useState()
  const [events, setEvents] = useState()
  const [myUser, setUser] = useState()
  async function getStartups() {
    try {
      const { data } = await axios.get('http://localhost:8000/api/startups')
      setStartups(data)
      console.log(data)

      return data
    } catch (error) {
      console.error(error)
    }
  }
  async function getEvents() {
    try {
      const { data } = await axios.get('http://localhost:8000/api/events')
      setEvents(data)
      console.log(data)

      return data
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getStartups()
    getEvents()
  }, [])
  console.log('the uwer')
  console.log(user)
  return (
    <Layout>
      <Row xs={1} md={3}>
        <Col md={3} style={{ backgroundColor: 'blue' }}>
          <div className='row'>
            <div className='col-3'>
              <i
                className='bi bi-person-square'
                style={{ width: '100px', height: '100px' }}
              ></i>
            </div>
            <div className='col-9'>
              <h6 style={{ color: 'black' }}>
                {user?.username ? user?.username : user?.data?.username}
              </h6>
            </div>
            <div className='col-3'>
              <p> Email:</p>
            </div>
            <div className='col-9'>
              <p style={{ color: 'black' }}>
                {user?.email ? user?.email : user?.data?.email}
              </p>
            </div>

            <div className='col-12'>
              <p>Address : </p>
              <p style={{ color: 'black' }}>
                361 Avenue Habib Bourguiba Mahdia
              </p>
            </div>
          </div>
        </Col>
        <Col
          className='row'
          md={6}
          style={{
            backgroundColor: 'white',
            textAlign: 'center',
            marginBottom: '10px',
          }}
        >
          {startups?.map((p, e) => (
            <Startup key={p?._id} props={p} />
          ))}
        </Col>
        <Col md={3} style={{ backgroundColor: 'blue' }}>
          <div style={{ marginTop: '10px' }}>
            <h4 style={{ position: 'center', marginLeft: '40px' }}>
              Last Events{' '}
            </h4>
          </div>
          {events?.map((ev, e) => (
            <div className='card' style={{ margin: '5px' }}>
              <CardEvent key={ev?._id} props={ev} />
              <img
                src={`http://localhost:8000/api/event/photo/${ev?._id}`}
                className='mb-3'
                style={{
                  maxHeight: '30%',
                  maxWidth: '100%',
                }}
              />
              <p>Description :{ev?.description}</p>
            </div>
          ))}
        </Col>
      </Row>
    </Layout>
  )
}

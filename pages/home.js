import Layout from '../components/Layout'
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../components/UserContext'
import { Card, Col, Row } from 'react-bootstrap'
import Startup from '../components/Startup'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { useRouter } from 'next/router'
import Link from 'next/link'
import axios from 'axios'
import CardEvent from '../components/Event/CardEvent'
export default function Home() {
  const router = useRouter()
  const { user, setTokens, tokens, token, mystartupManage } =
    useContext(UserContext)
  const [startups, setStartups] = useState()
  const [events, setEvents] = useState()

  async function getStartups() {
    try {
      const { data } = await axios.get('http://localhost:8000/api/startups')
      setStartups(data)

      return data
    } catch (error) {
      console.error(error)
    }
  }
  async function getEvents() {
    try {
      const { data } = await axios.get('http://localhost:8000/api/events')
      setEvents(data)

      return data
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getStartups()
    getEvents()
  }, [])
  return (
    <Layout>
      <Row xs={1} md={3}>
        <Col md={3} style={{ backgroundColor: '#e4e4e4' }}>
          <div style={{ marginTop: '20px' }}>
            <div className='row'>
              {user && (
                <div>
                  <div className='col-3'>
                    <i
                      className='bi bi-person-square'
                      style={{ width: '100px', height: '100px' }}
                    ></i>
                  </div>
                  <div className='col-9'>
                    <h6 style={{ color: 'black' }}>{user?.data?.username}</h6>
                  </div>
                  <div className='col-3'>
                    <p> Email:</p>
                  </div>
                  <div className='col-12'>
                    <p style={{ color: 'black' }}>{user?.data?.email}</p>
                  </div>
                  <div className='col-12'>
                    <p>Address : </p>
                    <p style={{ color: 'black' }}>{user?.data?.address}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          <hr style={{ color: 'black' }}></hr>
          <div>
            <h5>Explore </h5>
            <div>
              <Link href='/startups'> Discover Startups </Link>
            </div>
            <div>
              <Link href='/events'> Discover Events </Link>
            </div>
            <div>
              <Link href='/users'> Discover Peoples </Link>
            </div>
          </div>
          <hr style={{ color: 'black' }}></hr>
          <div>
            <h5> My Startup </h5>
            {mystartupManage ? (
              <div>
                <button
                  className='btn btn-primary'
                  onClick={() =>
                    router.push(
                      `/startups/details/${mystartupManage?.data?._id}`
                    )
                  }
                >
                  {mystartupManage?.data?.name}
                </button>
              </div>
            ) : user ? (
              <Link href='/searchmystartup'>
                <button className='btn btn-primary'>
                  {' '}
                  Manage Your Startup
                </button>
              </Link>
            ) : (
              <Link href='/user/signin'>
                <button className='btn btn-primary'>
                  {' '}
                  Manage Your Startup
                </button>
              </Link>
            )}
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
            <Startup key={e} props={p} />
          ))}
        </Col>
        <Col md={3} style={{ backgroundColor: '#e4e4e4' }}>
          <div style={{ marginTop: '10px' }}>
            <div className='row'>
              <div className='col-6'>
                <h4 style={{ position: 'center', marginLeft: '40px' }}>
                  Last Events{' '}
                </h4>
              </div>
              <div className='col-6'>
                {user && (
                  <Link href='/events/add'>
                    <button className='btn btn-warning'>Add your Event</button>
                  </Link>
                )}
              </div>
            </div>
          </div>
          {events?.map((ev, e) => (
            <div key={e} className='card' style={{ margin: '5px' }}>
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

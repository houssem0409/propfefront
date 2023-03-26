import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../../components/Layout'
import axios from 'axios'

export default function Details() {
  const router = useRouter()
  const { id } = router.query
  const [user, setUser] = useState()

  async function getUser(id) {
    try {
      const { data } = await axios.get(`http://localhost:8000/api/user/${id}`)
      setUser(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const { id } = router.query

    getUser(id)
  }, [id])
  return (
    <Layout>
      <div>
        <div
          className='jumbotron'
          style={{
            height: '200px',
            width: '85%',
            marginTop: '20px',
            position: 'absolute',
          }}
        ></div>
        <div>
          <div className='row'>
            <div
              className='col-3'
              style={{
                position: 'absolute',
                marginTop: '200px',
                marginLeft: '8px',
              }}
            >
              <img src='../../images/logos/ProfilePhoto.png'></img>
            </div>
            <div
              className='col-9'
              style={{
                position: 'absolute',
                marginTop: '225px',
                marginLeft: '150px',
                maxWidth: '70%',
              }}
            >
              <div className='container'>
                <div className='row row-cols-4'>
                  <div className='col'>
                    <button
                      style={{ width: '220px', borderRadius: '30px' }}
                      className='btn btn-primary'
                      onClick={(e) => {
                        setValue('Info')
                      }}
                    >
                      <i class='bi bi-info-circle-fill'></i> &nbsp; About
                    </button>
                  </div>
                  <div className='col'>
                    <button
                      style={{ width: '220px', borderRadius: '30px' }}
                      className='btn btn-primary'
                      onClick={(e) => {
                        setValue('MyStartup')
                      }}
                    >
                      <i className='bi bi-people-fill'></i> &nbsp; Team
                    </button>
                  </div>
                  <div className='col'>
                    <button
                      style={{ width: '220px', borderRadius: '30px' }}
                      className='btn btn-primary'
                      onClick={(e) => {
                        setValue('MyEventsCreated')
                      }}
                    >
                      <i class='bi bi-camera-fill'></i> &nbsp; Photos
                    </button>
                  </div>
                  <div className='col'>
                    <button
                      style={{ width: '220px', borderRadius: '30px' }}
                      className='btn btn-primary'
                      onClick={(e) => {
                        setValue('StartupPhotos')
                      }}
                    >
                      <i class='bi bi-star-fill'></i>
                      &nbsp;Reviews
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '230px', borderRadius: '30px' }}>
          <div className='row'>
            <div className='col-12'>
              <div
                className='col-12'
                style={{
                  padding: '30px',
                  height: '100%',
                  backgroundColor: '#e1e1e1',
                }}
              >
                <div className='row'>
                  <div
                    style={{ marginTop: '120px', width: '60%' }}
                    className='col'
                  >
                    <h3>{user?.username}</h3>
                    <p>
                      {user?.role} , {user?.country}{' '}
                    </p>
                    <p> {user?.address}</p>
                    <br />
                    <p>jgytu</p>
                  </div>
                </div>
                <div
                  className='row'
                  style={{ marginTop: '120px', width: '60%' }}
                >
                  <div className='col-6'>
                    <div className='col-6'>
                      <i className='bi bi-people-fill'></i> employees
                    </div>

                    <div>
                      <i className='bi bi-flag-fill'></i> founded in fdgdfg
                    </div>
                    <div>
                      <i className='bi bi-globe'></i>dghdgd
                    </div>
                  </div>
                  <div className='col-6'>
                    {' '}
                    <p>Fundings : fghth </p>
                    <p>Email : </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

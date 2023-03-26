import React from 'react'
import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import Map from '../../../components/map'
import Popup from 'reactjs-popup'

import 'bootstrap-icons/font/bootstrap-icons.css'
import { useRouter } from 'next/router'
import { UserContext } from '../../../components/UserContext'
import StartupReviews from '../../../components/StartupReviews'
import Layout from '../../../components/Layout'
import ShowImage from '../../../components/ShowImage'
import TableMembers from '../../../components/TableMembers'
import RelatedStartups from '../../../components/RelatedStartups'
import CardRatings from '../../../components/CardRatings'
import { PhotoForm } from '../../../components/PhotoForm'
export default function Details() {
  const { user, setTokens, tokens, token, mystartupManage } =
    useContext(UserContext)
  const [value, setValue] = useState('Info')
  const [actualStartup, setActualStartup] = useState()
  const [photos, setPhotos] = useState()
  const router = useRouter()
  const { id } = router.query

  async function getPhotos(id) {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/startup/${id}/photos`
      )
      setPhotos(data)

      return data
    } catch (error) {
      console.error(error)
    }
  }
  async function getStartup(idStartup) {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/startup/${idStartup}`
      )
      setActualStartup(data)

      return data
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    const { id } = router.query
    getStartup(id)
    getPhotos(id)
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
              <ShowImage props={actualStartup} url='startup' />
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
                      <i className='bi bi-info-circle-fill'></i> &nbsp; About
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
          <div
            style={{
              position: 'absolute',
              marginTop: '300px',
              marginLeft: '1000px',
            }}
          >
            {mystartupManage?.data?._id == id && (
              <button
                className='btn btn-primary'
                onClick={() => router.push(`/startups/update/${id}`)}
              >
                Edit
              </button>
            )}
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
                    <h3>{actualStartup?.name}</h3>
                    <p>
                      {actualStartup?.city} , {actualStartup?.country}{' '}
                    </p>
                    <p> {actualStartup?.address}</p>
                    <br />
                    <p>{actualStartup?.description}</p>
                  </div>
                  <div
                    className='col'
                    style={{
                      height: '220px',
                      marginTop: '150px',
                    }}
                  >
                    <div
                      style={{
                        height: '220px',
                        width: '280px',
                        marginLeft: '250px',
                        backgroundColor: 'white',
                        borderRadius: '30px',
                        boxShadow: 'inherit',
                      }}
                    >
                      <CardRatings />
                    </div>
                  </div>
                </div>
                <div
                  className='row'
                  style={{ marginTop: '120px', width: '60%' }}
                >
                  <div className='col-6'>
                    <div className='col-6'>
                      <i className='bi bi-people-fill'></i>{' '}
                      {actualStartup?.employee_range} employees
                    </div>

                    <div>
                      <i className='bi bi-flag-fill'></i> founded in{' '}
                      {actualStartup?.year_founded}
                    </div>
                    <div>
                      <i className='bi bi-globe'></i> www.{actualStartup?.name}
                      .com
                    </div>
                  </div>
                  <div className='col-6'>
                    {' '}
                    <p>Fundings : {actualStartup?.total_fundings} </p>
                    <p>Email : contact@{actualStartup?.name}.com</p>
                  </div>
                </div>
                <div style={{ marginTop: '100px' }}>
                  <div className='row'>
                    <div className='col-9'>
                      <h5 style={{ fontFamily: 'serif', fontSize: '30px' }}>
                        Photos{' '}
                      </h5>
                    </div>
                    {mystartupManage?.data?._id == id && (
                      <Popup
                        trigger={
                          <button
                            className='btn btn-success'
                            style={{
                              borderRadius: '15px',
                              margin: '10px',
                              width: '20%',
                              marginLeft: '950px',
                            }}
                          >
                            Add Photo
                          </button>
                        }
                        position='center'
                      >
                        <div
                          className='col-12'
                          style={{
                            backgroundColor: 'white',
                            height: '300px',
                            position: 'relative',
                          }}
                        >
                          <PhotoForm
                            url={'startup'}
                            photoChanger={setPhotos}
                            item={actualStartup}
                          />
                        </div>
                      </Popup>
                    )}
                  </div>
                  <div
                    className='overflow-auto'
                    style={{
                      width: '100%',
                      height: '300px',
                      backgroundColor: 'white',
                    }}
                  >
                    <div className='row'>
                      {photos?.map((p, i) => (
                        <div className='col-4 mb-3' key={i}>
                          <img
                            src={`http://localhost:8000/api/photo/startup/${p?._id}`}
                            alt={photos?.title}
                            className='mb-3'
                            style={{
                              maxHeight: '80%',
                              maxWidth: '80%',
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{ marginTop: '80px' }}>
                    <RelatedStartups props={id} />
                  </div>
                  <div
                    style={{
                      borderWidth: '20px',
                      borderColor: 'black',
                    }}
                  >
                    <div style={{ marginTop: '150px' }}>
                      <h4>Members List </h4>
                      <div
                        className='overflow-auto'
                        style={{
                          width: '100%',
                          height: '300px',
                          backgroundColor: 'white',
                        }}
                      >
                        <TableMembers />
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      borderWidth: '20px',
                      borderColor: 'black',
                    }}
                  >
                    <StartupReviews props={id} />
                    <div className='row'>
                      <div className='col-6'>
                        <h6 style={{ fontSize: '20px' }}>
                          {' '}
                          Do you Now {actualStartup?.name} ! give us your
                          feedback{' '}
                        </h6>
                      </div>
                      <div className='col-6'>
                        {user && (
                          <button
                            style={{ borderRadius: '20px' }}
                            className='btn btn-info'
                            onClick={() =>
                              router.push(`/startups/review/${id}`)
                            }
                          >
                            {' '}
                            write review
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                  <h5 style={{ fontSize: '20px', fontFamily: 'monospace' }}>
                    Contact
                  </h5>
                  <div className='row' style={{ marginTop: '30px' }}>
                    <div className='col-6'>
                      <h2>Maps</h2>
                    </div>
                    <div className='col-6'>
                      <button
                        className='btn btn-light'
                        style={{ marginLeft: '65%', borderRadius: '20px' }}
                      >
                        Update Location
                      </button>
                    </div>
                  </div>
                  <div style={{ position: 'relative' }}>
                    <div
                      style={{
                        height: '100%',
                        width: '90%',
                        backgroundColor: 'black',
                        marginLeft: '80px',
                        marginTop: '40px',
                        marginBottom: '80px',
                        borderStyle: 'solid',
                        borderWidth: '5px',
                      }}
                    >
                      <img
                        src='../../../images/logos/startupsBatiment.jpg'
                        style={{
                          width: '100%',
                          height: '100%',
                          opacity: '0.2',
                        }}
                      ></img>
                      <Map props={actualStartup} />
                    </div>
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

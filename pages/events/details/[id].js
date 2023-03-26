import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import Layout from '../../../components/Layout'
import ShowEventImage from '../../../components/ShowEventImage'
import { UserContext } from '../../../components/UserContext'
import { useContext } from 'react'
import ListParticipant from '../../../components/ListParticipant'
export default function Details() {
  const { user, setTokens, tokens, token } = useContext(UserContext)
  const [value, setValue] = useState('InfoEvent')
  const [photos, setPhotos] = useState()
  const [actualEvent, setActualEvent] = useState()
  const [participationRes, setParticipationRes] = useState()
  const [creator, setCreator] = useState()
  const [listParticipants, setListParticipants] = useState()
  const router = useRouter()
  const { id } = router.query

  async function listParticipantsInfo(id) {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/listParticipants/${id}`
      )
      setListParticipants(data)
    } catch (error) {
      console.log(error)
    }
  }
  async function creatorInfo(id) {
    try {
      const creatorInfo = await axios.get(
        `http://localhost:8000/api/user/${id}`
      )
      setCreator(creatorInfo)
    } catch (error) {
      console.log(error)
    }
  }
  async function getPhotos(id) {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/event/${id}/photos`
      )
      setPhotos(data)

      return data
    } catch (error) {
      console.error(error)
    }
  }
  async function getEvent(idEvent) {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/event/${idEvent}`
      )
      setActualEvent(data)
      creatorInfo(data?.creator)
      return data
    } catch (error) {
      console.error(error)
    }
  }
  async function participate(idEvent) {
    try {
      const { data } = await axios
        .post(
          `http://localhost:8000/api/participate/${idEvent}/${user?.data?._id}`,
          data,
          { headers: { Authorization: token } }
        )
        .then((res) => {
          setParticipationRes(res)
          console.log('i will get the list now')

          listParticipantsInfo(idEvent)
        })

      return data
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    const { id } = router.query
    getEvent(id)
    getPhotos(id)
    listParticipantsInfo(id)
  }, [router])
  const success = (participationRes) =>
    typeof participationRes?.data == 'object' && (
      <div className='alert alert-success'> participation successful</div>
    )
  const fail = (participationRes) =>
    participationRes?.data === 'you alredy participated !' && (
      <div className='alert alert-danger'> you are alredy participated !</div>
    )
  return (
    <Layout>
      {success(participationRes)}
      {fail(participationRes)}
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
        <div className='row'>
          <div
            className='col-3'
            style={{
              position: 'absolute',
              marginTop: '200px',
              marginLeft: '8px',
            }}
          >
            <ShowEventImage props={actualEvent} url='event' />
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
                  >
                    <i className='bi bi-info-circle-fill'></i> &nbsp; About
                  </button>
                </div>
                <div className='col'>
                  <button
                    style={{ width: '220px', borderRadius: '30px' }}
                    className='btn btn-primary'
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
                    <i className='bi bi-camera-fill'></i> &nbsp; Photos
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
                    <i className='bi bi-star-fill'></i>
                    &nbsp;Reviews
                  </button>
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
                    <h3>{actualEvent?.title}</h3>
                    <p>
                      {actualEvent?.city} , {actualEvent?.country}{' '}
                    </p>
                    <br />
                    <p>
                      {actualEvent?.description} What is an Event Description?
                      An event description is a text or copy that tells
                      audiences all the essential details about your event.
                      These details should come together so that it compels
                      potential attendees to register
                    </p>
                    <p> created by : {creator?.data?.username}</p>
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
                        marginLeft: '70%',
                        backgroundColor: 'white',
                        borderRadius: '30px',
                        boxShadow: 'inherit',
                      }}
                    >
                      {user && (
                        <button
                          className=' btn btn-info mb-2'
                          style={{
                            borderRadius: '30px',
                            position: 'relative',
                            width: '100%',
                            height: '100%',
                          }}
                          onClick={() => participate(id)}
                        >
                          {' '}
                          Participate{' '}
                        </button>
                      )}
                      {creator?.data?.username == user?.data?.username && (
                        <button
                          className=' btn btn-primary'
                          style={{
                            borderRadius: '30px',
                            position: 'relative',
                            width: '100%',
                            height: '100%',
                          }}
                          onClick={() => router.push(`/events/update/${id}`)}
                        >
                          {' '}
                          Edit{' '}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                <div
                  className='row'
                  style={{ marginTop: '120px', width: '60%' }}
                >
                  <div className='col-6'>
                    <div className='col-6'>
                      <i className='bi bi-people-fill'></i> 10 participates
                    </div>

                    <div>
                      <i className='bi bi-flag-fill'></i> start date :{' '}
                      {actualEvent?.start_date}
                    </div>
                    <div>
                      <i className='bi bi-flag-fill'></i> End date :{' '}
                      {actualEvent?.end_date}
                    </div>
                  </div>
                  <div className='col-6'>
                    <i className='bi bi-globe'></i> website
                  </div>
                </div>
                <div style={{ marginTop: '100px' }}>
                  <h5 style={{ fontFamily: 'serif', fontSize: '30px' }}>
                    Photos{' '}
                  </h5>
                  <div
                    className='overflow-auto'
                    style={{
                      width: '100%',
                      height: '300px',
                      backgroundColor: 'white',
                    }}
                  >
                    <div className='row'>
                      {photos?.map((e, i) => (
                        <div className='col-4 mb-3' key={i}>
                          <img
                            src={`http://localhost:8000/api/photo/event/${e?._id}`}
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
                  <div style={{ marginTop: '80px' }}></div>
                  <div
                    style={{
                      borderWidth: '20px',
                      borderColor: 'black',
                    }}
                  ></div>
                  <h5 style={{ fontSize: '20px', fontFamily: 'monospace' }}>
                    List Participants
                  </h5>
                  <div>
                    <div
                      className='overflow-auto'
                      style={{
                        width: '100%',
                        height: '300px',
                        backgroundColor: 'white',
                      }}
                    >
                      <ListParticipant props={listParticipants} />
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

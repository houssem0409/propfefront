import React from 'react'
import { UserContext } from './UserContext'
import { useContext, useState, useEffect } from 'react'
import axios from 'axios'

export default function MyEventParticipations() {
  const { user, setTokens, tokens, token } = useContext(UserContext)
  const [myevents, setMyEvents] = useState()
  const [participations, setParticipations] = useState()
  const idParticipator = user?.data?._id

  async function getMyParticipations(id) {
    var events = []

    try {
      const data = await axios.get(
        `http://localhost:8000/api/participation/${id}`
      )
      data?.data?.map(async (p, e) => {
        try {
          const data = await axios.get(
            `http://localhost:8000/api/event/${p?.event}`
          )

          events.push(data?.data)
        } catch (error) {
          console.error(error)
        }
      })
      setMyEvents(events)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getMyParticipations(idParticipator)
  }, [])
  const showNoData = () => (
    <div
      className='alert alert-danger'
      style={{ display: myevents?.length < 1 ? '' : 'none' }}
    >
      You didn't participate at any event yet !
    </div>
  )
  return (
    <div
      className='col-12'
      style={{ backgroundColor: '#a1a1a1', height: '100%' }}
    >
      {showNoData()}
      {myevents?.map((evnt, e) => (
        <div key={e} className='accordion-item'>
          <h2 className='accordion-header' id='headingTwo'>
            <button
              className='accordion-button collapsed'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#collapseTwo'
              aria-expanded='false'
              aria-controls='collapseTwo'
            >
              <div className='row'>
                <div className='col-3'>
                  <i
                    className='bi bi-calendar-event'
                    style={{ fontSize: '30px' }}
                  ></i>
                </div>
                <div className='col-9'>
                  <h5>{evnt?.title}</h5> <br />
                  <p>{evnt?.description} </p>
                </div>
              </div>
            </button>
          </h2>
        </div>
      ))}
    </div>
  )
}

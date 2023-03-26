import React from 'react'
import { UserContext } from './UserContext'
import { useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

export default function MyEventsCreated() {
  const { user, setTokens, tokens, token } = useContext(UserContext)
  const [myevents, setMyEvents] = useState()
  const [noData, setNoData] = useState()
  const idCreator = user?.data?._id
  const router = useRouter()
  async function getMyEvents(id) {
    try {
      const data = await axios.get(`http://localhost:8000/api/events/${id}`)

      setMyEvents(data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getMyEvents(idCreator)
  }, [])
  const showNoData = () => (
    <div
      className='alert alert-danger'
      style={{ display: myevents?.data?.length < 1 ? '' : 'none' }}
    >
      You didn't Create any event yet !
    </div>
  )
  return (
    <div>
      <div
        className='col-12'
        style={{ backgroundColor: '#a1a1a1', height: '100%' }}
      >
        {myevents?.data?.map((evnt, e) => (
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
                  <div
                    className='col-9'
                    onClick={() => router.push(`/events/details/${evnt?._id}`)}
                  >
                    <h5>{evnt?.title}</h5> <br />
                    <p>{evnt?.description} </p>
                  </div>
                </div>
              </button>
            </h2>
          </div>
        ))}
        {showNoData()}
      </div>
    </div>
  )
}

import React from 'react'
import Info from '../../../../components/Info'
import MyStartup from '../../../../components/MyStartup'
import MyEventsCreated from '../../../../components/MyEventsCreated'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import Layout from '../../../../components/Layout'
import AdminLinks from '../../../../components/AdminLinks'
import CardStartup from '../../../../components/CardStartup'
import InfoStartup from '../../../../components/InfoStartup'
import ShowImage from '../../../../components/ShowImage'
import StartupPhotos from '../../../../components/StartupPhotos'
import InfoEvent from '../../../../components/Event/InfoEvent'
import Actors from '../../../../components/Event/Actors'
import EventPhotos from '../../../../components/Event/EventPhotos'
import CardEvent from '../../../../components/Event/CardEvent'
import ShowPhoto from '../../../../components/ShowPhoto'
export default function Details() {
  const [value, setValue] = useState('InfoEvent')
  const [actualEvent, setActualEvent] = useState()
  const router = useRouter()
  async function getEvent(idEvent) {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/event/${idEvent}`
      )
      setActualEvent(data)
      console.log(data)

      return data
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    const { id } = router.query

    getEvent(id)
  }, [router])
  console.log(value)
  return (
    <Layout>
      <div className='row'>
        <div className='col-3'>
          <AdminLinks />
        </div>
        <div className='col-9'>
          <ShowImage props={actualEvent} url='event' />
          <div className='col-9'>
            <CardEvent props={actualEvent} />
          </div>
          <div className='col-12' style={{ padding: '30px' }}>
            <div>
              <div>
                <div class='container'>
                  <div class='row row-cols-4'>
                    <div class='col'>
                      <button
                        className='btn btn-primary'
                        onClick={(e) => {
                          setValue('InfoEvent')
                        }}
                      >
                        Info
                      </button>
                    </div>
                    <div className='col'>
                      <button
                        className='btn btn-primary'
                        onClick={(e) => {
                          setValue('Actors')
                        }}
                      >
                        Actors
                      </button>
                    </div>
                    <div className='col'>
                      <button
                        className='btn btn-primary'
                        onClick={(e) => {
                          setValue('EventPhotos')
                        }}
                      >
                        Event Photos
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className='col-12'>
                {value == 'InfoEvent' && <InfoEvent props={actualEvent} />}
                {value == 'Actors' && <Actors />}
                {value == 'EventPhotos' && (
                  <ShowPhoto item={actualEvent} url='event' />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ margin: '20px', padding: '10px' }}></div>
    </Layout>
  )
}

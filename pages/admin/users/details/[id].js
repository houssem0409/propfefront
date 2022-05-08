import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import AdminLinks from '../../../../components/AdminLinks'
import CardUser from '../../../../components/CardUser'
import Info from '../../../../components/Info'
import Layout from '../../../../components/Layout'
import MyEventParticipation from '../../../../components/MyEventParticipation'
import MyEventsCreated from '../../../../components/MyEventsCreated'
import MyStartup from '../../../../components/MyStartup'

export default function Details() {
  const [value, setValue] = useState('Info')
  const [actualuser, setActualuser] = useState()
  const router = useRouter()
  async function getUser(id) {
    try {
      const { data } = await axios.get(`http://localhost:8000/api/user/${id}`)
      setActualuser(data)
      console.log(data)

      return data
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    const { id } = router.query
    console.log(id)

    getUser(id)
  }, [router])
  console.log(value)
  return (
    <Layout>
      <div className='row'>
        <div className='col-3'>
          <AdminLinks />
        </div>
        <div className='col-9'>
          <div className='col-9'>
            <CardUser props={actualuser} />
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
                          setValue('Info')
                        }}
                      >
                        Info
                      </button>
                    </div>
                    <div class='col'>
                      <button
                        className='btn btn-primary'
                        onClick={(e) => {
                          setValue('MyStartup')
                        }}
                      >
                        Startup
                      </button>
                    </div>
                    <div class='col'>
                      <button
                        className='btn btn-primary'
                        onClick={(e) => {
                          setValue('MyEventsCreated')
                        }}
                      >
                        Events Created
                      </button>
                    </div>
                    <div class='col'>
                      <button
                        className='btn btn-primary'
                        onClick={(e) => {
                          setValue('MyEventParticipation')
                        }}
                      >
                        Events Participation
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className='col-12'>
                {value == 'Info' && <Info />}
                {value == 'MyStartup' && <MyStartup />}
                {value == 'MyEventsCreated' && <MyEventsCreated />}
                {value == 'MyEventParticipation' && <MyEventParticipation />}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ margin: '20px', padding: '10px' }}></div>
    </Layout>
  )
}

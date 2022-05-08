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
import ShowPhoto from '../../../../components/ShowPhoto'
export default function Details() {
  const [value, setValue] = useState('Info')
  const [actualStartup, setActualStartup] = useState()
  const [photos, setPhotos] = useState()
  const router = useRouter()
  const { id } = router.query

  async function getStartup(idStartup) {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/startup/${idStartup}`
      )
      setActualStartup(data)
      console.log(data)

      return data
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    const { id } = router.query

    getStartup(id)
  }, [router])
  return (
    <Layout>
      <div className='row'>
        <div className='col-3'>
          <AdminLinks />
        </div>
        <div className='col-9'>
          <ShowImage props={actualStartup} url='startup' />
          <div className='col-9'>
            <CardStartup props={actualStartup} />
          </div>
          <div className='col-12' style={{ padding: '30px' }}>
            <div>
              <div>
                <div className='container'>
                  <div className='row row-cols-4'>
                    <div className='col'>
                      <button
                        className='btn btn-primary'
                        onClick={(e) => {
                          setValue('Info')
                        }}
                      >
                        Info
                      </button>
                    </div>
                    <div className='col'>
                      <button
                        className='btn btn-primary'
                        onClick={(e) => {
                          setValue('MyStartup')
                        }}
                      >
                        Startup
                      </button>
                    </div>
                    <div className='col'>
                      <button
                        className='btn btn-primary'
                        onClick={(e) => {
                          setValue('MyEventsCreated')
                        }}
                      >
                        Events Created
                      </button>
                    </div>
                    <div className='col'>
                      <button
                        className='btn btn-primary'
                        onClick={(e) => {
                          setValue('StartupPhotos')
                        }}
                      >
                        Startup Photos
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className='col-12'>
                {value == 'Info' && <InfoStartup props={actualStartup} />}
                {value == 'MyStartup' && <MyStartup />}
                {value == 'MyEventsCreated' && <MyEventsCreated />}
                {value == 'StartupPhotos' && (
                  <ShowPhoto item={actualStartup} url='startup' />
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

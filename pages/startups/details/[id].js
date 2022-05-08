import React from 'react'
import Layout from '../../../components/Layout'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Info from '../../../components/Info'
import ShowPhoto from '../../../components/ShowPhoto'
import MyStartup from '../../../components/MyStartup'
import MyEventsCreated from '../../../components/MyEventsCreated'
import StartupPhotos from '../../../components/StartupPhotos'
import InfoStartup from '../../../components/InfoStartup'
import { useRouter } from 'next/router'
export default function index() {
  const [value, setValue] = useState('Info')
  const router = useRouter()
  const { id } = router.query
  return (
    <Layout>
      <div>
        <div>
          <div className='row'>
            <div className='col-3'>
              <h4 style={{ marginTop: '40px' }}>
                list Startups search and filters
              </h4>
            </div>

            <div className='col-9'>
              <div>
                <div style={{ margin: '30px' }} className='col-9'>
                  <form className='d-flex'>
                    <input
                      className='form-control me-2'
                      type='search'
                      placeholder='Search'
                      aria-label='Search'
                    />
                    <button className='btn btn-warrning' type='submit'>
                      <i class='bi bi-search'></i>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div>
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
                  {value == 'Info' && <InfoStartup />}
                  {value == 'MyStartup' && <MyStartup />}
                  {value == 'MyEventsCreated' && <MyEventsCreated />}
                  {value == 'StartupPhotos' && <ShowPhoto />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

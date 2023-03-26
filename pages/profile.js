import React from 'react'
import Layout from '../components/Layout'
import { UserContext } from '../components/UserContext'
import { useContext, useState, useEffect } from 'react'
import ProfileInfo from '../components/ProfileInfo'
import MyEventsCreated from '../components/MyEventsCreated'
import Authorization from '../components/Authorization'
import MyEventParticipations from '../components/MyEventParticipation'
function profile() {
  const { user, setTokens, tokens, token } = useContext(UserContext)
  const [value, setValue] = useState('ProfileInfo')

  return (
    <Layout>
      <div>
        <div className='jumbotron' style={{ height: '100%', width: '100%' }}>
          <h3 style={{ padding: '100px' }}>
            {' '}
            Welcome {user?.data?.username} To Your Profile
          </h3>
        </div>
        <div className='container' style={{ height: '100%', width: '100%' }}>
          <div className='row' style={{ height: '100%', width: '100%' }}>
            <div
              className='col-3'
              style={{ backgroundColor: '#e1e1e1', height: '100%' }}
            >
              <div>
                <h4> Account Settings </h4>
                <button
                  type='button'
                  className='btn btn-lg btn-primary'
                  style={{
                    backgroundColor: '#a1a1a1',
                    width: '100%',
                    margin: '5px',
                  }}
                  onClick={(e) => {
                    setValue('ProfileInfo')
                  }}
                >
                  Your Info
                </button>
                <button
                  type='button'
                  className='btn btn-lg btn-primary'
                  style={{
                    backgroundColor: '#a1a1a1',
                    width: '100%',
                    margin: '5px',
                  }}
                  onClick={(e) => {
                    setValue('MyEventsCreated')
                  }}
                >
                  Your Events
                </button>
                <h4> Integrations </h4>

                <button
                  type='button'
                  className='btn btn-lg btn-primary'
                  style={{
                    backgroundColor: '#a1a1a1',
                    width: '100%',
                    margin: '5px',
                  }}
                  onClick={(e) => {
                    setValue('MyEventParticipations')
                  }}
                >
                  Your Participations
                </button>
              </div>
              <p style={{ color: 'black' }}> </p>
            </div>
            <div
              className='col-9'
              style={{ backgroundColor: '#a1a1a1 ', height: '100%' }}
            >
              {value == 'ProfileInfo' && <ProfileInfo props={user} />}
              {value == 'MyEventsCreated' && <MyEventsCreated />}
              {value == 'MyEventParticipations' && <MyEventParticipations />}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
export default Authorization(profile, ['admin', 'director', 'member', 'user'])

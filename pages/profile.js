import { width } from '@mui/material/node_modules/@mui/system'
import React from 'react'
import Layout from '../components/Layout'
import { UserContext } from '../components/UserContext'
import { useContext, useState, useEffect } from 'react'
import axios from 'axios'
import ProfileInfo from '../components/ProfileInfo'
import '../styles/Home.module.css'
export default function profile() {
  const { user, setTokens, tokens, token } = useContext(UserContext)

  return (
    <Layout>
      <div>
        <div className='jumbotron' style={{ height: '200px' }}></div>
        <div className='container' style={{ height: '700px', width: '100%' }}>
          <div className='row' style={{ height: '100%', width: '100%' }}>
            <div className='col-3' style={{ backgroundColor: '#F2C0B5' }}>
              <div>
                <h4> Account Settings </h4>
                <button
                  type='button'
                  className='btn btn-lg btn-primary'
                  style={{
                    backgroundColor: 'turquoise',
                    width: '100%',
                    margin: '5px',
                  }}
                >
                  Your Info
                </button>
                <button
                  type='button'
                  className='btn btn-lg btn-primary'
                  style={{
                    backgroundColor: 'turquoise',
                    width: '100%',
                    margin: '5px',
                  }}
                >
                  Primary button
                </button>
                <h4> Integrations </h4>

                <button
                  type='button'
                  className='btn btn-lg btn-primary'
                  style={{
                    backgroundColor: 'turquoise',
                    width: '100%',
                    margin: '5px',
                  }}
                >
                  Primary button
                </button>
                <button
                  type='button'
                  className='btn btn-lg btn-primary'
                  style={{
                    backgroundColor: 'turquoise',
                    width: '100%',
                    margin: '5px',
                  }}
                >
                  Primary button
                </button>
              </div>
              <p style={{ color: 'black' }}> </p>
            </div>
            <div className='col-9' style={{ backgroundColor: '#A4CFB1 ' }}>
              <ProfileInfo props={user} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

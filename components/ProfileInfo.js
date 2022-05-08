import React, { useEffect } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { UserContext } from './UserContext'
import { useContext } from 'react'
import Popup from 'reactjs-popup'
import { PhotoForm } from './PhotoEventForm'
import { UserForm } from './UserForm'
import 'reactjs-popup/dist/index.css'

export default function ProfileInfo({ props }) {
  const { user, setTokens, tokens, getUserInfo, setUser, token } =
    useContext(UserContext)

  const UpdateProfile = () => {
    getUserInfo(token)
  }
  useEffect(() => {}, [])
  console.log(user)
  return (
    <div>
      <div className='accordion' id='accordionExample'>
        <div className='accordion-item'>
          <h2 className='accordion-header' id='headingTwo'>
            <Popup
              trigger={
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
                      <i className='bi bi-person-circle'></i>
                    </div>
                    <div className='col-9'>
                      {user?.data?.username
                        ? user?.data?.username
                        : user?.username}
                      <br />
                      {user?.data?.email ? user?.data?.email : user?.email}
                    </div>
                  </div>
                </button>
              }
              position=' center'
              width='400px'
              marginRight='200px'
            >
              <div
                className='col-12'
                style={{
                  marginRight: '200px',
                  backgroundColor: 'white',
                  height: '600px',
                  width: '600px',
                  position: 'center',
                  border: '3px',
                  borderColor: 'black',
                }}
              >
                <UserForm props={user} url='profile' />
              </div>
            </Popup>
          </h2>
        </div>
        <div className='accordion-item'>
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
                  <i className='bi bi-unlock-fill'></i>
                </div>
                <div className='col-9'>
                  <h5>Password</h5> <br />
                  <p>************</p>
                </div>
              </div>
            </button>
          </h2>
        </div>
        <div className='accordion-item'>
          <h2 className='accordion-header' id='headingThree'>
            <button
              className='accordion-button collapsed'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#collapseThree'
              aria-expanded='false'
              aria-controls='collapseThree'
            >
              Accordion Item #3
            </button>
          </h2>
        </div>
      </div>
    </div>
  )
}

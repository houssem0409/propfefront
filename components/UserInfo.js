import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar'

export default function UserInfo({ props }) {
  const [actualUser, setActualUser] = useState()

  async function getUserInfo() {
    try {
      const data = await axios.get(`http://localhost:8000/api/user/${props}`)
      setActualUser(data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getUserInfo()
  }, [])
  return (
    <div>
      <div className='row'>
        <div className='col-6'>
          <Avatar
            sx={{
              boxShadow: 3,
              marginRight: 4,
              color: 'common.white',
              backgroundColor: 'blue',
            }}
          >
            {actualUser?.data?.username[0]}
          </Avatar>
        </div>
        <div className='col-6'>
          <h6>{actualUser?.data?.username}</h6>
        </div>
      </div>
    </div>
  )
}

import React, { useEffect, useState } from 'react'
import { UserForm } from '../../../components/UserForm'
import Layout from '../../../components/Layout'
import AdminLinks from '../../../components/AdminLinks'
import { useRouter } from 'next/router'
import axios from 'axios'
export default function Update() {
  const [user, setUser] = useState()
  const router = useRouter()
  const { id } = router.query
  console.log(id)

  async function getUser(idUser) {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/user/${idUser}`
      )
      setUser(data)
      console.log(data)

      return data
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    getUser(id)
  }, [])
  console.log(user)
  return (
    <Layout>
      <div className='row'>
        <div className='col-3'>
          <AdminLinks />
        </div>
        <div className='col-9'>
          <UserForm props={user} />
        </div>
      </div>
      <div style={{ margin: '20px', padding: '10px' }}></div>
    </Layout>
  )
}

import React from 'react'
import { StartupForm } from '../../../components/StartupForm'
import Layout from '../../../components/Layout'
import AdminLinks from '../../../components/AdminLinks'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
export default function Update() {
  const [startup, setStartup] = useState()
  const router = useRouter()
  const { id } = router.query
  console.log(id)
  async function getStartup(idStartup) {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/startup/${idStartup}`
      )
      setStartup(data)
      console.log(data)

      return data
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    getStartup(id)
  }, [])
  return (
    <Layout>
      <div className='row'>
        <div className='col-3'>
          <AdminLinks />
        </div>
        <div className='col-9'>
          <StartupForm props={startup} />
        </div>
      </div>
      <div style={{ margin: '20px', padding: '10px' }}></div>
    </Layout>
  )
}

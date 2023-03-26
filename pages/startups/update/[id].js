import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Layout from '../../../components/Layout'
import { useRouter } from 'next/router'
import { StartupForm } from '../../../components/StartupForm'
import Authorization from '../../../components/Authorization'

function Update() {
  const router = useRouter()
  const [startup, setStartup] = useState()
  const { id } = router.query
  async function getStartup(id) {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/startup/${id}`
      )
      setStartup(data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    const { id } = router.query

    getStartup(id)
  }, [id])
  return (
    <Layout>
      <div className='container' style={{ width: '70%', marginTop: '30px' }}>
        {' '}
        <h3
          style={{ fontSize: '20px', fontFamily: 'serif', marginLeft: '250px' }}
        >
          Edit Your Startup
        </h3>
        <StartupForm props={startup} />
      </div>
    </Layout>
  )
}
export default Authorization(Update, ['director'])

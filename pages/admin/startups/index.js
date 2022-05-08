import TableStartups from '../../../components/TableStartups'
import AdminLinks from '../../../components/AdminLinks'
import Layout from '../../../components/Layout'
import { useEffect, useState } from 'react'
import axios from 'axios'
export default function index() {
  const [startups, setStartups] = useState()
  const [error, setError] = useState()
  async function getStartups() {
    try {
      const { data } = await axios.get('http://localhost:8000/api/startups')
      setStartups(data)
      console.log(data)

      return data
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    getStartups()
  }, [])

  const removeStartup = async (id) => {
    try {
      const startupRemoved = await axios.delete(
        `http://localhost:8000/api/startup/${id}`
      )
      getStartups()
      toast('User deleted successfully', {
        type: toast.TYPE.SUCCESS,
        autoClose: 3000,
      })
    } catch (err) {
      setError({ error: err.message })
    }
  }
  return (
    <Layout>
      <div className='row'>
        <div className='col-3'>
          <AdminLinks />
        </div>
        <div className='col-9'>
          <TableStartups props={startups} removeStartup={removeStartup} />
        </div>
      </div>
      <div style={{ margin: '20px', padding: '10px' }}></div>
    </Layout>
  )
}

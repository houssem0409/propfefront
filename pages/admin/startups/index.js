import TableStartups from '../../../components/TableStartups'
import AdminLinks from '../../../components/AdminLinks'
import Layout from '../../../components/Layout'
import { useEffect, useState } from 'react'
import axios from 'axios'
export default function index() {
  const [startups, setStartups] = useState()
  const [error, setError] = useState()
  const [limit, setLimit] = useState(10)
  async function getStartups(limit) {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/startups/${limit}`
      )

      setStartups(data)
      console.log(data)

      return data
    } catch (error) {
      console.error(error)
    }
  }
  const loadmore = () => {
    setLimit(limit + 10)
  }
  useEffect(() => {
    getStartups(limit)
  }, [limit])

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
          <h5 style={{ fontSize: '25px', marginLeft: '30%' }}>
            {' '}
            List Startups
          </h5>
          <TableStartups props={startups} removeStartup={removeStartup} />
          <button
            style={{ borderRadius: '15px', marginLeft: '35px' }}
            className='btn btn-primary'
            onClick={() => {
              loadmore()
            }}
          >
            load more
          </button>
        </div>
      </div>
      <div style={{ margin: '20px', padding: '10px' }}></div>
    </Layout>
  )
}

import Table from '../../../views/dashboard/Table'
import AdminLinks from '../../../components/AdminLinks'
import Layout from '../../../components/Layout'
import TableEvents from '../../../components/TableEvents'
import { useEffect, useState } from 'react'
import axios from 'axios'
export default function index() {
  const [events, setEvents] = useState()
  const [error, setError] = useState()
  const [limit, setLimit] = useState(10)
  async function getEvents(limit) {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/events/limit/${limit}`
      )
      setEvents(data)
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
    getEvents(limit)
  }, [limit])
  const removeEvent = async (id) => {
    try {
      const eventRemoved = await axios.delete(
        `http://localhost:8000/api/event/${id}`
      )
      getEvents()
      toast('Event deleted successfully', {
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
          <h5 style={{ fontSize: '25px', marginLeft: '30%' }}> List Events</h5>
          <TableEvents props={events} removeEvent={removeEvent} />
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

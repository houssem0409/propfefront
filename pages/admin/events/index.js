import Table from '../../../views/dashboard/Table'
import AdminLinks from '../../../components/AdminLinks'
import Layout from '../../../components/Layout'
import TableEvents from '../../../components/TableEvents'
import { useEffect, useState } from 'react'
import axios from 'axios'
export default function index() {
  const [events, setEvents] = useState()
  const [error, setError] = useState()
  async function getEvents() {
    try {
      const { data } = await axios.get('http://localhost:8000/api/events')
      setEvents(data)
      console.log(data)

      return data
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    getEvents()
  }, [])
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
          <TableEvents props={events} removeEvent={removeEvent} />
        </div>
      </div>
      <div style={{ margin: '20px', padding: '10px' }}></div>
    </Layout>
  )
}

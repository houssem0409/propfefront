import AdminLinks from '../../../components/AdminLinks'
import Layout from '../../../components/Layout'
import { useEffect, useState } from 'react'
import axios from 'axios'
import TableUsers from '../../../components/TableUsers'
import { toast, ToastContainer } from 'react-toastify'
export default function index() {
  const [users, setUsers] = useState()
  const [error, setError] = useState()

  async function getUsers() {
    try {
      const { data } = await axios.get('http://localhost:8000/api/users')
      setUsers(data)
      console.log(data)

      return data
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    getUsers()
  }, [])

  const removeUser = async (id) => {
    try {
      const userRemoved = await axios.delete(
        `http://localhost:8000/api/user/delete/${id}`
      )
      toast('User deleted successfully', {
        type: toast.TYPE.SUCCESS,
        autoClose: 3000,
      })
      getUsers()
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
        <div className='col-9' style={{ padding: '30px' }}>
          <TableUsers props={users} removeUser={removeUser} />
        </div>
      </div>
      <div style={{ margin: '20px', padding: '10px' }}></div>
    </Layout>
  )
}

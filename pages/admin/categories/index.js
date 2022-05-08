import AdminLinks from '../../../components/AdminLinks'
import Layout from '../../../components/Layout'
import { useEffect, useState } from 'react'
import axios from 'axios'
import TableCategories from '../../../components/TableCategories'
export default function index() {
  const [categories, setCategories] = useState()
  const [error, setError] = useState()
  async function getCategories() {
    try {
      const { data } = await axios.get('http://localhost:8000/api/categories')
      setCategories(data)
      console.log(data)

      return data
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    getCategories()
  }, [])
  const removeCategory = async (id) => {
    try {
      const CategoryRemoved = await axios.delete(
        `http://localhost:8000/api/category/${id}`
      )
      getCategories()
      toast('Category deleted successfully', {
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
          <TableCategories props={categories} removeCategory={removeCategory} />
        </div>
      </div>
      <div style={{ margin: '20px', padding: '10px' }}></div>
    </Layout>
  )
}

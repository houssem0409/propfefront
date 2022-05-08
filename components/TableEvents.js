import React from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Link from 'next/link'
import { useRouter } from 'next/router'
export default function TableEvents({ props, removeEvent }) {
  const router = useRouter()
  return (
    <div>
      <div
        style={{ display: 'flexDirection', flexDirection: 'row' }}
        className='d-flex flex-row bd-highlight mb-12'
      >
        <div style={{ margin: '30px' }} className='col-9'>
          <form className='d-flex'>
            <input
              className='form-control me-2'
              type='search'
              placeholder='Search'
              aria-label='Search'
            />
            <button className='btn btn-outline-success' type='submit'>
              Search
            </button>
          </form>
        </div>
        <div
          className=' col-3'
          style={{ marginLeft: '100px', marginTop: '30px' }}
        >
          <Link href='/admin/events/add' className='btn btn-success'>
            <button className='btn btn-successs'>
              <i className='bi bi-plus-circle'></i>
            </button>
          </Link>
        </div>
      </div>
      <table
        className='table table-dark table-striped'
        style={{ padding: '30px', margin: '30px' }}
      >
        <thead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Title</th>
            <th scope='col'>Address</th>
            <th scope='col'>country</th>
            <th scope='col'>Action</th>
            <th scope='col'>Action</th>
          </tr>
        </thead>
        <tbody>
          {props?.map((row) => (
            <tr key={row?._id}>
              <th scope='row'></th>
              <td>{row?.title}</td>
              <td>{row?.address}</td>
              <td>{row?.country}</td>
              <td>
                <button
                  className='btn btn-danger'
                  onClick={() => removeEvent(row?._id)}
                >
                  <i className='bi bi-trash3'></i>
                </button>
              </td>
              <td>
                <button
                  className='btn btn-success'
                  onClick={() => router.push(`/admin/events/${row?._id}`)}
                >
                  <i className='bi bi-pencil-square'></i>
                </button>
              </td>
              <td>
                <button
                  className='btn btn-success'
                  onClick={() =>
                    router.push(`/admin/events/details/${row?._id}`)
                  }
                >
                  Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

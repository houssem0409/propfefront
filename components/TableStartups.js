import React from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Link from 'next/link'
import { useRouter } from 'next/router'
export default function TableStartups({ props, removeStartup }) {
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
          <Link href='/admin/startups/add' className='btn btn-success'>
            <button className='btn btn-successs'>
              <i className='bi bi-plus-circle' style={{ fontSize: '30px' }}></i>
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
            <th scope='col'>name</th>
            <th scope='col'>Email</th>
            <th scope='col'>country</th>
            <th scope='col'>Action</th>
            <th scope='col'>Action</th>
          </tr>
        </thead>
        <tbody>
          {props?.map((row) => (
            <tr key={row?._id}>
              <th scope='row'></th>
              <td key={row?.name}>{row?.name}</td>
              <td key={row?.email}>{row?.email}</td>
              <td key={row?.country}>{row?.country}</td>
              <td>
                <button
                  className='btn btn-danger'
                  onClick={() => removeStartup(row?._id)}
                >
                  <i className='bi bi-trash3'></i>
                </button>
              </td>
              <td>
                <button
                  className='btn btn-success'
                  onClick={() => router.push(`/admin/startups/${row?._id}`)}
                >
                  <i className='bi bi-pencil-square'></i>
                </button>
              </td>
              <td>
                <button
                  style={{ borderRadius: '20px' }}
                  className='btn btn-info'
                  onClick={() =>
                    router.push(`/admin/startups/details/${row?._id}`)
                  }
                >
                  <i class='bi bi-eye' style={{ fontSize: '20px' }}></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

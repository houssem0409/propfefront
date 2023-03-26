import React, { useContext } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { UserContext } from './UserContext'

export default function TableUsers({ props, removeUser }) {
  const { user } = useContext(UserContext)
  const router = useRouter()
  return (
    <div>
      {user?.data?.role == 'admin' && (
        <Link href='/admin/users/add' className='btn btn-success'>
          <button className='btn btn-successs' style={{ textAlign: 'left' }}>
            <i
              className='bi bi-person-plus-fill'
              style={{ fontSize: '30px' }}
            ></i>
          </button>
        </Link>
      )}

      <table
        className='table table-dark table-striped'
        style={{ padding: '0px', margin: '0px' }}
      >
        <thead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>name</th>
            <th scope='col'>Email</th>
            <th scope='col'>Role</th>
          </tr>
        </thead>
        <tbody>
          {props?.map((row) => (
            <tr key={row?._id}>
              <th scope='row'></th>
              <td>{row?.username}</td>
              <td>{row?.email}</td>
              <td>{row?.role}</td>
              <td>
                {user?.data?.role == 'admin' && (
                  <button
                    className='btn btn-danger'
                    onClick={() => removeUser(row?._id)}
                  >
                    <i className='bi bi-trash3'></i>
                  </button>
                )}
              </td>
              <td>
                {user?.data?.role == 'admin' && (
                  <button
                    className='btn btn-success'
                    onClick={() => router.push(`/admin/users/${row?._id}`)}
                  >
                    <i className='bi bi-pencil-square'></i>
                  </button>
                )}
              </td>
              <td>
                {user?.role == 'admin' ? (
                  <button
                    style={{ borderRadius: '20px' }}
                    className='btn btn-info'
                    onClick={() =>
                      router.push(`/admin/users/details/${row?._id}`)
                    }
                  >
                    <i class='bi bi-eye' style={{ fontSize: '20px' }}></i>
                  </button>
                ) : (
                  <button
                    style={{ borderRadius: '20px' }}
                    className='btn btn-info'
                    onClick={() => router.push(`/users/details/${row?._id}`)}
                  >
                    <i class='bi bi-eye' style={{ fontSize: '20px' }}></i>
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

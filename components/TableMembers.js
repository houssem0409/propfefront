import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { UserContext } from './UserContext'
import axios from 'axios'
import Popup from './Popup'
import SearchUsers from './SearchUsers'

export default function TableMembers() {
  const { user, mystartupManage } = useContext(UserContext)
  const [members, setMembers] = useState()
  const router = useRouter()
  const { id } = router.query
  async function removeUser(idMember) {
    try {
      await axios.put(`http://localhost:8000/api/removeMember/${idMember}`)
      getListeMembers(id)
    } catch (error) {
      console.log(error)
    }
  }
  async function getListeMembers(id) {
    try {
      const res = await axios.get(`http://localhost:8000/api/members/${id}`)
      setMembers(res)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    const { id } = router.query

    getListeMembers(id)
  }, [id])
  return (
    <div>
      {user?.data?.role == 'director' && user?.data?.startup == id && (
        <SearchUsers membersChanger={setMembers} />
      )}

      <table className='table' style={{ padding: '30px', margin: '30px' }}>
        <tbody>
          {members?.data?.map((member, e) => (
            <tr key={e}>
              <th scope='row'></th>
              <td>{member?.username}</td>
              <td>{member?.email}</td>
              <td>
                {user?.data?.role == 'director' && (
                  <button
                    style={{ borderRadius: '20px' }}
                    className='btn btn-danger'
                    onClick={() => removeUser(member?._id)}
                  >
                    <i className='bi bi-trash3'></i>
                  </button>
                )}
              </td>

              <td>
                {user?.data?.role == 'admin' ? (
                  <button
                    className='btn btn-success'
                    style={{ borderRadius: '20px' }}
                    onClick={() =>
                      router.push(`/admin/users/details/${member?._id}`)
                    }
                  >
                    <i className='bi bi-eye' style={{ fontSize: '20px' }}></i>
                  </button>
                ) : (
                  <button
                    className='btn btn-success'
                    style={{ borderRadius: '20px' }}
                    onClick={() => router.push(`/users/details/${member?._id}`)}
                  >
                    <i className='bi bi-eye' style={{ fontSize: '20px' }}></i>
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

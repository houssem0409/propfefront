import React from 'react'

export default function ListParticipant({ props }) {
  return (
    <div>
      <table className='table'>
        <thead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>username</th>
            <th scope='col'>email</th>
            <th scope='col'>country</th>
          </tr>
        </thead>
        <tbody>
          {props?.map((usr, u) => (
            <tr key={u}>
              <th scope='row'>1</th>
              <td>{usr?.username}</td>
              <td>{usr?.email}</td>
              <td>{usr?.country}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

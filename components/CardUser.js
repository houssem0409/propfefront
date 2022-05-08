import React from 'react'

export default function CardUser({ props }) {
  return (
    <div className='card' style={{ width: '18rem' }}>
      <div className='card-body'>
        <h5 className='card-title'>Nom : {props?.username}</h5>
        <h6 className='card-subtitle mb-2 text-muted'>
          Address : {props?.address}
        </h6>
        <p className='card-text'>Email : {props?.email}</p>
        <a href='#' className='card-link'>
          Card link
        </a>
        <a href='#' className='card-link'>
          Another link
        </a>
      </div>
    </div>
  )
}

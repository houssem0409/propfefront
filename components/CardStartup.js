import React from 'react'

export default function CardStartup({ props }) {
  return (
    <div className='card' style={{ width: '18rem' }}>
      <div className='card-body'>
        <h5 className='card-title'>Nom : {props?.name}</h5>
        <h6 className='card-subtitle mb-2 text-muted'>
          Address : {props?.address}
        </h6>
        <p className='card-text'>Email : {props?.email}</p>
      </div>
    </div>
  )
}

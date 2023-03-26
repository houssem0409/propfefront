import React from 'react'

export default function InfoStartup({ props }) {
  console.log(props)
  return (
    <div
      className='col-12'
      style={{ backgroundColor: 'blueviolet', height: '400px' }}
    >
      <div>
        <h2 style={{ margin: '10px' }}>Description :</h2>
        <p style={{ color: 'black', margin: '10px' }}>{props?.description}</p>
      </div>
    </div>
  )
}

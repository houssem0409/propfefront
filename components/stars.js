import React from 'react'
import { FaStar } from 'react-icons/fa'

export default function Stars({ props }) {
  return (
    <div style={{ marginTop: '15px', marginLeft: '50px' }}>
      <label style={{ backgroundColor: 'white' }}>
        {[...Array(props)].map((star, i) => (
          <FaStar key={i} className='star' color={'#ffc107'} size={30} />
        ))}
        {[...Array(5 - props)].map((star, i) => (
          <FaStar key={i} className='star' color={'#e1e1e1'} size={30} />
        ))}
      </label>
    </div>
  )
}

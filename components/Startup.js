import React from 'react'
import { useRouter } from 'next/router'
export default function Startup({ props }) {
  const router = useRouter()

  return (
    <div
      key={props}
      className='card'
      style={{
        width: '18rem',
        marginTop: '20px',
        marginBottom: '10px',
        margin: '5px',
      }}
    >
      <img
        key={props}
        src={`http://localhost:8000/api/startup/photo/${props?._id}`}
        className='card-img-top'
      />
      <div className='card-body'>
        <h5 className='card-title' style={{ color: 'black' }}>
          Description :
        </h5>
        <p className='card-text' style={{ color: 'black' }}>
          {props?.description.slice(0, 70)} ...
        </p>
        <a
          className='card-link'
          onClick={() => router.push(`/startups/details/${props?._id}`)}
        >
          {props?.name}
        </a>
      </div>
    </div>
  )
}

import React from 'react'
import { useRouter } from 'next/dist/client/router'
export default function CardEvent({ props }) {
  const router = useRouter()
  return (
    <div className='card'>
      <div className='card-body'>
        <a
          className='card-link'
          onClick={() => router.push(`/events/details/${props?._id}`)}
        >
          {props?.title}
        </a>
        <h6 className='card-subtitle mb-2 text-muted'>
          Address : {props?.address}
        </h6>
      </div>
    </div>
  )
}

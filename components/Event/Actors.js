import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import ListParticipant from '../ListParticipant'
import axios from 'axios'
export default function Actors() {
  const [listParticipants, setListParticipants] = useState()
  const router = useRouter()

  const { id } = router.query

  async function listParticipantsInfo(id) {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/listParticipants/${id}`
      )
      setListParticipants(data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    const { id } = router.query

    listParticipantsInfo(id)
  }, [id])
  return (
    <div
      className='col-12'
      style={{ backgroundColor: 'turquoise', height: '400px' }}
    >
      <ListParticipant props={listParticipants} />
    </div>
  )
}

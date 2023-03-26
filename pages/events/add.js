import React from 'react'
import Layout from '../../components/Layout'
import { EventForm } from '../../components/EventForm'
export default function add() {
  return (
    <Layout>
      <div className='container' style={{ width: '30%', marginTop: '20px' }}>
        <h3 style={{ fontFamily: 'monospace' }}>Add Your Event </h3>
      </div>
      <div>
        <EventForm />
      </div>
    </Layout>
  )
}

import { EventForm } from '../../../components/EventForm'
import Layout from '../../../components/Layout'
import AdminLinks from '../../../components/AdminLinks'
export default function Add() {
  return (
    <Layout>
      <div className='row'>
        <div className='col-3'>
          <AdminLinks />
        </div>
        <div className='col-9'>
          <EventForm />
        </div>
      </div>
      <div style={{ margin: '20px', padding: '10px' }}></div>
    </Layout>
  )
}

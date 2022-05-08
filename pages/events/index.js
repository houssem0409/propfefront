import React from 'react'
import Layout from '../../components/Layout'
import SearchEvent from '../../components/SearchEvent'

export default function index() {
  return (
    <Layout>
      <div className='row'>
        <div className='col-3'>
          <h4>les Filtres </h4>
        </div>
        <div className='col-9'>
          <SearchEvent />
        </div>
      </div>
    </Layout>
  )
}

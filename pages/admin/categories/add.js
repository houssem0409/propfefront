import React from 'react'
import { EventForm } from '../../../components/EventForm'
import Layout from '../../../components/Layout'
import AdminLinks from '../../../components/AdminLinks'
import { useState } from 'react'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { CategoryForm } from '../../../components/CategoryForm'
export default function Update() {
  useEffect(() => {}, [])
  return (
    <Layout>
      <div className='row'>
        <div className='col-3'>
          <AdminLinks />
        </div>
        <div className='col-9'>
          <CategoryForm />
        </div>
      </div>
      <div style={{ margin: '20px', padding: '10px' }}></div>
    </Layout>
  )
}

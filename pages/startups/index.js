import React from 'react'
import Layout from '../../components/Layout'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Info from '../../components/Info'
import MyStartup from '../../components/MyStartup'
import CardEvent from '../../components/Event/CardEvent'
import MyEventsCreated from '../../components/MyEventsCreated'
import StartupPhotos from '../../components/StartupPhotos'
import InfoStartup from '../../components/InfoStartup'
import { useRouter } from 'next/router'
import Search from '../../components/search'
export default function index() {
  const [value, setValue] = useState('Info')

  return (
    <Layout>
      <div className='row'>
        <div className='col-3'>
          <h4>les Filtres </h4>
        </div>
        <div className='col-9'>
          <Search />
        </div>
      </div>
    </Layout>
  )
}

import axios from 'axios'
import '../styles/bootstrap.min.css'
import Layout from '../components/Layout'
import React, { useState, useMemo, useEffect, useContext } from 'react'
import { UserContext } from '../components/UserContext'
import { isAuthenticated } from './api/auth'
import Auth from '../components/UserContext'
import { useRouter } from 'next/router'
function MyApp({ Component, pageProps }) {
  return (
    <Auth>
      <Component {...pageProps} />
    </Auth>
  )
}

export default MyApp

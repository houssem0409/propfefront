import '../styles/bootstrap.min.css'
import React, { useState, useMemo, useEffect, useContext } from 'react'
import Auth from '../components/UserContext'
import '../styles/Home.module.css'
import '../styles/styles.css'

function MyApp({ Component, pageProps }) {
  return (
    <Auth>
      <Component {...pageProps} />
    </Auth>
  )
}

export default MyApp

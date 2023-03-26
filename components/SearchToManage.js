import React, { useEffect } from 'react'
import axios from 'axios'
import queryString from 'query-string'
import AsyncSelect from 'react-select/async'
import { useState } from 'react'
import { useContext } from 'react'
import { UserContext } from './UserContext'
export default function SearchToManage() {
  const {
    user,
    setTokens,
    tokens,
    token,
    getUserInfo,
    setMyStartupManage,
    mystartupManage,
  } = useContext(UserContext)
  const [res, setRes] = useState()
  const [noData, setNoData] = useState()
  const [data, setData] = useState({
    search: '',
    mystartup: '',
    results: [],
    searched: false,
  })

  const [errorMatch, setErrorMatch] = useState()
  const [successMatch, setSuccessMatch] = useState()
  const [loading, setLoading] = useState()

  const MyEmail = user?.email ? user?.email : user?.data?.email
  const [searchResult, setSearchResult] = useState()
  const options = [{ value: 'chocolate', label: 'coco' }]
  const [selectedValue, setSelectedValue] = useState(null)
  const [mystartup, setMyStartup] = useState()
  const { startup, success, error } = data
  const [searching, setSearching] = useState(true)
  const handleRechange = (name) => (event) => {
    setData({ ...data, [name]: event.target.value, searched: true })
  }

  async function loadOptions(mystartup) {
    try {
      const result = await axios.post(
        `http://localhost:8000/api/startups/manage/search?search=${mystartup}`
      )
      setSearchResult(result?.data)

      return result?.data
    } catch (error) {
      console.error(error)
    }
  }
  const handleInputChange = (newValue) => {
    setMyStartup(newValue.replace(/\W/g, ''))

    return mystartup
  }
  const handleChange = (value) => {
    console.log(value)
    setSelectedValue(value)
  }

  const verificationAppend = () => {}
  console.log('the strt')
  console.log(mystartup)
  const showError = () => (
    <div
      className='alert alert-danger'
      style={{ display: errorMatch ? '' : 'none' }}
    >
      Email Don't match
    </div>
  )
  const showSuccess = () => (
    <div
      className='alert alert-success'
      style={{ display: successMatch ? '' : 'none' }}
    >
      Verifivation Email done , You can manage your Startup Now !
    </div>
  )
  const showLoading = () => (
    <div
      class='spinner-border'
      role='status'
      style={{ display: loading ? '' : 'none' }}
    >
      <span class='visually-hidden'>Loading...</span>
    </div>
  )
  useEffect(() => {}, [])

  const showNoData = () => (
    <div
      className='alert alert-danger'
      style={{ display: noData ? '' : 'none' }}
    >
      No data
    </div>
  )
  async function setMystartup(id) {
    try {
      const data = await axios.get(
        `http://localhost:8000/api/startup/${selectedValue?._id}`
      )
      setMyStartupManage(data)
    } catch (error) {
      console.error(error)
    }
  }
  async function getStartup(data) {
    setLoading(true)
    try {
      const resu = await axios.put(
        `http://localhost:8000/api/user/upgrade/${
          user?.id ? user?.id : user?.data?._id
        } `,
        {
          startup: selectedValue?._id,
          role: 'director',
        }
      )
      if (resu) {
        getUserInfo(token)
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
      console.error(error)
    }
  }
  const subbmit = () => {
    const emailStartupDomaine = selectedValue?.email.split('@')[1].split('.')[0]
    const MyDomaineEmail = MyEmail.split('@')[1].split('.')[0]
    const data = selectedValue?.id
    if (emailStartupDomaine == MyDomaineEmail) {
      getStartup(data)
      setMystartup(data)
      setSuccessMatch(true)
      setErrorMatch(false)
    } else {
      setErrorMatch(true)
    }
  }

  return (
    <div className='row'>
      <div className='col-12'>
        {showError()}
        {showSuccess()}
        {showLoading()}
        <h3
          style={{
            position: 'center',
            marginLeft: '250px',
            marginTop: '30px',
          }}
        >
          Search for the Startup you work for
        </h3>
        <div style={{ margin: '20px' }}>
          <h6>Find your Startup to verify your employment.</h6>
          <h6>
            Verifying your Startup email will allow you to access features
            specifically for your business.
          </h6>
        </div>
        <AsyncSelect
          loadOptions={loadOptions}
          cacheOptions
          defaultOptions
          value={selectedValue}
          onInputChange={handleInputChange}
          getOptionLabel={(e) => e?.name}
          getOptionValue={(e) => e?._id}
          onChange={handleChange}
        />
      </div>

      <div className='col-12'>
        <button
          className='btn btn-warning'
          style={{ marginTop: '50px' }}
          type='submit'
          onClick={() => subbmit()}
        >
          Get My Startup
        </button>
      </div>
    </div>
  )
}

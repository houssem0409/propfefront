import React, { useEffect } from 'react'
import axios from 'axios'
import { Button, Modal } from 'react-bootstrap'

import queryString from 'query-string'
import AsyncSelect from 'react-select/async'
import { useState } from 'react'
import { useContext } from 'react'
import { useRouter } from 'next/router'
import { UserContext } from './UserContext'
export default function SearchUsers({ membersChanger }) {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
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

  const router = useRouter()
  const { id } = router.query
  const [errorMatch, setErrorMatch] = useState()
  const [successMatch, setSuccessMatch] = useState()
  const [loading, setLoading] = useState()

  const MyEmail = user?.email ? user?.email : user?.data?.email
  const [searchResult, setSearchResult] = useState()
  const options = [{ value: 'chocolate', label: 'coco' }]
  const [selectedValue, setSelectedValue] = useState(null)
  const [myMember, setMyMember] = useState()
  const { startup, success, error } = data
  const [searching, setSearching] = useState(true)
  const handleRechange = (name) => (event) => {
    setData({ ...data, [name]: event.target.value, searched: true })
  }

  async function getListeMembers() {
    try {
      const res = await axios.get(`http://localhost:8000/api/members/${id}`)
      membersChanger(res)
    } catch (error) {
      console.error(error)
    }
  }
  async function loadOptions(myMember) {
    try {
      const result = await axios.post(
        `http://localhost:8000/api/users/search?search=${myMember}`
      )
      setSearchResult(result?.data)

      return result?.data
    } catch (error) {
      console.error(error)
    }
  }
  const handleInputChange = (newValue) => {
    setMyMember(newValue.replace(/\W/g, ''))

    return myMember
  }
  const handleChange = (value) => {
    console.log(value)
    setSelectedValue(value)
  }

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

  async function AddMember() {
    setLoading(true)
    console.log('i am here')
    try {
      const resu = await axios.put(
        `http://localhost:8000/api/user/upgrade/${selectedValue?._id} `,
        {
          startup: id,
          role: 'member',
        }
      )
      getListeMembers()
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }
  const subbmit = () => {
    AddMember()
    setSuccessMatch(true)
    setErrorMatch(false)
  }

  return (
    <div className='container'>
      <div className='row'>
        <>
          <Button
            variant='info'
            onClick={handleShow}
            style={{ borderRadius: '20px' }}
          >
            Add Member{' '}
          </Button>

          <Modal show={show} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
              <Modal.Title>Search For Member </Modal.Title>
            </Modal.Header>
            <div className='col-12'>
              {showSuccess()}
              {showLoading()}

              <AsyncSelect
                loadOptions={loadOptions}
                cacheOptions
                defaultOptions
                value={selectedValue}
                onInputChange={handleInputChange}
                getOptionLabel={(e) => e?.username}
                getOptionValue={(e) => e?._id}
                onChange={handleChange}
              />
            </div>

            <div className='col-12'>
              <button
                className='btn btn-warning'
                style={{ margin: '20px', borderRadius: '10px' }}
                type='submit'
                onClick={() => subbmit()}
              >
                Done{' '}
              </button>
            </div>
          </Modal>
        </>
      </div>
    </div>
  )
}

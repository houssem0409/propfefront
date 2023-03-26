import React, { useState, useContext } from 'react'
import Layout from '../../../../components/Layout'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { UserContext } from '../../../../components/UserContext'
import axios from 'axios'
export default function resetString() {
  const { user, token, login, isAuthenticated, loading, logout, getUserInfo } =
    useContext(UserContext)
  const [values, setValues] = useState({
    password: '',
    confirmPassword: '',
    error: '',
    success: '',
    loading: false,
    redirectToReferrer: false,
  })
  const [successMessage, setSuccessMessage] = useState()
  const [errorMessage, setErroMessage] = useState()
  const [erro, setErro] = useState()
  const router = useRouter()
  const { userId, resetString } = router.query

  const { password, confirmPassword, error, success } = values
  // const { user } = isAuthenticated()

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value })
  }

  const clickSubmit = async (e) => {
    e.preventDefault()
    setValues({ ...values, success: 'LoggedIn' })
    setValues({ loading: true })
    try {
      const res = await axios.post('http://localhost:8000/api/changePassword', {
        userId: userId,
        resetString: resetString,
        newPassword: password,
      })

      console.log(res)
      if (res?.data?.status == 'FAILED') {
        setErro(res?.data?.message)
      } else if (res?.data?.status == 'SUCCESS') {
        setSuccessMessage(res?.data?.message)
      }
    } catch (err) {
      setErro(true)
      setErroMessage(err?.response?.data?.message)
    }
    setValues({ loading: false })
  }
  const signInForm = () => (
    <div>
      <form>
        <h3>Reset Your Password ! </h3>
        <div className='form-group'>
          <label className='text-muted'>New Password</label>
          <input
            onChange={handleChange('password')}
            type='password'
            className='form-control'
            value={password}
          ></input>
        </div>
        <div className='form-group'>
          <label className='text-muted'>Repeat Password</label>
          <input
            onChange={handleChange('confirmPassword')}
            type='password'
            className='form-control'
            value={confirmPassword}
          ></input>
        </div>
        <button onClick={clickSubmit} className='btn btn-primary'>
          Submit
        </button>
      </form>
      <div>
        <Link href='/user/signin'>
          <a> Go To Login </a>
        </Link>
      </div>
    </div>
  )
  const showError = () => (
    <div className='alert alert-danger' style={{ display: erro ? '' : 'none' }}>
      {erro}
    </div>
  )
  const showSuccess = () => (
    <div
      className='alert alert-success'
      style={{ display: successMessage ? '' : 'none' }}
    >
      {successMessage}
    </div>
  )

  const showLoading = () =>
    loading && (
      <div className='alert alert-info'>
        <h2>Loading ...</h2>
      </div>
    )

  return (
    <Layout
      title='Signin '
      description='Signin to Node React E-commerce App'
      className='container col-md-8 offset-md-2 '
    >
      {showLoading()}
      {showSuccess()}
      {showError()}
      {signInForm()}
    </Layout>
  )
}

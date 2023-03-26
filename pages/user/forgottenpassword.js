import React, { useState, useContext } from 'react'
import Layout from '../../components/Layout'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { UserContext } from '../../components/UserContext'
import axios from 'axios'
import NotAuth from '../../components/NotAuth'
function forgottenpassword() {
  const { user, token, login, isAuthenticated, loading, logout, getUserInfo } =
    useContext(UserContext)
  const [values, setValues] = useState({
    email: '',
    error: '',
    success: '',
    loading: false,
    redirectToReferrer: false,
    redirectUrl: 'http://localhost:3000/user/resetpassword',
  })
  const [errorMessage, setErroMessage] = useState()
  const [successMessage, setSuccessMessage] = useState()
  const [erro, setErro] = useState()
  const router = useRouter()

  const { email, error, redirectUrl } = values
  // const { user } = isAuthenticated()

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value })
  }

  const clickSubmit = async (e) => {
    e.preventDefault()
    setValues({ ...values, success: 'LoggedIn' })
    try {
      const res = await axios.post(
        `http://localhost:8000/api/requestPasswordReset`,

        {
          email: values.email,
          redirectUrl: values.redirectUrl,
        }
      )
      console.log(res?.data?.status)
      if (res?.data?.status == 'FAILED') {
        setValues({ error: res?.data?.message })
      } else if (res?.data?.status == 'PENDING') {
        setSuccessMessage(res?.data?.message)
      }
    } catch (err) {
      setErro(true)
      setErroMessage(err?.response?.data?.message)
      console.log(err?.response?.data)
    }
  }
  console.log(errorMessage)
  const resetForm = () => (
    <div>
      <form>
        <h3>Reset Your Password </h3>
        <div className='form-group'>
          <label className='text-muted'> Enter Your Email : </label>
          <input
            onChange={handleChange('email')}
            type='text'
            className='form-control'
            value={email}
          ></input>
        </div>

        <button onClick={clickSubmit} className='btn btn-primary'>
          Submit
        </button>
      </form>
    </div>
  )
  const showError = () => (
    <div
      className='alert alert-danger'
      style={{ display: error ? '' : 'none' }}
    >
      {error}
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
      {showError()}
      {showSuccess()}
      {resetForm()}
    </Layout>
  )
}
export default NotAuth(forgottenpassword)

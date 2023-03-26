import React, { useState, useContext, useEffect } from 'react'
import Layout from '../../components/Layout'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { UserContext } from '../../components/UserContext'
function signin() {
  const { user, token, login, isAuthenticated, loading, logout, getUserInfo } =
    useContext(UserContext)
  const [values, setValues] = useState({
    username: '',
    password: '',
    error: '',
    loading: false,
    redirectToReferrer: false,
  })
  const [errorMessage, setErroMessage] = useState()
  const [erro, setErro] = useState()
  const router = useRouter()

  const { username, password, error } = values
  // const { user } = isAuthenticated()

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value })
  }

  const clickSubmit = async (e) => {
    e.preventDefault()
    setValues({ ...values, success: 'LoggedIn' })
    try {
      const res = await login(username, password)
    } catch (err) {
      setErro(true)
      setErroMessage(err?.response?.data?.message)
    }
  }

  const signInForm = () => (
    <div
      className='container'
      style={{
        marginTop: '30px',
        width: '40%',
        height: '60%',
        borderWidth: '1px',
        borderColor: 'black',
        borderStyle: 'solid',
      }}
    >
      <form>
        <h3 style={{ marginLeft: '180px' }}>Signin Here </h3>
        <div style={{ width: '20%', height: '30%' }}>
          <img
            src='../../images/logos/collaboration.jpg'
            style={{ width: '100%', height: '100%', marginLeft: '180px' }}
          ></img>
        </div>
        <div className='form-group'>
          <label className='text-muted'> UserName </label>
          <input
            onChange={handleChange('username')}
            type='text'
            className='form-control'
            value={username}
            style={{ borderRadius: '30px' }}
          ></input>
        </div>
        <div className='form-group'>
          <label className='text-muted'> Password</label>
          <input
            onChange={handleChange('password')}
            type='password'
            className='form-control'
            value={password}
            style={{ borderRadius: '30px' }}
          ></input>
        </div>
        <button
          onClick={clickSubmit}
          className='btn btn-primary'
          style={{ marginTop: '20px', width: '100%', borderRadius: '30px' }}
        >
          Submit
        </button>
      </form>
      <div className='row' style={{ marginTop: '20px' }}>
        <div className='col-6'>
          <Link href='/user/forgottenpassword'>
            <a> You Forget your Password ?</a>
          </Link>
        </div>
        <div className='col-6'>
          <Link href='/user/signup'>
            <a style={{ marginLeft: '70px' }}> Register Now here! </a>
          </Link>
        </div>
      </div>
    </div>
  )

  const showError = () => (
    <div className='alert alert-danger' style={{ display: erro ? '' : 'none' }}>
      {errorMessage}
    </div>
  )

  const showLoading = () =>
    loading && (
      <div className='alert alert-info'>
        <h2>Loading ...</h2>
      </div>
    )
  useEffect(() => {
    user && router.push('/home')
  }, [])

  return (
    <Layout
      title='Signin '
      description='Signin to Node React E-commerce App'
      className='container col-md-8 offset-md-2 '
    >
      {showLoading()}
      {showError()}
      {signInForm()}
    </Layout>
  )
}
export default signin

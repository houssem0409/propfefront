import React, { useState, useContext } from 'react'
import Layout from '../../components/Layout'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { UserContext } from '../../components/UserContext'
export default function signin() {
  const { user, token, login, isAuthenticated, loading, logout, getUserInfo } =
    useContext(UserContext)
  const [values, setValues] = useState({
    username: 'houssem',
    password: '123456789',
    error: '',
    loading: false,
    redirectToReferrer: false,
  })
  const router = useRouter()

  const { username, password, error } = values
  // const { user } = isAuthenticated()

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value })
  }

  const clickSubmit = async (e) => {
    e.preventDefault()
    setValues({ ...values, success: 'LoggedIn' })
    console.log('hhhhh')
    login(username, password)
  }

  const signInForm = () => (
    <div>
      <form>
        <div className='form-group'>
          <label className='text-muted'> UserName </label>
          <input
            onChange={handleChange('username')}
            type='text'
            className='form-control'
            value={username}
          ></input>
        </div>
        <div className='form-group'>
          <label className='text-muted'> Password</label>
          <input
            onChange={handleChange('password')}
            type='password'
            className='form-control'
            value={password}
          ></input>
        </div>
        <button onClick={clickSubmit} className='btn btn-primary'>
          Submit
        </button>
      </form>
      <div>
        <Link href='/user/signup'>
          <a> You Don't have an account yet ! Register Now</a>
        </Link>
      </div>
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
      {signInForm()}
    </Layout>
  )
}

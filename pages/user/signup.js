import Link from 'next/link'
import { useState } from 'react'
import Layout from '../../components/Layout'
import { signup } from '../api/auth'
import { API } from '../../config'
import axios from 'axios'

export default function Signup() {
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    error: '',
    success: false,
  })

  const { username, email, password, success, error } = values

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value })
  }
  const clickSubmit = async (e) => {
    e.preventDefault()
    setValues({ ...values, success: 'Registering' })

    try {
      const res = await axios.post(`http://localhost:8000/api/signup`, {
        username: username,
        email: email,
        password: password,
      })
      console.log(res)
      setValues({
        name: '',
        email: '',
        password: '',
      })
    } catch (e) {
      console.log(e)
    }
  }

  const signUpForm = () => (
    <form>
      <div className='form-group'>
        <label className='text-muted'> Name</label>
        <input
          onChange={handleChange('username')}
          type='text'
          className='form-control'
          value={username}
        ></input>
      </div>
      <div className='form-group'>
        <label className='text-muted'> Email</label>
        <input
          onChange={handleChange('email')}
          type='text'
          className='form-control'
          value={email}
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
      style={{ display: success ? '' : 'none' }}
    >
      New Accout was created, please <Link href='/signin'>SignIn</Link>
    </div>
  )

  return (
    <Layout
      title='Signup Page '
      description='Signup to Node React E-commerce App'
      className='container col-md-8 offset-md-2 '
    >
      {showSuccess()}
      {showError()}
      {signUpForm()}

      <h1></h1>
    </Layout>
  )
}

import Link from 'next/link'
import { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import axios from 'axios'
import { countries } from '../../countries'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { UserContext } from '../../components/UserContext'
function Signup() {
  const router = useRouter()
  const { user, token, login, isAuthenticated, loading, logout, getUserInfo } =
    useContext(UserContext)
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    country: '',
    city: '',
    address: '',
    error: '',
    success: false,
  })
  const [userexistErr, setUserExistErr] = useState()
  const { username, email, password, country, city, address, success, error } =
    values

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
        country: country,
        city: city,
        address: address,
      })
      if (res?.response?.data?.err) {
        setUserExistErr(true)
      }
      console.log(res)
      setValues({
        name: '',
        email: '',
        password: '',
        country: '',
        city: '',
        address: '',
        success: true,
      })
    } catch (e) {
      console.log(e)
      setValues({
        name: '',
        email: '',
        password: '',
        country: '',
        city: '',
        address: '',
        error: true,
      })
      setUserExistErr(e?.response?.data?.err?.split(':')[2])
    }
  }

  const signUpForm = () => (
    <div
      className='container'
      style={{
        marginTop: '30px',
        width: '60%',
        height: '80%',
        borderWidth: '1px',
        borderColor: 'black',
        borderStyle: 'solid',
      }}
    >
      <form>
        <h3 style={{ marginLeft: '250px' }}> Signup Here</h3>
        <div className='form-group'>
          <label className='text-muted'> Full Name</label>
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
          <label htmlFor='inputState' className='form-label'>
            country
          </label>
          <select
            defaultValue={'DEFAULT'}
            id='inputcountry'
            className='form-select'
            onClick={handleChange('country')}
          >
            <option value='DEFAULT' disabled>
              Choose ...
            </option>{' '}
            {countries.map((country, e) => (
              <option key={e} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>

        <div className='form-group'>
          <label className='text-muted'> City</label>
          <input
            onChange={handleChange('city')}
            type='text'
            className='form-control'
            value={city}
          ></input>
        </div>
        <div className='form-group'>
          <label className='text-muted'> Address</label>
          <input
            onChange={handleChange('address')}
            type='text'
            className='form-control'
            value={address}
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
        <button
          onClick={clickSubmit}
          className='btn btn-primary'
          style={{ marginTop: '25px' }}
        >
          Submit
        </button>
      </form>
    </div>
  )
  const showError = () => (
    <div
      className='alert alert-danger'
      style={{ display: userexistErr ? '' : 'none' }}
    >
      {userexistErr}
    </div>
  )

  const showSuccess = () => (
    <div
      className='alert alert-success'
      style={{ display: success ? '' : 'none' }}
    >
      New Accout was created, Check your Box to verify it please , then{' '}
      <Link href='/user/signin'>SignIn</Link>
    </div>
  )

  useEffect(() => {
    user && router.push('/home')
  }, [])

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
export default Signup

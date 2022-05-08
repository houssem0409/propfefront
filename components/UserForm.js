import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useContext } from 'react'
import { UserContext } from './UserContext'
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export function UserForm({ props, url }) {
  const { user, setTokens, tokens, getUserInfo, setUser, token, refreshToken } =
    useContext(UserContext)
  const [isAdmin, setIsAdmin] = useState()
  const [isMember, setIsMember] = useState()
  const [isUser, setIsUser] = useState()
  const [isDirector, setIsDirector] = useState()
  const {
    register,
    formState: { errors },
    formState: { isSubmitting },
    formState: { isValid },
    formState: { isSubmitSuccessful },
    handleSubmit,
  } = useForm({
    mode: 'onTouched',
  })
  const onSubmit = async (data) => {
    if (!props) {
      await sleep(2000)
      console.log(data)
      try {
        await axios.post('http://localhost:8000/api/user/add', data)
        console.log(data)

        return data
      } catch (error) {
        console.error(error)
      }
    } else {
      await sleep(2000)
      console.log(data)
      try {
        await axios.put(
          `http://localhost:8000/api/user/update/${
            user?.id ? user?.id : user?.data?.id
          }`,
          data
        )
        console.log(refreshToken)
        console.log(token)
        refreshToken(refreshToken)
        getUserInfo(token)
        console.log(data)

        return data
      } catch (error) {
        console.error(error)
      }
    }
  }
  const setSelectedRole = async () => {
    let role = props?.role ? props?.role : props?.data?.role
    if (role == 'admin') {
      setIsAdmin(true)
      return
    } else if (role == 'director') {
      setIsDirector(true)
      return
    } else if (role == 'member') {
      setIsMember(true)
      return
    } else if (role == 'user') {
      setIsUser(true)
      return
    }
    console.log(isAdmin)
  }
  useEffect(() => {
    isAdmin
    setSelectedRole()
  }, [setSelectedRole])

  console.log(errors)
  console.log(props)
  console.log(isAdmin)
  return (
    <form className='row g-3' onSubmit={handleSubmit(onSubmit)}>
      {isSubmitSuccessful && (
        <div className='alert alert-success'>user added successfully !</div>
      )}
      <div className='col-6'>
        <label htmlFor='inputAddress' className='form-label'>
          User Name
        </label>
        <input
          className='form-control'
          placeholder={
            props?.username ? props?.username : props?.data?.username
          }
          {...register('username', { required: 'This is required.' })}
        />

        <ErrorMessage
          errors={errors}
          name='username'
          render={({ message }) => <p>{message}</p>}
        />
      </div>
      <div className='col-md-6'>
        <label htmlFor='inputEmail4' className='form-label'>
          Email
        </label>
        <input
          placeholder={props?.email}
          {...register('email', {
            required: 'the email is required and should contain 5 chars',
            minLength: 5,
          })}
          type='email'
          className='form-control'
          id='inputEmail4'
        />
        <ErrorMessage
          style={{ color: 'red' }}
          id='validationServer04Feedback'
          className='invalid-feedback'
          errors={errors}
          name='email'
          render={({ message }) => <p>{message}</p>}
        />
      </div>
      <div className='col-md-6'>
        <label htmlFor='inputPassword4' className='form-label'>
          Password
        </label>
        <input
          {...register('password', {
            required: 'the password is required and should contain 5 char',
            maxLength: 8,
          })}
          type='password'
          className='form-control'
          id='inputPassword4'
        />
        <ErrorMessage
          errors={errors}
          name='password'
          render={({ message }) => <p>{message}</p>}
        />
      </div>
      {url == 'profile' ? (
        <div></div>
      ) : (
        <div className='col-6'>
          <label htmlFor='inputPassword4' className='form-label'>
            Role
          </label>
          <select
            defaultValue={props?.role}
            className='form-select'
            aria-label='Default select example'
            {...register('role')}
          >
            {isAdmin ? (
              <option selected='selected' value='admin'>
                admin
              </option>
            ) : (
              <option value='admin'>admin</option>
            )}

            <option selected={isDirector} value='director'>
              director
            </option>
            <option selected={isMember} value='member'>
              member
            </option>
            <option selected={isUser} value='user'>
              user
            </option>
          </select>
        </div>
      )}

      <div className='col-12'>
        <label htmlFor='inputAddress2' className='form-label'>
          Address 2
        </label>
        <input
          type='text'
          className='form-control'
          id='inputAddress2'
          placeholder='Apartment, studio, or floor'
        />
      </div>
      <div className='col-md-6'>
        <label htmlFor='inputCity' className='form-label'>
          City
        </label>
        <input type='text' className='form-control' id='inputCity' />
      </div>
      <div className='col-md-4'>
        <label htmlFor='inputState' className='form-label'>
          State
        </label>
        <select id='inputState' className='form-select'>
          <option selected>Choose...</option>
          <option>...</option>
        </select>
      </div>
      <div className='col-md-2'>
        <label htmlFor='inputZip' className='form-label'>
          Zip
        </label>
        <input type='text' className='form-control' id='inputZip' />
      </div>
      <div className='col-12'>
        <div className='form-check'>
          <input className='form-check-input' type='checkbox' id='gridCheck' />
          <label className='form-check-label' htmlFor='gridCheck'>
            Check me out
          </label>
        </div>
      </div>
      <div className='col-12'>
        {props ? (
          <button type='submit' className='btn btn-primary'>
            Update User
          </button>
        ) : (
          <button
            disabled={isSubmitting || !isValid}
            type='submit'
            className='btn btn-primary'
          >
            Add User
          </button>
        )}
      </div>
    </form>
  )
}

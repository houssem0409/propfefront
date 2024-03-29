import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import axios from 'axios'
import { countries } from '../countries'
import { useContext, useState } from 'react'
import { UserContext } from './UserContext'
import moment from 'moment'
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export function EventForm({ props }) {
  const { user, setTokens, tokens, token } = useContext(UserContext)
  const [country, setCountry] = useState()

  const handleChange = (name) => (event) => {
    setCountry(event.target.value)
  }
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
      var formData = new FormData()
      console.log(data?.photo)
      formData.append('creator', user?.data?._id)
      formData.append('title', data?.title)
      formData.append('description', data?.description)
      formData.append('country', country)
      formData.append('photo', data?.photo[0])
      formData.append('address', data?.address)
      formData.append('city', data?.city)
      formData.append('start_date', data?.start_date)
      formData.append('end_date', data?.end_date)

      try {
        await axios.post('http://localhost:8000/api/event/create', formData)

        return data
      } catch (error) {
        console.error(error)
      }
    } else {
      await sleep(2000)

      console.log(data)
      var formData = new FormData()
      console.log(data?.photo)
      formData.append('title', data?.title)
      formData.append('description', data?.description)
      formData.append('country', data?.country)
      formData.append('photo', data?.photo[0])
      formData.append('address', data?.address)
      formData.append('city', data?.city)
      formData.append('start_date', data?.start_date)
      formData.append('end_date', data?.end_date)

      console.log(formData)
      try {
        await axios.put(
          `http://localhost:8000/api/event/${props?._id}`,
          formData
        )
        console.log(formData)

        return data
      } catch (error) {
        console.error(error)
      }
    }
  }

  return (
    <div
      className='container'
      style={{
        width: '70%',
        marginTop: '70px',
        borderWidth: '2px',
        borderStyle: 'solid',
      }}
    >
      <form className='row g-3' onSubmit={handleSubmit(onSubmit)}>
        {isSubmitSuccessful && (
          <div className='alert alert-success'>operation success !</div>
        )}

        <div className='col-6'>
          <label htmlFor='inputAddress' className='form-label'>
            Title
          </label>
          <input
            className='form-control'
            {...register('title', { required: 'This is required.' })}
          />

          <ErrorMessage
            errors={errors}
            name='name'
            render={({ message }) => <p>{message}</p>}
          />
        </div>

        <div className='col-md-12'>
          <label htmlFor='inputPassword4' className='form-label'>
            Description
          </label>

          <textarea
            {...register('description', {
              required:
                'the description is required and should contain unless 10 char',
              minLength: 10,
            })}
            type='text'
            className='form-control'
            id='exampleFormControlTextarea1'
            rows='3'
          />
          <ErrorMessage
            errors={errors}
            name='description'
            render={({ message }) => <p>{message}</p>}
          />
        </div>

        <div className='col-9'>
          <label htmlFor='inputAddress2' className='form-label'>
            Address
          </label>
          <input
            {...register('address')}
            type='text'
            className='form-control'
            id='inputAddress2'
            placeholder='Apartment, studio, or floor'
          />
        </div>
        <div className='col-3'>
          <label htmlFor='inputAddress2' className='form-label'>
            City
          </label>
          <input
            {...register('city')}
            type='text'
            className='form-control'
            id='inputAddress2'
            placeholder='city'
          />
        </div>
        <div className='col-6'>
          <label htmlFor='inputAddress2' className='form-label'>
            Logo
          </label>

          <input
            {...register('photo')}
            className='form-control form-control-sm'
            id='formFileSm'
            type='file'
            name='photo'
            accept='image/*'
          />
        </div>
        <div className='col-md-6'>
          <label htmlFor='inputCity' className='form-label'>
            Country
          </label>
          <select
            id='inputcountry'
            className='form-select'
            onClick={handleChange('country')}
            defaultValue={'choose'}
          >
            <option value={'choose'} disabled>
              choose ...
            </option>
            {countries.map((country, e) => (
              <option key={e} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
        <div className='col-md-6'>
          <label htmlFor='startDate'>Start-Date</label>
          <input
            id='startDate'
            className='form-control'
            type='date'
            {...register('start_date')}
          />
        </div>
        <div className='col-md-6'>
          <label htmlFor='startDate'>End-Date</label>
          <input
            id='startDate'
            className='form-control'
            type='date'
            {...register('end_date')}
          />
        </div>

        <div
          className='col-12'
          style={{ marginTop: '20px', marginBottom: '20px' }}
        >
          {props ? (
            <button type='submit' className='btn btn-primary'>
              Update Event
            </button>
          ) : (
            <button
              disabled={isSubmitting || !isValid}
              type='submit'
              className='btn btn-primary'
            >
              Add Event
            </button>
          )}
        </div>
        {isSubmitting && (
          <div>
            <div className='spinner-border' role='status'>
              <span className='visually-hidden'>Loading...</span>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}

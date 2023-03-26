import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { UserContext } from './UserContext'

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export function StartupForm({ props }) {
  const { user, setTokens, tokens, token, mystartupManage, getMyStartupInfo } =
    useContext(UserContext)
  console.log(props?._id)
  const [categories, setCategories] = useState()
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
      console.log(data?.email)
      formData.append('name', data?.name)
      formData.append('email', data?.email)
      formData.append('description', data?.description)
      formData.append('country', data?.country)
      formData.append('photo', data?.photo[0])
      formData.append('category', data?.category)
      formData.append('address', data?.address)
      formData.append('employee_range', data?.employeesRange)
      formData.append('total_fundings', data?.totalFunding)
      formData.append('year_founded', data?.yearFounding)
      console.log(formData)
      try {
        await axios.post('http://localhost:8000/api/startup/create', formData)
        console.log(formData)

        return data
      } catch (error) {
        console.error(error)
      }
    } else if (mystartupManage) {
      await sleep(2000)

      console.log(data)
      var formData = new FormData()
      console.log(data?.photo)
      console.log(data?.email)
      console.log(data)
      formData.append('name', data?.name)
      formData.append('email', data?.email)
      formData.append('description', data?.description)
      formData.append('country', data?.country)
      formData.append('photo', data?.photo[0])
      formData.append('category', data?.category)
      formData.append('address', data?.address)
      formData.append('employee_range', data?.employeesRange)
      formData.append('total_fundings', data?.totalFunding)
      formData.append('year_founded', data?.yearFounding)

      console.log(formData)
      try {
        await axios.put(
          `http://localhost:8000/api/startup/${props?._id}`,
          formData
        )
        console.log(formData)
        console.log('I am updating here ')
        getMyStartupInfo(props?._id)
        return data
      } catch (error) {
        console.error(error)
      }
    } else {
      await sleep(2000)

      console.log(data)
      var formData = new FormData()
      console.log(data?.photo)
      console.log(data?.email)
      formData.append('name', data?.name)
      formData.append('email', data?.email)
      formData.append('description', data?.description)
      formData.append('country', data?.country)
      formData.append('photo', data?.photo[0])
      formData.append('category', data?.category)
      formData.append('address', data?.address)
      formData.append('employee_range', data?.employeesRange)
      formData.append('total_fundings', data?.totalFunding)
      formData.append('year_founded', data?.yearFounding)
      console.log(formData)
      try {
        await axios.put(
          `http://localhost:8000/api/startup/${props?._id}`,
          formData
        )
        console.log(formData)
        return data
      } catch (error) {
        console.error(error)
      }
    }
  }
  async function getCategories() {
    try {
      const { data } = await axios.get('http://localhost:8000/api/categories')
      setCategories(data)
      console.log(data)

      return data
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    getCategories()
  }, [])
  console.log(errors)
  console.log(categories)
  return (
    <div
      className='container'
      style={{
        width: '90%',
        marginTop: '30px',
        borderWidth: '2px',
        borderStyle: 'solid',
      }}
    >
      <form className='row g-3' onSubmit={handleSubmit(onSubmit)}>
        {isSubmitSuccessful && (
          <div className='alert alert-success'>Operation successfully !</div>
        )}
        <div className='col-6'>
          <label htmlFor='inputAddress' className='form-label'>
            Name
          </label>
          <input
            className='form-control'
            {...register('name', { required: 'This is required.' })}
          />

          <ErrorMessage
            errors={errors}
            name='name'
            render={({ message }) => <p>{message}</p>}
          />
        </div>
        <div className='col-md-6'>
          <label htmlFor='inputEmail4' className='form-label'>
            Email
          </label>
          <input
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
            Description
          </label>

          <textarea
            {...register('description', {
              required:
                'the description is required and should contain unless 10 char',
              minLength: 10,
            })}
            type='text'
            class='form-control'
            id='exampleFormControlTextarea1'
            rows='3'
          />
          <ErrorMessage
            errors={errors}
            name='description'
            render={({ message }) => <p>{message}</p>}
          />
        </div>

        <div className='col-6'>
          <label htmlFor='inputPassword4' className='form-label'>
            Category
          </label>
          <select
            className='form-select'
            aria-label='Default select example'
            {...register('category')}
          >
            {categories?.data?.map((c) => (
              <option value={c?._id}>{c?.name}</option>
            ))}
          </select>
        </div>
        <div className='col-9'>
          <label htmlFor='inputAddress2' className='form-label'>
            Address
          </label>
          <input
            {...register('address', { required: 'This is required.' })}
            type='text'
            className='form-control'
            id='inputAddress2'
            placeholder='Apartment, studio, or floor'
          />
        </div>
        <div className='col-3'>
          <label htmlFor='inputAddress2' className='form-label'>
            Logo
          </label>

          <input
            {...register('photo')}
            class='form-control form-control-sm'
            id='formFileSm'
            type='file'
            name='photo'
            accept='image/*'
          />
        </div>
        <div className='col-md-4'>
          <label htmlFor='inputState' className='form-label'>
            country
          </label>
          <select
            id='inputState'
            className='form-select'
            {...register('country')}
          >
            <option selected>Choose...</option>
            <option value='Libye'>Libye</option>
            <option value='Algeria'>Algeria</option>
            <option value='Tunisia'>Tunisia</option>
            <option value='Morroco'>Morroco</option>
            <option value='Egypte'>Egypte</option>
          </select>
        </div>
        <div className='col-md-6'>
          <label htmlFor='inputCity' className='form-label'>
            city
          </label>
          <input type='text' className='form-control' id='inputCity' />
        </div>

        <div className='col-6'>
          <label htmlFor='inputState' className='form-label'>
            employees range
          </label>
          <select
            id='inputState'
            className='form-select'
            {...register('employeesRange')}
          >
            <option disabled>Choose...</option>
            <option value='1-10'>1-10</option>
            <option value='10-100'>10-100</option>
            <option value='100-1000'>100-1000</option>
            <option value='1000 +'>1000 +</option>
          </select>
        </div>
        <div className='col-6'>
          <label htmlFor='inputState' className='form-label'>
            year Founding
          </label>
          <input
            {...register('yearFounding', { required: 'This is required.' })}
            type='number'
            className='form-control'
            id='inputAddress2'
          />
        </div>
        <div className='col-6'>
          <label htmlFor='inputState' className='form-label'>
            total Funding
          </label>
          <input
            {...register('totalFunding', { required: 'This is required.' })}
            type='number'
            className='form-control'
            id='inputAddress2'
          />
        </div>
        <div className='col-12'>
          {props ? (
            <button
              type='submit'
              className='btn btn-primary'
              style={{ borderRadius: '20px', margin: '20px' }}
            >
              Update Startup
            </button>
          ) : (
            <button
              disabled={isSubmitting || !isValid}
              type='submit'
              className='btn btn-primary'
              style={{ borderRadius: '20px', margin: '20px' }}
            >
              Add Startup
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

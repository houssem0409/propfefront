import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { useEffect, useState } from 'react'
import axios from 'axios'

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export function StartupForm({ props }) {
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
      console.log(formData)
      try {
        await axios.post('http://localhost:8000/api/startup/create', formData)
        console.log(formData)

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
            Update Startup
          </button>
        ) : (
          <button
            disabled={isSubmitting || !isValid}
            type='submit'
            className='btn btn-primary'
          >
            Add Startup
          </button>
        )}
      </div>
    </form>
  )
}

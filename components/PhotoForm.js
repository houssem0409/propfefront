import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { useState } from 'react'
import axios from 'axios'
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export function PhotoForm({ item, photoChanger, url }) {
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
    await sleep(2000)

    var formData = new FormData()
    if (url == 'startup') {
      formData.append('startup', item?._id)
    } else if (url == 'event') {
      formData.append('event', item?._id)
    }
    formData.append('title', data?.title)
    formData.append('photo', data?.photo[0])
    try {
      await axios.post(`http://localhost:8000/api/${url}/photo/add`, formData)
      getPhotos()
      return data
    } catch (error) {
      console.error(error)
    }
  }
  async function getPhotos() {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/${url}/${item?._id}/photos`
      )
      photoChanger(data)

      return data
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div
      className='container'
      style={{
        width: '100%',
        height: '100%',
        borderStyle: 'solid',
        borderWidth: '2px',
      }}
    >
      <form className='row g-3' onSubmit={handleSubmit(onSubmit)}>
        {isSubmitSuccessful && (
          <div className='alert alert-success'>Operation successfully !</div>
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
            name='title'
            render={({ message }) => <p>{message}</p>}
          />
        </div>

        <div className='col-9'>
          <label htmlFor='inputAddress2' className='form-label'>
            Photo
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

        <div className='col-12'>
          <button
            disabled={isSubmitting || !isValid}
            type='submit'
            className='btn btn-primary'
          >
            Add Photo
          </button>
        </div>
      </form>
    </div>
  )
}

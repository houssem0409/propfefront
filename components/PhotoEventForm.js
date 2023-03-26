import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { useState } from 'react'
import axios from 'axios'
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export function PhotoForm({ item, photoChanger }) {
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

    console.log(data)
    var formData = new FormData()
    console.log(data?.photo)
    formData.append('title', data?.title)
    formData.append('photo', data?.photo[0])
    formData.append('startup', item?._id)
    try {
      await axios.post(`http://localhost:8000/api/startup/photo/add`, formData)
      getPhotos()
      return data
    } catch (error) {
      console.error(error)
    }
  }
  async function getPhotos() {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/startup/${item?._id}/photos`
      )
      photoChanger(data)

      return data
    } catch (error) {
      console.error(error)
    }
  }

  return (
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
  )
}

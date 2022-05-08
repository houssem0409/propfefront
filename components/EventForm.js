import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import axios from 'axios'

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export function EventForm({ props }) {
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
      formData.append('title', data?.title)
      formData.append('description', data?.description)
      formData.append('country', data?.country)
      formData.append('photo', data?.photo[0])
      formData.append('address', data?.address)
      console.log(formData)
      try {
        await axios.post('http://localhost:8000/api/event/create', formData)
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
      formData.append('title', data?.title)
      formData.append('description', data?.description)
      formData.append('country', data?.country)
      formData.append('photo', data?.photo[0])
      formData.append('address', data?.address)
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

  console.log(errors)
  return (
    <form className='row g-3' onSubmit={handleSubmit(onSubmit)}>
      {isSubmitSuccessful && (
        <div className='alert alert-success'>user added successfully !</div>
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

      <div className='col-12'>
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
      <div className='col-md-6'>
        <label htmlFor='inputCity' className='form-label'>
          Country
        </label>
        <input
          {...register('country')}
          type='text'
          className='form-control'
          id='inputCity'
        />
      </div>

      <div className='col-12'>
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
    </form>
  )
}

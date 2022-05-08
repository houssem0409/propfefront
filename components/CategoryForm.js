import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import axios from 'axios'

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export function CategoryForm({ props }) {
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

      try {
        await axios.post('http://localhost:8000/api/category/create', data)

        return data
      } catch (error) {
        console.error(error)
      }
    } else {
      await sleep(2000)

      try {
        await axios.put(
          `http://localhost:8000/api/category/${props?._id}`,
          data
        )

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
        <div className='alert alert-success'> Operation successfully !</div>
      )}
      <div className='col-6'>
        <label htmlFor='inputAddress' className='form-label'>
          Name Category
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

      <div className='col-12'>
        {props ? (
          <button
            disabled={isSubmitting || !isValid}
            type='submit'
            className='btn btn-primary'
          >
            Update Category
          </button>
        ) : (
          <button
            disabled={isSubmitting || !isValid}
            type='submit'
            className='btn btn-primary'
          >
            Add Category
          </button>
        )}
      </div>
    </form>
  )
}

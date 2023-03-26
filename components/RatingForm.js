import React from 'react'
import StarRating from './StarRating'
import { ErrorMessage } from '@hookform/error-message'
import { useForm } from 'react-hook-form'
export default function RatingForm() {
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
    try {
    } catch (error) {}
  }
  return (
    <form className='row g-3' onSubmit={handleSubmit(onSubmit)}>
      <div>
        <StarRating />
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
          <ErrorMessage errors={errors} name='description' />
        </div>
      </div>
    </form>
  )
}

import React from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { useContext } from 'react'
import { UserContext } from './UserContext'
import axios from 'axios'
import { FaStar } from 'react-icons/fa'
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export default function StarRating({ props, startupRatingChanger }) {
  const { user, setTokens, tokens, getUserInfo, setUser, token, refreshToken } =
    useContext(UserContext)
  const userId = user?.data?._id
  const [rating, setRating] = useState(null)
  const [hover, setHover] = useState(null)
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
  async function ratingByStartup() {
    try {
      const data = await axios.get(
        `http://localhost:8000/api/ratings/startup/${props}`
      )
      startupRatingChanger(data)
    } catch (err) {
      console.error(err)
    }
  }
  const onSubmit = async (data) => {
    if (props) {
      await sleep(2000)
      console.log(data)
      data.score = rating
      try {
        await axios.post(
          `http://localhost:8000/api/ratings/${userId}/${props}`,
          data
        )
        console.log(data)
        ratingByStartup()
        return data
      } catch (error) {
        console.error(error)
      }
    } else {
      await sleep(2000)
      console.log(data)
      try {
        await axios.put(
          `http://localhost:8000/api/ratings/update/${user?.data?._id}`,
          data
        )
        refreshToken(refreshToken)
        getUserInfo(token)

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
        width: '40%',
        borderStyle: 'solid',
        borderWidth: '2px',
        paddingTop: '20px',
      }}
    >
      <form className='row g-3' onSubmit={handleSubmit(onSubmit)}>
        {isSubmitSuccessful && (
          <div className='alert alert-success'>Feedback successfully !</div>
        )}
        <h2 style={{ color: 'black', margin: '5px' }}>You can evaluate !</h2>
        <div
          style={{
            marginLeft: '20px',
            width: '50%',
            position: 'center',
          }}
        >
          {[...Array(5)].map((star, i) => {
            const ratingValue = i + 1
            return (
              <label style={{ backgroundColor: 'white' }}>
                <input
                  {...register('score')}
                  style={{ display: 'none' }}
                  type='radio'
                  name='rating'
                  value={ratingValue}
                  onClick={() => {
                    setRating(ratingValue)
                  }}
                />
                <FaStar
                  className='star'
                  color={
                    ratingValue <= (rating || hover) ? '#ffc107' : '#e4e5e9'
                  }
                  size={30}
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(null)}
                />
              </label>
            )
          })}
        </div>
        <div className='col-12' style={{ margin: '5px' }}>
          <label
            htmlFor='inputPassword4'
            className='form-label'
            style={{ fontSize: '20px' }}
          >
            Your Feedback :
          </label>

          <textarea
            {...register('feedback')}
            type='text'
            class='form-control'
            id='exampleFormControlTextarea1'
            rows='3'
          />
        </div>
        <div className='col-12' style={{ margin: '5px' }}>
          {props ? (
            <button
              type='submit'
              className='btn btn-primary'
              style={{ borderRadius: '20px' }}
            >
              Donne
            </button>
          ) : (
            <button
              disabled={isSubmitting || !isValid}
              type='submit'
              className='btn btn-primary'
              style={{ borderRadius: '20px' }}
            >
              Donne
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

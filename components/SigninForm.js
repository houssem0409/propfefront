import React from 'react'

export default function signInForm() {
  return (
    <div>
      <div className='container'>
        <div className='frame'>
          <div className='nav'>
            <ul classNameName='links'>
              <li className='signin-active'>
                <a className='btn'>Sign in</a>
              </li>
              <li className='signup-inactive'>
                <a className='btn'>Sign up </a>
              </li>
            </ul>
          </div>
          <div ng-app ng-init='checked = false'>
            <form className='form-signin' action='' method='post' name='form'>
              <label for='username'>Username</label>
              <input
                className='form-styling'
                type='text'
                name='username'
                placeholder=''
              />
              <label for='password'>Password</label>
              <input
                className='form-styling'
                type='text'
                name='password'
                placeholder=''
              />
              <input type='checkbox' id='checkbox' />
              <label for='checkbox'>
                <span className='ui'></span>Keep me signed in
              </label>
              <div className='btn-animate'>
                <a className='btn-signin'>Sign in</a>
              </div>
            </form>

            <form className='form-signup' action='' method='post' name='form'>
              <label for='fullname'>Full name</label>
              <input
                className='form-styling'
                type='text'
                name='fullname'
                placeholder=''
              />
              <label for='email'>Email</label>
              <input
                className='form-styling'
                type='text'
                name='email'
                placeholder=''
              />
              <label for='password'>Password</label>
              <input
                className='form-styling'
                type='text'
                name='password'
                placeholder=''
              />
              <label for='confirmpassword'>Confirm password</label>
              <input
                className='form-styling'
                type='text'
                name='confirmpassword'
                placeholder=''
              />
              <a ng-click='checked = !checked' className='btn-signup'>
                Sign Up
              </a>
            </form>

            <div className='success'>
              <path
                fill='#ffffff'
                d='M40.61,23.03L26.67,36.97L13.495,23.788c-1.146-1.147-1.359-2.936-0.504-4.314
                  c3.894-6.28,11.169-10.243,19.283-9.348c9.258,1.021,16.694,8.542,17.622,17.81c1.232,12.295-8.683,22.607-20.849,22.042
                  c-9.9-0.46-18.128-8.344-18.972-18.218c-0.292-3.416,0.276-6.673,1.51-9.578'
              />
              <div className='successtext'>
                <p>
                  {' '}
                  Thanks for signing up! Check your email for confirmation.
                </p>
              </div>
            </div>
          </div>

          <div className='forgot'>
            <a href='#'>Forgot your password?</a>
          </div>

          <div>
            <div className='cover-photo'></div>
            <div className='profile-photo'></div>
            <h1 className='welcome'>Welcome, Chris</h1>
            <a className='btn-goback' value='Refresh' onClick='history.go()'>
              Go back
            </a>
          </div>
        </div>

        <a id='refresh' value='Refresh' onClick='history.go()'>
          <path
            d='M321.832,230.327c-2.133-6.565-9.184-10.154-15.75-8.025l-16.254,5.281C299.785,206.991,305,184.347,305,161.224
                c0-84.089-68.41-152.5-152.5-152.5C68.411,8.724,0,77.135,0,161.224s68.411,152.5,152.5,152.5c6.903,0,12.5-5.597,12.5-12.5
                c0-6.902-5.597-12.5-12.5-12.5c-70.304,0-127.5-57.195-127.5-127.5c0-70.304,57.196-127.5,127.5-127.5
                c70.305,0,127.5,57.196,127.5,127.5c0,19.372-4.371,38.337-12.723,55.568l-5.553-17.096c-2.133-6.564-9.186-10.156-15.75-8.025
                c-6.566,2.134-10.16,9.186-8.027,15.751l14.74,45.368c1.715,5.283,6.615,8.642,11.885,8.642c1.279,0,2.582-0.198,3.865-0.614
                l45.369-14.738C320.371,243.946,323.965,236.895,321.832,230.327z'
          />
        </a>
      </div>
    </div>
  )
}

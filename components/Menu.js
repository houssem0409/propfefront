import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'

import { UserContext } from '../components/UserContext'
import { Navbar, Nav, Container, NavDropdown, span } from 'react-bootstrap'
import { signOut } from '../pages/api/auth'

export default function Menu() {
  const {
    user,
    token,
    login,
    logout,
    gatherUserInfo,
    isAuthenticated,
    tokens,
    setfirst,
  } = useContext(UserContext)
  const history = useRouter()
  const sigOnut = () => {
    history.push('/user/signin')
    logout()
  }

  return (
    <div>
      <nav className='navbar navbar-expand-lg navbar-light bg-light'>
        <div className='container-fluid'>
          <a className='navbar-brand' href='#'>
            startups directory
          </a>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarNavDropdown'
            aria-controls='navbarNavDropdown'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarNavDropdown'>
            <ul className='navbar-nav'>
              <li className='nav-item'>
                <Link className='nav-link' href='/admin'>
                  <a className='nav-link'>DashBoard</a>
                </Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' href='/home'>
                  <a className='nav-link'>home</a>
                </Link>
              </li>
              <ul className='navbar-nav' style={{ marginRight: '150px' }}>
                <li className='nav-item dropdown'>
                  <a
                    className='nav-link dropdown-toggle'
                    data-bs-toggle='dropdown'
                    href='#'
                    role='button'
                    aria-expanded='false'
                  >
                    Advanced
                  </a>
                  <ul
                    className='dropdown-menu'
                    style={{ marginRight: '120px' }}
                  >
                    <li className='nav-item'>
                      <Link className='nav-link' href='/startups'>
                        <a className='dropdown-item'>Startups</a>
                      </Link>
                    </li>
                    <li>
                      <Link className='nav-link' href='/events'>
                        <a className='dropdown-item'>Events</a>
                      </Link>
                    </li>
                    <li>
                      <hr className='dropdown-divider' />
                    </li>
                    <li>
                      <a className='dropdown-item' href='#scrollspyHeading5'>
                        Peoples
                      </a>
                    </li>
                    <li>
                      <div className='nav-link'>
                        <a className='dropdown-item'>Challanges</a>
                      </div>
                    </li>
                  </ul>
                </li>
              </ul>
            </ul>
          </div>
        </div>
        <div className='container-fluid'>
          <form className='d-flex'>
            <input
              className='form-control me-2'
              type='search'
              placeholder='Search'
              aria-label='Search'
              style={{ background: 'white' }}
            />
            <button className='btn btn-outline-success' type='submit'>
              Search
            </button>
          </form>
        </div>
        {!isAuthenticated && (
          <ul className='navbar-nav'>
            <div
              className='col-md-4'
              style={{ flexDirection: 'column-reverse' }}
            >
              <Link href='/user/signup'>
                <a style={{ color: 'white' }} className='nav-link'>
                  SignUp
                </a>
              </Link>
              <Link href='/user/signin'>
                <a style={{ color: 'white' }} className='nav-link'>
                  SignIn
                </a>
              </Link>
            </div>
          </ul>
        )}
        {isAuthenticated && (
          <ul className='navbar-nav' style={{ marginRight: '150px' }}>
            <li className='nav-item dropdown'>
              <a
                className='nav-link dropdown-toggle'
                data-bs-toggle='dropdown'
                href='#'
                role='button'
                aria-expanded='false'
              >
                <i className='bi bi-person-circle'></i>
              </a>
              <ul className='dropdown-menu' style={{ marginRight: '120px' }}>
                <li className='nav-item'>
                  <Link className='nav-link' href='/profile'>
                    <a className='dropdown-item'>Profile</a>
                  </Link>
                </li>
                <li>
                  <a className='dropdown-item' href='#scrollspyHeading4'>
                    Fourth
                  </a>
                </li>
                <li>
                  <hr className='dropdown-divider' />
                </li>
                <li>
                  <a className='dropdown-item' href='#scrollspyHeading5'>
                    Fifth
                  </a>
                </li>
                <li>
                  <div className='nav-link'>
                    <a className='dropdown-item' onClick={sigOnut}>
                      Signout
                    </a>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        )}
      </nav>
    </div>
  )
}

/**
 * 
 *  <nav class='navbar navbar-expand navbar-dark bg-dark'>
        <a href='#' class='navbar-brand'>
          Super Education
        </a>
        <ul class='nav nav-pills' routerLinkActive='active'>
          <li class='nav-item'>
            <a href='/home' class='nav-link' routerLink='home'>
              Home{' '}
            </a>
          </li>
          <li class='nav-item'>
            <a href='/admin' class='nav-link' routerLink='admin'>
              Admin Board
            </a>
          </li>
          <li class='nav-item'>
            <a href='/mod' class='nav-link' routerLink='mod'>
              Moderator Board
            </a>
          </li>
          <li class='nav-item'>
            <a href='/user' class='nav-link' routerLink='teacherManagment'>
              Teacher Management
            </a>
          </li>
          <li class='nav-item'>
            <a href='/user' class='nav-link' routerLink='studentManagment'>
              Student Management
            </a>
          </li>
        </ul>
        <ul class='navbar-nav ml-auto'>
          <li class='nav-item'>
            <a href='/register' class='nav-link' routerLink='register'>
              Sign Up
            </a>
          </li>
          <li class='nav-item'>
            <a href='/login' class='nav-link' routerLink='login'>
              Login
            </a>
          </li>
        </ul>

        <ul class='navbar-nav ml-auto'>
          <li class='nav-item'>
            <a href='/profile' class='nav-link' routerLink='profile'></a>
          </li>
          <li class='nav-item'>
            <a href class='nav-link'>
              LogOut
            </a>
          </li>
        </ul>
      </nav>
 */

/**
       *  <Navbar
        collapseOnSelect
        expand='lg'
        bg='primary'
        style={{ marginBottom: '10px' }}
      >
        <Container>
          <Link
            href='/home'
            style={{ color: 'red', position: 'absolute', marginLeft: '50px' }}
          >
            <a
              className='nav-link'
              style={{ color: 'white', fontSize: '2rem' }}
            >
              Home
            </a>
          </Link>

          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='me-auto'></Nav>
            <Nav>
              {!isAuthenticated && (
                <div
                  className='col-md-4'
                  style={{ flexDirection: 'column-reverse' }}
                >
                  <Link href='/user/signup'>
                    <a style={{ color: 'white' }} className='nav-link'>
                      SignUp
                    </a>
                  </Link>
                  <Link href='/user/signin'>
                    <a style={{ color: 'white' }} className='nav-link'>
                      SignIn
                    </a>
                  </Link>
                </div>
              )}
              {isAuthenticated && (
                <div>
                  <a
                    style={{
                      cursor: 'pointer',
                      color: '#ffffff',
                      color: 'red',
                    }}
                    onClick={sigOnut}
                  >
                    {' '}
                    Signout
                  </a>
                </div>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
       */

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import moment from 'moment'

export const UserContext = React.createContext()

const Auth = ({ children }) => {
  const [user, setUser] = useState()
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [token, setToken] = useState()
  const { push, pathname } = useRouter()
  const [interva, setInterva] = useState()
  const route = useRouter()

  const setGlobalToken = () => {
    axios.defaults.headers.common = {
      Authorization: `Bearer  ${token}`,
    }
  }

  const logout = async () => {
    setIsAuthenticated(false)
    axios.defaults.headers.common = {}
    const { data } = JSON.parse(localStorage['jwt'])
    delete localStorage['jwt']
    setLoading(true)
    setUser()
    setToken()
    //setGlobalToken(refresh)
    route.push('/user/signin')
    setLoading(false)
    await axios.get(`http://localhost:8000/api/signout`)
    clearInterval(interva)
  }
  const getUserInfo = async (token) => {
    try {
      const res = await axios.get(`http://localhost:8000/api/protected`, {
        headers: {
          Authorization: token,
        },
      })
      console.log(res)
      setUser(res)
      setIsAuthenticated(true)
    } catch (error) {
      console.error(error)
    }
  }
  const refreshToken = async (refreshToken) => {
    const { data } = await axios.post(`http://localhost:8000/api/refresh`, {
      refresh: refreshToken,
    })
    setToken(data?.token)
    setGlobalToken(data?.token)
    localStorage['jwt'] = JSON.stringify(data)
    console.log(data?.refresh)
    return data
  }
  const setRefreshLoop = (token) => {
    let expiresToken = token
    console.log(expiresToken)
    interva = setInterval(() => {
      refreshToken(expiresToken)
        .then((refresh) => {
          expiresToken = refresh?.refresh
        })
        .catch(console.log)
    }, 30000)
    setInterva(interva)
  }
  useEffect(() => {
    const authenticate = async () => {
      if (typeof window !== 'undefined') {
        const tokens = localStorage.getItem('jwt')
        // console.log(tokens.includes('refresh'))
        if (tokens?.length) {
          const parseTokens = JSON.parse(tokens)
          console.log(parseTokens)
          try {
            const data = await refreshToken(parseTokens?.refresh)
            var current = new Date()
            console.log(current.toLocaleTimeString())
            console.log(data?.expireIn)
            const b = true
            if (!b) {
              logout()
              clearInterval(inter)
              setIsAuthenticated(false)
              route.push('/user/signin')
            } else {
              setGlobalToken(data?.token)
              setToken(data?.token)
              console.log(data?.refresh)
              setRefreshLoop(data?.refresh)
              setIsAuthenticated(true)
              await getUserInfo(data?.token)
            }
          } catch (e) {
            delete localStorage['jwt']
            setUser()
            setToken()
            route.push('/user/signin')
            setLoading(false)
          }
        } else {
          console.log('eni lehi nbadel')
          if (pathname == '/') push('/user/signin')
        }
        setLoading(false)
      }
    }
    authenticate()
  }, [])
  const login = async (username, password) => {
    const { data } = await axios.post(`http://localhost:8000/api/signin`, {
      username: username,
      password: password,
    })
    localStorage['jwt'] = JSON.stringify(data)
    setGlobalToken(data)
    setToken(data)

    setLoading(true)
    setUser(data)
    setLoading(false)
    setIsAuthenticated(true)
    setRefreshLoop(data?.refresh)
    route.push('/home')
  }
  return (
    <UserContext.Provider
      value={{
        user,
        token,
        login,
        isAuthenticated,
        loading,
        logout,
        getUserInfo,
      }}
    >
      {!loading ? children : <div>Loading...</div>}
    </UserContext.Provider>
  )
}

export default Auth

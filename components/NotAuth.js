import React, { useContext } from 'react'
import AccessDenied from './AccessDenied'
import { UserContext } from './UserContext'
import { useRouter } from 'next/router'
const NotAuth = (WrappedComponent) => (props) => {
  const { user, setTokens, tokens, token, mystartupManage } =
    useContext(UserContext)
  const router = useRouter()

  return (
    <div>
      <div>
        {!user ? (
          <WrappedComponent />
        ) : (
          <div>
            <AccessDenied />
          </div>
        )}
      </div>
    </div>
  )
}

export default NotAuth

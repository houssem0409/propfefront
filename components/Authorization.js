import React, { useContext } from 'react'
import AccessDenied from './AccessDenied'
import { UserContext } from './UserContext'
const Authorization = (WrappedComponent, role) => (props) => {
  const { user, setTokens, tokens, token, mystartupManage } =
    useContext(UserContext)
  return (
    <div>
      {role.indexOf(user?.data?.role) === -1 ? (
        <div>
          <AccessDenied />
        </div>
      ) : (
        <div>
          <WrappedComponent />
        </div>
      )}
    </div>
  )
}

export default Authorization

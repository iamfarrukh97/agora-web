import React from 'react'
import { Link } from 'react-router-dom'
const UserType = () => {
  return (
    <div>
      <Link to={{ pathname: '/Tours', state: { userType: 'host' } }}>
        <h1>Host </h1>
      </Link>
      <Link to={{ pathname: '/Tours', state: { userType: 'guest' } }}>
        <h1>Guest </h1>
      </Link>
    </div>
  )
}

export default UserType

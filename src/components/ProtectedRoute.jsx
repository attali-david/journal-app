import React from 'react'
import PropTypes from 'prop-types'
import Home from './Home'
import {Navigate, Outlet, useLocation} from 'react-router-dom'
import {useAuth} from './AuthProvider'

const ProtectedRoute = ({children}) => {
  const {loggedIn} = useAuth()
  const location = useLocation()

  if(!loggedIn) {
    return <Navigate to='/' replace state={{from: location}}/>
  }
    return <Outlet/>
}

export default ProtectedRoute

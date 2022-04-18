import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {Link, useNavigate} from 'react-router-dom'
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import {Button} from 'react-bootstrap'
import {useAuth} from './AuthProvider'

const SignIn = () => {
  const navigate = useNavigate()
  const {initFirebaseAuth, user, authStateObserver} = useAuth()

  useEffect(() => {
    initFirebaseAuth()
  }, [])

  const signIn = async () => {
    // Sign in Firebase using popup auth and Google as the identity provider.
    try {
      var provider = new GoogleAuthProvider();
      await signInWithPopup(getAuth(), provider);
      navigate(`/dashboard`)
    }
    catch {
      console.error('Failed to log in')
    }
  }

  return (
    <article>
      <Button variant="outline-primary" onClick={signIn}>Sign In With Google</Button>
    </article>
  )
}

export default SignIn

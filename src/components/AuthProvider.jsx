import React, {useState, useContext} from 'react'
import {useNavigate, useLocation} from 'react-router-dom'
import {GoogleAuthProvider, signInWithPopup, getAuth, onAuthStateChanged, signOut, verifyIdToken } from 'firebase/auth'


export const AuthContext = React.createContext(null)

export function useAuth() {
  return useContext(AuthContext)
}

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({userName: '', profilePic:null})
  const [loggedIn, setLoggedIn] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const signIn = async () => {
    // Sign in Firebase using popup auth and Google as the identity provider.
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(getAuth(), provider);
      const origin = location.state?.from?.pathname || '/dashboard';
      navigate(origin);
    }
    catch {
      console.error('Failed to log in')
    }
  };

  const getProfilePicUrl = () => {
    return getAuth().currentUser.photoURL;
  }

  // Returns the signed-in user's display name.
  const getUserName = () => {
    return getAuth().currentUser.displayName;
  }

  const authStateObserver = (login) => {
    if (login){
      setUser({userName: getUserName(), profilePic: getProfilePicUrl()})
      setLoggedIn(true)
    } else {
      setUser({userName: '', profilePic:''});
      setLoggedIn(false)
    }
  }

  // Initialize firebase auth
  function initFirebaseAuth() {
    // Listen to auth state changes.
    onAuthStateChanged(getAuth(), authStateObserver);
  }

  const signOutUser = async () => {
    setUser({userName: '', profilePic:''});
    signOut(getAuth())
    navigate('/')
  }

  const value = {
    user,
    loggedIn,
    signIn,
    signOutUser,
    initFirebaseAuth,
    authStateObserver,
    getUserName,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider

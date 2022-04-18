import React, {useState} from 'react'
import '../stylesheets/App.css';
import TopNav from "./TopNav"
import {BrowserRouter, Routes,  Route, createContext} from 'react-router-dom'
import Dashboard from './Dashboard'
import SignIn from './SignIn'
import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import Journal from './Journal'
import Menu from './Menu'
import TextEditor from './TextEditor'
import Home from './Home'
import ProtectedRoute from './ProtectedRoute'
import AuthProvider from './AuthProvider'
import WithLayout from './Wrappers/LayoutWrapper'


function App() {
  return (
        <>
        <BrowserRouter>
          <AuthProvider>
              <TopNav/>
                  <Routes>
                    <Route path='/' element={<Home/>}/>
                  </Routes>
                  <WithLayout>
                    <Routes>
                      <Route element={<ProtectedRoute/>}>
                        <Route path='/dashboard' element={<Dashboard/>}/>
                        <Route path='/journal/:id' element={<Journal/>}/>
                        <Route path='/journal/:id/editor' element={<TextEditor/>}/>
                      </Route>
                    </Routes>
                  </WithLayout>
            </AuthProvider>
          </BrowserRouter>
        </>
  );
}

export default App;

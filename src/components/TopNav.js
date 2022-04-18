import React, {useState, useEffect, useContext} from 'react'
import PropTypes from 'prop-types'
import {Link, useNavigate} from 'react-router-dom'
import '../stylesheets/nav.css'
import {Button, Navbar, Container, Nav, NavDropdown} from 'react-bootstrap';
import SignIn from './SignIn'
import {useAuth} from './AuthProvider'

const TopNav = () => {
  const {user, loggedIn, signOutUser, initFirebaseAuth, authStateObserver} = useAuth()

  return (
    <Navbar bg="dark" variant="dark" fixed="top" expand="lg">
      <Container>
        <Navbar.Brand href="#home">JRNL</Navbar.Brand>
          <Nav className="me-auto">
            {!loggedIn && <SignIn initFirebaseAuth={initFirebaseAuth} user={user} authStateObserver={authStateObserver}/>}
            {!!loggedIn && <NavDropdown title='user' id="basic-nav-dropdown">
              <NavDropdown.Item >Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={signOutUser}>Sign Out</NavDropdown.Item>
            </NavDropdown>}
          </Nav>
      </Container>
    </Navbar>
  )
}


export default TopNav

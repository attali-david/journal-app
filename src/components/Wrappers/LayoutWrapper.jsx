import React from 'react'
import PropTypes from 'prop-types'
import '../../stylesheets/layout.css'
import Menu from '../Menu'
import {useAuth} from '../AuthProvider'

const WithLayout = ({children}) => {
  const {loggedIn} = useAuth()
    return (!!loggedIn) ? (
        <main className='dashboard'>
          <aside className='menuNav'>
            <Menu/>
          </aside>
          <section className='dashSection'>
            {children}
          </section>
        </main>
    ) : <></>
}

export default WithLayout

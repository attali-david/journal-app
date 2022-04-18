import React from 'react'
import PropTypes from 'prop-types'
import '../stylesheets/dashboard.css'
import Menu from './Menu.js'
import {useState} from 'react'
import Journal from './Journal.js'

const Dashboard = (props) => {
  const [toggle, setToggle] = useState(false)

  const toggleJournal = () => {
    setToggle(!toggle)
  }
  return (
    <>
      <h1>Dashboard</h1>
    </>
  )
}
export default Dashboard

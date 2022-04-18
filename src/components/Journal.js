import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {useParams, useNavigate} from 'react-router-dom'
import {getFirestore, doc, getDoc} from 'firebase/firestore'
import {Card, Button} from 'react-bootstrap'
import TextEditor from './TextEditor'
import Entries from './Entries'
import withLayout from './Wrappers/LayoutWrapper'


const Journal = (props) => {
  let {id} = useParams()
  const [journal, setJournal] = useState()
  const [toggle, setToggle] = useState(false)


  useEffect(() => {
    retrieveDoc()
  }, [id])

  const retrieveDoc = async () => {
    const docRef = doc(getFirestore(), "journals", id);
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      setJournal(docSnap.data())
    } else {
      console.log("No such document!");
    }
  }

  const toggler = () => {
    setToggle(!toggle)
  }


  return (
    <>
      {!toggle &&
      <>
        <Button variant="primary" onClick={toggler}>New Entry</Button>
        <Entries id={id}/>
      </>}
      {!!toggle &&
        <TextEditor toggler={toggler} journal={journal} id={id}/>}
    </>
  )
}

export default Journal

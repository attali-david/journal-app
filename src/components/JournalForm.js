import React from 'react'
import PropTypes from 'prop-types'
import {Form, Button, Modal} from 'react-bootstrap'
import {addDoc, collection, getFirestore, serverTimestamp, handle} from 'firebase/firestore'
import {useAuth} from './AuthProvider'


const JournalForm = ({setJournals, setShow, journals, initialJournal, handleClose, show}) => {
  const inputHandler = (e) => {
    const {value, name} = e.target
    setJournals({[name]:value})
  }
  const {user} = useAuth()

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      const docRef = await addDoc(collection(getFirestore(), "journals"),{
        title: journals.title,
        timestamp: serverTimestamp(),
        user: user.userName
      });
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
    setJournals({...initialJournal})
    handleClose()
  }

  return (
    <Modal show={show} size="sm" onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Journal</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Journal Name</Form.Label>
            <Form.Control type="text" name='title' placeholder="Journal Name" onChange={inputHandler}/>
            <Form.Text className="text-muted">
              It's helpful to name reading journals after the book.
            </Form.Text>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" type="submit" onClick={submitHandler}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default JournalForm

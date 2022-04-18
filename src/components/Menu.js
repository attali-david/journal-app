import React, {useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import PropTypes from 'prop-types'
import '../stylesheets/menu.css'
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  setDoc,
  updateDoc,
  doc,
  serverTimestamp,
  where
} from 'firebase/firestore';
import {Accordion, DropdownButton, Dropdown, ListGroup, Navbar, Container, Offcanvas, Nav, Form, NavDropdown, FormControl} from 'react-bootstrap'
import JournalForm from './JournalForm'
import {useAuth} from './AuthProvider'

const Menu = ({toggleJournal}) => {
  const [journalCollection, setJournalCollection] = useState([])
  const [toggle, setToggle] = useState(false)
  const initialJournal = {title: ''}
  const [journals, setJournals] = useState({...initialJournal})
  const [show, setShow] = useState(false);
  const navigate = useNavigate()
  const {user} = useAuth()

  useEffect(() => {
    journalQuery()
  }, [])

  const createJournalHandler = () => {
    setToggle(!toggle)
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const journalQuery = () => {
    const q = query(collection(getFirestore(), "journals"), where("user", "==", user.userName));
    onSnapshot(q, (snapshot) => {
      setJournalCollection(snapshot.docs.map((doc) => ({...doc.data(), id:doc.id})))
    })
  }

  const journalClick = (id) => {
    navigate(`/journal/${id}`)
  }

  return (
    <Nav defaultActiveKey="/home" variant='dark' className="flex-column">
        {!!show &&
        <div>
          <JournalForm setJournals={setJournals} journals={journals} handleClose={handleClose} show={show} initialJournal={initialJournal} setShow={setShow}/>
        </div>}
      <Accordion defaultActiveKey="0" flush>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Journals</Accordion.Header>
            <Accordion.Body>
              <ListGroup defaultActiveKey='#link1' variant='flush'>
                <ListGroup.Item action onClick={handleShow} variant="primary">Add Journal</ListGroup.Item>
          {journalCollection.map((journal) => (
             <ListGroup.Item action onClick={() => journalClick(journal.id)} key={journal.id}>{journal.title}</ListGroup.Item>
          ))}
          </ListGroup>
        </Accordion.Body>
          </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Library</Accordion.Header>
            <Accordion.Body>
              <ListGroup defaultActiveKey='#link1' variant='flush'>
              {journalCollection.map((journal) => (
                 <ListGroup.Item action onClick={() => journalClick(journal.id)} key={journal.id}>{journal.title}</ListGroup.Item>
              ))}
              </ListGroup>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Reading Stack</Accordion.Header>
            <Accordion.Body>
              <ListGroup defaultActiveKey='#link1' variant='flush'>
              {journalCollection.map((journal) => (
                 <ListGroup.Item action onClick={() => journalClick(journal.id)} key={journal.id}>{journal.title}</ListGroup.Item>
              ))}
              </ListGroup>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Nav>
  )
}

export default Menu

import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {Card, Button} from 'react-bootstrap'
import {getFirestore, doc, getDoc, onSnapshot, collection} from 'firebase/firestore'

const Entry = ({id}) => {
  const [entries, setEntries] = useState([])
  const [toggle, setToggle] = useState(false)

  useEffect(() => {
    journalQuery()
  }, [id])

  const retrieveDoc = async () => {
    const docRef = doc(getFirestore(), "journals", `${id}`, "entries");
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      setEntries(docSnap.data())
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  const journalQuery = () => {
    onSnapshot(collection(getFirestore(), "journals", `${id}`, "entries"), (snapshot) => {
      setEntries(snapshot.docs.map((doc) => ({...doc.data(), id:doc.id})))
    }
  )}

  return (
    <>
    {entries.map(entry => (
        <Card key={entry.id}>
          <Card.Header>{entries.timestamp}</Card.Header>
          <Card.Body>
            <Card.Title>Hashtags?</Card.Title>
            <Card.Text>
              {entry.text}
            </Card.Text>
            <Button variant="primary">Edit</Button>
          </Card.Body>
        </Card>
    ))}
    </>
  )
}

export default Entry

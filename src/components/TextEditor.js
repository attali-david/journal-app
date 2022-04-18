import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import { Editor } from "react-draft-wysiwyg";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState } from 'draft-js';
import {Card, Button, ButtonGroup, CloseButton} from 'react-bootstrap'
import {getFirestore, addDoc, collection } from 'firebase/firestore'
import {useAuth} from './AuthProvider'

const TextEditor = ({journal, id, toggler}) => {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty())
  const [date, setDate] = useState()
  const {user} = useAuth()

  useEffect(() => {
    setDate(new Date().toLocaleDateString())
  }, [])

  const editorHandler = (state) => {
     setEditorState(state);
  }

  const submitHandler = async () => {
    try {
      const docRef = await addDoc(collection(getFirestore(), "journals", `${id}`, "entries"),{
        text: `${editorState.getCurrentContent().getPlainText()}`,
        entryDate: {date},
        journal: `${journal.title}`,
        user: user.userName
      })
    } catch (e) {
      console.error('Error adding document: ', e)
    }
    toggler()
  }

  return (
    <>
      <Card>
        <Card.Header></Card.Header>
        <Card.Body>
          <Card.Title>{date}</Card.Title>
          <CloseButton onClick={toggler}/>
        </Card.Body>
        <Editor
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          editorState={editorState}
          onEditorStateChange={setEditorState}
          toolbar={{
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true },
          }}
        />
        <ButtonGroup aria-label="Basic example">
          <Button variant="primary" onClick={submitHandler}>Save</Button>
          <Button variant="secondary">Share</Button>
        </ButtonGroup>
      </Card>
    </>
  )
}

export default TextEditor

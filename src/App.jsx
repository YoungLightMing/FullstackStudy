import React, { useState, useEffect } from 'react'

import * as server from './server'
import Note from './components/Note'
import './index.css'


const App = () => {
  const [notes, setNotes] = useState([]) 
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    console.log('effect')
    server.getAll()
      .then(data => {
        console.log('promise fulfilled')
        setNotes(data)
      })
      .catch(err => {
        console.error(err);
      })
  }, [])

  console.log('render', notes.length, 'notes')

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
    }

    server.create(noteObject)
    .then(data => {
      console.log(data);
      setNotes(notes.concat(data))
      setNewNote('')
    })
  }

  const logImportant = (id) => {
    const note = notes.find(item => item.id === id);
    const newNote = {...note, important: !note.important}
    server.modify(id, newNote)
      .then(data => {
        setNotes(notes.map(item => item.id === id ? data : item))
      })
      .catch(err => {
        console.log(err);
      })
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  return (
    <div>
      <h1>oh no ! 我的朋友们！想死你们了！</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>      
      <ul>
        {notesToShow.map((note, i) => 
          <Note logImportant={() => logImportant(note.id)} key={i} note={note} />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>   
    </div>
  )
}

export default App 
import React from 'react'

const Note = ({ note, logImportant }) => {
  return (
    <>
    <li>{note.content}  
    <button type="button" onClick={logImportant} >设置为 {note.important ? '不重要' : '重要'}</button></li>
    </>
  )
}

export default Note
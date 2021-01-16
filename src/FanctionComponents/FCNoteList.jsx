import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import FCNoteInfo from './FCNoteInfo';

function FCNoteList(props) {

function removenote(counter){
  let loggedUser = JSON.parse(sessionStorage.getItem('user'))
  let NoteList = loggedUser.notes
  NoteList = NoteList.filter(n => n.counter !== counter);
  props.settolocalandstate(loggedUser,NoteList)
 }


  return (
    <div>
    Notes
{props.listnote.map((note, index) =>
<FCNoteInfo removenote={removenote} note={note} /> 
)}
<br/><Link to="/main">Go 2 add more note</Link>
</div>
  )
}
export default withRouter(FCNoteList)















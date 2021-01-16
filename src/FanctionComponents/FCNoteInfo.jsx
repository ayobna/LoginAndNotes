import React from 'react'
import { withRouter } from 'react-router-dom'
import { Button } from '@material-ui/core';

 function FCNoteInfo(props) {
   function btnremove(){
    props.removenote(props.note.counter)
  }
  return (
    <div>
    <p key={props.note.counter+1} >  {props.note.title} ---- {props.note.description} <Button variant="contained"onClick={btnremove}>X</Button></p>   
     </div>
  )
}
export default withRouter(FCNoteInfo)


import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom';
import { Button, TextField } from '@material-ui/core';

class CCMain extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            description: '',
            Notes:[],
           
        }
    }


    check = (e) => {
        let id = e.target.id
        if (id === 'title') {
            this.setState({
                title: e.target.value
            })
        }
        else if (id === 'description') {
            this.setState({
                description: e.target.value
            })
        }
    }
    btmaddnote=()=>{
        let loggedUser = JSON.parse(sessionStorage.getItem('user'))
        let NoteList = loggedUser.notes
        let note = { title: this.state.title, description: this.state.description ,counter:Math.random()}
        this.setState({counter:this.state.counter+1}) 
        this.setState({Notes:[...NoteList,note]},()=>this.addtolocalstorage())
        
    }

    addtolocalstorage = () => {
        let loggedUser = JSON.parse(sessionStorage.getItem('user'))
        let storedU = JSON.parse(localStorage.getItem('Users'))
        if (storedU.find((u) => u.email === loggedUser.email && u.pass === loggedUser.pass)){
          this.props.settolocalandstate(loggedUser,this.state.Notes)           
            this.props.history.push({
                pathname: '/notelist',
            });
        }
    }

        render() {
            return (
                <div>
                    main page<br />
                    <TextField id="title" label="title" onChange={this.check} /><br />
                    <TextField id="description" label="description" onChange={this.check} /><br />
                    <Button variant="contained" onClick={this.btmaddnote}>Add Note</Button><br />
                    <Link to="/notelist">Go 2 note page</Link>
                </div>
            )
        }
    }
    export default withRouter(CCMain)
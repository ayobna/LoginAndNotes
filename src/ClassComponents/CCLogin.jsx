import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom';
import { Button, TextField } from '@material-ui/core';

class CCLogin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            message: ''
        }
    }

    check = (e) => {
        let id = e.target.id
        if (id === 'email') {
            this.setState({
                email: e.target.value
            })
        }
        else if (id === 'pass') {
            this.setState({
                pass: e.target.value
            })
        }
    }

 

    btmLogin = () => {
        let user = { email: this.state.email, pass: this.state.pass }
        if (localStorage.getItem('Users')) {
            let storedU = JSON.parse(localStorage.getItem('Users'))
            if (storedU.find((u) => u.email === user.email && u.pass === user.pass)) {
                let index = storedU.findIndex(em=>em.email===user.email)
                let newuser = { email: this.state.email, pass: this.state.pass,notes:storedU[index].notes }
                sessionStorage.setItem('user',JSON.stringify(newuser))
              
              this.props.newlistnote(storedU[index].notes)
                this.props.history.push({
                    pathname: '/main'

                })
                this.props.checkIfLogIn(true)
            }
            else {
                this.setState({ message: 'check your dedail' })
            }
        }
    }


   


    render() {
        return (
            <div>
                Login<br />
                <TextField id="email" label="email" onChange={this.check} /><br />
                <TextField id="pass" label="pass" onChange={this.check} /><br />
                {this.state.message}<br />
                <Button variant="contained" onClick={this.btmLogin}>LogIn</Button><br />
                <Link to="/register">not a member? register</Link>
            </div>
        )
    }
}
export default withRouter(CCLogin);
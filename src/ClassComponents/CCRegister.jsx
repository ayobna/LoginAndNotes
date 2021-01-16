import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import {ButtonGroup, Button, TextField } from '@material-ui/core';

class CCRegister extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            pass: '',
            pass2: '',
            message: ''
        }
    }

    check = (e) => {
        let id = e.target.id
        let value = e.target.value
        console.log(value)
        if (id === 'email') {
            console.log('in email')
            this.setState({
                email: value
            })
        }
        else if (id === 'pass') {
            this.setState({
                pass: value
            })
        }
        else if (id === 'pass2') {
            this.setState({
                pass2: value
            })
        }
    }
 
    btnregister = () => {
        let emailPattern =  /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/; 
        let checkEmail = emailPattern.test(this.state.email)
        console.log(checkEmail)
        if (this.state.email !== '' && this.state.pass === this.state.pass2&&checkEmail===true) {
            let user = { email: this.state.email, pass: this.state.pass, notes:[]}
            if (localStorage.getItem('Users')) {
                let storedU = JSON.parse(localStorage.getItem('Users'))
                if (storedU.find((u) => u.email === user.email)) {
                    this.setState({ message: 'user already exist' })
                }
                else{
                    storedU=[...storedU,user]
                    localStorage.setItem('Users',JSON.stringify(storedU))
                    this.props.history.push({
                        pathname:'/'
                    })
                }
            }
            else{
                localStorage.setItem('Users',JSON.stringify([user]))
                this.props.history.push({
                    pathname:'/'
                })
            }
        }
        else{
            this.setState({ message: 'fields arent filled properly' })
        }

    }
    login=()=>{
        this.props.history.push({
            pathname:'/'
        }) 
    }
    render() {
        console.log(this.props.message)
        return (
            <div>
                register<br />
                <TextField id="email" label="email" value={this.state.email} onChange={this.check} /><br />
                <TextField id="pass" label="pass" value={this.state.pass} onChange={this.check} /><br />
                <TextField id="pass2" label="confrim pass" value={this.state.pass2} onChange={this.check} /><br />
                {this.state.message}<br />
                <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                <Button variant="contained" onClick={this.btnregister}>register</Button><br />
                <Button variant="contained" onClick={this.login}>login</Button><br />
               </ButtonGroup>
            </div>
        )
    }
}
export default withRouter(CCRegister)

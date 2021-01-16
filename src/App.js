import React, { Component } from 'react';
import CCRegister from './ClassComponents/CCRegister';
import CCLogin from './ClassComponents/CCLogin';
import CCMain from './ClassComponents/CCMain';
import { withRouter, Switch, Route ,Link} from 'react-router-dom';
import './App.css';
import FCNoteList from './FanctionComponents/FCNoteList';
import FCNoteInfo from './FanctionComponents/FCNoteInfo';
import { Button, ButtonGroup } from '@material-ui/core';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: '',
      isLogged: false
      
    }
  }






  checkIfLogIn = (val) => {
    this.setState({
      isLogged: val
    })
  }


  logOut = () => {
    sessionStorage.clear();
    this.props.history.push({
      pathname: '/'
    })
    this.setState({
      isLogged: false
    })
  }

  newlistnote=(listnote)=>{
    this.setState({
      listnote: listnote
    })   
  }

  settolocalandstate=(loggedUser,NoteList)=>{
  let storedU = JSON.parse(localStorage.getItem('Users'))
  let index = storedU.findIndex(em=>em.email===loggedUser.email)
  let newLoggedUser ={email:loggedUser.email,pass:loggedUser.pass, notes:NoteList}
  storedU[index]=newLoggedUser
  localStorage.setItem('Users',JSON.stringify(storedU));
  sessionStorage.setItem('user',JSON.stringify(newLoggedUser))
  this.newlistnote(NoteList)
}







  render() {
    return (
      <div className="App">
        <ButtonGroup color="primary" aria-label="outlined primary button group">
         <Link to="/"><Button>Home</Button></Link>
           {this.state.isLogged && <div onClick={this.logOut}><Button> | Disconnect</Button></div>}
             </ButtonGroup>
        <header className="App-header">
          <Switch>
            <Route exact path="/" render={() => <CCLogin checkIfLogIn={this.checkIfLogIn} newlistnote={this.newlistnote} />} />
            <Route path="/register" render={() => <CCRegister />} />
            <Route path="/main" render={() => <CCMain settolocalandstate={this.settolocalandstate}  />} />
            <Route path="/notelist" render={() => <FCNoteList  settolocalandstate={this.settolocalandstate}  listnote={this.state.listnote} />} />
            <Route path="/noteInfo" render={() => <FCNoteInfo />} />
          </Switch>

        </header>
      </div>
    )
  }
}
export default withRouter(App);




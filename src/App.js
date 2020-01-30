import React from 'react';
import './App.css';
import MainContainer from './containers/MainContainer'
import { Route } from 'react-router-dom'

class App extends React.Component {

  


  render (){
    console.log(this.props)


    return (
      <div className="App">
        <Route exact path="/" render={(routerProps) => <MainContainer {...routerProps}/> } />
        <Route exact path="/login" render={() => <div>Log In</div> } />
        <Route exact path="/signup" render={() => <div>Sign Up</div> } />
      </div>
    );
  
  }
}

export default App

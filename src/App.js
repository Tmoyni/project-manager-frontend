import React from 'react';
import './App.css';
import NavContainer from './containers/NavContainer'
import SignIn from './components/SignIn'
import { Route } from 'react-router-dom'
import UserProfile from './components/UserProfile'









class App extends React.Component {

  render (){

    return (
      <div>
        <Route exact path="/signin" render={(routerProps) => <SignIn {...routerProps}/> } /> 
        <Route exact path="/" render={(routerProps) => <NavContainer {...routerProps}/> } />
        <Route exact path="/profile" render={(routerProps) => <NavContainer {...routerProps}/> } />
      </div>
    );
  
  }
}

export default App

import React from 'react';
import './App.css';
import MainContainer from './containers/MainContainer'
import { Route } from 'react-router-dom'
import UserProfile from './components/UserProfile'
import PostCardContainer from './containers/PostCardContainer'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import NavContainer from './containers/NavContainer'






class App extends React.Component {
  

  


  render (){


    return (
        <NavContainer />
    );
  
  }
}

export default App

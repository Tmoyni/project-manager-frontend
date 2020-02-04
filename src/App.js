import React from 'react';
import './App.css';
import MainContainer from './containers/MainContainer'
import { Route } from 'react-router-dom'
import UserProfile from './components/UserProfile'
import Navigation from './components/Navigation'
import PostCardContainer from './containers/PostCardContainer'



class App extends React.Component {
  

  


  render (){


    return (
      <div className="App">
        <Navigation />
        <Route exact path="/" render={(routerProps) => <MainContainer {...routerProps}/> } />
        <Route exact path="/login" render={() => <div>Log In</div> } />
        <Route exact path="/signup" render={() => <div>Sign Up</div> } />
        <Route exact path="/profile" render={(routerProps) => <UserProfile {...routerProps}/> } />
        <Route exact path="/preview" render={(routerProps) => <PostCardContainer {...routerProps}/> } />

      </div>
    );
  
  }
}

export default App

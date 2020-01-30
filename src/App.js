import React from 'react';
import './App.css';
import { connect } from 'react-redux'
import MainContainer from './containers/MainContainer'

class App extends React.Component {

  


  render (){
    console.log(this.props)


    return (
      <div className="App">
        <MainContainer />
          

          <br></br>

          {/* <h1>Posts</h1> 
            {postsArray}
            <br></br>
            <button>New Post</button> */}
      
      </div>
    );

  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    allPosts: state.allPosts,
    allProjects: state.allProjects
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deletePost: (id) => { dispatch ({type: 'DELETE_POST', id: id}) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

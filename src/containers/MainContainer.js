import React from 'react';
import ProjectContainer from './ProjectContainer'
import UserProfile from '../components/UserProfile'
import Navigation from '../components/Navigation'
import { connect } from 'react-redux'
import Dropbox from 'dropbox'

const dbx = new Dropbox.Dropbox({ 
    accessToken: process.env.REACT_APP_API_KEY,
    fetch: fetch
  });



class MainContainer extends React.Component {

    state = {
        allFolders: []
    }

    componentDidMount() {
        dbx.filesListFolder({  
            path: "/february paid/sunday funday"  
          }).then(response => 
            this.setState ({
              allFolders: response,
              isLoaded: true
            }))
        }

    render() {
        return(
            <div>
                <Navigation />
                {this.props.profileSelected
                    ? <UserProfile />
                    : <ProjectContainer />
                }
                

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        profileSelected: state.profileSelected
    }
}

export default connect(mapStateToProps, null ) (MainContainer)
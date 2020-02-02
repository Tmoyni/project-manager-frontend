import React from 'react';
import ProjectContainer from './ProjectContainer'
import UserProfile from '../components/UserProfile'
import PostCardContainer from './PostCardContainer'

import Navigation from '../components/Navigation'
import { connect } from 'react-redux'
import Dropbox from 'dropbox'

const dbx = new Dropbox.Dropbox({ 
    accessToken: process.env.REACT_APP_API_KEY,
    fetch: fetch
  });



class MainContainer extends React.Component {

 

    render() {
        return(
            <div>
                {/* <Navigation /> */}
                <PostCardContainer />
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
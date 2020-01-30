import React from 'react';
import ProjectContainer from './ProjectContainer'
import UserProfile from '../components/UserProfile'
import Navigation from '../components/Navigation'



class MainContainer extends React.Component {

    state = {
        profileSelected: false
    }

    render() {
        return(
            <div>
                <Navigation />
                {this.state.profileSelected
                    ? <UserProfile />
                    : <ProjectContainer />
                }
                

            </div>
        )
    }
}

export default MainContainer
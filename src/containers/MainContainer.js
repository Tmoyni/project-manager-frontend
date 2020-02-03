import React from 'react';
import { connect } from 'react-redux'
import ProjectContainer from './ProjectContainer'
import UserProfile from '../components/UserProfile'
import Navigation from '../components/Navigation'
import ViewPostDetails from '../components/ViewPostDetails';



class MainContainer extends React.Component {

 

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
        profileSelected: state.profileSelected,
        viewPostDetails: state.viewPostDetails

    }
}

export default connect(mapStateToProps, null ) (MainContainer)
import React from 'react';
import { connect } from 'react-redux'
import ProjectContainer from './ProjectContainer'
import ViewPostDetails from '../components/ViewPostDetails';
import PostCardContainer from './PostCardContainer'

class MainContainer extends React.Component {

    state = {
        previewSelected: false,
        viewPostDetails: false
    }

    handleListClick = () => {
        this.setState ({
            previewSelected: false
        })
    }

    handlePreviewClick = () => {
        this.setState ({
            previewSelected: true
        })
    }
 
    render() {
        return(
            <div>
                <h2 onClick={this.handleListClick}>List</h2>
                <h2 onClick={this.handlePreviewClick}>Preview</h2>

                {this.props.viewPostDetails
                    ? <ViewPostDetails />
                    : ""
                }

                {this.state.previewSelected 
                    ? <PostCardContainer />
                    : <ProjectContainer />
                }              
                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        profileSelected: state.profileSelected,
        viewPostDetails: state.viewPostDetails,
        projectSelected: state.projectSelected,
        postSelected: state.postSelected

    }
}

export default connect(mapStateToProps, null ) (MainContainer)

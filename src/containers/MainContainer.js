import React from 'react';
import { connect } from 'react-redux'
import ProjectContainer from './ProjectContainer'
import ViewPostDetails from '../components/ViewPostDetails';
import PostCardContainer from './PostCardContainer'
import PostDetailContainer from './PostDetailContainer'
import PostForm from '../components/PostForm';
import Grid from '@material-ui/core/Grid';
import Calendar from '../components/Calendar'
import ViewEditContainer from './ViewEditContainer'

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
            <Grid container spacing={3}>
                <Grid item xs={!!this.props.viewPostSelected ? 6 : 12}>
                    <ProjectContainer/>
                </Grid>
                    {!!this.props.viewPostSelected
                        ?<Grid item xs={6}>
                            <ViewEditContainer anchor='right' />
                         </Grid>
                        : ""
                    }
            </Grid>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        profileSelected: state.profileSelected,
        viewPostDetails: state.viewPostDetails,
        projectSelected: state.projectSelected,
        postSelected: state.postSelected, 
        viewPostSelected: state.viewPostSelected,
        newPost: state.newPost,
        viewType: state.viewType
    }
}

export default connect(mapStateToProps, null ) (MainContainer)

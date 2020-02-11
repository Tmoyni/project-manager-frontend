import React from 'react';
import { connect } from 'react-redux'
import ProjectContainer from './ProjectContainer'
import ViewPostDetails from '../components/ViewPostDetails';
import PostCardContainer from './PostCardContainer'
import PostDetailContainer from './PostDetailContainer'
import PostForm from '../components/PostForm';
import Grid from '@material-ui/core/Grid';
import Calendar from '../components/Calendar'

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

    renderViewSwitch = (view) => {
        switch(view) {
          case 'preview':
            return <PostCardContainer />;
          case 'list':
            return <ProjectContainer />;
          default:
            return <ProjectContainer />;
        }
      }
 
    render() {
        return(
            <Grid container spacing={3}>
                <Grid item xs={!!this.props.viewPostSelected ? 6 : 12}>
                    {this.renderViewSwitch(this.props.viewType)}
                </Grid>
                    {!!this.props.viewPostSelected
                        ?<Grid item xs={6}>
                            <PostDetailContainer anchor='right' />
                         </Grid>
                        : ""
                    }
                <div>
                    {!!this.props.newPost
                        ? <PostForm/>
                        : ""
                    }
                </div>
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

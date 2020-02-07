import React from 'react';
import { connect } from 'react-redux'
import ProjectContainer from './ProjectContainer'
import ViewPostDetails from '../components/ViewPostDetails';
import PostCardContainer from './PostCardContainer'
import PostDetailContainer from './PostDetailContainer'
import PostForm from '../components/PostForm';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import DatePicker from '../components/DatePicker'

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
        console.log(this.props)
        return(
            <div>
                <DatePicker/>

                <h2 onClick={this.handleListClick}>List</h2>
                <h2 onClick={this.handlePreviewClick}>Preview</h2>

                <Container component="main" maxWidth="md" >
                    <Grid container>

                        
                        <Grid item>
                            {this.state.previewSelected 
                                ? <PostCardContainer />
                                : <ProjectContainer />
                            }                   
                        </Grid>

                        <Grid item >
                            <div>
                                {!!this.props.viewPostSelected
                                        ? <PostDetailContainer/>
                                        : ""
                                }

                            </div>
                            <div>
                                {!!this.props.newPost
                                    ? <PostForm/>
                                    : ""
                                }
                            </div>

                          
                        </Grid>
                       
                        
                    </Grid>
                </Container>

               

                           
                
            </div>
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
        newPost: state.newPost

    }
}

export default connect(mapStateToProps, null ) (MainContainer)

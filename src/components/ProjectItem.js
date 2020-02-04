import React from 'react';
import PostItem from './PostItem'
import { connect } from 'react-redux'
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import Dropbox from 'dropbox'
import ViewPostDetails from './ViewPostDetails'
import { showAddPostForm } from '../actionCreators'
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';



const dbx = new Dropbox.Dropbox({ 
    accessToken: process.env.REACT_APP_API_KEY,
    fetch: fetch
  });

class ProjectItem extends React.Component {


    state = {
        projectIsClicked: false,
    }
    
    toggleShowPost() {
        this.setState( prevState => ({
            projectIsClicked: !prevState.projectIsClicked 
        }))
    } 

    handleDeleteItem = (project) => {
        fetch (`http://localhost:3000/api/v1/projects/${project.id}`, {
            method: 'DELETE'
        }).then(res => console.log(res))
        .then(
            dbx.filesDelete({path: `${project.attributes.dropbox_path}`})
            .then( response => {console.log(response)}
             )
        )
    }

   
    render() {

        let projectId = parseInt(this.props.project.id)

        let filteredPosts = this.props.posts.filter( function (post) {
            let postProjectId = parseInt(post.attributes.project_id)
            return postProjectId === projectId
        })

        let postsArray = filteredPosts.map( post => {
            return ( <PostItem key={post.id} post={post} /> )
        })
        return(

            <div >
                <Container component="main" maxWidth="sm">
                    <Grid container>
                        <Grid item >
                            <h2 onClick={() => this.toggleShowPost()} > {this.props.project.attributes.name} </h2>
                        </Grid>
                        <Grid item>
                            <h5>   Due: {this.props.project.attributes.due_date}   </h5>

                        </Grid>
                        <Grid item>
                            <button>Edit Project</button>
                        </Grid>
                        <Grid item>
                            <IconButton  onClick={() => this.handleDeleteItem(this.props.project)} aria-label="delete" >
                                <DeleteIcon  fontSize="small" />
                            </IconButton>                    
                        </Grid>
                    </Grid>
                </Container>
                
                
                {this.state.projectIsClicked 
                    ? <div>
                        {postsArray}

                        <div onClick={() => this.props.showAddPostForm(this.props.project)}>
                            <Icon fontSize="small" color="primary">add_circle</Icon>
                            <Typography variant="button" > Add Post </Typography>
                        </div>

                    </div>
                    : ""
                }

                <br></br>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        allProjects: state.allProjects,
        allPosts: state.allPosts,
        viewPostDetails: state.viewPostDetails, 
        projectSelected: state.projectSelected
    }
}

export default connect(mapStateToProps, {showAddPostForm} ) (ProjectItem)

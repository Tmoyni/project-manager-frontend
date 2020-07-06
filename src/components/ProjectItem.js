import React from 'react';
import PostItem from './PostItem'
import { connect } from 'react-redux'
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import Dropbox from 'dropbox'
import { handleNewPost, fetchProjects } from '../actionCreators'
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';




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
        fetch (`https://post-manager-api.herokuapp.com/api/v1/projects/${project.id}`, {
            method: 'DELETE'
        }).then(res => console.log(res))
        .then(
            dbx.filesDelete({path: `${project.attributes.dropbox_path}`})
            .then((response) => {
                console.log('deleted:', response);
                this.props.fetchProjects() 
            }) 
        )
    }

    formatDate = (date) => {
        return date.toLocaleDateString("en-US")
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
                <CssBaseline/>
                <Grid container spacing={2}>
                    <Grid item >
                        <Typography variant="h5" onClick={() => this.toggleShowPost()} > {this.props.project.attributes.name} </Typography>
                    </Grid>
                    <Grid item >
                        <Typography variant="subtitle1" color="textSecondary"  > Due: {this.props.project.attributes.due_date} </Typography>
                    </Grid>
                    <Grid item>
                        <IconButton onClick={() => this.handleDeleteItem(this.props.project)} aria-label="delete" >
                            <DeleteIcon fontSize="small" />
                        </IconButton> 
                    </Grid>

                </Grid>
 
                
                
                {this.state.projectIsClicked 
                    ? <div>
                        {postsArray}
                        <br></br>
                        <div onClick={() => this.props.handleNewPost(this.props.project)}>
                            <Icon  color="primary">add_circle</Icon>
                            <Typography variant="button" > Add Post </Typography>
                        </div>
                    </div>
                    : ""
                }
                <br></br>
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

export default connect(mapStateToProps, {handleNewPost, fetchProjects} ) (ProjectItem)

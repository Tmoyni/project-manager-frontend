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

const dbx = new Dropbox.Dropbox({ 
    accessToken: process.env.REACT_APP_API_KEY,
    fetch: fetch
  });

class ProjectItem extends React.Component {


    state = {
        projectIsClicked: true,
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
            dbx.filesDelete({path: `${project.attributes.dropbox}`})
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
                <Grid className="flex" container spacing={2}>
                    <div className="project__info">
                        <p className="project__title" onClick={() => this.toggleShowPost()} > {this.props.project.attributes.name} </p>
                        
                        <p className="project__sub" color="textSecondary"  > Due: {this.props.project.attributes.due_date} </p>

                        <IconButton className="project__delete-btn" onClick={() => this.handleDeleteItem(this.props.project)} aria-label="delete" >
                            <DeleteIcon fontSize="small" />
                        </IconButton> 
                    </div>
                </Grid>
                
                {this.state.projectIsClicked 
                    ? <div>
                        {postsArray}
                        <br></br>
                        <div className="flex" onClick={() => this.props.handleNewPost(this.props.project)}>
                            <Icon className="project__add-btn" color="primary">add_circle</Icon>
                            <Typography className="project__add-text" variant="button" > Add Post </Typography>
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

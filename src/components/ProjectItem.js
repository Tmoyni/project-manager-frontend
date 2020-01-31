import React from 'react';
import PostItem from './PostItem'
import { connect } from 'react-redux'
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';









class ProjectItem extends React.Component {


    state = {
        projectIsClicked: false
    }
    
    toggleShowPost() {
        this.setState( prevState => ({
            projectIsClicked: !prevState.projectIsClicked 
        }))
    } 

   


    render() {

        let projectId = parseInt(this.props.project.id)
        let filteredPosts = this.props.posts.filter( function (post) {
            let postProjectId = parseInt(post.attributes.project_id)

            return postProjectId === projectId
        })
        let postsArray = filteredPosts.map( post => {
            return (
              <PostItem key={post.id} post={post} />
            )
          })

        return(

            <div >
                <h2 onClick={() => this.toggleShowPost()} > {this.props.project.attributes.name} </h2>
                <IconButton  aria-label="delete" >
                    <DeleteIcon  fontSize="small" />
                </IconButton>

                {this.state.projectIsClicked ? postsArray : ""}
                <br></br>

                <AddIcon /> Add Post

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        allProjects: state.allProjects,
        allPosts: state.allPosts
    }
}

export default connect(mapStateToProps, null ) (ProjectItem)

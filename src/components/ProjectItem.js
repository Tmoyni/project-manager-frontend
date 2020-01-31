import React from 'react';
import PostItem from './PostItem'
import { connect } from 'react-redux'



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
                <h3 onClick={() => this.toggleShowPost()} > {this.props.project.attributes.name} </h3>
                {this.state.projectIsClicked ? postsArray : ""}
                <br></br>
                <button  >Add Post</button>

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

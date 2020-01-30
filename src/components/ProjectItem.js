import React from 'react';
import PostItem from './PostItem'

class ProjectItem extends React.Component {
    
    state = {
        projectIsClicked: false
    }

    handleClick() {
        this.setState(prevState => ({
            projectIsClicked: !prevState.projectIsClicked
          }));
      }

    render() {
        let projectId = this.props.project.id
        let filteredPosts = this.props.posts.filter( function (post) {
            return post.project_id === projectId
        })
        let postsArray = filteredPosts.map( post => {
            return (
              <PostItem key={post.id} post={post} />
            )
          })

        return(

            <div >
                <h3 onClick={() => this.handleClick()} > {this.props.project.name} </h3>
                {this.state.projectIsClicked ? postsArray : ""}
                <br></br>
                <button  >Add Post</button>

            </div>
        )
    }
}

export default ProjectItem
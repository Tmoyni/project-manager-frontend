import React from 'react';
import PostCard from '../components/PostCard'
import { connect } from 'react-redux'
import Dropbox from 'dropbox'

const dbx = new Dropbox.Dropbox({ 
    accessToken: process.env.REACT_APP_API_KEY,
    fetch: fetch
  });

class PostCardContainer extends React.Component {

    

    render() {

        // let projectId = parseInt(this.props.project.id)
        // let filteredPosts = this.props.posts.filter( function (post) {
        //     let postProjectId = parseInt(post.attributes.project_id)

        //     return postProjectId === projectId
        // })
        let postsArray = this.props.allPosts.map( post => {
            return (
              <PostCard key={post.id} post={post} />
            )
          })

        return(
            <div>
                {postsArray}
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

export default connect(mapStateToProps, null ) (PostCardContainer)

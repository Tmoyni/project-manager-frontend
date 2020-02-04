import React from 'react';
import PostCard from '../components/PostCard'
import { connect } from 'react-redux'
import Dropbox from 'dropbox'
import { fetchProjects, fetchPosts } from '../actionCreators'
import SinglePostPreview from '../components/SinglePostPreview'


const dbx = new Dropbox.Dropbox({ 
    accessToken: process.env.REACT_APP_API_KEY,
    fetch: fetch
  });

class PostCardContainer extends React.Component {

    state = {
        previewSelected: false,
        postToPreview: null
    }

    componentDidMount() {
        this.props.fetchProjects()
        this.props.fetchPosts()
        }

    handleLargePreview = (post) => {
        this.setState({
            postToPreview: post,
            previewSelected: true
        })
    }
    

    render() {

        let postsArray = this.props.allPosts.map( post => {
            return (
              <PostCard key={post.id} post={post} handleLargePreview={this.handleLargePreview}/>
            )
          })

        return(
            <div>
               
                <br></br>

                {this.state.previewSelected ? <SinglePostPreview postToPreview={this.state.postToPreview} /> : ""}
                <h1>All Posts Preview</h1>
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

export default connect(mapStateToProps, { fetchProjects, fetchPosts } ) (PostCardContainer)

import React from 'react';
import { connect } from 'react-redux'
import Dropbox from 'dropbox'
import Stepper from './Stepper'
import { showAddPostForm, handleViewPost, fetchPosts } from '../actionCreators'
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';




const dbx = new Dropbox.Dropbox({ 
    accessToken: process.env.REACT_APP_API_KEY,
    fetch: fetch
  });

class PostItem extends React.Component {

    state = {
        thumbnail: null,
        allFolders: []
    }


    componentDidMount() {
        if (this.props.post.attributes.images.length > 0) {
            return dbx.filesDownload({  
                        path: this.props.post.attributes.images[0].dropbox_path,
                    }).then(response => 
                    this.setState ({
                            thumbnail: URL.createObjectURL(response.fileBlob),
                    }))
        } else (this.setState ({
            thumbnail: "",
    }))
    }

    handleDeletePost = (post) => {
        fetch (`http://localhost:3000/api/v1/posts/${post.id}`, {
            method: 'DELETE'
        }).then(res => console.log(res))
        .then(
            dbx.filesDelete({path: `${post.attributes.dropbox_path}`})
            .then( response => {
                console.log('deleted post:', response);
                this.props.fetchPosts() 
            }) 
        )
    }

   
    render() {

        return(
            <div>
                   
                <Container >
                <Grid container>
                    <Grid item >
                        <img height="42" width="42" src={this.state.thumbnail} alt={this.props.post.attributes.name}/> 
                    </Grid>
                        <Grid item>
                            <p display="inline-block">{this.props.post.attributes.name} </p>
                        </Grid >
                        <Stepper post={this.props.post}/>
                        <p display="inline-block">{this.props.post.attributes.status}</p>



                </Grid>
                </Container>

                <button onClick={() => this.props.handleViewPost(this.props.post)} >View Post</button>
                <button onClick={() => this.handleDeletePost(this.props.post)} >Delete Post</button>
                <br></br>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        allPosts: state.allPosts,
        viewPostDetails: state.viewPostDetails, 
    }
}

export default connect(mapStateToProps, {showAddPostForm, handleViewPost, fetchPosts} ) (PostItem)

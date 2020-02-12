import React from 'react';
import { connect } from 'react-redux'
import Dropbox from 'dropbox'
import Stepper from './Stepper'
import { showAddPostForm, handleViewPost, fetchPosts } from '../actionCreators'
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';


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
            let image = this.props.post.attributes.images
            return dbx.filesDownload({  
                        path: image[image.length -1].dropbox_path,
                    }).then(response => 
                    this.setState ({
                            thumbnail: URL.createObjectURL(response.fileBlob),
                    }))
        } else (this.setState ({
            thumbnail: "https://748073e22e8db794416a-cc51ef6b37841580002827d4d94d19b6.ssl.cf3.rackcdn.com/not-found.png",
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
                <ListItem >
                    <Grid container spacing={2}>
                        <Grid item >
                            <img   height="42" width="42" src={this.state.thumbnail} alt={this.props.post.attributes.name}/> 
                        </Grid>

                        <Grid item xs>
                            <p  display="inline">{this.props.post.attributes.name} </p>
                        </Grid>

                        {!!this.props.viewPostSelected 
                            ? ""
                            : <Grid item xs>
                                <Grid item >
                                    <Stepper post={this.props.post}/> 
                                </Grid>
                                <Grid item >
                                    <p>{this.props.post.attributes.status}</p>    
                                </Grid>
                            </Grid>
                        }

                        <Grid item >
                            <Button variant="contained" size="small" color="primary"  onClick={() => this.props.handleViewPost(this.props.post)} >View Post</Button>
                            <IconButton right="0px" onClick={() => this.handleDeletePost(this.props.post)} aria-label="delete" >
                                <DeleteIcon  fontSize="small" />
                            </IconButton> 
                        </Grid>

                    </Grid>
                </ListItem>
                <Divider />
        </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        allPosts: state.allPosts,
        viewPostDetails: state.viewPostDetails, 
        viewPostSelected: state.viewPostSelected
    }
}

export default connect(mapStateToProps, {showAddPostForm, handleViewPost, fetchPosts} ) (PostItem)

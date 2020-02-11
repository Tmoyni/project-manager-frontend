import React from 'react';
import { connect } from 'react-redux'
import Dropbox from 'dropbox'
import Stepper from './Stepper'
import { showAddPostForm, handleViewPost, fetchPosts } from '../actionCreators'
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import { Box } from '@material-ui/core';


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
  
                <Container >
                    <Grid container>
                        <img height="42" width="42" src={this.state.thumbnail} alt={this.props.post.attributes.name}/> 
                        <p display="inline">{this.props.post.attributes.name} </p>
                        {!!this.props.viewPostSelected 
                            ? ""
                            : <Stepper post={this.props.post}/> }
                        {!!this.props.viewPostSelected 
                            ? ""
                            : <p display="inline">{this.props.post.attributes.status}</p> }    
                        
                        <Box>
                            <Button variant="contained" size="small" color="primary"  onClick={() => this.props.handleViewPost(this.props.post)} >View Post</Button>
                        </Box>
                        <IconButton  right="0px" onClick={() => this.handleDeletePost(this.props.post)} aria-label="delete" >
                            <DeleteIcon  fontSize="small" />
                        </IconButton> 


                    </Grid>
                </Container>
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

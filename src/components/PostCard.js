import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Dropbox from 'dropbox';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { fetchPosts } from '../actionCreators';
import { connect } from 'react-redux'


const dbx = new Dropbox.Dropbox({ 
accessToken: process.env.REACT_APP_API_KEY,
fetch: fetch
});

class PostCard extends React.Component {

  state = {
      image: null,
      post: null
  }

  
  componentDidMount() {
    if (this.props.post.attributes.images.length > 0) {
      return dbx.filesDownload({  
                  path: this.props.post.attributes.images[0].dropbox,
              }).then(response => 
              this.setState ({
                      image: URL.createObjectURL(response.fileBlob),
              }))
  } else (this.setState ({
      image: "",
  }))
  }

  handleDeleteItem = (post) => {
    fetch (`https://post-manager-api.herokuapp.com/api/v1/posts/${post.id}`, {
        method: 'DELETE'
    }).then(res => console.log(res))
    .then(
        dbx.filesDelete({path: `${post.attributes.dropbox}`})
        .then((response) => {
            console.log('deleted:', response);
            this.props.fetchPosts() 
        }) 
    )
  }


  render () {

    return (
      <Grid item md={3} xs={4}>
        <Card >

          <CardHeader display="inline" align="left"
            avatar={
              <Avatar alt="Audible" >
              </Avatar>
            }
            title="audible"
          
          />
            
            
          <img width="100%"  src={this.state.image} alt={this.props.post.attributes.name}/>
                      
          <CardContent align="left" >
              <Box fontWeight="fontWeightBold"  m={1} >
                {Math.floor(Math.random() * 2000) + 1000} likes
              </Box>
              <Box fontWeight="fontWeightBold"  m={1} display="inline">
                audible
              </Box>
              <Box  fontWeight="Regular" m={1} display="inline">
                {this.props.post.attributes.copies.length > 0 
                ? this.props.post.attributes.copies[0].text
                : "No Text Yet" }
              </Box>
            <br></br>
            <button onClick={() => this.props.handleLargePreview(this.props.post)}>Large Preview</button>

          </CardContent>
          <CardActions disableSpacing>
            <IconButton onClick={() => this.handleDeleteItem(this.props.post)} aria-label="delete" >
              <DeleteIcon fontSize="small" />
            </IconButton> 
          </CardActions>
        </Card>
      </Grid>
    );
  }
}

  const mapStateToProps = (state) => {
    return {
        allPosts: state.allPosts,
    }
}
export default connect(mapStateToProps, {fetchPosts} ) (PostCard)





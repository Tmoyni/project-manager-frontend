import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
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
                    path: this.props.post.attributes.images[0].dropbox_path,
                }).then(response => 
                this.setState ({
                        image: URL.createObjectURL(response.fileBlob),
                }))
    } else (this.setState ({
        image: "",
    }))
    }

    handleDeleteItem = (post) => {
      fetch (`http://localhost:3000/api/v1/posts/${post.id}`, {
          method: 'DELETE'
      }).then(res => console.log(res))
      .then(
          dbx.filesDelete({path: `${post.attributes.dropbox_path}`})
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
                <Avatar alt="Audible" src="https://scontent-lga3-1.cdninstagram.com/v/t51.2885-19/11363666_1010263159024098_1086305221_a.jpg?_nc_ht=scontent-lga3-1.cdninstagram.com&_nc_ohc=jlhnLpMBM-UAX8-_cQl&oh=99b82c8188af1c5c54f3ece7ebee62e7&oe=5EBC03C5">
                </Avatar>
              }
              title="audible"
            
            />
              
              
            <img width="100%"  src={this.state.image} alt={this.props.post.attributes.name}/>
                       
            <CardContent align="left" >
              
              <Typography variant="body2"  align="left" display="inline">
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
              </Typography>
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





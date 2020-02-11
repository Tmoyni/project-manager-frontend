import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Dropbox from 'dropbox';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';




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
 

    render () {

        return (
          <Grid item xs={4}>
          <Card >

            <CardHeader display="inline" align="left"
              avatar={
                <Avatar alt="Audible" src="https://scontent-lga3-1.cdninstagram.com/v/t51.2885-19/11363666_1010263159024098_1086305221_a.jpg?_nc_ht=scontent-lga3-1.cdninstagram.com&_nc_ohc=jlhnLpMBM-UAX8-_cQl&oh=99b82c8188af1c5c54f3ece7ebee62e7&oe=5EBC03C5">
                </Avatar>
              }
              title="audible"
            
            />
              
              
            <img width="100%"  src={this.state.image}/>
                       
            <CardContent align="left" textAlign="left">
              
              <Typography variant="body2"  align="left" textAlign="left" display="inline">
                <Box fontWeight="fontWeightBold" textAlign="left" m={1} >
                  {Math.floor(Math.random() * 2000) + 1000} likes
                </Box>
                <Box fontWeight="fontWeightBold" textAlign="left" m={1} display="inline">
                  audible
                </Box>
                <Box textAlign="left" fontWeight="Regular" m={1} display="inline">
                  {this.props.post.attributes.copies.length > 0 
                  ? this.props.post.attributes.copies[0].text
                  : "No Text Yet" }
                </Box>
              </Typography>
              {/* <button>Edit</button>
              <button>Approve</button> */}
              <br></br>
              <button onClick={() => this.props.handleLargePreview(this.props.post)}>Large Preview</button>

            </CardContent>
            <CardActions disableSpacing>
              
              
            </CardActions>
          </Card>
          </Grid>
        );
      }
    }

export default PostCard




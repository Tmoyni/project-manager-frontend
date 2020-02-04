import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Dropbox from 'dropbox'


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
          <Card width="300px">
            <CardHeader
              avatar={
                <Avatar  >
                  R
                </Avatar>
              }
              title={this.props.post.attributes.name}
              subheader={this.props.post.attributes.live_date}
            />
            <img width="200" src={this.state.image}/>           
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                ClientHandle: {this.props.post.attributes.copies.length > 0 
                ? this.props.post.attributes.copies[0].text
                : "No Text Yet" }

              </Typography>
              <button>Edit</button>
              <button>Approve</button>
              <button onClick={() => this.props.handleLargePreview(this.props.post)}>Large Preview</button>

            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
            </CardActions>
          </Card>
        );
      }
    }

export default PostCard




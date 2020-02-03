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

    }


    componentDidMount() {
        dbx.filesDownload({  
            path: this.props.post.attributes.images[0].dropbox_path,
          }).then(response => 
            this.setState ({
                image: URL.createObjectURL(response.fileBlob),
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
                {this.props.post.attributes.copies[0].text}
              </Typography>
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


// import React from 'react';

// class PostCard extends React.Component {
//     render() {
//         return(
//             <div>
//                 <h1>Instagram Logo etc</h1>
//                 <h4>logo</h4>
//                 <h4>instaname</h4>
//                 <img/> 
//                 Live Date
//                 Description
//                 File Name
//                 <button>Edit</button> 
//                 <button>Approve</button>

//             </div>
//         )
//     }
// }


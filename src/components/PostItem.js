import React from 'react';
import { connect } from 'react-redux'
import Dropbox from 'dropbox'

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
        dbx.filesDownload({  
            path: this.props.post.attributes.images[0].dropbox_path,
          }).then(response => 
            this.setState ({
                thumbnail: URL.createObjectURL(response.fileBlob),
            }))
    }


    render() {

        return(
            <div>
                <img height="42" width="42" src={this.state.thumbnail} />                
                <h5>{this.props.post.attributes.name} - {this.props.post.attributes.status}</h5>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        allPosts: state.allPosts
    }
}

export default connect(mapStateToProps, null ) (PostItem)

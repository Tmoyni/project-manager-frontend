import React from 'react';
import { connect } from 'react-redux'
import Dropbox from 'dropbox'
import Stepper from './Stepper'

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

    handleEditPost = () => {
        console.log("clicking")
    }

   



    render() {

        return(
            <div>
                <img height="42" width="42" src={this.state.thumbnail} alt={this.props.post.attributes.name}/> 
                <p display="inline-block">{this.props.post.attributes.name} - {this.props.post.attributes.status}</p>
   
                {/* <Stepper />             */}
                
                <button onClick={this.handleEditPost} >Edit Post</button>
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

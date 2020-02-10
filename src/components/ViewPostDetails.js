import React from 'react';
import { connect } from 'react-redux'
import Dropbox from 'dropbox'
import EditPostForm from './EditPostForm'
import Paper from '@material-ui/core/Paper';



const dbx = new Dropbox.Dropbox({ 
    accessToken: process.env.REACT_APP_API_KEY,
    fetch: fetch
  });
class ViewPostDetails extends React.Component {

    state = {
        image: null,
        editClicked: false
    }

    handleEditClick = () => {
        console.log("clicking")
    }

    renderImage() {
        let image = this.props.postSelected.attributes.images

        if (image.length > 0) {
            return dbx.filesDownload({  
                        path: image[image.length - 1].dropbox_path,
                    }).then(response => 
                    this.setState ({
                            image: URL.createObjectURL(response.fileBlob),
                    }))
        } else (this.setState ({
            image: "",
        }))
    }
    
    render() {
        if (!!this.props.postSelected) {
            this.renderImage()
        }
        let copy = this.props.postSelected.attributes.copies
        let image = this.props.postSelected.attributes.images

        return(
            <div  anchor="right">
                <img height="300" width="300" src={this.state.image} alt={this.state.name}/> 
                    
                    { !!this.props.postSelected 
                        ? <h3>{this.props.postSelected.attributes.name}</h3>
                        : <p>Name: untitled</p>
                    }

                    { !!this.props.postSelected 
                        ? <h5>Status: {this.props.postSelected.attributes.status}</h5>
                        : <p>Status: Unknown</p>
                    }

                    { this.props.postSelected.attributes.copies.length > 0 
                        ? <p>Copy: {copy[copy.length - 1].text }</p>
                        : <p>Copy: no copy yet</p>
                    }    

                    { !!this.props.postSelected 
                        ? <p>Live Date: {this.props.postSelected.attributes.live_date }</p>
                        : <p>Live Date: None</p>
                    }  

                    { !!this.props.postSelected 
                        ? <p>Description: {this.props.postSelected.attributes.description }</p>
                        : <p>Description: None</p>
                    }  
                <button onClick={ () => this.handleEditClick() }>Edit</button> 
                <EditPostForm post={this.props.postSelected}/>   
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        postSelected: state.postSelected
    }
}

export default connect(mapStateToProps, null ) (ViewPostDetails)
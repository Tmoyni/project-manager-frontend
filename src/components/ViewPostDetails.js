import React from 'react';
import { connect } from 'react-redux'
import Dropbox from 'dropbox'
import EditPostForm from './EditPostForm'



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
                path: image[0].dropbox_path,
            }).then(response => 
            this.setState ({
                    image: URL.createObjectURL(response.fileBlob),
            }))

        } 
    }

    // renderImage() {
    //     let image = this.props.postSelected.attributes.images
    //     if (image.length > 0) {
    //         return dbx.filesDownload({  
    //             path: image[image.length - 1].dropbox_path,
    //         })
    //         .then(response => 
    //             this.setState({
    //                 image: URL.createObjectURL(response.fileBlob)
    //         }))
    //     } return "https://748073e22e8db794416a-cc51ef6b37841580002827d4d94d19b6.ssl.cf3.rackcdn.com/not-found.png"
    // }
    
    render() {
        if (this.props.postSelected.attributes.images.length > 0) {
            this.renderImage()
        }

        let copy = this.props.postSelected.attributes.copies

        return(
            <div >

                { this.props.postSelected.attributes.images.length > 0
                    ? <img width="300px" src={this.state.image} alt={this.state.name}/>
                    : <img width="300px" src="https://748073e22e8db794416a-cc51ef6b37841580002827d4d94d19b6.ssl.cf3.rackcdn.com/not-found.png" alt={this.state.name}/>
                }                



                <h3>{this.props.postSelected.attributes.name}</h3>
                <h5>Status: {this.props.postSelected.attributes.status}</h5>

                { this.props.postSelected.attributes.copies.length > 0 
                    ? <p>Copy: {copy[copy.length - 1].text }</p>
                    : <p>Copy: no copy yet</p>
                }    

                <p>Live Date: {this.props.postSelected.attributes.live_date }</p>
                <p>Description: {this.props.postSelected.attributes.description }</p>
                    
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
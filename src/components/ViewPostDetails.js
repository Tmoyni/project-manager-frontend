import React from 'react';
import { connect } from 'react-redux'
import Dropbox from 'dropbox'
import EditPostForm from './EditPostForm'
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';




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
        this.setState({
            editClicked: true
        })
    }

    closeEditForm = () => {
        this.setState({
            editClicked: false
        })
        this.forceUpdate()
    }

    renderImage() {
        let image = this.props.postSelected.attributes.images

        if (image.length > 0) {
            return dbx.filesDownload({  
                path: image[image.length -1].dropbox,
            }).then(response => 
            this.setState ({
                    image: URL.createObjectURL(response.fileBlob),
            }))

        } 
    }

    
    render() {
        if (this.props.postSelected.attributes.images.length > 0) {
            this.renderImage()
        }

        let copy = this.props.postSelected.attributes.copies

        return(
            <Card maxWidth="sm" align='center'>
                <CardContent  variant="outlined" >
                    { this.props.postSelected.attributes.images.length > 0
                        ? <img width="300px" src={this.state.image} alt={this.state.name}/>
                        : <img width="300px" src="https://748073e22e8db794416a-cc51ef6b37841580002827d4d94d19b6.ssl.cf3.rackcdn.com/not-found.png" alt={this.state.name}/>
                    }                



                    <h2>{this.props.postSelected.attributes.name}</h2>
                   

                    {!!this.state.editClicked 
                    ? <EditPostForm post={this.props.postSelected} closeEditForm={this.closeEditForm}/>   
                    : <div>
                         <h4>Status: {this.props.postSelected.attributes.status}</h4>
                        { this.props.postSelected.attributes.copies.length > 0 
                            ? <p>Copy: {copy[copy.length - 1].text }</p>
                            : <p>Copy: no copy yet</p>
                        }    
                        <p>Live Date: {this.props.postSelected.attributes.live_date }</p>
                        <p>Description: {this.props.postSelected.attributes.description }</p>
                        <Button variant="contained" color="primary" onClick={ () => this.handleEditClick() }>Edit</Button>    
                    </div> 

                    }    
                </CardContent>
            </Card>        
        )
    }
}

const mapStateToProps = (state) => {
    return {
        postSelected: state.postSelected
    }
}

export default connect(mapStateToProps, null ) (ViewPostDetails)
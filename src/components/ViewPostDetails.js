import React from 'react';
import { connect } from 'react-redux'
import Dropbox from 'dropbox'


const dbx = new Dropbox.Dropbox({ 
    accessToken: process.env.REACT_APP_API_KEY,
    fetch: fetch
  });
class ViewPostDetails extends React.Component {

    state = {
        image: null
    }

    renderImage() {
        if (this.props.postSelected.attributes.images.length > 0) {
            return dbx.filesDownload({  
                        path: this.props.postSelected.attributes.images[0].dropbox_path,
                    }).then(response => 
                    this.setState ({
                            image: URL.createObjectURL(response.fileBlob),
                    }))
        } else (this.setState ({
            image: "",
        }))
    }
    
    render() {
        console.log(this.props)
        if (!!this.props.postSelected) {
            this.renderImage()
        }

        return(
            <div>
                <img height="300" width="300" src={this.state.image} alt={this.state.name}/> 
                    
                    { !!this.props.postSelected 
                        ? <h3>{this.props.postSelected.attributes.name}</h3>
                        : <p>Name: untitled</p>
                    }

                    { !!this.props.postSelected 
                        ? <h5>Status: {this.props.postSelected.attributes.status}</h5>
                        : <p>Status: Unknown</p>
                    }

                    { !!this.props.postSelected 
                        ? <p>Copy: {this.props.postSelected.attributes.copies[0].text }</p>
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
                <button>Edit</button>    
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        projectSelected: state.projectSelected,
        postSelected: state.postSelected
    }
}

export default connect(mapStateToProps, null ) (ViewPostDetails)
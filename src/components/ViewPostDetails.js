import React from 'react';
import { connect } from 'react-redux'
import Dropbox from 'dropbox'
import {
    BrowserRouter as Router,
    Link,
  } from "react-router-dom";


const dbx = new Dropbox.Dropbox({ 
    accessToken: process.env.REACT_APP_API_KEY,
    fetch: fetch
  });
class ViewPostDetails extends React.Component {

    state = {
        postCopy: '', 
        liveDate: '',
        description: '',
        fileName: '', 
        postName: '', 
        selectedFile: null, 
        image: null
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
   
    fileSelectedHandler = (e) => {
        this.setState({
            selectedFile: e.target.files[0]
        })
    }

    componentDidMount() {
        if (!!this.props.postSelected) {
            this.setState({
                postCopy: this.props.postSelected.attributes.copies.length > 0 ? this.props.postSelected.attributes.copies[0].text : "", 
                liveDate: this.props.postSelected.attributes.live_date,
                description: this.props.postSelected.attributes.description,
                fileName: this.props.postSelected.attributes.fileName, 
                postName: this.props.postSelected.attributes.name, 
                selectedFile: this.props.postSelected.attributes.images.length > 0 ? this.props.postSelected.attributes.images[0].dropbox_path : ""
            })
        }
    }

    uploadImageToDropbox = (dropboxpath) => {
        dbx.filesUpload({
            path: `${dropboxpath}/${this.state.selectedFile.name}`, 
            contents: this.state.selectedFile
        }).then( response => {
            console.log(response)
        })
    }

    savePostInfo = (dropboxpath) => { 
        fetch('http://localhost:3000/api/v1/posts', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            },
            body: JSON.stringify({ 
                project_id: this.props.projectSelected.id,
                name: this.state.postName,
                live_date: this.state.liveDate,
                description: this.state.description,
                status: "not started",
                dropbox_path: dropboxpath,
            })            
        }).then(res => res.json())
        .then(post => {
            this.saveImageInfo(post, dropboxpath)
            this.saveCopyInfo(post)
        })
    }

    saveImageInfo = (post, dropboxpath) => {
        fetch('http://localhost:3000/api/v1/images', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ 
                    post_id: post.id,
                    file_name: this.state.selectedFile.name,
                    dropbox_path: `${dropboxpath}/${this.state.selectedFile.name}`
                })            
            })
    }

    saveCopyInfo = (post) => {
        fetch('http://localhost:3000/api/v1/copies', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ 
                    post_id: post.id,
                    text: this.state.postCopy
                })            
            })
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        let dropbox_path = this.props.projectSelected.attributes.dropbox_path
        dbx.filesCreateFolder({path: `${dropbox_path}`+`/${this.state.postName}`})
            .then( response => {
                console.log(response)
                let dropboxpath = response.path_lower
                    this.uploadImageToDropbox(dropboxpath)
                    this.savePostInfo(dropboxpath)
            })    
    }

    // renderProfileInfo = (selectedPost) => {
    //     return(
    //         <div>
    //             <h1>{selectedProfile.name}</h1>
    //             <h5>Username: {selectedProfile.username}</h5>
    //         </div>
    //     )
    // }


        // console.log('profile page props :', this.props)

        

           


    
    render() {

        return(
            <div>
                <img/> 
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Post Name: <input type="text" name="postName" value={this.state.postName} onChange={this.handleChange} />
                    </label>
                        <br></br>
                    <label>
                        Post Copy: <input type="text" name="postCopy" value={this.state.postCopy} onChange={this.handleChange} />
                    </label>
                        <br></br>
                    <label>
                        Live Date: <input type="text" name="liveDate" value={this.state.liveDate} onChange={this.handleChange} />
                    </label>
                        <br></br>
                    <label>
                        Description: <input type="text" name="description" value={this.state.description} onChange={this.handleChange} />
                    </label>
                        <br></br>
                    <input type="file" onChange={this.fileSelectedHandler}/>
                    <br></br>
                    <input type="submit" value="Submit" />
                </form>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        allPosts: state.allPosts 
    }
}

export default connect(mapStateToProps, null ) (ViewPostDetails)
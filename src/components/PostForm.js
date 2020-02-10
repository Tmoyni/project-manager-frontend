import React from 'react';
import { connect } from 'react-redux'
import Dropbox from 'dropbox'
import { handleNewFormCancel, fetchPosts, closeNewPostForm } from '../actionCreators'



const dbx = new Dropbox.Dropbox({ 
    accessToken: process.env.REACT_APP_API_KEY,
    fetch: fetch
  });

class PostForm extends React.Component {

    state = {
        postCopy: '', 
        liveDate: '',
        description: '',
        fileName: '', 
        postName: '', 
        selectedFile: null,
        fileSelected: false, 
        image: null
    }

    //for typing changes
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
   
    //to upload image selected from desktop
    fileSelectedHandler = (e) => {
        this.setState({
            selectedFile: e.target.files[0]
        })
    }

    setInitialState() {
        this.setState({
            postCopy: '', 
            liveDate: '',
            description: '',
            postName: '', 
            fileSelected: false, 
            selectedFile: null,
            image: null
        })
    }

    //upload selected image to dropbox
    uploadImageToDropbox = (dropboxpath) => {
        dbx.filesUpload({
            path: `${dropboxpath}/${this.state.selectedFile.name}`, 
            contents: this.state.selectedFile
        }).then( response => {
            console.log(response)
        })
    }

    //save info for the post and the new dropbox path to database
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

    //save image data and dropbox path to database
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

    //save copy text info to datebase
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
            }).then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
                this.props.fetchPosts()
                
            }) 
            .then(this.props.closeNewPostForm)
    }
    
    //create dropbox path for the new post and then run helper methods to save the rest of the data
    handleSubmit = (e) => {
        e.preventDefault();
        let dropbox_path = this.props.projectSelected.attributes.dropbox_path
        dbx.filesCreateFolder({path: `${dropbox_path}`+`/${this.state.postName}`}) //create dropox path inside project folder
            .then( response => {
                console.log(response)
                let dropboxpath = response.path_lower //grab dropbox path from response
                    this.uploadImageToDropbox(dropboxpath)
                    this.savePostInfo(dropboxpath)
            })
    }

    
    render() {


        return(
            <div>
                <img height="300" width="300" src={this.state.image} alt={this.state.name}/> 
                <form onSubmit={this.handleSubmit}>
                    
                    { !!this.props.postSelected 
                        ? <h3>{this.props.postSelected.attributes.name}</h3>
                        : <label>
                            Post Name: <input type="text" name="postName" value={this.state.postName} onChange={this.handleChange} />
                          </label>
                    }
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
                    <button onClick={this.props.handleNewFormCancel}>Cancel</button>
                    <input type="submit" value="Submit" />
                </form>

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

export default connect(mapStateToProps, {handleNewFormCancel, fetchPosts, closeNewPostForm} ) (PostForm)
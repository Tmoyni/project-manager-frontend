import React from 'react';
import { connect } from 'react-redux'
import Dropbox from 'dropbox'
import { handleNewFormCancel } from '../actionCreators'



const dbx = new Dropbox.Dropbox({ 
    accessToken: process.env.REACT_APP_API_KEY,
    fetch: fetch
  });

class EditPostForm extends React.Component {

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

    // componentDidMount() {
    //     if (!!this.props.postSelected) {
    //         this.setState({
    //             postCopy: this.props.postSelected.attributes.copies.length > 0 ? this.props.postSelected.attributes.copies[0].text : "", 
    //             liveDate: this.props.postSelected.attributes.live_date,
    //             description: this.props.postSelected.attributes.description,
    //             fileName: this.props.postSelected.attributes.description, 
    //             postName: this.props.postSelected.attributes.name, 
    //             selectedFile: this.props.postSelected.attributes.images.length > 0 ? this.props.postSelected.attributes.images[0].dropbox_path : ""
    //         })
    //         if (this.props.postSelected.attributes.images.length > 0) {
    //             return dbx.filesDownload({  
    //                         path: this.props.postSelected.attributes.images[0].dropbox_path,
    //                     }).then(response => 
    //                     this.setState ({
    //                             image: URL.createObjectURL(response.fileBlob),
    //                     }))
    //         } else (this.setState ({
    //             image: "",
    //         }))
    //     }
        

    // }


    uploadImageToDropbox = (dropboxpath) => {
        dbx.filesUpload({
            path: `${dropboxpath}/${this.state.selectedFile.name}`, 
            contents: this.state.selectedFile
        }).then( response => {
            console.log(response)
        })
    }

    savePostInfo = (dropboxpath) => { 
        let id = this.props.post.id
        fetch(`http://localhost:3000/api/v1/posts/${id}`, {
            method: 'PATCH',
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            },
            body: JSON.stringify({ 
                live_date: this.state.liveDate,
                description: this.state.description,
                status: "In Progress",
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
            }).then()
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        let dropboxpath = this.props.post.attributes.dropbox_path
        this.uploadImageToDropbox(dropboxpath)
        this.savePostInfo(dropboxpath)
    }

    
    render() {
        console.log("props", this.props)


        return(
            <div>
                <form onSubmit={this.handleSubmit}>
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
                <button onClick={this.props.handleNewFormCancel}>Cancel</button>
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

export default connect(mapStateToProps, {handleNewFormCancel} ) (EditPostForm)
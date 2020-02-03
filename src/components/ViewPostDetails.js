import React from 'react';
import { connect } from 'react-redux'
import Dropbox from 'dropbox'


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
        selectedFile: null
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

   

    fileSelectedHandler = (e) => {
        console.log(e.target.files[0])
        this.setState({
            selectedFile: e.target.files[0]
        })
    }

    uploadFile = () => {
        console.log("clicking")
        let dropbox_path = this.state.selectedFile.name
        console.log(dropbox_path)
        dbx.filesUpload({
            path: `/${dropbox_path}`, 
            contents: this.state.selectedFile
        })
            .then( response => {
                console.log(response)
            })
    }

    

    handleSubmit = (e) => {
        e.preventDefault();
        let dropbox_path = this.props.projectSelected.attributes.dropbox_path
        dbx.filesCreateFolder({path: `${dropbox_path}`+`/${this.state.postName}`})
            .then( response => {
                console.log(response)
                let dropboxpath = response.path_lower
                dbx.filesUpload({
                    path: `${dropboxpath}/${this.state.selectedFile.name}`, 
                    contents: this.state.selectedFile
                }).then( response => {
                    console.log(response)
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
                        })
                })
            })    
    }

    render() {


        return(
            <div>
                <img/> 
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Post Name: <input type="text" name="postName" value={this.state.value} onChange={this.handleChange} />
                    </label>
                        <br></br>
                    <label>
                        Post Copy: <input type="text" name="postCopy" value={this.state.value} onChange={this.handleChange} />
                    </label>
                        <br></br>
                    <label>
                        Live Date: <input type="text" name="liveDate" value={this.state.value} onChange={this.handleChange} />
                    </label>
                        <br></br>
                    <label>
                        Description: <input type="text" name="description" value={this.state.value} onChange={this.handleChange} />
                    </label>
                        <br></br>
                    <input type="file" onChange={this.fileSelectedHandler}/>
                    <br></br>
                    <input type="submit" value="Submit" />
                </form>

                {/* <button onClick={this.uploadFile} >Upload</button> */}

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        projectSelected: state.projectSelected
    }
}

export default connect(mapStateToProps, null ) (ViewPostDetails)
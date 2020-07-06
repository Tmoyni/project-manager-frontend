import React from 'react';
import { connect } from 'react-redux'
import Dropbox from 'dropbox'
import { handleNewFormCancel, fetchPosts, closeNewPostForm } from '../actionCreators'
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers'
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const dbx = new Dropbox.Dropbox({ 
    accessToken: process.env.REACT_APP_API_KEY,
    fetch: fetch
  });

class PostForm extends React.Component {

    state = {
        postCopy: '', 
        liveDate: '2020-02-14T12:00:00',
        description: '',
        fileName: '', 
        postName: '', 
        selectedFile: null,
        fileSelected: false, 
        image: null,
        status: 'Not Started'
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
            selectedFile: e.target.files[0], 
            fileSelected: true
        })
    }

    handleStatusSelect = event => {
        this.setState({
            status: event.target.value
        });
    };

    handleDateChange = (date) => {
        this.setState({
            liveDate: date
        })
    };

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
                status: this.state.status,
                dropbox_path: dropboxpath,
            })            
        }).then(res => res.json())
        .then(post => {
            this.saveCopyInfo(post)
            if (!!this.state.fileSelected) {
                this.saveImageInfo(post, dropboxpath)
            }
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
        fetch('http://post-manager-api.herokuapp.com/api/v1/copies', {
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
        // dbx.filesCreateFolder({path: `${dropbox_path}`+`/${this.state.postName}`}) //create dropox path inside project folder
        dbx.filesCreateFolder({path: `${dropbox_path}``/${this.state.postName}`}) //create dropox path inside project folder
            .then( response => {
                console.log(response)
                let dropboxpath = response.path_lower //grab dropbox path from response
                    this.savePostInfo(dropboxpath)    
                    if (!!this.state.fileSelected) {
                        this.uploadImageToDropbox(dropboxpath)
                    }
            })
    }

    
    render() {
        return(
            <Card  maxWidth="sm" align='center'>
                <CardContent variant="outlined" >
                    <h2>Create A New Post</h2>

                    <form onSubmit={this.handleSubmit}>
                        
                        <TextField fullWidth id="standard-basic" label="Post Name" type="text" name="postName" value={this.state.postName} onChange={this.handleChange}  />
                        <br></br>
                        <TextField fullWidth id="standard-textarea" multiline label="Post Copy" type="text" name="postCopy" value={this.state.postCopy} onChange={this.handleChange} />
                        <br></br>
                        <MuiPickersUtilsProvider  utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                fullWidth
                                disableToolbar
                                variant="inline"
                                format="MM/dd/yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                label="Post Live Date"
                                value={this.state.liveDate}
                                onChange={this.handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                            <br></br>
                        <TextField fullWidth id="standard-textarea" multiline label="Description" type="text" name="description" value={this.state.description} onChange={this.handleChange} />
                        <br></br>                          
                        <br></br>  

                        <FormControl fullWidth >
                            <InputLabel  >Post Status:</InputLabel>
                            <Select
                                value={this.state.status}
                                onChange={this.handleStatusSelect}
                                >
                                <MenuItem value={"Not Started"}>Not Started</MenuItem>
                                <MenuItem value={"In Progress"}>In Progress</MenuItem>
                                <MenuItem value={"Edits Needed"}>Edits Needed</MenuItem>
                                <MenuItem value={"Approved"}>Approved</MenuItem>
                            </Select>
                        </FormControl> 
                        <br></br> 
                        <br></br>  
  

                        <input type="file" onChange={this.fileSelectedHandler}/>
                        <br></br>
                        <br></br>

                        <Button type="submit" value="Submit" variant="contained" color="primary" >
                            Submit
                        </Button> 
                    </form>
                    <br></br>
                    <Button variant="contained" onClick={this.props.handleNewFormCancel}>Cancel</Button>
                </CardContent>
            </Card>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        projectSelected: state.projectSelected,
    }
}

export default connect(mapStateToProps, {handleNewFormCancel, fetchPosts, closeNewPostForm} ) (PostForm)
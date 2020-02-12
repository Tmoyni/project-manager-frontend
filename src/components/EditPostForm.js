import React from 'react';
import { connect } from 'react-redux'
import Dropbox from 'dropbox'
import { handleNewFormCancel, fetchPosts, closeNewPostForm } from '../actionCreators'
import CardContent from '@material-ui/core/CardContent';
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

class EditPostForm extends React.Component {

    state = {
        postCopy: '', 
        liveDate: '2020-02-14T12:00:00',
        description: '',
        fileName: '', 
        postName: '', 
        selectedFile: null,
        fileSelected: false, 
        image: null,
        status: ""
    }

    componentDidMount() {
        let copy = this.props.post.attributes.copies
        this.setState ({
            postCopy: copy[copy.length - 1].text, 
            liveDate: this.props.post.attributes.live_date,
            description: this.props.post.attributes.description,
            fileName: '', 
            status: this.props.post.attributes.status

        })
    }

    handleStatusSelect = event => {
        this.setState({
            status: event.target.value
        });
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
   
    fileSelectedHandler = (e) => {
        this.setState({
            selectedFile: e.target.files[0], 
            fileSelected: true
        })
    }

    handleDateChange = (date) => {
        this.setState({
            liveDate: date
        })
    };


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
                status: this.state.status,
                dropbox_path: dropboxpath,
            })            
        }).then(res => res.json())
        .then(post => {
            this.saveCopyInfo(post)
            console.log("Post Info Saved", post)
            if (!!this.state.fileSelected) {
                this.saveImageInfo(post, dropboxpath)
            }
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
            .then((response) => response.json())
                .then((data) => {
                    console.log('Image Saved:', data);
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
            }).then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
            }) 
            .then(
                this.props.fetchPosts(),
                this.props.closeNewPostForm()
            )        
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state)
        let dropboxpath = this.props.post.attributes.dropbox_path
        this.savePostInfo(dropboxpath)
        if (!!this.state.fileSelected) {
            this.uploadImageToDropbox(dropboxpath)
        }
    }

    
    render() {
        console.log(this.props)

        return(
                <CardContent   align='center'>
                    <form onSubmit={this.handleSubmit}>
                        <TextField id="standard-textarea2" multiline label="Post Copy" type="text" name="postCopy" value={this.state.postCopy} onChange={this.handleChange} />
                        <br></br>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
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
                        <TextField id="standard-textarea" multiline label="Description" type="text" name="description" value={this.state.description} onChange={this.handleChange} />
                        <br></br>
                        <br></br>

                        <FormControl >
                            <InputLabel>Post Status:</InputLabel>
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
        )
    }
}

const mapStateToProps = (state) => {
    return {
        projectSelected: state.projectSelected,
        postSelected: state.postSelected
    }
}

export default connect(mapStateToProps, {handleNewFormCancel, fetchPosts, closeNewPostForm} ) (EditPostForm)
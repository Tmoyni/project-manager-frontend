import React from 'react';
import Dropbox from 'dropbox'
import { closeNewProjectForm, fetchProjects } from '../actionCreators'
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField'
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers'
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';



function NewProject(props) {
    const dbx = new Dropbox.Dropbox({ 
        accessToken: process.env.REACT_APP_API_KEY,
        fetch: fetch
      });
    
    const [selectedDate, setSelectedDate] = React.useState(new Date('2020-02-14T21:11:54'));
    
    const [projectName, setprojectName] = React.useState("");

    const handleDateChange = date => {
        setSelectedDate(date);
      };

    const handleProjectName = (e) => {
        setprojectName(e.target.value)
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        dbx.filesCreateFolder({path: `/${projectName}`})
            .then( response => {
                let dropboxpath = response.path_lower
                fetch('https://post-manager-api.herokuapp.com/api/v1/projects', {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                    },
                    body: JSON.stringify({ 
                        user_id: 1,
                        name: projectName,
                        due_date: selectedDate,
                        dropbox: dropboxpath
                    })           
                })
                .then((response) => response.json())
                .then((data) => {
                    console.log('Success:', data);
                    props.fetchProjects()
                }) 
                .then(props.closeNewProjectForm)
            })
            .catch(function(error) {
            console.log(error)
        }).then(
            console.log("fetching"))
    }
    return(
        <Card width="sm" align='center'>
            <CardContent  variant="outlined" >

            <h2>Create A New Project</h2>

            <form onSubmit={handleSubmit} >
                <TextField fullWidth id="standard-basic" label="Project Name" name="projectName" value={projectName} onChange={handleProjectName}/>
                <br></br>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        fullWidth
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Project Due Date"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </MuiPickersUtilsProvider>
                <br></br>
                <br></br>

                <Button type="submit" value="Submit" variant="contained" color="primary">
                    Submit
                </Button> 
            </form>
            <br></br>

            <Button variant="contained" onClick={props.closeNewProjectForm}>Cancel</Button>

            </CardContent>
        </Card>
    )
}



const mapStateToProps = (state) => {
    return {
        projectSelected: state.projectSelected,
        postSelected: state.postSelected
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        closeNewProjectForm: () => dispatch(closeNewProjectForm()),
        fetchProjects: () => dispatch(fetchProjects())
    }
}

export default connect(mapStateToProps, mapDispatchToProps ) (NewProject)
import React from 'react';
import Dropbox from 'dropbox'
import { closeNewProjectForm } from '../actionCreators'
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField'
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers'


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

    // state = {
    //     projectName: '', 
    //     dueDate: '',
    //     path_lower: ''
    // }
    // [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'))


    const handleProjectName = (e) => {
        setprojectName(e.target.value)
    }
    console.log(projectName)

    

    
    const handleSubmit = (e) => {
        e.preventDefault();
        dbx.filesCreateFolder({path: `/${projectName}`})
            .then( response => {
                let dropboxpath = response.path_lower
                fetch('http://localhost:3000/api/v1/projects', {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                    },
                    body: JSON.stringify({ 
                        user_id: 1,
                        name: projectName,
                        due_date: selectedDate,
                        dropbox_path: dropboxpath
                    })         
                }).then(props.closeNewProjectForm)
            })
            .catch(function(error) {
            console.log(error)
            
        })
    }
        return(
            <div>

                <h4>Create A New Project</h4>

                <form onSubmit={handleSubmit} >
                    <TextField id="standard-basic" label="Project Name" name="projectName" value={projectName} onChange={handleProjectName}/>
                    <br></br>
                    {/* <label>
                        Due Date: <input type="text" name="dueDate" value={this.state.dueDate} onChange={this.handleChange} />
                    </label> */}
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
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
                    <input type="submit" value="Submit" />
                </form>
                
            </div>
        )
}



const mapStateToProps = (state) => {
    return {
        projectSelected: state.projectSelected,
        postSelected: state.postSelected
    }
}

export default connect(mapStateToProps, {closeNewProjectForm} ) (NewProject)
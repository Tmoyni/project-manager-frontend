import React from 'react';
import Dropbox from 'dropbox'
import { closeNewProjectForm } from '../actionCreators'
import { connect } from 'react-redux'



const dbx = new Dropbox.Dropbox({ 
    accessToken: process.env.REACT_APP_API_KEY,
    fetch: fetch
  });


class NewProject extends React.Component {

    state = {
        projectName: '', 
        dueDate: '',
        folderName: '',
        path_lower: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    
    handleSubmit = (e) => {
        e.preventDefault();
        dbx.filesCreateFolder({path: `/${this.state.folderName}`})
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
                        name: this.state.projectName,
                        due_date: this.state.dueDate,
                        dropbox_path: dropboxpath
                    })         
                }).then(this.setState({
                    projectName: '', 
                    dueDate: '',
                    folderName: '',
                    path_lower: ''
                })).then(this.props.closeNewProjectForm)
            })
            .catch(function(error) {
            console.log(error)
            
        })
    }
    


    render(){
        
        return(
            <div>

                <h4>Create A New Project</h4>

                <form onSubmit={this.handleSubmit}>
                    <label>
                        Project Name: <input type="text" name="projectName" value={this.state.projectName} onChange={this.handleChange} />
                    </label>
                    <br></br>
                    <label>
                        Due Date: <input type="text" name="dueDate" value={this.state.dueDate} onChange={this.handleChange} />
                    </label>
                    <br></br>
                    <label>
                        Folder Name: <input type="text" name="folderName" value={this.state.folderName} onChange={this.handleChange} />
                    </label>
                    <br></br>
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

export default connect(mapStateToProps, {closeNewProjectForm} ) (NewProject)
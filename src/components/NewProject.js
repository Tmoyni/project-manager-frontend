import React from 'react';
import Dropbox from 'dropbox'

const dbx = new Dropbox.Dropbox({ 
    accessToken: process.env.REACT_APP_API_KEY,
    fetch: fetch
  });

const initialState = {
        projectName: '', 
        dueDate: '',
        folderName: ''
}

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
                })      

            })
            .catch(function(error) {
            console.log(error);
        }).then( this.setState(initialState))
    }
    


    render(){
        
        return(
            <div>

                <h4>Create A New Project</h4>

                <form onSubmit={this.handleSubmit}>
                    <label>
                        Project Name: <input type="text" name="projectName" value={this.state.value} onChange={this.handleChange} />
                    </label>
                    <br></br>
                    <label>
                        Due Date: <input type="text" name="dueDate" value={this.state.value} onChange={this.handleChange} />
                    </label>
                    <br></br>
                    <label>
                        Folder Name: <input type="text" name="folderName" value={this.state.value} onChange={this.handleChange} />
                    </label>
                    <br></br>
                    <input type="submit" value="Submit" />
                </form>
                
            </div>
        )
    }

}

export default NewProject
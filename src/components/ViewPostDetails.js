import React from 'react';

class ViewPostDetails extends React.Component {

    state = {
        postCopy: '', 
        liveDate: '',
        description: '',
        fileName: '', 
        postName: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log("state", this.state)
        console.log("props", this.props)

        // dbx.filesCreateFolder({path: `/${this.state.folderName}`})
        //     .then( response => {
        //         console.log(response)
                // let dropboxpath = response.path_lower
                // fetch('http://localhost:3000/api/v1/projects', {
                //     method: 'POST',
                //     headers: {
                //     'Content-Type': 'application/json',
                //     'Accept': 'application/json'
                //     },
                //     body: JSON.stringify({ 
                //         user_id: 1,
                //         name: this.state.projectName,
                //         due_date: this.state.dueDate,
                //         dropbox_path: dropboxpath
                //     })            
                // }).then(res => (console.log(res)))     

            // })
        //     .catch(function(error) {
        //     console.log(error);
        // })
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
                    <br></br>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}

export default ViewPostDetails
import React from 'react';
import ProjectItem from '../components/ProjectItem'
import { connect } from 'react-redux'
import { fetchProjects, fetchPosts } from '../actionCreators'
import NewProject from '../components/NewProject'

class ProjectContainer extends React.Component {

state = {
    showNewProject: true
}
    
componentDidMount() {
this.props.fetchProjects()
this.props.fetchPosts()
}

newProject = (e) => {
    console.log("clicking")
    this.setState({
        showNewProject: true
    })
}

    render() {
        let projectsArray = this.props.allProjects.map( project => {
            return (
              <ProjectItem key={project.id} project={project} posts={this.props.allPosts}/>
            )
          })


        return(
            
            <div>
                <h1>Projects</h1> 
                <button onClick={(e) => this.newProject(e)} >New Project</button>
                
                {this.state.showNewProject 
                    ? <NewProject /> 
                        : ""
                }

                {projectsArray}
                <br></br>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        allProjects: state.allProjects,
        allPosts: state.allPosts

    }
}

export default connect(mapStateToProps, {fetchProjects, fetchPosts } ) (ProjectContainer)
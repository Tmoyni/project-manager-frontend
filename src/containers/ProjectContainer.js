import React from 'react';
import { connect } from 'react-redux'
import ProjectItem from '../components/ProjectItem'
import NewProject from '../components/NewProject'
import { fetchProjects, fetchPosts, toggleShowNewProject } from '../actionCreators'
import Button from '@material-ui/core/Button';


class ProjectContainer extends React.Component {

    
    componentDidMount() {
    this.props.fetchProjects()
    this.props.fetchPosts()
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
                <Button  variant="contained" color="primary">
                    New Project
                </Button>   
                             
                {this.props.showNewProject 
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
        allPosts: state.allPosts,
        showNewProject: state.showNewProject
    }
}

export default connect(mapStateToProps, {fetchProjects, fetchPosts, toggleShowNewProject } ) (ProjectContainer)
import React from 'react';
import ProjectItem from '../components/ProjectItem'
import { connect } from 'react-redux'
import { fetchProjects, fetchPosts } from '../actionCreators'

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
                <button>New Project</button>
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

export default connect(mapStateToProps, {fetchProjects, fetchPosts} ) (ProjectContainer)
import React from 'react';
import ProjectItem from '../components/ProjectItem'

class ProjectContainer extends React.Component {

    state = {
        allProjects: [],
        allPosts: []
      }
    
      componentDidMount() {
        fetch('http://localhost:3000/api/v1/projects')
          .then(res => res.json())
          .then(projects => {
            this.setState({
              allProjects: projects
            })
          }).then(fetch('http://localhost:3000/api/v1/posts')
          .then(res => res.json())
          .then(posts => {
            this.setState({
              allPosts: posts
            })
          }))
      }

    render() {
        let projectsArray = this.state.allProjects.map( project => {
            return (
              <ProjectItem key={project.id} project={project} posts={this.state.allPosts}/>
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

export default ProjectContainer
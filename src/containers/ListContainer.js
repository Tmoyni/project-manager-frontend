import React from 'react';
import { connect } from 'react-redux'
import ProjectItem from '../components/ProjectItem'
import { fetchProjects, fetchPosts, showNewProject } from '../actionCreators'
import Button from '@material-ui/core/Button';


class ListContainer extends React.Component {

    
    componentDidMount() {
        this.props.fetchProjects();
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
                <div>
                    <h1>Projects</h1> 
                    <Button  onClick={this.props.showNewProject} variant="contained" color="primary">
                        New Project
                    </Button>  

                </div>
                <br></br>     
                <br></br>             
        
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
    }
}

export default connect(mapStateToProps, { fetchProjects, fetchPosts, showNewProject } ) (ListContainer)
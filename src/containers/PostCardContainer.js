import React from 'react';
import PostCard from '../components/PostCard'
import { connect } from 'react-redux'
import Dropbox from 'dropbox'
import { fetchProjects, fetchPosts } from '../actionCreators'
import SinglePostPreview from '../components/SinglePostPreview'
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

class PostCardContainer extends React.Component {

    state = {
        previewSelected: false,
        postToPreview: null,
        projectSelected: "all"
    }

    componentDidMount() {
        this.props.fetchProjects()
        this.props.fetchPosts()
        }

    handleLargePreview = (post) => {
        this.setState({
            postToPreview: post,
            previewSelected: true
        })
    }

    handleProjectSelect = event => {
        this.setState({
            projectSelected: event.target.value
        });
    };
    
    render() {
        let filteredPosts = this.props.allPosts.filter( post => post.attributes.project_id === parseInt(this.state.projectSelected) )

        let filteredPostArray
        if (filteredPosts.length > 0) {
            filteredPostArray = filteredPosts.map( post => {
                return (
                    <PostCard key={post.id} post={post} handleLargePreview={this.handleLargePreview}/>
                )
            })  
        } 
        

        console.log(filteredPostArray)

        let allPostsArray = this.props.allPosts.map( post => {
            return (
              <PostCard key={post.id} post={post} handleLargePreview={this.handleLargePreview}/>
            )
        })

        let projectArray = this.props.allProjects.map ( project => {
            return (
                <MenuItem value={project.id}>{project.attributes.name}</MenuItem>
            )
        })

        console.log(filteredPosts)

        return(
            <div>
                <FormControl >
                    <InputLabel>Choose Project</InputLabel>
                    <Select
                        value={this.state.projectSelected}
                        onChange={this.handleProjectSelect}
                        >
                        <MenuItem value={"all"}>All Projects</MenuItem>
                        {projectArray}
                    </Select>
                </FormControl>
            <br></br>
            <br></br>
            <Grid container spacing={3}>
                {this.state.previewSelected ? <SinglePostPreview postToPreview={this.state.postToPreview} /> : ""}
                {this.state.projectSelected === "all" 
                ? allPostsArray 
                : filteredPostArray 
                }
            </Grid>

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

export default connect(mapStateToProps, { fetchProjects, fetchPosts } ) (PostCardContainer)

import React from 'react';
import ViewPostDetails from '../components/ViewPostDetails';
import PostForm from '../components/PostForm';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';

class PostDetailContainer extends React.Component {
    render() {
        return(
            <div >
                <Paper>
                { !!this.props.viewPostSelected
                ? <ViewPostDetails />
                : <PostForm />   
                }   
                </Paper>

                <div>
                    { !!this.props.newPost 
                    ? <PostForm /> 
                    :  ""
                    }               
                </div>


            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        profileSelected: state.profileSelected,
        viewPostSelected: state.viewPostSelected,
        projectSelected: state.projectSelected,
        postSelected: state.postSelected,
        newPost: state.newPost, 
        viewPostDetails: state.viewPostDetails
    }
}

export default connect(mapStateToProps, null ) (PostDetailContainer)



import React from 'react';
import ViewPostDetails from '../components/ViewPostDetails';
import PostForm from '../components/PostForm';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import NewProject from '../components/NewProject';

class ViewEditContainer extends React.Component {

    renderViewSwitch = (view) => {
        switch(view) {
          case 'postDetails':
            return <ViewPostDetails />;
          case 'newPost':
            return <PostForm />;
          case 'newProject':
            return <NewProject />;  
          default:
            return ""
        }
    }

    render() {
        return(
            <Paper >
                {this.renderViewSwitch(this.props.viewEditSelection)}
            </Paper>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        viewEditSelection: state.viewEditSelection
    }
}

export default connect(mapStateToProps, null ) (ViewEditContainer)



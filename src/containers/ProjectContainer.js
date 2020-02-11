import React from 'react';
import { connect } from 'react-redux'
import ListContainer from './ListContainer';
import PostCardContainer from './PostCardContainer'




class ProjectContainer extends React.Component {

    renderViewSwitch = (view) => {
        switch(view) {
          case 'preview':
            return <PostCardContainer />;
          case 'list':
            return <ListContainer />;
          default:
            return <ListContainer />;
        }
    }

    render() {
        return(
            <div>
                {this.renderViewSwitch(this.props.viewType)}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {

        viewType: state.viewType

    }
}

export default connect(mapStateToProps, null) (ProjectContainer)
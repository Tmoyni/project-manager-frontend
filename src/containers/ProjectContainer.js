import React from 'react';
import { connect } from 'react-redux'
import ListContainer from './ListContainer';
import PostCardContainer from './PostCardContainer'
import CalendarContainer from './CalendarContainer'




class ProjectContainer extends React.Component {

    renderViewSwitch = (view) => {
        switch(view) {
          case 'preview':
            return <PostCardContainer />;
          case 'list':
            return <ListContainer />;
        case 'calendar':
            return <CalendarContainer />;
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
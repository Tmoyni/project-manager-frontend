import React from 'react';
import { connect } from 'react-redux'


class PostItem extends React.Component {
    render() {
        return(
            <div>
                <h5>{this.props.post.name} - {this.props.post.status}</h5>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        allPosts: state.allPosts
    }
}

export default connect(mapStateToProps, null ) (PostItem)

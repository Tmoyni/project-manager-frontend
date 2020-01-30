import React from 'react';

class PostItem extends React.Component {
    render() {
        return(
            <div>
    <h5>{this.props.post.name} - {this.props.post.status}</h5>

            </div>
        )
    }
}

export default PostItem
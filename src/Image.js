import React from 'react';

class Image extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <img src={this.props.src} id={this.props.id} />
    }
}

export default Image
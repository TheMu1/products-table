import React from "react";
import PropTypes from "prop-types";
import { Message } from 'semantic-ui-react'


export default class MessageBox extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Message positive
                icon={this.props.icon}
                header={this.props.header}
                content={this.props.content}
            />
        )
    }
}

MessageBox.propTypes = {
    icon: PropTypes.string,
    header: PropTypes.string,
    content: PropTypes.string
};
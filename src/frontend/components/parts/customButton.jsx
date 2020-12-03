import React from "react";
import PropTypes from "prop-types";
import {Button, Icon} from "semantic-ui-react";

export default class CustomButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Button animated='fade' color={this.props.color} onClick={this.props.onClick}
                    className={this.props.className ? this.props.className : ""}>
                <Button.Content visible>
                    {this.props.btnText}
                </Button.Content>
                <Button.Content hidden> <Icon name={this.props.icon}/> </Button.Content>
            </Button>
        )
    }
}

CustomButton.propTypes = {
    icon: PropTypes.string,
    color: PropTypes.string,
    btnText: PropTypes.string,
    onClick: PropTypes.func,
    className: PropTypes.string
};
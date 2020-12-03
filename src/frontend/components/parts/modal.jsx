import React from "react";
import PropTypes from "prop-types";
import {Button, Modal} from 'semantic-ui-react'

export default class CustomModal extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Modal size={"mini"} open={this.props.show}>
                    <Modal.Header>{this.props.modalHeader}</Modal.Header>
                    <Modal.Content>
                        {this.props.modalContent}
                    </Modal.Content>
                    <Modal.Actions>
                        <Button negative onClick={this.props.negativeAction}>
                            {this.props.negativeBtnText}
                        </Button>
                        <Button positive onClick={this.props.positiveAction}>
                            {this.props.positiveBtnText}
                        </Button>
                    </Modal.Actions>
                </Modal>
            </div>
        )
    }
}

CustomModal.propTypes = {
    modalHeader: PropTypes.string,
    modalContent: PropTypes.string,
    show: PropTypes.bool,
    positiveBtnText: PropTypes.string,
    negativeBtnText: PropTypes.string,
    positiveAction: PropTypes.func,
    negativeAction: PropTypes.func
};
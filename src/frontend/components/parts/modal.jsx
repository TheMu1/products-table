import React from "react";
import PropTypes from "prop-types";
import {Modal} from 'semantic-ui-react';
import CustomButton from "./customButton";

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
                        <CustomButton
                            color="red"
                            icon="x icon"
                            btnText={this.props.negativeBtnText}
                            onClick={this.props.negativeAction}
                        />
                        <CustomButton
                            color="green"
                            icon="trash alternate outline"
                            btnText={this.props.positiveBtnText}
                            onClick={this.props.positiveAction}
                        />
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
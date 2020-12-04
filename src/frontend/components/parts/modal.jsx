import React from "react";
import PropTypes from "prop-types";
import {Modal} from 'semantic-ui-react';
import CustomButton from "./customButton";

/*
    Pop-up modal component with positive/negative selection buttons.
 */
export default class CustomModal extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {language, positiveAction, negativeAction, show} = this.props;
        return (
            <div>
                <Modal size={"mini"} open={show}>
                    <Modal.Header>{language.header}</Modal.Header>
                    <Modal.Content>
                        {language.content}
                    </Modal.Content>
                    <Modal.Actions>
                        <CustomButton
                            color="red"
                            icon="x icon"
                            btnText={language.negativeBtn}
                            onClick={negativeAction}
                        />
                        <CustomButton
                            color="green"
                            icon="trash alternate outline"
                            btnText={language.positiveBtn}
                            onClick={positiveAction}
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
    language: PropTypes.object,
};
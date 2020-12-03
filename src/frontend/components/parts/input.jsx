import React from "react";
import PropTypes from "prop-types";
import {Input} from "semantic-ui-react";

/*
    input part/component wich can be of different types: text/number etc, with given optional parameter like min value
    and so on. Part is being managed via props params.
 */
export default class CustomInput extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Input fluid error={this.props.error}
                       key={this.props.indexKey}
                       name={this.props.name}
                       className={this.props.className ? this.props.className : ''}
                       pattern={this.props.pattern ? this.props.pattern : ''}
                       placeholder={this.props.placeholder ? this.props.placeholder : ''}
                       onChange={this.props.onChange}
                       value={(this.props.value) ? this.props.value : ''}
                       disabled={!this.props.editable}
                       type={this.props.type ? this.props.type : ''}
                       min={this.props.minValue ? this.props.minValue : ''}
                />
            </div>
        )
    }
}

CustomInput.propTypes = {
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    error: PropTypes.bool,
    className: PropTypes.string,
    onChange: PropTypes.func,
    name: PropTypes.string,
    label: PropTypes.string,
    indexKey: PropTypes.string,
    editable: PropTypes.bool,
    type: PropTypes.string,
    pattern: PropTypes.string,
    placeholder: PropTypes.string,
    minValue: PropTypes.string
};
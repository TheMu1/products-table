import React from "react";
import {Dropdown, Flag} from "semantic-ui-react";
import PropTypes from "prop-types";

export default class Selection extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let options = [];
        if (this.props.values && this.props.values.length > 0) {
            this.props.values.forEach((value) => {
                options.push(
                    {key: value.text, value: value.text, text: <span> <Flag name={value.flag}/> {value.text}</span>}
                );
            })
        }

        return (
            <div>
                <Dropdown
                    className="custom-select"
                    name={this.props.name}
                    fluid
                    search={(options, query) => {
                        let pattern = new RegExp('^' + query.toLowerCase());
                        return options.filter((opt) => (pattern.test(opt.value.toLowerCase())))
                    }}
                    selection
                    options={options}
                    size="Large"
                    onChange={this.props.onChange}
                    value={this.props.value}
                />
            </div>
        )
    }
}

Selection.propTypes = {
    name: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
    values: PropTypes.array
};
import React from "react";
import {Dropdown, Flag} from "semantic-ui-react";
import PropTypes from "prop-types";
import {getLanguage} from "../actions/fetcingActions";

// dropdown component with flags for language select, managed via props
export default class Selection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: 'English'
        };
    }

    //set initial state from localStorage to ensure proper React lifecycle
    componentDidMount() {
        this.setState({
            selected: getLanguage()
        });
    }

    handleSelect = (e, {value}) => {
        this.setState({selected: value}, () => {
            localStorage.setItem('lang', JSON.stringify(this.state.selected))
        });
        this.props.onChange();
    };

    render() {
        //existing languages
        const options = [
            {key: 'en', value: 'English', text: <span> <Flag name='gb' size="large"/>English</span>},
            {key: 'lt', value: 'Lietuvių', text: <span> <Flag name='lt' size="large"/>Lietuvių</span>}
            ];

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
                    onChange={this.handleSelect}
                    value={this.state.selected}
                    noResultsMessage={this.props.noResults}
                />
            </div>
        )
    }
}

Selection.propTypes = {
    name: PropTypes.string,
    onChange: PropTypes.func,
};
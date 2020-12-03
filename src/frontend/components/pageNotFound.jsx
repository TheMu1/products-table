import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {Icon} from "semantic-ui-react";

export default class PageNotFound extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let translation = this.props.language.notFoundPage;
        return (
            <div className="notFound-page-container">
                <div>
                    <h1>{translation.text}</h1>
                    <h2>
                        <Link className="back-btn" to="/products">
                            <Icon name='arrow left'  size="large"/>
                            {translation.button}
                        </Link>
                    </h2>
                </div>
            </div>
        )
    }
}

PageNotFound.propTypes = {
    language: PropTypes.obj
}
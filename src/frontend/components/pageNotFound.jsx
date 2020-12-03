import React from "react";
import {Link} from "react-router-dom";
import {Icon} from "semantic-ui-react";

export default class PageNotFound extends React.Component {

    render() {
        return (
            <div className="notFound-page-container">
                <div>
                    <h1>404. Page not found.</h1>
                    <h2>
                        <Link className="back-btn" to="/products">
                            <Icon name='arrow left'  size="large"/>
                            Go back
                        </Link>
                    </h2>
                </div>
            </div>
        )
    }
}
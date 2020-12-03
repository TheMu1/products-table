import React from "react";
import {
    Router,
    Route,
    Switch,
    Redirect
} from "react-router-dom";
import {createBrowserHistory as browserHistory} from "history";
import App from "./App";
import CreateForm from "./buildForm";
import PageNotFound from "./pageNotFound";
import En from "../../../translations/en.json";
import Lt from "../../../translations/lt.json";

export default class Routes extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let tmp = JSON.parse(localStorage.getItem('lang'));
        let selectedLang = tmp ? tmp : 'English';
        let lang;
        switch (selectedLang) {
            case 'English':
                lang = En;
                break;
            case 'Lietuvių':
                lang = Lt;
                break;
            default:
                lang = En;
                break;
        }
        return (
            <Router history={browserHistory()}>
                <Switch>
                    <Redirect key="r1" exact path="/" to="/products" />
                    <Route key="table" exact path="/products" render={(props) => <App {...props} language={lang}/>}/>
                    <Route key="create" exact path="/products/create"
                           render={(props) => <CreateForm {...props} language={lang}/>}/>
                    <Route key="create" exact path="/products/create/saved"
                           render={(props) => <CreateForm {...props} language={lang}/>}/>
                    <Route key="preview" exact path="/products/:id"
                           render={(props) => <CreateForm {...props} language={lang}/>}/>
                    <Route key="edit" exact path="/products/:id/edit"
                           render={(props) => <CreateForm {...props} language={lang}/>}/>
                    <Route component={PageNotFound}/>
                </Switch>
            </Router>
        )
    }
}
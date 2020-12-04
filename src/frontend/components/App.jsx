import React from "react";
import {
    Router,
    Route,
    Switch,
    Redirect
} from "react-router-dom";
import {createBrowserHistory as browserHistory} from "history";
import Products from "./products";
import BuildView from "./buildForm";
import ProductView from "./productView";
import PageNotFound from "./pageNotFound";
import En from "../../../translations/en.json";
import Lt from "../../../translations/lt.json";
import {getLanguage} from "./actions/fetcingActions";

//App entry point with router and selected language check
function App(){
        let selectedLang = getLanguage();
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
                    <Route key="table" exact path="/products"
                           render={(props) => <Products {...props} language={lang} />}/>
                    <Route key="create" exact path="/products/create"
                           render={(props) => <BuildView {...props} language={lang} purpose="create"/>}/>
                    <Route key="preview" exact path="/products/:id"
                           render={(props) => <ProductView {...props} language={lang}/>}/>
                    <Route key="edit" exact path="/products/:id/edit"
                           render={(props) => <BuildView {...props} language={lang} purpose="edit"/>}/>
                    <Route render={() => <PageNotFound language={lang}/>} />
                </Switch>
            </Router>
        )
}

export default App;
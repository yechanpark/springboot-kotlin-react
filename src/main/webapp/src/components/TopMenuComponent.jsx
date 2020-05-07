import React, {Component} from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import MainComponent from './MainComponent'
import DashboardComponent from './Dashboard'

class TopMenuComponent extends Component {

    render() {
        return (
            <Router>
                <Route path="/" component={MainComponent}/>
                <Route path="/main" component={MainComponent}/>
                <Route path="/dashboard" component={DashboardComponent}/>
            </Router>
        )
    }
}

export default TopMenuComponent;
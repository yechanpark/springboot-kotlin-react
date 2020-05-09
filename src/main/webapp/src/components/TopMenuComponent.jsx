import React, {Component} from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import MainComponent from './MainComponent'
import AddBoard from './board/AddBoard'

class TopMenuComponent extends Component {

    render() {
        return (
            <Router>
                <Route exact path="/" component={MainComponent}/>
                <Route path="/main" component={MainComponent}/>
                <Route path="/board/add" component={AddBoard}/>
            </Router>
        )
    }
}

export default TopMenuComponent;
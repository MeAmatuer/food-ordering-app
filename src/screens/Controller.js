import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Details from './details/Details';

class Controller extends Component {
    
    constructor() {
        super();
        this.baseUrl = "http://localhost:8080/api";
    }

    render() {
        return(
            <Router>
                <div>
                    <Route path='/restaurant/:id' render={(props) => <Details {...props} baseUrl={this.baseUrl} /> } />
                </div>
            </Router>
        )
    }
}
export default Controller;
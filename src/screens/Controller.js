import React,{Component} from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import Checkout from './checkout/Checkout';



//Creating controller class for easy routing the pages
class Controller extends Component{
    constructor(){
        super()
        this.baseUrl = ""; //setting the baseUrl of the api 
    }

    render(){
        return(
            <Router>
                <div className = 'main-container'>
                    <Route exact path = '/checkout' render={(props) => <Checkout /> }/>            {/* Route to home Page */ }
                </div>
            </Router>
        )
    }
}

export default Controller;
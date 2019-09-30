import React, { Component } from 'react';
import Header from '../../common/header/Header';
import { Typography } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faRupeeSign } from '@fortawesome/free-solid-svg-icons';

import './Details.css';

class Details extends Component {

    constructor() {
        super();
        this.state = {
            restaurantPhotoUrl: "",
            restaurantName: "",
            locality: "",
            categories: [{}],
            rating: 0,
            numberOfCustomers: 0,
            avgCostForTwo: 0,
            itemAdded: false,
            cartItemsCount: 0,
            totalCost: 0,
            cartItems: {},
            open: false,
            successMessage: ""
        }
    }

    componentWillMount() {
        let resp = {};
        let data = null;
        let xhr = new XMLHttpRequest();
        let that = this;
        var categories = []
        xhr.addEventListener("readystatechange", function () {
            if (xhr.readyState === 4) {
                resp = JSON.parse(xhr.responseText)
                for (var i = 0; i < resp.categories.length; i++) {
                    categories[resp.categories[i].category_name] = resp.categories[i].item_list
                }
                that.setState({ 
                    restaurantPhotoUrl: resp.photo_URL,
                    restaurantName: resp.restaurant_name,
                    locality: resp.address.locality,
                    categories: categories,
                    rating: resp.customer_rating,
                    numberOfCustomers: resp.number_customers_rated,
                    avgCostForTwo: resp.average_price
                 });
            }
        });
        xhr.open("GET", this.props.baseUrl + "/restaurant/" + this.props.match.params.id);
        xhr.setRequestHeader("Cache-Control", "no-cache");
        xhr.setRequestHeader("Accept", "application/json");
        xhr.send(data);
    }


    render() {        
        var keys = Object.keys(this.state.categories)
        return (
            <div>
                <Header showSearchBox={false} />
                <div className="restaurant-details-container">
                    <div>
                        <img className="restaurant-photo" src={this.state.restaurantPhotoUrl} alt={this.state.restaurantName} />
                    </div>
                    <div className="restaurant-details">
                        <div className="restaurant-name">
                            <Typography variant='h5' component='h5' >{this.state.restaurantName}</Typography><br />
                            <Typography variant="body1">{this.state.locality.toUpperCase()}</Typography><br />
                            <Typography variant="caption">
                                {keys.map(key => (
                                    String(key) + ", "
                                ))}
                            </Typography><br /><br />
                        </div>
                        <div className="restaurant-rating-cost-container">
                            <div className="restaurant-rating-container">
                                <div className="restaurant-rating">
                                    <FontAwesomeIcon icon={faStar} />
                                    <Typography variant="subtitle1" component="p">{this.state.rating}</Typography>
                                </div>
                                <Typography variant='caption' component="p" className="caption">AVERAGE RATING BY <br />
                                    {this.state.numberOfCustomers} CUSTOMERS
                                    </Typography>
                            </div>
                            <div className="restaurant-avg-cost-container">
                                <div className="restaurant-avg-cost">
                                    <FontAwesomeIcon className="spacing" icon={faRupeeSign} />
                                    <Typography variant="subtitle1" component="p">{this.state.avgCostForTwo}</Typography>
                                </div>
                                <Typography variant='caption' className="caption">
                                    AVERAGE COST FOR <br />
                                    TWO PEOPLE
                                    </Typography>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ) 
    }
}

export default Details;
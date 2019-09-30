import React, { Component } from 'react';
import Header from '../../common/header/Header';
import { Typography, withStyles } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faRupeeSign, faCircle } from '@fortawesome/free-solid-svg-icons';
import Divider from '@material-ui/core/Divider';

import './Details.css';

const styles = (theme => ({
    menuItemName: {
        'margin-left': '20px',
        'white-space': 'nowrap',
        'text-transform': 'capitalize'
    },
    itemPrice: {
        'padding-left': '5px'
    },
    addButton: {
        'margin-left': '25px',
    },
    cartHeader: {
        'padding-bottom': '0px',
        'margin-left': '10px',
        'margin-right': '10px'
    },
    shoppingCart: {
        color: 'black',
        'background-color': 'white',
        width: '60px',
        height: '50px',
        'margin-left': '-20px',
    },
    cardContent: {
        'padding-top': '0px',
        'margin-left': '10px',
        'margin-right': '10px'
    },
    cartItemButton: {
        padding: '10px',
        'border-radius': '0',
        color: '#fdd835',
        '&:hover': {
            'background-color': '#ffee58',
        }
    },
    CheckoutBtn: {
        'font-weight': '400'
    }
}))

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
            }})
        xhr.open("GET", this.props.baseUrl + "/restaurant/" + this.props.match.params.id);
        xhr.setRequestHeader("Cache-Control", "no-cache");
        xhr.setRequestHeader("Accept", "application/json");
        xhr.send(data);
    }


    render() {
        const { classes } = this.props;
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
                <div className="menu-details-cart-container">
                    <div className="menu-details">

                        {Object.entries(this.state.categories).map(category => (
                            <div key={category.id}>
                                <Typography variant="subtitle1" component="subtitle1" >{String(category[0]).toUpperCase()}</Typography>
                                <Divider />
                                {
                                    Object.entries(category[1]).map(item => (
                                        <div className="menu-item-container" key={item.id}>
                                            <span className="spacing">
                                                <FontAwesomeIcon icon={faCircle} className={item[1].item_type === "VEG" ? "green" : "red"} />
                                            </span>
                                            <Typography variant="subtitle1" className={classes.menuItemName}>{item[1].item_name}</Typography>
                                            <div className="item-price">
                                                <FontAwesomeIcon icon={faRupeeSign} className="icon-size spacing" />
                                                <Typography variant="subtitle1" component="p" className={classes.itemPrice} >{item[1].price.toFixed(2)}</Typography>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        )
    }
}
export default withStyles(styles)(Details);

import React, { Component } from 'react';
import Header from '../../common/header/Header';
import { Typography, CardContent, Button, withStyles, CardHeader } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faRupeeSign, faCircle, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Avatar from '@material-ui/core/Avatar';
import 'font-awesome/css/font-awesome.min.css';

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
                console.log(JSON.parse(xhr.responseText))
                resp = JSON.parse(xhr.responseText)
                that.setState({ restaurantPhotoUrl: resp.photo_URL });
                that.setState({ restaurantName: resp.restaurant_name });
                that.setState({ locality: resp.address.locality });
                for (var i = 0; i < resp.categories.length; i++) {
                    categories[resp.categories[i].category_name] = resp.categories[i].item_list
                }
                that.setState({ categories: categories });
                that.setState({ rating: resp.customer_rating });
                that.setState({ numberOfCustomers: resp.number_customers_rated });
                that.setState({ avgCostForTwo: resp.average_price });

            }

        })
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
                                            <IconButton className={classes.addButton} aria-label="add">
                                                <AddIcon />
                                            </IconButton>
                                        </div>
                                    ))}
                            </div>
                        ))}
                    </div>
                    <div className="my-cart">
                        <Card >
                            <CardHeader
                                avatar={
                                    <Avatar aria-label="shopping-cart" className={classes.shoppingCart}>
                                        {console.log("modal == ", sessionStorage.getItem("modalOpen"))}
                                        <Badge invisible={sessionStorage.getItem("modalOpen") === true ? true : false} badgeContent={this.state.cartItemsCount} showZero color="primary" className={classes.badge}>
                                            <ShoppingCartIcon />
                                        </Badge>
                                    </Avatar>
                                }
                                title="My Cart"
                                titleTypographyProps={{
                                    variant: 'h6'
                                }}
                                className={classes.cartHeader}
                            />
                            <CardContent className={classes.cardContent}>

                                {
                                    Object.entries(this.state.cartItems).map(item => (
                                        this.state.cartItemsCount !== 0 && this.state.cartItems[item[0]]["count"] !== 0 ?

                                            <div className="cart-menu-item-container">

                                                <i className="fa fa-stop-circle-o" aria-hidden="true" style={{ color: item[1].type === "NON_VEG" ? "#BE4A47" : "#5A9A5B" }}></i>
                                                <Typography variant="subtitle1" component="p" className={classes.menuItemName} id="cart-menu-item-name" >{item[0]}</Typography>
                                                <span className="dec-btn">
                                                    <IconButton id="minus-button" aria-label="remove" className={classes.cartItemButton}>
                                                        <FontAwesomeIcon icon={faMinus} size="xs" color="black" style={{ fontSize: 10 }} />
                                                    </IconButton>
                                                </span>
                                                <span className="count">
                                                    <Typography variant="subtitle1" component="p" className={classes.itemQuantity}>{item[1].count}</Typography>
                                                </span>

                                                <span className="inc-btn">
                                                    <IconButton className={classes.cartItemButton} aria-label="add" >
                                                        <FontAwesomeIcon icon={faPlus} size="xs" color="black" style={{ fontSize: 10 }} />
                                                    </IconButton>
                                                </span>
                                                <div className="item-price">
                                                    <FontAwesomeIcon icon={faRupeeSign} className="icon-size caption" />
                                                    <Typography variant="subtitle1" component="p" className={classes.itemPrice} id="cart-item-price">{(item[1].count * item[1].price).toFixed(2)}</Typography>
                                                </div>
                                            </div> : null
                                    ))}
                                <div className="total-amount-container">
                                    <Typography variant="subtitle2">
                                        <Box fontWeight="fontWeightBold">TOTAL AMOUNT</Box>
                                    </Typography>
                                    <div className="total-price">
                                        <FontAwesomeIcon icon={faRupeeSign} />
                                        <Typography variant="subtitle1" component="p" className={classes.itemPrice} id="cart-total-price">{this.state.totalCost.toFixed(2)}</Typography>
                                    </div>
                                </div>
                                <div>
                                    <Button variant="contained" color="primary" fullWidth={true} className={classes.CheckoutBtn} onClick={this.checkout}>CHECKOUT</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}
export default withStyles(styles)(Details);

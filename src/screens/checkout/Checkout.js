import React, { Component } from 'react';
import Header from '../../common/header/Header';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import './Checkout.css';

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    width: '70%',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

function getSteps() {
  return ['Delivery', 'Payment'];
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={event => {
        event.preventDefault();
      }} 
      {...props}
    />
  );
}

const useStyle = makeStyles(theme => ({
  root: {
    flexGrow: 0,
    backgroundColor: theme.palette.background.paper,
  },
}));

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function DeliveryInfo(){
  const classes = useStyle();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs
            variant="standard"
            value={value}
            onChange={handleChange}
            aria-label="nav tabs example"
          >
            <LinkTab label="Existing Address" href="#" {...a11yProps(0)} />
            <LinkTab label="New Address" href="#" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          Page One
        </TabPanel>
        <TabPanel value={value} index={1}>
          Page Two
        </TabPanel>
      </div>
    );      
}

function PaymentInfo(){
  return(
    <div>

    </div>
  );
}

function getStepContent(step) {
  switch (step) {
    case 0:
        return (
          <DeliveryInfo/>
        );
    case 1:
      return <PaymentInfo/>;
    default:
      return 'Unknown step';
  }
}

function CheckoutStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  return (
    <div className={classes.root}>
    <Stepper activeStep={activeStep} orientation="vertical">
      {steps.map((label, index) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
          <StepContent>
            <Typography>
              {getStepContent(index)}
            </Typography>
            <div className={classes.actionsContainer}>
              <div>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={classes.button}
                >
                  Back
                  </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  className={classes.button}
                >
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </div>
            </div>
          </StepContent>
        </Step>
      ))}
    </Stepper>
          {activeStep === steps.length && (
            <Paper square elevation={0} className={classes.resetContainer}>
              <Typography>View the summary and place your order now!</Typography>
              <Button onClick={handleReset} className={classes.button}>
                Change
              </Button>
            </Paper>
          )}
          </div>
  );

}

const useCardStyles = makeStyles({
  card: {
    width: '30%',
    margin: 30,
    padding: 15
  },
  title: {
    fontSize: 24,
    fontWeight: "bolder"
  },
  subtitle: {
    fontSize: 16
  },
  pos: {
    marginBottom: 12,
  },
});

function Summary(){
  const classes = useCardStyles();
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Summary
        </Typography>
        <Typography className={classes.subtitle} color="textSecondary">
          Restaurant Name
        </Typography>
        <br/>
        <Typography className={classes.pos} color="textSecondary">
          Items List
        </Typography>
        <hr></hr>
        <Typography variant="body2" component="p">
          Net Amount 
        </Typography>
        <br/>
        <Button variant="contained" color="primary" className={classes.button}>
          Place Order
        </Button>
      </CardContent>
    </Card>
  );
}

class Checkout extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="checkoutBody">
          <CheckoutStepper />
          <Summary/>
        </div>
      </div>
    )
  }
}

export default Checkout;
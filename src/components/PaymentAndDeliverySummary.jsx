import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import OrderSummary from "./OrderSummary";
import {LocationOn, Payment, Receipt} from "@material-ui/icons";
import DeliveryAddress from "./DeliveryAddress";
import PaymentOptions from "./PaymentOptions";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '2em'
    },
    details: {
        flexWrap: "wrap"
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    orderDetails: {
        display: "flex",
        flexDirection: "column",
        alignItems: "end",
        width: "100%"
    }
}));

export default function PaymentAndDeliverySummary({location}) {
    let {cartValue, cartData} = location.state;
    const formatter = new Intl.NumberFormat('en-in', {
        style: 'currency',
        currency: 'INR',
    });
    let tax = 0.18 * cartValue;
    let deliveryCharges = 15;
    let totalValue = tax + cartValue + deliveryCharges;
    cartValue = formatter.format(cartValue);
    cartData = JSON.parse(cartData);
    const classes = useStyles();
    const [expanded, setExpanded] = useState('');
    const [deliveryText, setDeliveryText] = useState('Select Delivery Location');
    const [paymentText, setPaymentText] = useState('Select Payment Mode');

    function handleChange(panel) {
        return (event, isExpanded) => {
            setExpanded(isExpanded ? panel : false);
        }
    }

    return (
        <div className={`${classes.root} container`}>
            <Accordion expanded={expanded === 'orderSummary'} onChange={handleChange('orderSummary')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="orderSummary-content"
                    id="orderSummary-header"
                >
                    <Typography className={classes.heading}><Receipt/></Typography>
                    <Typography className={classes.secondaryHeading}>Pay {formatter.format(totalValue)}</Typography>
                </AccordionSummary>
                <AccordionDetails className={classes.details}>
                    <OrderSummary cartData={cartData}/>
                    <div className={classes.orderDetails}>
                        <span>Cart Value: {cartValue}</span>
                        <span>Tax: {formatter.format(tax)}</span>
                        <span>Delivery Charges: {formatter.format(deliveryCharges)}</span>
                        <span>Total Value: {formatter.format(totalValue)}</span>
                    </div>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'addressSummary'} onChange={handleChange('addressSummary')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="addressSummary-content"
                    id="addressSummary-header"
                >
                    <Typography className={classes.heading}><LocationOn/></Typography>
                    <Typography className={classes.secondaryHeading}>
                        {deliveryText}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <DeliveryAddress onDeliveryAddressChange={setDeliveryText}/>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'paymentOptions'} onChange={handleChange('paymentOptions')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="paymentOptions-content"
                    id="paymentOptions-header"
                >
                    <Typography className={classes.heading}><Payment/></Typography>
                    <Typography className={classes.secondaryHeading}>
                        {paymentText}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <PaymentOptions onPaymentTextChange={setPaymentText}/>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}

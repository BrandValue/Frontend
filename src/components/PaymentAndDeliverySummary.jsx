import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import OrderSummary from "./OrderSummary";
import {LocationOn, Payment, Receipt} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
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
}));

export default function PaymentAndDeliverySummary({totalValue, cartData}) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState('');

    function handleChange(panel) {
        return (event, isExpanded) => {
            setExpanded(isExpanded ? panel : false);
        }
    }

    return (
        <div className={classes.root}>
            <Accordion expanded={expanded === 'orderSummary'} onChange={handleChange('orderSummary')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="orderSummary-content"
                    id="orderSummary-header"
                >
                    <Typography className={classes.heading}><Receipt/></Typography>
                    <Typography className={classes.secondaryHeading}>Pay {totalValue}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <OrderSummary cartData={cartData}/>
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
                        Deliver to home
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus, varius pulvinar
                        diam eros in elit. Pellentesque convallis laoreet laoreet.
                    </Typography>
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
                        Pay using Credit Card
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros,
                        vitae egestas augue. Duis vel est augue.
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}

import React from 'react';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "auto",
        transition: '0.3s',
        '&:hover': {
            boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)'
        },
        padding: 8,
        display: "flex",
        justifyContent: "space-between"
    }
}));

function OrderSingleItem({cartItem}) {
    const classes = useStyles();
    const formatter = new Intl.NumberFormat('en-in', {
        style: 'currency',
        currency: 'INR',
    });
    return (
        <div className={classes.root}>
            <span>{cartItem.count} Set {cartItem.item.title}</span>
            <span>{`${parseInt(cartItem.count)} x ${formatter.format(parseInt(cartItem.item.price.price))}`}</span>
            <span>{formatter.format(parseInt(cartItem.count) * parseInt(cartItem.item.price.price))}</span>
        </div>
    );
}

export default OrderSingleItem;

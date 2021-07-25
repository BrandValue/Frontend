import React from 'react';
import OrderSingleItem from "./OrderSingleItem";
import {makeStyles} from "@material-ui/core/styles";

const useStyle = makeStyles(() => ({
    scrollOrder: {
        overflowX: "auto",
        overflowY: "auto",
        height: Math.min(window.innerHeight - 20, 150),
        margin: 8,
        width: "100%"
    }
}));

function OrderSummary({cartData}) {
    const classes = useStyle();
    return (
        <div className={classes.scrollOrder}>
            {cartData.map(cartItem => (
                <OrderSingleItem cartItem={cartItem} key={cartItem.item.id}/>
            ))}
        </div>
    );
}

export default OrderSummary;

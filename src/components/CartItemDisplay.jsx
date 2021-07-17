import React, {forwardRef, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";

function getModalStyle() {
    return {
        top: `50%`,
        left: `50%`,
        transform: `translate(-50%, -50%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        alignItems: "center"
    },
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    }
}));

const CartItemDisplay = forwardRef(({cartData, onClose}, ref) => {
    const [modalStyle] = useState(getModalStyle());
    const classes = useStyles();
    return (
        <div style={modalStyle} className={classes.paper} ref={ref} tabIndex="-1">
            {
                cartData.map(cartItem => (
                    <p key={cartItem.item.id}>{cartItem.count}h</p>
                ))
            }
            <h2 id="simple-modal-title">Text in a modal</h2>
            <h2 onClick={onClose}>&times;</h2>
            <p id="simple-modal-description">
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </p>
        </div>
    );
});
export default CartItemDisplay;

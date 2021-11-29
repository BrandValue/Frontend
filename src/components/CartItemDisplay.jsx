import React, {forwardRef, useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import SingleCartItem from "./SingleCartItem";
import Neon from "./NeonEffect/Neon";
import WallImage from "../assets/backgroundImages/wall-background.jpg";
import {Button, IconButton} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import {Redirect} from "react-router-dom";
import PaymentOptions from "./PaymentOptions";

function getModalStyle() {
    return {
        top: `50%`,
        left: `50%`,
        transform: `translate(-50%, -50%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'absolute',
        width: Math.min(window.innerWidth - 20, 450),
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #e5e5e5',
        boxShadow: theme.shadows[5],
        padding: 8
    },
    modalHeader: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 8
    },
    secondaryBackground: {
        '&:hover': {
            background: "#f6a5c0",
        },
    },
    scroll: {
        overflowX: "auto",
        overflowY: "auto",
        height: Math.min(window.innerHeight - 20, 350),
        margin: 8
    },
    noItems: {
        overflowX: "auto",
        overflowY: "auto",
        height: Math.min(window.innerHeight - 20, 350),
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `url(${WallImage})`
    },
    bold: {
        fontWeight: "bolder"
    },
    bottomRow: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        marginTop: 16,
        marginLeft: 8,
        marginRight: 8,
        marginBottom: 16
    },
    leftMargin: {
        marginLeft: 4
    }
}));

function showCartView(classes, onClose, cartLength, cartData, onSubBtnClick, onAddBtnClick,
                      setOnDelete, onCartItemDelete, deliveryCharges, tax, totalValue, cartValue, setRedirect) {
    return (
        <>
            <div className={classes.modalHeader}>
                <span className={classes.bold}>Cart Summary</span>
                <IconButton className={classes.secondaryBackground} onClick={onClose}><CloseIcon/></IconButton>
            </div>
            <div className={classes.scroll} id="modal-description">
                {
                    cartLength ? (
                        cartData.map(cartItem => (
                            <SingleCartItem cartItem={cartItem} onSubBtnClick={onSubBtnClick}
                                            onAddBtnClick={onAddBtnClick}
                                            onCartItemDelete={onCartItemDelete}
                                            onDelete={setOnDelete}
                                            key={cartItem.item.id}/>
                        ))
                    ) : (<div className={classes.noItems}><Neon text={"No item in cart"}/></div>)

                }
            </div>
            <div>
                {
                    cartLength ? (
                        <>
                            <div className={`${classes.bottomRow} ${classes.bold}`}>Cart Total: {cartValue}</div>
                            <div className={`${classes.bottomRow} ${classes.bold}`}>Delivery
                                Charges: {deliveryCharges}</div>
                            <div className={`${classes.bottomRow} ${classes.bold}`}>Tax: {tax}</div>
                            <div className={`${classes.bottomRow} ${classes.bold}`}>Total: {totalValue}</div>
                        </>
                    ) : ('')
                }
            </div>
            <div className={classes.bottomRow}>
                <Button variant="outlined" size="small" color="secondary" onClick={onClose}>
                    Cancel
                </Button>
                <Button className={classes.leftMargin} variant={"contained"} size="small" color="primary"
                        onClick={() => {
                            setRedirect(() => true);
                        }}
                        disabled={!cartLength}>
                    {
                        cartLength ? (`Pay ${totalValue}`) : ('Checkout')
                    }
                </Button>
            </div>
        </>
    )
}

const CartItemDisplay = forwardRef(({
                                        cartData,
                                        onClose,
                                        onAddBtnClick,
                                        onSubBtnClick,
                                        onCartItemDelete,
                                        setCartLength,
                                        cartLength,
                                        cartValue,
                                        setCartValue,
                                        getCartValue,
                                    },
                                    ref) => {
    const [modalStyle] = useState(getModalStyle());
    const [onDelete, setOnDelete] = useState(false);
    const [redirect, setRedirect] = useState(false);
    let tax = 0.18 * cartValue;
    document.title = `Let's eat`;
    let deliveryCharges = 15;
    const formatter = new Intl.NumberFormat('en-in', {
        style: 'currency',
        currency: 'INR',
    });
    let totalValue = tax + cartValue + deliveryCharges;
    totalValue = formatter.format(totalValue);
    tax = formatter.format(tax);
    deliveryCharges = formatter.format(deliveryCharges);
    cartValue = formatter.format(cartValue);
    useEffect(() => {
        setCartLength(cartData.length);
        setCartValue(getCartValue());
        return onClose;
    }, [onDelete, cartData.length, setCartLength, setCartValue, getCartValue, onClose]);
    const classes = useStyles();
    if (redirect) {
        return <Redirect
            to={{
                pathname: "/payment",
                state: {totalValue, cartData: JSON.stringify(cartData)}
            }}/>
    }
    return (
        <div style={modalStyle} className={classes.root} ref={ref} tabIndex="-1" id={'modalParent'}>
            {
                showCartView(classes, onClose, cartLength, cartData,
                    onSubBtnClick, onAddBtnClick, setOnDelete, onCartItemDelete, deliveryCharges, tax,
                    totalValue, cartValue, setRedirect)
            }
        </div>
    );
});
export default CartItemDisplay;

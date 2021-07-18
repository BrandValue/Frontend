import React, {forwardRef, useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import SingleCartItem from "./SingleCartItem";
import Neon from "./NeonEffect/Neon";
import WallImage from "../assets/backgroundImages/wall-background.jpg";
import {Button, ButtonGroup, TextField} from "@material-ui/core";

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
    pointer: {
        cursor: "pointer"
    },
    scroll: {
        overflowX: "auto",
        overflowY: "auto",
        height: Math.min(window.innerHeight - 20, 450),
    },
    noItems: {
        overflowX: "auto",
        overflowY: "auto",
        height: Math.min(window.innerHeight - 20, 450),
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
        marginBottom: 16
    },
    leftMargin: {
        marginLeft: 4
    }
}));

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
                                        getCartValue
                                    },
                                    ref) => {
    const [modalStyle] = useState(getModalStyle());
    const [onDelete, setOnDelete] = useState(false);
    useEffect(() => {
        setCartLength(cartData.length);
        setCartValue(getCartValue());
    }, [onDelete, cartData.length, setCartLength, setCartValue, getCartValue]);
    const classes = useStyles();
    return (
        <div style={modalStyle} className={classes.root} ref={ref} tabIndex="-1">
            <div className={classes.modalHeader}>
                <span className={classes.bold}>Cart Summary</span>
                <h2 className={classes.pointer} onClick={onClose}>&times;</h2>
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
            <div className={classes.bottomRow}>
                {
                    cartLength ? (
                        <div className={classes.bold}>Total (Including GST): {cartValue}</div>
                    ) : ('')
                }
            </div>
            <div className={classes.bottomRow}>
                <Button variant="outlined" size="small" color="secondary" onClick={onClose}>
                    Cancel
                </Button>
                <Button className={classes.leftMargin} variant={"contained"} size="small" color="primary">
                    Checkout
                </Button>
            </div>
        </div>
    );
});
export default CartItemDisplay;

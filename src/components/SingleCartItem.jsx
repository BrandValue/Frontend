import React, {useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Button, ButtonGroup, Checkbox} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    root: {
        display: "flex",
        alignItems: "center"
    },
    expand: {
        marginLeft: 'auto'
    }
}));

function SingleCartItem({cartItem, onSubBtnClick, onAddBtnClick}) {
    const classes = useStyles();
    const {cartBtnText, hasItemInCart} = cartItem.item;
    const [, setBtnText] = useState(cartBtnText);
    const [count, setItemCount] = useState(cartItem.count);
    return (
        <div className={classes.root}>
            {count > 0 ? (<><Checkbox color={"primary"}/>
                <span>{cartItem.item.title}</span>
                <ButtonGroup size="small" aria-label="small outlined button group">
                    <Button variant="outlined" size="small" color="primary" className={classes.expand}
                            onClick={() => {
                                onSubBtnClick(cartItem.item);
                                setItemCount(cartItem.count);
                                setBtnText(cartItem.item.cartBtnText);
                            }} disabled={!hasItemInCart}>
                        -
                    </Button>
                    <Button variant="outlined" size="small" color="primary" className={classes.expand}
                            onClick={() => {
                                onAddBtnClick(cartItem.item);
                                setItemCount(cartItem.count);
                                setBtnText(cartItem.item.cartBtnText);
                            }}>
                        +
                    </Button>
                </ButtonGroup>
                <span>{count}</span></>) : ('')}
        </div>
    );
}

export default SingleCartItem;

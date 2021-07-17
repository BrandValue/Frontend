import React, {useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Card, CardActions, CardHeader, CardMedia} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import {Add, Remove} from "@material-ui/icons";

const useStyles = makeStyles(() => ({
    card: {
        width: Math.min(window.innerWidth - 30, 425),
        '&:hover': {
            background: "#fafafa",
        },
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        margin: "auto !important"
    },
    media: {
        width: "auto",
        height: "auto",
        paddingTop: "auto",
        paddingRight: "auto",
        borderRadius: 50,
        margin: 4
    },
    adjustPadding: {
        paddingLeft: '0px!important',
        paddingBottom: '0px!important',
    },
    metaClasses: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    }
}));

function SingleCartItem({cartItem, onSubBtnClick, onAddBtnClick}) {
    const classes = useStyles();
    const {cartBtnText, hasItemInCart} = cartItem.item;
    const [, setBtnText] = useState(cartBtnText);
    const [count, setItemCount] = useState(cartItem.count);
    const [state, setState] = useState({
        raised: false,
        shadow: 2,
    });
    return (
        <div>
            {count > 0 ? (
                <>
                    <Card className={classes.card} onMouseOver={() => {
                        setState({raised: true, shadow: 3})

                    }}
                          onMouseOut={() => setState({raised: false, shadow: 1})}
                          raised={state.raised} zdepth={state.shadow}>
                        <CardMedia
                            className={classes.media}
                            image={cartItem.item.imgSrc}
                            title={cartItem.item.imgTitle}
                        />
                        <CardHeader
                            title={cartItem.item.title}
                            subheader={`₹${cartItem.item.price.price} for ${cartItem.item.price.qty}`}
                            className={classes.adjustPadding}
                        />
                        <CardActions disableSpacing className={classes.metaClasses}>
                            <IconButton color={"secondary"} onClick={() => {
                                onSubBtnClick(cartItem.item);
                                setBtnText(cartItem.item.cartBtnText);
                                setItemCount(cartItem.count);
                            }} disabled={!hasItemInCart}><Remove/></IconButton>
                            {cartBtnText}
                            <IconButton color={"primary"} onClick={() => {
                                onAddBtnClick(cartItem.item);
                                setBtnText(cartItem.item.cartBtnText);
                                setItemCount(cartItem.count);
                            }}><Add/></IconButton>
                        </CardActions>
                    </Card>
                </>) : ('')}
        </div>
    );
}

export default SingleCartItem;

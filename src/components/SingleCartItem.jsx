import React, {useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Button, ButtonGroup, Card, CardActions, CardContent, CardHeader, CardMedia, Checkbox} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import FoodTypeIndicator from "./FoodTypeIndicator";
import Rating from "./Rating";
import Price from "./Price";

const useStyles = makeStyles(() => ({
    card: {
        width: Math.min(285, window.innerWidth - 10),
        '&:hover': {
            background: "#fafafa",
        },
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
    },
    media: {
        width: 100,
        height: 30,
        margin: 8,
        paddingTop: "35.25%",
        paddingRight: "35.25%",
        borderRadius: 50
    },
    expand: {
        marginLeft: 'auto',
    },
    adjustPadding: {
        paddingTop: '4px!important',
        paddingBottom: '0px!important',
    },
    metaClasses: {
        justifyContent: "space-between !important",
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
                            subheader={cartItem.item.subHeader}
                            className={classes.adjustPadding}
                        />
                        <CardContent>
                            <Typography variant="body2" color="textSecondary" component="div"
                                        className={classes.metaClasses}>
                                {cartItem.item.category === 'non-veg' ? <FoodTypeIndicator color={'green'}/> :
                                    <FoodTypeIndicator color={'red'}/>} <Rating magnitude={cartItem.item.rating}/>
                                <Price
                                    costInformation={cartItem.item.price}/>
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing className={classes.metaClasses}>
                            <ButtonGroup size="small" aria-label="small outlined button group">
                                <Button variant="outlined" size="small" color="secondary" className={classes.expand}
                                        onClick={() => {
                                            onSubBtnClick(cartItem.item);
                                            setBtnText(cartItem.item.cartBtnText);
                                            setItemCount(cartItem.count);
                                        }} disabled={!hasItemInCart}>
                                    -
                                </Button>
                                <Button variant="outlined" size="small" color="primary" className={classes.expand}
                                        onClick={() => {
                                            onAddBtnClick(cartItem.item);
                                            setBtnText(cartItem.item.cartBtnText);
                                            setItemCount(cartItem.count);
                                        }}>
                                    +
                                </Button>
                            </ButtonGroup>
                        </CardActions>
                    </Card>
                </>) : ('')}
        </div>
    );
}

export default SingleCartItem;

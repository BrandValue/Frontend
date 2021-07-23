import React, {useEffect, useState} from 'react';
import {
    Button,
    ButtonGroup,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import {makeStyles} from "@material-ui/core/styles";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FoodTypeIndicator from "./FoodTypeIndicator";
import Rating from "./Rating";
import Price from "./Price";

const useStyles = makeStyles(() => ({
    root: {
        width: Math.min(285, window.innerWidth - 10),
        '&:hover': {
            background: "#fafafa",

        }
    },
    media: {
        height: 0,
        paddingTop: '56.25%',
        margin: '8px',
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
        display: "flex",
        alignItems: "center"
    },
    dFlex: {
        display: "flex",
        alignItems: "center"
    }
}));

function FoodItem(props) {
    const [foodItem, setFoodItem] = useState(props.data);
    const [state, setState] = useState({
        raised: false,
        shadow: 2,
    });
    const {
        title,
        subHeader,
        imgTitle,
        imgSrc,
        rating,
        category,
        isFavorite,
        price,
        onFavoriteClick,
        onAddToCartClick,
        onAddBtnClick,
        onSubBtnClick,
        hasItemInCart,
        cartBtnText,
        setBtnText
    } = foodItem;
    useEffect(() => {
        setBtnText(foodItem.cartBtnText);
    }, [setBtnText, foodItem]);
    const [favorite, setFavorite] = useState(isFavorite);
    const classes = useStyles();
    return (
        <>
            <Card className={classes.root} onMouseOver={() => {
                setState({raised: true, shadow: 3})

            }}
                  onMouseOut={() => setState({raised: false, shadow: 1})}
                  raised={state.raised} zdepth={state.shadow}>
                <CardMedia
                    className={classes.media}
                    image={imgSrc}
                    title={imgTitle}
                />
                <CardHeader
                    title={title}
                    subheader={subHeader}
                    className={classes.adjustPadding}
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="div" className={classes.metaClasses}>
                        {category === 'non-veg' ? <FoodTypeIndicator color={'green'}/> :
                            <FoodTypeIndicator color={'red'}/>} <Rating magnitude={rating}/> <Price
                        costInformation={`₹${price.price} for ${price.qty}`}/>
                    </Typography>
                </CardContent>
                <CardActions disableSpacing className={classes.metaClasses}>
                    <IconButton aria-label="add to favorites" onClick={() => {
                        onFavoriteClick(foodItem, setFoodItem).then(() => {
                            setFavorite(favorite => !favorite);
                        });
                    }}>
                        {
                            favorite ? <FavoriteIcon/> : <FavoriteBorderIcon/>
                        }
                    </IconButton>
                    <ButtonGroup size="small" aria-label="small outlined button group">
                        <Button variant="outlined" size="small" color="secondary" className={classes.expand}
                                onClick={() => {
                                    onSubBtnClick(foodItem);
                                    setBtnText(foodItem.cartBtnText);
                                }} disabled={!hasItemInCart}>
                            -
                        </Button>
                        <Button variant="outlined" size="small" color="primary" className={classes.expand}
                                onClick={() => {
                                    onAddToCartClick(foodItem);
                                    setBtnText(foodItem.cartBtnText);
                                }}>
                            {cartBtnText}
                        </Button>
                        <Button variant="outlined" size="small" color="primary" className={classes.expand}
                                onClick={() => {
                                    onAddBtnClick(foodItem);
                                    setBtnText(foodItem.cartBtnText);
                                }}>
                            +
                        </Button>
                    </ButtonGroup>
                </CardActions>
            </Card>
        </>
    );
}

export default FoodItem;

import React, {useState} from 'react';
import {Button, Card, CardActions, CardContent, CardHeader, CardMedia, Fab, Paper} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import {makeStyles} from "@material-ui/core/styles";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import {func} from "prop-types";

const useStyles = makeStyles((theme) => ({
    root: {
        width: Math.min(345, window.innerWidth - 60),
    },
    media: {
        height: 0,
        paddingTop: '56.25%',
    },
    expand: {
        marginLeft: 'auto',
    }
}));

function FoodItem(props) {
    const {title, subHeader, imgTitle, imgSrc, description, isFavorite, id, onFavoriteClick, onOrderClick} = props.data;
    const [favorite, setFavorite] = useState(isFavorite);
    const classes = useStyles();
    const [state, setState] = useState({
        raised: false,
        shadow: 2,
    })
    return (
        <>
            <Card className={classes.root} onMouseOver={() => setState({raised: true, shadow: 3})}
                  onMouseOut={() => setState({raised: false, shadow: 1})}
                  raised={state.raised} zdepth={state.shadow}>
                <CardHeader
                    title={title}
                    subheader={subHeader}
                />
                <CardMedia
                    className={classes.media}
                    image={imgSrc}
                    title={imgTitle}
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {description}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites" onClick={() => {
                        setFavorite(favorite => !favorite);
                        onFavoriteClick(id);
                    }}>
                        {
                            favorite ? <FavoriteIcon/> : <FavoriteBorderIcon/>
                        }
                    </IconButton>
                    <Button variant="outlined" size="small" color="primary" className={classes.expand}
                            onClick={() => onOrderClick(id)}>
                        Order Now
                    </Button>
                </CardActions>
            </Card>
        </>
    );
}

export default FoodItem;

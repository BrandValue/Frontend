import React from 'react';
import {Button, Card, CardActions, CardContent, CardHeader, CardMedia, Fab} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import {makeStyles} from "@material-ui/core/styles";

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
    const classes = useStyles();
    return (
        <>
            <Card className={classes.root}>
                <CardHeader
                    title="Shrimp and Chorizo Paella"
                    subheader="September 14, 2016"
                />
                <CardMedia
                    className={classes.media}
                    image="https://source.unsplash.com/random/300X200"
                    title="Paella dish"
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        This impressive paella is a perfect party dish and a fun meal to cook together with your
                        guests. Add 1 cup of frozen peas along with the mussels, if you like.
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon/>
                    </IconButton>
                    <Button variant="outlined" size="small" color="primary" className={classes.expand}>
                        Order Now
                    </Button>
                </CardActions>
            </Card>
        </>
    );
}

export default FoodItem;

import React, {useRef, useCallback, useState, useEffect} from 'react';
import Typography from "@material-ui/core/Typography";
import {Button, Card, CardActions, CardContent, CardHeader, CardMedia} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import {makeStyles} from "@material-ui/core/styles";
import {red} from "@material-ui/core/colors";
import FavoriteIcon from '@material-ui/icons/Favorite';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

function InfiniteScroll(props) {
    const {data: currState, loading, onPageEnd} = props;
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        setPosts(prevState => [...prevState, ...currState]);
    }, [currState]);
    const observer = useRef(null);
    const lastItem = useCallback((node) => {
        if (loading) {
            return;
        }
        if (observer.current) {
            observer.current.disconnect();
        }
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                onPageEnd(0, 9);
            }
        });
        if (node) {
            observer.current?.observe(node);
        }
    }, [loading, onPageEnd]);
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
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
            {/*{*/}
            {/*    posts.map((elem, idx) => {*/}
            {/*        if (idx === posts.length - 1) {*/}
            {/*            return (<li ref={lastItem}>{elem.msg}</li>);*/}
            {/*        } else {*/}
            {/*            return (<li>{elem.msg}</li>);*/}
            {/*        }*/}
            {/*    })*/}
            {/*}*/}
        </>
    );
}

export default InfiniteScroll;

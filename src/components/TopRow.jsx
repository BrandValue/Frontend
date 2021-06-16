import React, {useEffect, useState} from 'react';
import BackGround from "../assets/backgroundImages/background.jpg"
import {Box, IconButton, OutlinedInput, Paper} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import SearchIcon from '@material-ui/icons/Search';
import ImageGridList from "./ImageGridList";
import {getRequest} from '../services/APIEndpoints';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: '0.5rem'
    },
    paper: {
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    paperContainer: {
        backgroundImage: `url(${BackGround})`,
        height: "500px",
        width: "500px",
        backgroundRepeat: 'no-repeat',
        display: "flex",
        [theme.breakpoints.down('sm')]: {
            display: "none",
        },
    },
    textGroup: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: "15px",
        paddingRight: "15px",
        [theme.breakpoints.down('sm')]: {
            paddingTop: "5px",
        },
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        fontFamily: "monospace",
        fontSize: 18,
        paddingLeft: `calc(1em + ${theme.spacing(2)}px)`,
        transition: theme.transitions.create('width'),
        height: "35px",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        [theme.breakpoints.up('md')]: {
            width: '45ch',
            '&:focus': {
                width: '55ch',
            },
        },
        [theme.breakpoints.down('md')]: {
            width: '15ch',
            '&:focus': {
                width: '18ch',
            },
        },
    },
    textBubble: {
        height: "auto",
        [theme.breakpoints.down('md')]: {
            height: 'auto',
        },
    },
    textInside: {
        marginTop: '25px',
        [theme.breakpoints.down('md')]: {
            marginTop: '15px',
        },
        fontSize: 30,
        fontWeight: "bolder",
        fontFamily: "sans-serif Roboto monospace",
    }
}));

function TopRow() {
    const [text, setText] = useState('Delicious food just a tap away');
    const classes = useStyles();
    const [tileData, setTileData] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        getRequest('food/favorites').then(({data}) => {
            setTileData(data);
            setLoading(false);
        });
    }, []);
    useEffect(() => {
        setInterval(() => {
            const texts = ['Hungry?', 'Try out today\'s special.', 'Don\'t want to cook?', 'No time for cooking?'];
            const idx = Math.floor((Math.random() * 10) % texts.length);
            setText(texts[idx]);
        }, 10000);
    }, []);
    const btn = (id) => {
        setTileData(tileData.filter((tile, idx, arr) => {
            if (tile.id === id) {
                arr[idx].favorite = !arr[idx].favorite;
            }
            return true;
        }));
    }
    return (
        <div className={`${classes.root}`}>
            <Box display="flex">
                <Box flexGrow={1} className={classes.textGroup}>
                    <Box className={classes.textBubble}>
                        <ImageGridList tileData={tileData} loading={loading} favouriteHandler={btn}/>
                        <Box className={classes.textInside}>
                            {text}
                        </Box>
                    </Box>
                    <Box style={{paddingTop: "10px"}}>
                        <OutlinedInput
                            placeholder="Start eating…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{'aria-label': 'search'}}
                            endAdornment={<IconButton position="end"><SearchIcon/></IconButton>}
                        />
                    </Box>
                </Box>
                <Box className={classes.paper}>
                    <Paper className={classes.paperContainer}/>
                </Box>
            </Box>
        </div>
    );
}


export default TopRow;

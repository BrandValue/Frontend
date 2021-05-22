import React from 'react';
import BackGround from "../assets/backgroundImages/background.jpg"
import {Box, IconButton, OutlinedInput, Paper} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import SearchIcon from '@material-ui/icons/Search';
import ImageGridList from "./ImageGridList";
import image1 from '../assets/images/image1.jpg'
import image2 from '../assets/images/image2.jpg'
import image3 from '../assets/images/image3.jpg'
import image5 from '../assets/images/image5.jpg'
import image6 from '../assets/images/image6.jpg'
import image7 from '../assets/images/image7.jpg'

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
                width: '20ch',
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
        [theme.breakpoints.down('md')]: {
            marginTop: '20px',
        },
        fontSize: 30,
        fontWeight: "bolder",
        fontFamily: "sans-serif Roboto monospace",

    }
}));

const tileData = [
    {
        img: image1,
        title: 'Image',
        author: 'author',
        featured: true
    },
    {
        img: image2,
        title: 'Image',
        author: 'author',
        featured: false
    },
    {
        img: image5,
        title: 'Image',
        author: 'author',
        featured: true
    },
    {
        img: image6,
        title: 'Image',
        author: 'author',
        featured: true
    },
    {
        img: image7,
        title: 'Image',
        author: 'author',
        featured: true
    },
    {
        img: image3,
        title: 'Image',
        author: 'author',
        featured: true
    }
];

function TopRow() {
    const text = 'Delicious food just a tap away';
    const classes = useStyles();
    return (
        <div className={`${classes.root}`}>
            <Box display="flex">
                <Box flexGrow={1} className={classes.textGroup}>
                    <Box className={classes.textBubble}>
                        <ImageGridList tileData={tileData}/>
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

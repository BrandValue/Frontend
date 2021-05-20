import React from 'react';
import BackGround from "../assets/backgroundImages/background.jpg"
import {Box, IconButton, OutlinedInput, Paper} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import SearchIcon from '@material-ui/icons/Search';
import Neon from "./NeonEffect/Neon";

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
}));

function Body() {
    const classes = useStyles();
    const neonTextLst = ['People are ordering Burgers.', "Try out today's special", "We are good in Kadhai Paneer"];
    let neonText;
    neonText = neonTextLst[Math.floor(Math.random() * 10 % neonTextLst.length)];
    setInterval(() => {
        neonText = neonTextLst[Math.floor(Math.random() * 10 % neonTextLst.length)];
    }, 1000);
    return (
        <div className={`${classes.root}`}>
            <Box display="flex">
                <Box flexGrow={1} className={classes.textGroup}>
                    <Neon text={neonText}/>
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


export default Body;

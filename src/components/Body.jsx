import React from 'react';
import BackGround from "../assets/backgroundImages/background.jpg"
import {Container, Grid, Paper} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: '0.5rem'
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    paperContainer1: {
        backgroundImage: `url(${BackGround})`,
        height: "500px",
        width: "500px",
        backgroundRepeat: 'no-repeat'
    },
}));

function Body(props) {
    const classes = useStyles();
    return (
        <div className={`${classes.root} container`}>
            <Grid container
                  direction="row"
                  justify="center"
                  alignItems="center">
                <Grid item xs={12} sm={12} md={6} lg={7}>
                    ...
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={5} className={'d-none d-lg-block'}>
                    <Paper className={classes.paperContainer1}/>
                </Grid>
            </Grid>
        </div>
    );
}

export default Body;

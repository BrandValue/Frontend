import React from 'react';
import StarIcon from '@material-ui/icons/Star';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        alignItems: "center",
    },
    magnitude: {
        fontWeight: "bold",
        paddingLeft: 2,
        fontSize: "small"
    },
    size: {
        width: 15,
        height: 15
    }
}));

function Rating({magnitude}) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <StarIcon className={classes.size} color={"primary"} fontSize={"small"}/> <span
            className={classes.magnitude}>{magnitude}</span>
        </div>
    );
}

export default Rating;

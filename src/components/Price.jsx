import React from 'react';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        alignItems: "center",
    },
    magnitude: {
        fontWeight: "bold",
        paddingLeft: 2
    }
}));

function Price({costInformation}) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <span className={classes.magnitude}>{costInformation}</span>
        </div>
    );
}

export default Price;

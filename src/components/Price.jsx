import React from 'react';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    magnitude: {
        fontWeight: "bold",
        paddingLeft: 2
    }
}));

function Price({costInformation}) {
    const classes = useStyles();
    return (
        <>
            <span className={classes.magnitude}>{costInformation}</span>
        </>
    );
}

export default Price;

import React from 'react';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    root: {
        width: "10px",
        height: "10px",
        border: "1px solid",
        borderColor: (props) => props.color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    circle: {
        width: "7px",
        height: "7px",
        backgroundColor: (props) => props.color,
        borderRadius: "50%",
    }
}));

function FoodTypeIndicator(props) {
    const classes = useStyles(props);
    return (
        <>
            <div className={classes.root}>
                <div className={classes.circle}/>
            </div>
        </>
    );
}

export default FoodTypeIndicator;

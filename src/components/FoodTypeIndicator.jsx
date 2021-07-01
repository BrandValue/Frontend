import React from 'react';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    root: {
        width: 15,
        height: 15,
        backgroundColor: (props) => props.color,
        borderRadius: 50,
        marginRight: 10
    }
}));

function FoodTypeIndicator(props) {
    const classes = useStyles(props);
    return (
        <div className={classes.root}/>
    );
}

export default FoodTypeIndicator;

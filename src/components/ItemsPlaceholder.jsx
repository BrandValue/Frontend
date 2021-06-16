import React from 'react';
import {Skeleton} from "@material-ui/lab";
import {makeStyles} from "@material-ui/core/styles";

function ItemsPlaceholder(props) {
    const {height, width, animation, repeat} = props;
    const loaderArr = new Array(repeat).fill({height, width, animation});
    const useStyles = makeStyles((theme) => ({
        skeletonLoader: {
            width,
            height

        },
    }));
    const classes = useStyles();
    return (
        <div className={`row`}>
            {loaderArr.map((config, index) => (
                <div className={`col`} key={index}>
                    <Skeleton className={`${classes.skeletonLoader}`} animation={config.animation}
                    />
                </div>

            ))}
        </div>
    );
}

export default ItemsPlaceholder;

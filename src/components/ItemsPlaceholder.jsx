import React from 'react';
import {Skeleton} from "@material-ui/lab";
import {makeStyles} from "@material-ui/core/styles";

function ItemsPlaceholder(props) {
    const {height, width, animation, repeat} = props;
    const loaderArr = new Array(repeat).fill({height, width, animation});
    const useStyles = makeStyles((theme) => ({
        skeletonLoader: {
            width,
            height,
            [theme.breakpoints.down('sm')]: {
                width: '200px',
                height: '200px',
            },
            backgroundColor: "red",
        },
        disp: {
            display: "flex",
            backgroundColor: "green",
        }
    }));
    const classes = useStyles();
    return (
        <div className={`row no-gutters ${classes.disp}`}>
            {loaderArr.map(config => (
                <div className={`col`}>
                    <Skeleton className={`${classes.skeletonLoader}`} animation={config.animation}
                    />
                </div>

            ))}
        </div>
    );
}

export default ItemsPlaceholder;
